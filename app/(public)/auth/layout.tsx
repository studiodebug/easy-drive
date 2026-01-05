export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-bold">Easy Drive</h1>
          <p className="text-lg">Dirigir ficou fácil</p>
        </div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
