import prismadb from "@/lib/prismadb";
import { createClient } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import ChatClient from "@/components/chat/chat-client";

type ChatIdPageProps = {
  params: Promise<{
    chatId: string;
  }>;
};

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/signIn");
  }

  const persona = await prismadb.persona.findUnique({
    where: {
      id: (await params).chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: user.id,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!persona) {
    redirect("/");
  }

  return <ChatClient persona={persona} />;
};

export default ChatIdPage;
