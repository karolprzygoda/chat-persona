import Modal from "@/components/modal";
import NewPersonaForm from "@/components/new-persona-form";
import prismadb from "@/lib/prismadb";

const PersonaIdPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <Modal>
      <NewPersonaForm categories={categories} />
    </Modal>
  );
};

export default PersonaIdPage;
