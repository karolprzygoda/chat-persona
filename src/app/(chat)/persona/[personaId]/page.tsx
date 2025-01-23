import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

type PersonaParams = {
  params: Promise<{
    personaId: string;
  }>;
};

const Page = async ({ params }: PersonaParams) => {
  const supabase = await createClient();
  const { personaId } = await params;
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in");
  }

  const [persona, chat] = await Promise.all([
    prismadb.persona.findUnique({
      where: {
        id: personaId,
      },
      select: {
        id: true,
      },
    }),
    prismadb.chat.findFirst({
      where: {
        personaId: personaId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    }),
  ]);

  if (!persona) {
    notFound();
  }

  if (chat) {
    redirect(`/persona/${personaId}/chat/${chat.id}`);
  } else {
    const newChat = await prismadb.chat.create({
      data: {
        personaId: personaId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    redirect(`/persona/${personaId}/chat/${newChat.id}`);
  }
};

export default Page;
