// src/lib/server/mdx.ts
import { Frontmatter } from "@/types/mdx";
import fs from "fs";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ──────────────────────────────── helpers ──────────────────────────────── */

/** Return the absolute path for a given slug (.mdx) */
const mdxPath = (slug: string) => path.join(CONTENT_DIR, `${slug}.mdx`);

/** Read an .mdx file; return undefined if it does not exist */
const readMdx = (slug: string): string | undefined => {
  const filePath = mdxPath(slug);
  return fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : undefined;
};

/** Type‑guard to filter out undefined values */
const isPostInfo = (
  value: (Frontmatter & { slug: string }) | undefined,
): value is Frontmatter & { slug: string } => value !== undefined;

/* ────────────────────────────── public API ─────────────────────────────── */

/** Get raw mdx source for a single slug (async) */
export const getPostSource = async (
  slug: string,
): Promise<string | undefined> => readMdx(slug);

/** Get front‑matter for one post */
export const getPostInfo = (
  slug: string,
): (Frontmatter & { slug: string }) | undefined => {
  const source = readMdx(slug);
  if (!source) return undefined;

  const { frontmatter } = getFrontmatter<Frontmatter>(source);
  return {
    ...frontmatter,
    slug: path.basename(slug, ".mdx"),
  };
};

/** List all slugs inside a directory (e.g. "es" or "en") */
export const listSlugs = (dir = ""): string[] => {
  const targetDir = path.join(CONTENT_DIR, dir);

  if (!fs.existsSync(targetDir)) {
    return [];
  }

  return fs
    .readdirSync(targetDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.posix.join(dir, path.basename(f, ".mdx")));
};

/** Get front‑matter for every post under `dir` */
export const getPostsInfo = (dir = ""): (Frontmatter & { slug: string })[] => {
  const slugs = listSlugs(dir);
  return slugs.map(getPostInfo).filter(isPostInfo);
};

/** Get posts sorted by publish date (newest first) */
export const getRecentPosts = (
  dir = "",
  limit?: number,
): (Frontmatter & { slug: string })[] => {
  const posts = getPostsInfo(dir);

  const sorted = posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return limit ? sorted.slice(0, limit) : sorted;
};

/** Get posts by topic */
export const getPostsByTopic = (
  topicSlug: string,
  dir = "",
): (Frontmatter & { slug: string })[] => {
  const posts = getPostsInfo(dir);

  return posts.filter((post) =>
    post.topics?.some((topic) => topic.slug === topicSlug),
  );
};

/** Get all unique topics from posts */
export const getAllTopics = (
  dir = "",
): { name: string; slug: string; count: number }[] => {
  const posts = getPostsInfo(dir);
  const topicCounts = new Map<string, { name: string; count: number }>();

  posts.forEach((post) => {
    post.topics?.forEach((topic) => {
      const existing = topicCounts.get(topic.slug);
      if (existing) {
        existing.count += 1;
      } else {
        topicCounts.set(topic.slug, { name: topic.name, count: 1 });
      }
    });
  });

  return Array.from(topicCounts.entries())
    .map(([slug, { name, count }]) => ({
      slug,
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};
