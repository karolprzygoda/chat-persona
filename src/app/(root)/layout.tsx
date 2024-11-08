import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"h-full"}>
      <Topbar />
      <div className={"fixed inset-y-0 mt-16 hidden w-20 flex-col md:flex"}>
        <Sidebar />
      </div>
      <main className={"h-full pt-16 md:pl-20"}>{children}</main>
    </div>
  );
}
