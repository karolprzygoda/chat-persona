import prismadb from "@/lib/prismadb";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ChatClient from "@/components/chat/chat-client";

type ChatIdPageProps = {
  params: Promise<{
    chatId: string;
  }>;
};

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const supabase = await createClient();
  const { chatId } = await params;
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/signIn");
  }

  const chat = await prismadb.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      persona: true,
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          chatId: chatId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!chat) {
    redirect("/");
  }

  return (
    <div className={"relative h-screen w-screen overflow-hidden"}>
      <ChatClient chat={chat} />
    </div>
  );
};

export default ChatIdPage;
