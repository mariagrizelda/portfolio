import type { Metadata } from "next";
import Link from "next/link";
import Slot from "@/components/Slot";
import { projects, slugify } from "@/lib/content";

export const metadata: Metadata = { title: "Case files" };

export default function Work() {
  return (
    <section className="section">
      <div className="eyebrow">The archive</div>
      <h1 className="display page-h1">
        Case <em>files</em>
      </h1>
      <p className="lede" style={{ maxWidth: "52ch" }}>
        Selected projects across machine learning, web development, and business analysis.
      </p>
      <div className="case-list">
        {projects.map((p) => (
          <Link key={p.title} href={`/work/${slugify(p.title)}`} className="card case" data-reveal>
            <Slot label={p.slot} note="1280 × 800" src={p.image} alt={p.title} />
            <div className="case-body">
              <div className="kicker">{p.kicker}</div>
              <h2 className="case-title" style={{ margin: 0, fontWeight: 400 }}>{p.title}</h2>
              <div className="case-blurb">{p.blurb}</div>
              <div className="case-result">{p.result}</div>
              <div className="chips">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
