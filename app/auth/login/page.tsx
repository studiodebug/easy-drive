import AuthLayout from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/features/auth";

export default function Page() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
