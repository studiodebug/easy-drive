import { Card } from "@/components/retroui/Card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center">
          <Card.Title className="text-3xl">Easy Drive</Card.Title>
          <p className="text-lg">Dirigir ficou fácil</p>
        </div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
