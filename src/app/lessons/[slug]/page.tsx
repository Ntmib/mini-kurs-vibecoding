import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { getLessonSource, getLessonNav, getAllLessonSlugs } from "@/lib/content";
import { Callout } from "@/components/content/Callout";
import { CodeBlock } from "@/components/content/CodeBlock";
import { Quiz } from "@/components/content/Quiz";
import { Exercise, Solution } from "@/components/content/Exercise";
import { LessonNav } from "@/components/layout/LessonNav";
import { DirectionQuiz } from "@/components/content/DirectionQuiz";

const components = {
  Callout,
  Quiz,
  Exercise,
  Solution,
  DirectionQuiz,
  pre: CodeBlock,
};

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nav = getLessonNav(slug);
  if (!nav.current) return {};
  return {
    title: `${nav.current.title} — Мини-курс Вайбкодинг`,
    description: nav.current.description,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let lessonData;
  try {
    lessonData = getLessonSource(slug);
  } catch {
    notFound();
  }

  const nav = getLessonNav(slug);

  const { content } = await compileMDX({
    source: lessonData.source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px 60px" }}>
      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <div
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background: "var(--bg-accent)",
          }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${((nav.currentIndex + 1) / nav.total) * 100}%`,
              height: "100%",
              borderRadius: 2,
              background: "linear-gradient(90deg, var(--accent-blue), var(--accent-purple))",
              transition: "width 0.3s",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Урок {nav.currentIndex + 1}/{nav.total}
        </span>
      </div>

      {/* MDX Content */}
      <article className="prose">{content}</article>

      {/* Lesson navigation */}
      <LessonNav prev={nav.prev} next={nav.next} />
    </div>
  );
}
