import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book an Appointment | ClearVision Eye Care",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal text-sm font-medium tracking-widest uppercase mb-3">Schedule a Visit</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
              Book an Appointment
            </h1>
            <p className="text-navy/60 max-w-md mx-auto">
              Choose your service, pick a time, and we'll take care of the rest.
            </p>
          </div>
          <BookingForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
