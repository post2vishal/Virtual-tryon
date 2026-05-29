import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";

export const metadata = {
  title: "About | ClearVision Eye Care",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <About />
      </main>
      <Footer />
    </>
  );
}
