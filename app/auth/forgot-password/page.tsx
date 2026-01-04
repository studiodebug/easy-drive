import AuthLayout from "@/components/layouts/AuthLayout";
import { ForgotPasswordForm } from "@/features/auth";

export default function Page() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
