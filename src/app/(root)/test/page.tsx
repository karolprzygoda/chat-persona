import prismadb from "@/lib/prismadb";
import NewPersonaForm from "@/components/new-persona-form";

const Page = async () => {
  const categories = await prismadb.category.findMany();

  return <NewPersonaForm categories={categories} />;
};

export default Page;
