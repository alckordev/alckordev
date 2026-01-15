"use client";

import { JSX, useLayoutEffect, useState } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
import { highlight } from "@/lib/shiki-shared";
import { CopyButton } from "./copy-button";
import { RiLoaderLine } from "@remixicon/react";

interface CodeBlockProps {
  children: string;
  lang: BundledLanguage;
  title?: string;
  initial?: JSX.Element;
}

export function CodeBlock({ children, lang, title, initial }: CodeBlockProps) {
  const [nodes, setNodes] = useState<JSX.Element | undefined>(initial);
  const [isLoading, setIsLoading] = useState(!initial);

  const code = children.trim();
  const lines = code.split("\n");

  useLayoutEffect(() => {
    if (!initial) {
      highlight(code, lang)
        .then(setNodes)
        .finally(() => setIsLoading(false));
    }
  }, [code, lang, initial]);

  if (isLoading) {
    return (
      <div className="group my-6 overflow-hidden rounded-lg border border-neutral-500/10 bg-neutral-100 shadow-lg [.dark_&]:bg-neutral-900 [.dark_&]:shadow-black/20">
        <div className="flex items-center justify-center border-neutral-500/10 bg-neutral-100/10 p-8 [.dark_&]:bg-neutral-900/10">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <RiLoaderLine className="h-5 w-5 animate-spin" />
            <span>Highlighting code...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group my-6 overflow-hidden rounded-lg border border-neutral-500/10 bg-neutral-100 shadow-lg [.dark_&]:bg-neutral-900 [.dark_&]:shadow-black/20">
      <div className="flex items-center justify-between border-b border-neutral-500/10 bg-neutral-100/10 px-4 py-2 [.dark_&]:bg-neutral-900/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="bg-accent-500 h-2 w-2 animate-pulse rounded-full"></div>
          </div>
          {title && <span className="text-sm text-neutral-500">{title}</span>}
          {!title && lang && (
            <span className="font-mono text-xs text-neutral-500">{lang}</span>
          )}
        </div>
        <CopyButton text={code} />
      </div>

      <div className="relative flex bg-neutral-100/20 [.dark_&]:bg-neutral-950/20">
        <div className="flex-shrink-0 bg-neutral-100/20 px-3 py-4 text-right font-mono text-xs text-neutral-500 [.dark_&]:bg-neutral-950/20">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto p-4 text-sm leading-6 [&_code]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0">
          {nodes}
        </div>
      </div>
    </div>
  );
}
