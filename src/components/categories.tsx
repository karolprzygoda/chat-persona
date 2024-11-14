"use client";

import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import querystring from "query-string";

type CategoriesProps = {
  data: Category[];
};

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = querystring.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );
    router.push(url);
  };

  return (
    <div className={"overflow-x-clip"}>
      <div className={"flex w-full space-x-2 overflow-x-auto py-4"}>
        <button
          onClick={() => onClick(undefined)}
          className={cn(
            "flex items-center rounded-md border bg-card px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm",
            !categoryId && "border-primary/80",
          )}
        >
          Newest
        </button>
        {data.map((item) => (
          <button
            onClick={() => onClick(item.id)}
            key={item.id}
            className={cn(
              "flex items-center rounded-md border bg-card px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm",
              item.id === categoryId && "border-primary/80",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
