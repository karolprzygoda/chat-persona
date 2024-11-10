import PersonaForm from "@/components/persona-form";
import prismadb from "@/lib/prismadb";

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
    <div>
      <PersonaForm initialData={persona} categories={categories} />
    </div>
  );
};

export default PersonaIdPage;
