import AuthLayout from "@/components/layouts/AuthLayout";
import { UpdatePasswordForm } from "@/features/auth";

export default function Page() {
  return (
    <AuthLayout>
      <UpdatePasswordForm />
    </AuthLayout>
  );
}
