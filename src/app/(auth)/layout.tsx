const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={"flex h-screen w-full items-center justify-center p-4"}>
      {children}
    </div>
  );
};

export default AuthLayout;
