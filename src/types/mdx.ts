export type Topic = {
  name: string;
  slug: string;
};

export type Frontmatter = {
  title: string;
  abstract: string;
  publishedAt: string;
  topics?: Topic[];
  featured?: boolean;
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
