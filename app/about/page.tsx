import type { Metadata } from "next";
import Slot from "@/components/Slot";
import { facts, jobs } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <section className="section split" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))" }}>
      <div>
        <Slot label="Portrait" note="900 × 1200" className="about-portrait" />
        <div className="jobs">
          {jobs.map((j) => (
            <div key={j.role} className="job">
              <div className="job-head">
                <span className="job-role">{j.role}</span>
                <span className="job-years">{j.years}</span>
              </div>
              <div className="job-detail">{j.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="eyebrow">About the author</div>
        <h1 className="display about-h1">
          Every dataset is a <em>relationship</em>. Mine are healthier than average.
        </h1>
        <p className="bio">
          Placeholder bio, paragraph one. How you got into data, the domain you know best, and the kind of question you
          like being handed. Two or three sentences is plenty.
        </p>
        <p className="bio">
          Paragraph two: how you work with stakeholders, what you do when the data disagrees with the ask, and one
          genuinely human detail. Under 120 words total.
        </p>
        <figure className="card quote" style={{ marginInline: 0, marginBottom: 0 }}>
          <p>&ldquo;She found the error in our revenue reporting that four people had already signed off on.&rdquo;</p>
          <figcaption className="label">Placeholder quote — former manager</figcaption>
        </figure>
        <div className="facts">
          {facts.map((f) => (
            <div key={f.k} className="fact">
              <div className="label">{f.k}</div>
              <div className="fact-v">{f.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
