"use client";

import { FormEvent } from "react";
import { site } from "@/lib/content";

// No backend: opens the visitor's mail client with the note pre-filled.
// Swap for a form service (Formspree, Resend route handler, etc.) if you want submissions stored.
export default function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Portfolio note from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-title">
        Send a <em>note</em>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="field">
        <label htmlFor="message">The question</label>
        <textarea id="message" name="message" rows={4} placeholder="What does the data need to answer?" required />
      </div>
      <button type="submit" className="btn btn-pink">Send it</button>
    </form>
  );
}
