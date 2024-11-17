import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "@langchain/core/callbacks/manager";
import { NextResponse } from "next/server";
import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import { Replicate } from "@langchain/community/llms/replicate";
import prismadb from "@/lib/prismadb";
import { createClient } from "@/lib/supabase/supabaseServer";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { prompt } = await request.json();
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const identifier = request.url + "-" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    const persona = await prismadb.persona.update({
      where: {
        id: (await params).chatId,
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    if (!persona) {
      return new NextResponse("Persona not found", { status: 404 });
    }

    const name = persona.id;
    const persona_file_name = name + ".txt";

    const personaKey = {
      personaName: name,
      userId: user.id,
      modelName: "llama2-13b",
    };

    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(personaKey);

    if (records.length === 0) {
      await memoryManager.seedChatHistory(persona.seed, "\n\n", personaKey);
    }

    await memoryManager.writeToHistory("User: " + prompt + "\n", personaKey);

    const recentChatHistory = await memoryManager.readLatestHistory(personaKey);

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      persona_file_name,
    );

    let relevantHistory = "";

    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }

    const { handlers } = LangChainStream();

    const model = new Replicate({
      model:
        "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    model.verbose = true;

    const resp = String(
      await model
        .call(
          `ONLY generate plain sentences without prefix of who is  speaking. DO NOT use ${name}: prefix. 
          DO NOT USE double enter space in response! Below are some additional instructions:
        ${persona.instructions}
        
        Below are relevant details about ${name}'s past and the conversation you are in.
        ${relevantHistory}
        
        ${recentChatHistory}\n${name}
        `,
        )
        .catch(console.error),
    );

    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];

    await memoryManager.writeToHistory("" + response.trim(), personaKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(resp);
    s.push(null);

    if (resp !== undefined && resp.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), personaKey);

      await prismadb.persona.update({
        where: {
          id: (await params).chatId,
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
