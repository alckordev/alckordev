import { Frontmatter } from "@/types/mdx";
import fs from "fs/promises";
import fsSync from "fs";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import path from "path";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ──────────────────────────────── helpers ──────────────────────────────── */

const mdxPath = (slug: string) => path.join(CONTENT_DIR, `${slug}.mdx`);

const readMdxAsync = async (slug: string): Promise<string | undefined> => {
  const filePath = mdxPath(slug);
  try {
    await fs.access(filePath);
    return await fs.readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
};

const readMdxSync = (slug: string): string | undefined => {
  const filePath = mdxPath(slug);
  return fsSync.existsSync(filePath)
    ? fsSync.readFileSync(filePath, "utf8")
    : undefined;
};

const isPostInfo = (value: Frontmatter | undefined): value is Frontmatter =>
  value !== undefined;

/* ────────────────────────────── public API ─────────────────────────────── */

export const getPostSource = async (
  slug: string,
): Promise<string | undefined> => readMdxAsync(slug);

const slugsCache = new Map<string, { slugs: string[]; timestamp: number }>();
const frontmatterCache = new Map<
  string,
  {
    data: Frontmatter;
    timestamp: number;
  }
>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos
const FRONTMATTER_CACHE_TTL = 10 * 60 * 1000; // 10 minutos

export const listSlugs = (dir = ""): string[] => {
  const cacheKey = dir;
  const cached = slugsCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.slugs;
  }

  const targetDir = path.join(CONTENT_DIR, dir);

  if (!fsSync.existsSync(targetDir)) {
    return [];
  }

  const slugs = fsSync
    .readdirSync(targetDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.posix.join(dir, path.basename(f, ".mdx")));

  slugsCache.set(cacheKey, { slugs, timestamp: Date.now() });
  return slugs;
};

export const getPostInfo = (slug: string): Frontmatter | undefined => {
  // Verificar caché de frontmatter
  const cached = frontmatterCache.get(slug);
  if (cached && Date.now() - cached.timestamp < FRONTMATTER_CACHE_TTL) {
    return cached.data;
  }

  const source = readMdxSync(slug);
  if (!source) return undefined;

  const { frontmatter } = getFrontmatter<Frontmatter>(source);
  const data = {
    ...frontmatter,
    slug: path.basename(slug, ".mdx"),
    readingTime: readingTime(source).minutes,
  };

  // Guardar en caché
  frontmatterCache.set(slug, { data, timestamp: Date.now() });
  return data;
};

export const getPostsInfo = (dir = ""): Frontmatter[] => {
  const slugs = listSlugs(dir);
  return slugs.map(getPostInfo).filter(isPostInfo);
};

export const getRecentPosts = (dir = "", limit?: number): Frontmatter[] => {
  const posts = getPostsInfo(dir);

  const sorted = posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return limit ? sorted.slice(0, limit) : sorted;
};

export const getPostsByTopic = (topicSlug: string, dir = ""): Frontmatter[] => {
  const posts = getPostsInfo(dir);

  return posts.filter((post) =>
    post.topics?.some((topic) => topic.slug === topicSlug),
  );
};

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
