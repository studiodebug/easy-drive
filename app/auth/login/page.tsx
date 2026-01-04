import AuthLayout from "@/components/layouts/AuthLayout";
import { LoginForm } from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
