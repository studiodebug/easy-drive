import { Card } from "@/components/retroui/Card";
import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      {params?.error ? (
        <p className="text-sm text-muted-foreground">
          Código de erro: {params.error}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Ocorreu um erro não esperado.
        </p>
      )}
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-2xl">Desculpe, algo deu errado.</Card.Title>
      </Card.Header>
      <Card.Content>
        <Suspense>
          <ErrorContent searchParams={searchParams} />
        </Suspense>
      </Card.Content>
    </Card>
  );
}
