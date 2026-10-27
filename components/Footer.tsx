import { links, site } from "@/lib/content";

export default function Footer() {
  const footerLinks = links.filter((l) => l.k !== "GitHub");

  return (
    <>
      <div className="plaid strip strip-top" />
      <footer className="footer">
        <span className="footer-copy">
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="footer-links">
          {footerLinks.map((l) => (
            <a key={l.k} href={l.href} className="link">
              {l.k}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
