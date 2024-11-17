import { ChevronRight, Home, Plus, Sparkles, UserSearch } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";
import * as React from "react";

import { SidebarTriggerProvider } from "@/components/sidebar/sidebar-trigger";
import SidebarDropdown from "@/components/sidebar/sidebar-dropdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CattegorySearchButton from "@/components/sidebar/cattegory-search-button";
import { Category } from "@prisma/client";
import SearchInput from "@/components/search-input";

export function AppSidebar({ categories }: { categories: Category[] }) {
  return (
    <SidebarTriggerProvider>
      <Sidebar collapsible={"icon"}>
        <SidebarContent className={"overflow-x-hidden"}>
          <SidebarGroup className={"px-3 pt-3"}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/"}>
                    <Home style={{ width: "20px", height: "20px" }} />
                    <span>{"Home"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup className={"px-3 pt-3"}>
            <SidebarGroupContent>
              <SidebarMenu className={"gap-4"}>
                <SidebarMenuItem className={"xl:hidden"}>
                  <SearchInput />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={"/persona/new"}>
                      <Plus style={{ width: "20px", height: "20px" }} />
                      <span>New Persona</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <Collapsible
                  asChild
                  defaultOpen={false}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <UserSearch style={{ width: "20px", height: "20px" }} />
                        <span>Personas</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {categories.map((item) => (
                          <SidebarMenuSubItem key={item.id}>
                            <CattegorySearchButton
                              name={item.name}
                              id={item.id}
                            />
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className={"p-3"}>
          <SidebarMenu className={"gap-4"}>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Sparkles style={{ width: "20px", height: "20px" }} /> Premium
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarDropdown />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarTriggerProvider>
  );
}
