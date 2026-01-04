import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { ForgotPasswordForm } from "../_components/ForgotPasswordForm";

export default function Page() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
