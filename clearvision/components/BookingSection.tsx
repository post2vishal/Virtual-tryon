import BookingForm from "./BookingForm";

export default function BookingSection() {
  return (
    <section id="book" className="py-24 lg:py-32 bg-white" aria-labelledby="booking-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-teal text-sm font-medium tracking-widest uppercase mb-3">Schedule a Visit</p>
          <h2 id="booking-heading" className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
            Book an Appointment
          </h2>
          <p className="text-navy/60 max-w-md mx-auto">
            Choose your service, pick a time, and we'll take care of the rest.
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
