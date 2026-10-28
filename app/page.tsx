import Link from "next/link";
import Slot from "@/components/Slot";
import { featured, site, slugify, stats } from "@/lib/content";

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="ribbon ribbon-a" />
        <div className="ribbon ribbon-b" />
        <div className="hero-frame">
          <div className="tag">
            <div className="tag-hole" />
            <h2 className="tag-title">
              <span className="tag-big">Data</span>
              <span className="tag-mid">and the</span>
              <span className="tag-big">City</span>
              <span className="tag-small">
                &amp; other <i>queries</i>
              </span>
            </h2>
            <div className="tag-foot">{site.name} · Analytics portfolio</div>
          </div>
        </div>
      </div>

      <section className="intro">
        <div>
          <div className="eyebrow">Volume 06 · Issue 1 · Analytics</div>
          <h1 className="display">
            I couldn&apos;t help but <em className="accent">wonder</em>… what is the data actually saying?
          </h1>
          <p className="lede">
            Six years of asking better questions of messy warehouses. SQL, Python, and dashboards dressed well
            enough that executives read them in public.
          </p>
          <div className="actions">
            <Link href="/work" className="btn btn-ink">Read the case files</Link>
            <Link href="/about" className="btn btn-ghost">About the author</Link>
          </div>
        </div>
        <div className="portrait-frame plaid-lg">
          <Slot label="Editorial portrait" note="900 × 1125 · drop your photo here" />
          <div className="pull">&ldquo;Numbers, but make it fashion.&rdquo;</div>
        </div>
      </section>

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="section-head">
          <h2 className="display">
            This season&apos;s <em className="accent">features</em>
          </h2>
          <Link href="/work" className="text-btn">All case files →</Link>
        </div>
        <div className="feature-grid">
          {featured.map((p) => (
            <Link key={p.title} href={`/work/${slugify(p.title)}`} className="card feature">
              <Slot label={p.slot} src={p.image} alt={p.title} />
              <div className="feature-body">
                <div className="kicker">{p.kicker}</div>
                <div className="feature-title">{p.title}</div>
                <div className="feature-blurb">{p.teaser}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
