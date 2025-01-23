import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { appendResponseMessages, createIdGenerator, streamText } from "ai";
import { createClient } from "@/lib/supabase/server";
import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";
import { addMessage } from "@/actions/tools-actions";
import { toolSet } from "@/lib/ai/tools";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params;
    const { messages } = await request.json();

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const persona = await prismadb.persona.findFirst({
      where: {
        chat: {
          some: {
            id: chatId,
          },
        },
      },
    });

    if (!persona) {
      notFound();
    }

    const result = streamText({
      model: openai("gpt-4o"),
      system: `You are a helpful assistant. Play the role of ${persona.name}. 
              - Always check your knowledge base and tools for relevant information before answering any questions.
              - If no relevant information is found, respond: "Sorry, I don't know."
              - Provide answers in the same language as the question.
              - Do not include any prefixes indicating who is speaking. 
              - Follow these guidelines carefully to ensure clarity and consistency in your responses.:
               ${persona.instructions}
               - Bellow is sample conversation:
               ${persona.seed}
             `,
      messages,
      maxSteps: 5,
      async onFinish({ response }) {
        await addMessage(
          chatId,
          appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }),
        );
      },
      experimental_generateMessageId: createIdGenerator({
        prefix: "msgs",
        size: 16,
      }),
      tools: toolSet,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
