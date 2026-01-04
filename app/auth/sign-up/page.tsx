import AuthLayout from "@/components/layouts/AuthLayout";
import { SignUpForm } from "../_components/SignUpForm";

export default function Page() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
