import { Home, Plus, Search, Settings, Sparkles } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";
import * as React from "react";

import { SidebarTriggerProvider } from "@/components/sidebar-trigger";
import SidebarDropdown from "@/components/sidebar-dropdown";

const items = [
  {
    title: "Search Persona",
    url: "#",
    icon: Search,
  },
  {
    title: "New Persona",
    url: "/persona/new",
    icon: Plus,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
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
          <SidebarGroup className={"px-3"}>
            <SidebarGroupContent>
              <SidebarMenu className={"gap-4"}>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon style={{ width: "20px", height: "20px" }} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
