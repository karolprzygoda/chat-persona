"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

type SidebarNavButtonProps = {
  route: {
    href: string;
    label: string;
    pro: boolean;
  };
  children: ReactNode;
};

const SidebarNavButton = ({ route, children }: SidebarNavButtonProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={route.href}
      className={cn(
        "group flex w-full cursor-pointer justify-start rounded p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
        pathname === route.href && "bg-primary/10 text-primary",
      )}
    >
      <div className={"flex flex-1 flex-col items-center gap-y-2"}>
        {children}
        {route.label}
      </div>
    </Link>
  );
};

export default SidebarNavButton;
