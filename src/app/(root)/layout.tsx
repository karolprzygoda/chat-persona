import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { createClient } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import { UserProvider } from "@/components/user-provider";

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (error) {
    throw new Error(error.message);
  }

  return (
    <UserProvider user={user}>
      <SidebarProvider
        defaultOpen={false}
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          "--sidebar-width": "13rem",
          "--sidebar-width-icon": "4rem",
        }}
      >
        <AppSidebar />
        <SidebarInset className={"h-screen overflow-x-auto"}>
          <Header />
          <main className={"h-full"}>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
};

export default RootLayout;
