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
            Looking for internships and graduate roles in data, product management, finance or supply chain. Happy to
            talk about a role, a project, or anything in the case files.
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
