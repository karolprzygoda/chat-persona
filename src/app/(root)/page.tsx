import prismadb from "@/lib/prismadb";
import PersonasList from "@/components/persona/personas-list";

type HomePageProps = {
  searchParams: Promise<{
    categoryId: string;
    name: string;
  }>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { categoryId, name } = await searchParams;

  const data = await prismadb.persona.findMany({
    where: {
      categoryId: categoryId,
      name: {
        search: name?.split(" ").join(" & "),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className={"relative h-full space-y-2 p-4"}>
      <PersonasList data={data} />
    </div>
  );
};

export default HomePage;
