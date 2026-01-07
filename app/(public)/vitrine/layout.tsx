import Header from "@/components/blocks/Header/Header";
import Footer from "@/components/blocks/Footer/Footer";

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full flex flex-col">
        {children}
      </div>
      <Footer />
    </main>
  );
}
