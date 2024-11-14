import SearchInput from "@/components/search-input";
import Categories from "@/components/categories";
import prismadb from "@/lib/prismadb";
import Personas from "@/components/personas";

type HomePageProps = {
  searchParams: Promise<{
    categoryId: string;
    name: string;
  }>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { categoryId, name } = await searchParams;
  const categories = await prismadb.category.findMany();
  const data = await prismadb.persona.findMany({
    where: {
      categoryId: categoryId,
      name: {
        search: name,
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
      <SearchInput />
      <Categories data={categories} />
      <Personas data={data} />
    </div>
  );
};

export default HomePage;
