import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Header from "@/components/header";
import { ReactNode } from "react";
import prismadb from "@/lib/prismadb";

const RootLayout = async ({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) => {
  const categories = await prismadb.category.findMany();

  return (
    <SidebarProvider
      defaultOpen={false}
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        "--sidebar-width": "13rem",
        "--sidebar-width-icon": "4rem",
      }}
    >
      <AppSidebar categories={categories} />
      <SidebarInset className={"h-screen overflow-x-auto"}>
        <Header categories={categories} />
        <main className={"h-full"}>
          {children}
          {modal}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
