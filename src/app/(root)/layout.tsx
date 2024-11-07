import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"h-full"}>
      <Navbar />
      <main className={"h-full pt-16 md:pl-20"}>{children}</main>
    </div>
  );
}
