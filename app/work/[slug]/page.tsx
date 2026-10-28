import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects, slugify } from "@/lib/content";

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
          {project.details && (
            <div className="detail-copy">
              {project.details.map((paragraph, i) => (
                <p key={i} className="case-blurb">{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
