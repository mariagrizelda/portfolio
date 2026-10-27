import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { links } from "@/lib/content";

export const metadata: Metadata = { title: "Correspondence" };

export default function Contact() {
  return (
    <section className="contact">
      <div className="split">
        <div>
          <div className="eyebrow">Correspondence</div>
          <h1 className="display">
            Maybe some questions <em>deserve</em> an answer.
          </h1>
          <p className="lede">
            Open to analytics roles and consulting from Q1. Happiest with a warehouse that grew faster than its
            documentation.
          </p>
          <div className="contact-links">
            {links.map((l) => (
              <div key={l.k} className="contact-link">
                <span className="label">{l.k}</span>
                <a href={l.href} className="link">{l.v}</a>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
