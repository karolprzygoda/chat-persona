import SearchInput from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import Categories from "@/components/categories";

const HomePage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div></div>
    // <div className={"h-full space-y-2 p-4"}>
    //   <SearchInput />
    //   <Categories data={categories} />
    // </div>
  );
};

export default HomePage;
