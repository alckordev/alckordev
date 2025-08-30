"use client";

import { JSX, useLayoutEffect, useState } from "react";
import { BundledLanguage } from "shiki/bundle/web";
import { highlight } from "@/lib/shiki-shared";
import { CopyButton } from "./copy-button";

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

  useLayoutEffect(() => {
    if (!initial) {
      highlight(code, lang)
        .then(setNodes)
        .finally(() => setIsLoading(false));
    }
  }, [code, lang, initial]);

  if (isLoading) {
    return (
      <div className="group border-border/50 bg-card/30 relative my-6 overflow-hidden rounded-lg border">
        <div className="flex items-center justify-center p-8">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <div className="border-accent h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            <span>Highlighting code...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group border-border/50 bg-card/30 relative my-6 overflow-hidden rounded-lg border">
      {/* Header with title and copy button */}
      {(title || lang) && (
        <div className="border-border/30 bg-secondary/20 flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-foreground text-sm font-medium">
                {title}
              </span>
            )}
            {!title && lang && (
              <span className="text-muted-foreground font-mono text-xs uppercase">
                {lang}
              </span>
            )}
          </div>
          <CopyButton text={code} />
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        {!title && !lang && (
          <div className="absolute top-2 right-2 z-10">
            <CopyButton text={code} />
          </div>
        )}

        <div className="overflow-x-auto p-4 text-sm leading-6 [&_code]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0">
          {nodes}
        </div>
      </div>
    </div>
  );
}
