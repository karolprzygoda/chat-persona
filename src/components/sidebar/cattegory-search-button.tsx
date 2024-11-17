"use client";

import { SidebarMenuSubButton } from "@/components/ui/sidebar";
import * as React from "react";
import { useRouter } from "next/navigation";
import querystring from "query-string";

type CattegorySearchButtonProps = {
  name: string;
  id: string;
};

const CattegorySearchButton = ({ name, id }: CattegorySearchButtonProps) => {
  const router = useRouter();

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
    <SidebarMenuSubButton
      className={"cursor-pointer text-nowrap"}
      asChild
      onClick={() => onClick(id)}
    >
      <span>{name}</span>
    </SidebarMenuSubButton>
  );
};

export default CattegorySearchButton;
