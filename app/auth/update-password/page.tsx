import AuthLayout from "@/components/layouts/AuthLayout";
import { UpdatePasswordForm } from "../_components/UpdatePasswordForm";

export default function Page() {
  return (
    <AuthLayout>
      <UpdatePasswordForm />
    </AuthLayout>
  );
}
