import Link from "next/link";
import Marquee from "@/components/Marquee";
import Slot from "@/components/Slot";
import TiltPortrait from "@/components/TiltPortrait";
import { cv, education, featured, interests, principles, ribbon, site, slugify } from "@/lib/content";

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="ribbon ribbon-a" />
        <div className="ribbon ribbon-b" />
        <div className="hero-frame">
          <div className="hero-copy">
            <div className="hero-eyebrow">Portfolio · {new Date().getFullYear()}</div>
            <p className="display hero-title">
              Hi, I&apos;m <em>Maria Helga</em>.
            </p>
            <p className="hero-sub">Computer Science Fresh Graduate </p>
            <div className="hero-pills-label">Interested in</div>
            <ul className="hero-pills" aria-label="Interests">
              {interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <a href="#about" className="hero-scroll">
              More about me <span aria-hidden>↓</span>
            </a>
          </div>
          <div className="hero-visual">
            <TiltPortrait>
              <span className="tape" aria-hidden />
              <Slot label="Author portrait" src="/portrait.jpg" alt={site.name} />
              <div className="portrait-deco" aria-hidden>
                <span className="deco-line" />
                <span className="deco-stars">✦ ✦ ✦</span>
                <span className="deco-line" />
              </div>
            </TiltPortrait>
            <span className="sticker sticker-a">✦ Open to internships</span>
            <span className="sticker sticker-b">Denpasar / Jakarta</span>
            <span className="sticker sticker-c">UI × UQ</span>
          </div>
        </div>
      </div>

      <section id="about" className="intro">
        <div data-reveal>
          <div className="eyebrow">Volume 06 · Issue 1 · About the author</div>
          <h1 className="display">
            Hungry for experience and ready to <em className="accent">dive in</em>. What&apos;s the first task?
          </h1>
          <p className="lede">
            I like exploring things, and I&apos;m comfortable being a beginner, which makes me quick to pick up whatever
            is new.
          </p>
          <p className="lede">
            I like people as much as problems: I listen first, then explain things in whatever way makes sense to the
            person in front of me. Studying across two countries taught me to adapt quickly and to explain things to
            people who don&apos;t share my background.
          </p>
          <div className="actions">
            <a href={cv} download className="btn btn-pink">↓ Download CV</a>
            <Link href="/work" className="btn btn-ghost">Read the case files</Link>
          </div>
        </div>
        <div className="intro-side" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <div className="kicker">Education · Double degree</div>
          <div className="jobs">
            {education.map((e) => (
              <div key={e.degree} className="job">
                <div className="job-head">
                  <span className="job-role">{e.degree}</span>
                  <span className="job-years">{e.years}</span>
                </div>
                <div className="job-detail">
                  <em>{e.school}</em> · {e.location}
                </div>
              </div>
            ))}
          </div>
          <div className="kicker principles-head">How I work</div>
          <ol className="principles">
            {principles.map((p, i) => (
              <li key={p.title} className="principle">
                <span className="principle-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="principle-body">
                  <span className="principle-title">{p.title}</span>
                  <span className="principle-text">{p.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Marquee words={ribbon} />

      <section className="section">
        <div className="section-head" data-reveal>
          <h2 className="display">
            Featured <em className="accent">projects</em>
          </h2>
          <Link href="/work" className="text-btn">All case files →</Link>
        </div>
        <div className="feature-grid">
          {featured.map((p, i) => (
            <Link
              key={p.title}
              href={`/work/${slugify(p.title)}`}
              className="card feature"
              data-reveal
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
            >
              <Slot label={p.slot} src={p.image} alt={p.title} />
              <div className="feature-body">
                <div className="kicker">{p.kicker}</div>
                <div className="feature-title">{p.title}</div>
                <div className="feature-blurb">{p.blurb}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}
