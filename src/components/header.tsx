"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { Category } from "@prisma/client";
import SearchInput from "@/components/search-input";

const Header = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname?.split("/").filter(Boolean) || [];
  const categoryId = searchParams.get("categoryId");
  const matchedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  const renderBreadcrumbs = () => {
    if (matchedCategory) {
      return (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Category</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink aria-current="page">
              {matchedCategory.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </>
      );
    }

    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");

      return (
        <React.Fragment key={href}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={href}>
              {decodeURIComponent(segment)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      );
    });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background p-5">
      <Breadcrumb className="hidden xl:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {renderBreadcrumbs()}
        </BreadcrumbList>
      </Breadcrumb>
      <SidebarTrigger className="xl:hidden" />
      <div
        className={
          "absolute left-1/2 top-1/2 hidden w-1/3 -translate-x-1/2 -translate-y-1/2 lg:block xl:w-1/4"
        }
      >
        <SearchInput />
      </div>
      <Link href="/">
        <h1 className="text-sm font-bold">chat-persona.com</h1>
      </Link>
    </header>
  );
};

export default Header;
