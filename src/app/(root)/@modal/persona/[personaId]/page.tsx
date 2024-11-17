import Modal from "@/components/modal";
import PersonaForm from "@/components/persona/persona-form";
import prismadb from "@/lib/prismadb";

const PersonaIdPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <Modal>
      <PersonaForm categories={categories} />
    </Modal>
  );
};

export default PersonaIdPage;
