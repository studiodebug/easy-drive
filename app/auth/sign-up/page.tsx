import AuthLayout from "@/components/layouts/AuthLayout";
import { SignUpForm } from "@/features/auth";

export default function Page() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
