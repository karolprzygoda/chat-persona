import prismadb from "@/lib/prismadb";
import PersonaForm from "@/components/persona-form";
import Modal from "@/components/modal";
import { createClient } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";

type PersonaIdPageProps = {
  params: Promise<{ personaId: string }>;
};

const PersonaIdPage = async ({ params }: PersonaIdPageProps) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  // Sprawdzenie autoryzacji dla edycji
  const persona = await prismadb.persona.findUnique({
    where: {
      id: (await params).personaId,
      userId: user.id,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <Modal>
      <PersonaForm categories={categories} />
    </Modal>
  );
};

export default PersonaIdPage;
