import { Loader } from "@/components/retroui/Loader";

export default function ProfileLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader size="lg" />
    </div>
  );
}
