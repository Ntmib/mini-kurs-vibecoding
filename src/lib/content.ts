import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
}

export interface CourseMeta {
  title: string;
  description: string;
  lessons: LessonMeta[];
}

export function getCourseMeta(): CourseMeta {
  const metaPath = path.join(contentDir, "meta.json");
  const raw = fs.readFileSync(metaPath, "utf8");
  return JSON.parse(raw);
}

export function getLessonSource(slug: string): {
  source: string;
  frontmatter: Record<string, unknown>;
} {
  const filePath = path.join(contentDir, "lessons", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return { source: content, frontmatter: data };
}

export function getLessonNav(slug: string) {
  const meta = getCourseMeta();
  const idx = meta.lessons.findIndex((l) => l.slug === slug);

  return {
    prev:
      idx > 0
        ? { title: meta.lessons[idx - 1].title, href: `/lessons/${meta.lessons[idx - 1].slug}` }
        : null,
    next:
      idx < meta.lessons.length - 1
        ? { title: meta.lessons[idx + 1].title, href: `/lessons/${meta.lessons[idx + 1].slug}` }
        : null,
    current: meta.lessons[idx],
    currentIndex: idx,
    total: meta.lessons.length,
  };
}

export function getAllLessonSlugs(): string[] {
  const meta = getCourseMeta();
  return meta.lessons.map((l) => l.slug);
}
