import type { Metadata } from "next";
import Slot from "@/components/Slot";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Case files" };

export default function Work() {
  return (
    <section className="section">
      <div className="eyebrow">The archive</div>
      <h1 className="display page-h1">
        Case <em>files</em>
      </h1>
      <p className="lede" style={{ maxWidth: "52ch" }}>
        Four analyses that changed a decision. Every one started as a question somebody asked in the wrong meeting.
      </p>
      <div className="case-list">
        {projects.map((p) => (
          <article key={p.title} className="card case">
            <Slot label={p.slot} note="1280 × 800" />
            <div className="case-body">
              <div className="case-meta">
                <div className="kicker">{p.kicker}</div>
                <div className="case-year">{p.year}</div>
              </div>
              <h2 className="case-title" style={{ margin: 0, fontWeight: 400 }}>{p.title}</h2>
              <div className="case-blurb">{p.blurb}</div>
              <div className="case-result">{p.result}</div>
              <div className="chips">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
