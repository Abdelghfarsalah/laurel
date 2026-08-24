export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-tint-t5/40 via-background to-background px-4 py-14 dark:from-shade-s5/20">
      {children}
    </div>
  );
}
