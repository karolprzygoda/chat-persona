import prismadb from "@/lib/prismadb";
import PersonaForm from "@/components/persona-form";
import Modal from "@/components/modal";

type PersonaIdPageProps = {
  params: Promise<{ personaId: string }>;
};

const PersonaIdPage = async ({ params }: PersonaIdPageProps) => {
  const persona = await prismadb.persona.findUnique({
    where: {
      id: (await params).personaId,
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
