import Header from "@/components/blocks/Header/Header";
import Footer from "@/components/blocks/Footer/Footer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex-1 w-full flex flex-col gap-4 items-center">
        <div className="w-full flex-1 flex flex-col gap-4 p-5 max-w-7xl">
          {children}
        </div>

      <Footer />
      </div>
    </main>
  );
}
