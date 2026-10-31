import { site } from "@/lib/content";

export default function Footer() {
  return (
    <>
      <div className="plaid strip strip-top" />
      <footer className="footer">
        <span className="footer-copy">
          © {new Date().getFullYear()} {site.name}
        </span>
      </footer>
    </>
  );
}
