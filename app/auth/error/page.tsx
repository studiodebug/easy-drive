import AuthLayout from "@/components/layouts/AuthLayout";
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
          Code error: {params.error}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          An unspecified error occurred.
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
    <AuthLayout isSpaced>
      <Card>
        <Card.Header>
          <Card.Title className="text-2xl">
            Sorry, something went wrong.
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <Suspense>
            <ErrorContent searchParams={searchParams} />
          </Suspense>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
}
