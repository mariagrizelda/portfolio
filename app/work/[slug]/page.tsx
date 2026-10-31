import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, slugify, type Block } from "@/lib/content";

function SectionBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "subheading":
      return <h3 className="detail-h3">{block.text}</h3>;
    case "paragraph":
      return <p className="case-blurb">{block.text}</p>;
    case "list":
      return (
        <ul className="detail-list case-blurb">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="detail-code">
          <code>{block.text}</code>
        </pre>
      );
    case "image":
      return (
        <figure className="detail-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "table":
      return (
        <figure className="detail-figure">
          <div className="detail-table-wrap">
            <table className="detail-table">
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? project.title : "Case file" };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <section className="section">
      <Link href="/work" className="text-btn">← All case files</Link>
      <article className="detail">
        <div className="detail-body">
          <div className="case-meta">
            <div className="kicker">{project.kicker}</div>
            <div className="case-year">{project.year}</div>
          </div>
          <h1 className="display page-h1">{project.title}</h1>
          <div className="case-blurb">{project.blurb}</div>
          <div className="case-result">{project.result}</div>
          <div className="chips">
            {project.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          {project.links && (
            <div className="detail-links">
              {project.links.map((l) =>
                l.download ? (
                  <a key={l.href} href={l.href} download className="text-btn">
                    ↓ {l.label}
                  </a>
                ) : (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-btn">
                    ↗ {l.label}
                  </a>
                )
              )}
            </div>
          )}
          {project.details && (
            <div className="detail-copy">
              {project.details.map((paragraph, i) => (
                <p key={i} className="case-blurb">{paragraph}</p>
              ))}
            </div>
          )}
          {project.sections && (
            <div className="detail-sections">
              {project.sections.map((section) => (
                <section key={section.title} className="detail-section">
                  <h2 className="detail-h2">{section.title}</h2>
                  {section.blocks.map((block, i) => (
                    <SectionBlock key={i} block={block} />
                  ))}
                </section>
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
