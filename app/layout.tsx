import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/content";
import "./globals.css";

// Free stand-in for Neue Montreal. To use Neue Montreal later, swap this for next/font/local.
const grotesk = Host_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: { default: `${site.name} — Portfolio`, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body>
        <div className="page">
          <Header />
          <div className="plaid strip" />
          <main>{children}</main>
          <Footer />
          <Reveal />
        </div>
      </body>
    </html>
  );
}
