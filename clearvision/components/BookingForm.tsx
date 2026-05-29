"use client";

import { useState } from "react";

const services = [
  "Comprehensive Eye Exam",
  "Contact Lens Fitting",
  "Pediatric Eye Care",
  "Glaucoma Screening",
  "Dry Eye Treatment",
  "LASIK Consultation",
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

interface FormData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  newPatient: string;
  notes: string;
}

const initialForm: FormData = {
  service: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  newPatient: "yes",
  notes: "",
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-10" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              s < step
                ? "bg-teal text-white"
                : s === step
                ? "bg-navy text-white"
                : "bg-gray-soft text-navy/40"
            }`}
          >
            {s < step ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              s
            )}
          </div>
          <span className={`text-xs hidden sm:block ${s === step ? "text-navy font-medium" : "text-navy/40"}`}>
            {s === 1 ? "Schedule" : s === 2 ? "Your Info" : "Confirm"}
          </span>
          {s < 3 && <div className={`flex-1 h-px ${s < step ? "bg-teal" : "bg-gray-soft"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [confirmed, setConfirmed] = useState(false);

  const set = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateStep1 = () => {
    const e: Partial<FormData> = {};
    if (!form.service) e.service = "Please select a service.";
    if (!form.date) e.date = "Please choose a date.";
    if (!form.time) e.time = "Please select a time slot.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-soft focus:border-teal"
    } bg-white text-navy`;

  if (confirmed) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3D9EA8" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold text-navy mb-3">Appointment Confirmed!</h3>
        <p className="text-navy/60 max-w-sm mx-auto">
          We'll send a reminder to <strong>{form.email}</strong>. See you on{" "}
          <strong>{form.date}</strong> at <strong>{form.time}</strong>.
        </p>
        <button
          onClick={() => { setStep(1); setForm(initialForm); setConfirmed(false); }}
          className="mt-8 px-6 py-3 rounded-full border border-teal text-teal text-sm font-medium hover:bg-teal hover:text-white transition-colors"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <ProgressBar step={step} />

      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-navy mb-1.5">
              Service Type <span className="text-red-400">*</span>
            </label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => set("service", e.target.value)}
              className={inputClass("service")}
            >
              <option value="">Select a service...</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-navy mb-1.5">
              Preferred Date <span className="text-red-400">*</span>
            </label>
            <input
              id="date"
              type="date"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => set("date", e.target.value)}
              className={inputClass("date")}
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <p className="text-sm font-medium text-navy mb-2">
              Time Slot <span className="text-red-400">*</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => set("time", slot)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    form.time === slot
                      ? "bg-teal text-white border-teal"
                      : "border-gray-soft text-navy/70 hover:border-teal/50 hover:text-teal"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Jane Smith"
              className={inputClass("name")}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="jane@example.com"
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="(212) 555-0100"
              className={inputClass("phone")}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <p className="text-sm font-medium text-navy mb-2">New Patient?</p>
            <div className="flex gap-4">
              {["yes", "no"].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="newPatient"
                    value={val}
                    checked={form.newPatient === val}
                    onChange={() => set("newPatient", val)}
                    className="accent-teal w-4 h-4"
                  />
                  <span className="text-sm text-navy capitalize">{val === "yes" ? "Yes, first visit" : "No, returning patient"}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-navy mb-1.5">
              Additional Notes
            </label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Any concerns or special requests..."
              className="w-full px-4 py-3 rounded-lg border border-gray-soft focus:border-teal text-sm outline-none transition-colors bg-white text-navy resize-none"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <div className="bg-teal/5 border border-teal/20 rounded-xl p-6 space-y-4 mb-6">
            <h3 className="font-serif text-lg font-semibold text-navy">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-navy/40 text-xs uppercase tracking-wide mb-0.5">Service</p>
                <p className="text-navy font-medium">{form.service}</p>
              </div>
              <div>
                <p className="text-navy/40 text-xs uppercase tracking-wide mb-0.5">Date & Time</p>
                <p className="text-navy font-medium">{form.date} at {form.time}</p>
              </div>
              <div>
                <p className="text-navy/40 text-xs uppercase tracking-wide mb-0.5">Patient</p>
                <p className="text-navy font-medium">{form.name}</p>
              </div>
              <div>
                <p className="text-navy/40 text-xs uppercase tracking-wide mb-0.5">New Patient</p>
                <p className="text-navy font-medium capitalize">{form.newPatient === "yes" ? "Yes" : "No"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-navy/40 text-xs uppercase tracking-wide mb-0.5">Contact</p>
                <p className="text-navy font-medium">{form.email} · {form.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="px-6 py-3 rounded-full border border-gray-soft text-navy text-sm font-medium hover:border-navy/30 transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="px-8 py-3 rounded-full bg-teal text-white text-sm font-medium hover:bg-teal-dark transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="px-8 py-3 rounded-full bg-teal text-white text-sm font-medium hover:bg-teal-dark transition-colors"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}
