import { MDXComponents } from "next-mdx-remote-client/rsc";
import { CodeBlock } from "@/components/code-block";
import { highlight } from "@/lib/shiki-shared";
import Link from "next/link";
import type { BundledLanguage } from "shiki/bundle/web";
import { cn } from "./cn";
import { Blockquote } from "@/components/blockquote";
import { MermaidGraph } from "@/components/mermaid";
import { Suspense } from "react";

function CodeSkeleton() {
  return (
    <div className="my-6 animate-pulse rounded-lg bg-neutral-200 p-4 [.dark_&]:bg-neutral-800">
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
        <div className="h-4 w-1/2 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
        <div className="h-4 w-5/6 rounded bg-neutral-300 [.dark_&]:bg-neutral-700" />
      </div>
    </div>
  );
}

async function LazyCodeBlock({
  language,
  code,
}: {
  language: BundledLanguage;
  code: string;
}) {
  const highlightedCode = await highlight(code, language);

  return (
    <CodeBlock lang={language} initial={highlightedCode}>
      {code}
    </CodeBlock>
  );
}

export const components: MDXComponents = {
  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-500 decoration-accent-500/50 hover:decoration-accent-500 underline underline-offset-2 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href || "#"}
        className="text-accent-500 decoration-accent-500/50 hover:decoration-accent-500 underline underline-offset-2 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Headings
  h1: ({ children, id, ...props }) => (
    <h1
      id={id}
      className="group relative mt-10 mb-6 scroll-mt-24 text-3xl font-bold tracking-tight first:mt-0 md:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, id, ...props }) => (
    <h2
      id={id}
      className="group relative mt-8 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, id, ...props }) => (
    <h3
      id={id}
      className="group relative mt-6 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight md:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),

  h4: ({ children, id, ...props }) => (
    <h4
      id={id}
      className="group relative mt-5 mb-2 scroll-mt-24 text-lg font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h4>
  ),

  h5: ({ children, id, ...props }) => (
    <h5
      id={id}
      className="group relative mt-4 mb-2 scroll-mt-24 text-base font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h5>
  ),

  h6: ({ children, id, ...props }) => (
    <h6
      id={id}
      className="group relative mt-3 mb-2 scroll-mt-24 text-sm font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children, ...props }) => (
    <p className="mb-6 leading-normal [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="mb-6 space-y-2 [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mb-6 space-y-2 [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="flex items-start gap-x-2 leading-normal" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-accent-500 my-1 h-4 w-4"
      >
        <path d="M16.52 6a2 2 0 0 1 1.561 .75l3.7 4.625a1 1 0 0 1 0 1.25l-3.7 4.624a2 2 0 0 1 -1.561 .751h-10.52a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3z" />
      </svg>
      <span className="flex-1">{children}</span>
    </li>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <Blockquote {...props}>
      {/* <RiDoubleQuotesL className="text-accent/50 absolute top-2 left-2 h-4 w-4" /> */}
      {children}
    </Blockquote>
  ),

  // Horizontal rule
  hr: ({ ...props }) => (
    <hr
      className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent"
      {...props}
    />
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse border border-neutral-500/50 text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-neutral-500/10" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,

  tr: ({ children, ...props }) => (
    <tr
      className="border-b border-neutral-500/50 transition-colors hover:bg-neutral-500/5"
      {...props}
    >
      {children}
    </tr>
  ),

  th: ({ children, ...props }) => (
    <th
      className="border border-neutral-500/10 px-4 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="border border-neutral-500/10 px-4 py-2" {...props}>
      {children}
    </td>
  ),

  // Code blocks and inline code
  pre: ({ children, ...props }) => (
    <div className="not-prose" {...props}>
      {children}
    </div>
  ),

  code: ({ children, className, ...props }) => {
    const language = className?.replace(/language-/, "") as string;

    if (language && typeof children === "string") {
      if (language === "mermaid") {
        return (
          <Suspense fallback={<CodeSkeleton />}>
            <MermaidGraph graphCode={children} />
          </Suspense>
        );
      } else {
        return (
          <Suspense fallback={<CodeSkeleton />}>
            <LazyCodeBlock
              language={language as BundledLanguage}
              code={children}
            />
          </Suspense>
        );
      }
    }

    return (
      <code
        className={cn(
          "relative inline-block rounded-md border px-1.5 font-mono text-sm font-medium transition-all duration-200",
          "bg-accent-500/10 text-accent-500 border-accent-500/30",
        )}
        {...props}
      >
        {children}
      </code>
    );
  },

  // Strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),

  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};
