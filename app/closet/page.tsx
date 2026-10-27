import type { Metadata } from "next";
import Slot from "@/components/Slot";
import { skills, stackGroups } from "@/lib/content";

export const metadata: Metadata = { title: "The closet" };

export default function Closet() {
  return (
    <section className="section split">
      <div>
        <div className="eyebrow">Everything in rotation</div>
        <h1 className="display page-h1" style={{ fontSize: "clamp(28px,4.4vw,50px)" }}>
          The <em>closet</em>
        </h1>
        <p className="lede" style={{ maxWidth: "44ch" }}>
          A wardrobe is only as good as what you actually wear. These are the pieces I reach for weekly — the rest is
          in storage.
        </p>
        <div className="skill-list">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="skill-row">
                <span className="skill-name">{s.name}</span>
                <span className="skill-note">{s.note}</span>
              </div>
              <div className="bar" role="meter" aria-label={s.name} aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100}>
                <div style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="stack">
        {stackGroups.map((g) => (
          <div key={g.name} className="card stack-card">
            <div className="kicker">{g.name}</div>
            <div className="chips">
              {g.items.map((it) => (
                <span key={it} className="pill">{it}</span>
              ))}
            </div>
          </div>
        ))}
        <Slot label="Query screenshot" note="a piece of SQL you're proud of" />
      </div>
    </section>
  );
}
