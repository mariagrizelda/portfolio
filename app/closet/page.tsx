import type { Metadata } from "next";
import SkillTabs from "@/components/SkillTabs";

export const metadata: Metadata = { title: "The skill set" };

export default function Closet() {
  return (
    <section className="section">
      <div className="eyebrow">What I work with</div>
      <h1 className="display page-h1" style={{ fontSize: "clamp(28px,4.4vw,50px)" }}>
        The <em>skill set</em>
      </h1>
      <div data-reveal>
        <SkillTabs />
      </div>
    </section>
  );
}
