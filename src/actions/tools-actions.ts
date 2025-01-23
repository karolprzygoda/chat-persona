"use server";

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Message } from "ai";

export const addMessage = async (chatId: string, messages: Message[]) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await Promise.all(
      messages.map((message) =>
        prismadb.message.upsert({
          where: { id: message.id },
          update: {
            chatId: chatId,
            ...message,
          },
          create: {
            chatId: chatId,
            ...message,
          },
        }),
      ),
    );
  } catch (error) {
    console.log(error);
  }
};
