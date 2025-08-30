// src/lib/mdx-components.tsx
import { MDXComponents } from "next-mdx-remote-client/rsc";
import { CodeBlock } from "@/components/code-block";
import { highlight } from "@/lib/shiki-shared";
import { RiDoubleQuotesL, RiExternalLinkLine } from "@remixicon/react";
import Link from "next/link";
import { BundledLanguage } from "shiki/bundle/web";

export const components: MDXComponents = {
  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    const isAnchor = href?.startsWith("#");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent decoration-accent/50 hover:decoration-accent inline-flex items-center gap-1 underline underline-offset-2 transition-colors"
          {...props}
        >
          {children}
          <RiExternalLinkLine className="h-3 w-3" />
        </a>
      );
    }

    if (isAnchor) {
      return (
        <a
          href={href}
          className="text-accent decoration-accent/50 hover:decoration-accent underline underline-offset-2 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href || "#"}
        className="text-accent decoration-accent/50 hover:decoration-accent underline underline-offset-2 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Headings with anchor links
  h1: ({ children, id, ...props }) => (
    <h1
      id={id}
      className="group text-foreground relative mt-10 mb-6 scroll-mt-24 text-3xl font-bold tracking-tight first:mt-0 md:text-4xl"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-6 flex h-full w-6 items-center opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to this section"
        >
          <span className="text-muted-foreground hover:text-accent">#</span>
        </a>
      )}
      {children}
    </h1>
  ),

  h2: ({ children, id, ...props }) => (
    <h2
      id={id}
      className="group text-foreground relative mt-8 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight md:text-3xl"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-6 flex h-full w-6 items-center opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to this section"
        >
          <span className="text-muted-foreground hover:text-accent">#</span>
        </a>
      )}
      {children}
    </h2>
  ),

  h3: ({ children, id, ...props }) => (
    <h3
      id={id}
      className="group text-foreground relative mt-6 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight md:text-2xl"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-5 flex h-full w-5 items-center opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to this section"
        >
          <span className="text-muted-foreground hover:text-accent text-sm">
            #
          </span>
        </a>
      )}
      {children}
    </h3>
  ),

  h4: ({ children, id, ...props }) => (
    <h4
      id={id}
      className="group text-foreground relative mt-5 mb-2 scroll-mt-24 text-lg font-semibold tracking-tight"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-5 flex h-full w-5 items-center opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to this section"
        >
          <span className="text-muted-foreground hover:text-accent text-sm">
            #
          </span>
        </a>
      )}
      {children}
    </h4>
  ),

  h5: ({ children, id, ...props }) => (
    <h5
      id={id}
      className="group text-foreground relative mt-4 mb-2 scroll-mt-24 text-base font-semibold tracking-tight"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-4 flex h-full w-4 items-center opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to this section"
        >
          <span className="text-muted-foreground hover:text-accent text-xs">
            #
          </span>
        </a>
      )}
      {children}
    </h5>
  ),

  h6: ({ children, id, ...props }) => (
    <h6
      id={id}
      className="group text-foreground relative mt-3 mb-2 scroll-mt-24 text-sm font-semibold tracking-tight"
      {...props}
    >
      {id && (
        <a
          href={`#${id}`}
          className="absolute top-0 -left-4 flex h-full w-4 items-center opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to this section"
        >
          <span className="text-muted-foreground hover:text-accent text-xs">
            #
          </span>
        </a>
      )}
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children, ...props }) => (
    <p
      className="text-foreground mb-4 leading-7 [&:not(:first-child)]:mt-4"
      {...props}
    >
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul
      className="text-foreground mb-4 ml-6 list-disc space-y-2 [&>li]:mt-2"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol
      className="text-foreground mb-4 ml-6 list-decimal space-y-2 [&>li]:mt-2"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-accent/50 bg-secondary/30 text-muted-foreground relative my-6 border-l-4 py-4 pr-4 pl-6 italic"
      {...props}
    >
      <RiDoubleQuotesL className="text-accent/50 absolute top-2 left-2 h-4 w-4" />
      <div className="relative">{children}</div>
    </blockquote>
  ),

  // Horizontal rule
  hr: ({ ...props }) => (
    <hr
      className="via-border my-8 h-px border-0 bg-gradient-to-r from-transparent to-transparent"
      {...props}
    />
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="border-border/50 w-full border-collapse border text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-secondary/30" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,

  tr: ({ children, ...props }) => (
    <tr
      className="border-border/50 hover:bg-secondary/20 border-b transition-colors"
      {...props}
    >
      {children}
    </tr>
  ),

  th: ({ children, ...props }) => (
    <th
      className="border-border/50 text-foreground border px-4 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      className="border-border/50 text-foreground border px-4 py-2"
      {...props}
    >
      {children}
    </td>
  ),

  // Code blocks and inline code - UPDATED for server-side rendering
  pre: ({ children, ...props }) => (
    <div className="not-prose" {...props}>
      {children}
    </div>
  ),

  code: async ({ children, className, ...props }) => {
    // Extract language from className (format: language-js, language-typescript, etc.)
    const language = className?.replace(/language-/, "") as BundledLanguage;

    // If it's a code block (has language), pre-render with Shiki
    if (language && typeof children === "string") {
      const initial = await highlight(children, language);
      return (
        <CodeBlock lang={language} initial={initial}>
          {children}
        </CodeBlock>
      );
    }

    // Otherwise, it's inline code
    return (
      <code
        className="border-border/50 bg-secondary/50 text-foreground relative rounded-md border px-2 py-1 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="text-foreground font-semibold" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }) => (
    <em className="text-foreground italic" {...props}>
      {children}
    </em>
  ),

  // Images
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      className="border-border/50 bg-secondary/20 my-6 rounded-lg border shadow-sm transition-shadow hover:shadow-md"
      {...props}
    />
  ),
};
