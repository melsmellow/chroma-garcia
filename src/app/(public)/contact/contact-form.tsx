"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // NOTE: /api/contact isn't built yet — this is wired for it.
      // Until then this will 404, which is caught below.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-line bg-gesso px-4 py-3 text-sm focus:border-ink";

  if (status === "sent") {
    return (
      <div className="border border-line px-6 py-10 text-center">
        <p className="font-display text-2xl">Message sent.</p>
        <p className="text-ink-soft mt-2">
          Someone from the group will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-mono-label text-xs uppercase text-ink-soft">
          Name
        </label>
        <input id="name" name="name" required className={`${inputClass} mt-2`} />
      </div>
      <div>
        <label htmlFor="email" className="font-mono-label text-xs uppercase text-ink-soft">
          Email
        </label>
        <input id="email" name="email" type="email" required className={`${inputClass} mt-2`} />
      </div>
      <div>
        <label htmlFor="message" className="font-mono-label text-xs uppercase text-ink-soft">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={`${inputClass} mt-2`} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-ink text-gesso px-6 py-3 font-mono-label text-xs uppercase hover:bg-coral transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-coral">
          The contact endpoint isn't connected yet — this form is ready to
          wire up once /api/contact exists.
        </p>
      )}
    </form>
  );
}
