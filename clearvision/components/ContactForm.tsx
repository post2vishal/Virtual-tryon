"use client";

import { useState } from "react";

const subjects = [
  "General Inquiry",
  "Appointment Question",
  "Insurance",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<typeof form>({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { name: "", email: "", subject: "", message: "" };
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required.";
    if (!form.subject) errs.subject = "Please select a subject.";
    if (!form.message.trim()) errs.message = "Message is required.";
    if (Object.values(errs).some(Boolean)) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = (field: keyof typeof form) =>
    `w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors bg-white text-navy ${
      errors[field] ? "border-red-400" : "border-gray-soft focus:border-teal"
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3D9EA8" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-serif text-lg font-semibold text-navy mb-2">Message Received!</p>
        <p className="text-sm text-navy/60">Thank you! We'll get back to you within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-navy mb-1.5">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Your full name"
          className={inputClass("name")}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-navy mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
          className={inputClass("email")}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-navy mb-1.5">
          Subject <span className="text-red-400">*</span>
        </label>
        <select
          id="contact-subject"
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          className={inputClass("subject")}
        >
          <option value="">Select a subject...</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-navy mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={5}
          placeholder="How can we help you?"
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full bg-teal text-white font-medium text-sm hover:bg-teal-dark transition-colors duration-200"
      >
        Send Message
      </button>
    </form>
  );
}
