"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 flex shrink-0 items-center justify-between border-b bg-background p-4 py-5 md:gap-2">
      <Breadcrumb className={"hidden md:block"}>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <SidebarTrigger className={"md:hidden"} />
      <Link href={"/"}>
        <h1 className={"text-sm font-bold"}>chat-persona.com</h1>
      </Link>
    </header>
  );
};

export default Header;
