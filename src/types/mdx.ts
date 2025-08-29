export type Topic = {
  name: string;
  slug: string;
};

export type Frontmatter = {
  slug?: string;
  title: string;
  abstract: string;
  publishedAt: string;
  topics?: Topic[];
  featured?: boolean;
  readingTime?: number;
};

export type Toc = {
  value: string;
  href: string;
  depth: number;
  numbering: number[];
  parent: string;
};

export type Scope = {
  reading: number;
  toc?: Toc;
  // [key: string]: unknown;
};
