import AuthLayout from "@/components/layouts/AuthLayout";
import { Card } from "@/components/retroui/Card";

export default function Page() {
  return (
    <AuthLayout isSpaced>
      <Card>
        <Card.Header>
          <Card.Title className="text-2xl">
            Thank you for signing up!
          </Card.Title>
          <Card.Description>Check your email to confirm</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm text-muted-foreground">
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in.
          </p>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
}
