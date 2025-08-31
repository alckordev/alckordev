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
    <div className="group border-border/50 bg-card my-6 overflow-hidden rounded-lg border shadow-lg dark:shadow-black/20">
      <div className="border-border/30 bg-secondary/50 flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="bg-accent h-2 w-2 rounded-full"></div>
          </div>
          {title && (
            <span className="text-muted-foreground text-sm">{title}</span>
          )}
          {!title && lang && (
            <span className="text-muted-foreground font-mono text-xs">
              {lang}
            </span>
          )}
        </div>
        <CopyButton text={code} />
      </div>

      <div className="bg-secondary/20 relative flex">
        <div className="bg-secondary/20 text-muted-foreground flex-shrink-0 px-3 py-4 text-right font-mono text-xs">
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

  // return (
  //   <div className="group border-accent/20 from-card/80 to-card/40 shadow-accent/5 hover:border-accent/30 hover:shadow-accent/10 relative my-6 overflow-hidden rounded-xl border bg-gradient-to-br shadow-lg backdrop-blur-sm transition-all duration-300">
  //     {(title || lang) && (
  //       <div className="border-accent/10 from-accent/5 to-accent/10 flex items-center justify-between border-b bg-gradient-to-r px-4 py-3">
  //         <div className="flex items-center gap-3">
  //           {title && (
  //             <span className="text-foreground text-sm font-semibold">
  //               {title}
  //             </span>
  //           )}
  //           {!title && lang && (
  //             <div className="flex items-center gap-2">
  //               <div className="bg-accent h-2 w-2 rounded-full"></div>
  //               <span className="text-accent font-mono text-xs font-medium uppercase">
  //                 {lang}
  //               </span>
  //             </div>
  //           )}
  //         </div>
  //         <CopyButton text={code} />
  //       </div>
  //     )}

  //     <div className="relative">
  //       {!title && !lang && (
  //         <div className="absolute top-3 right-3 z-10">
  //           <CopyButton text={code} />
  //         </div>
  //       )}

  //       <div className="overflow-x-auto p-6 text-sm leading-7 [&_code]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0">
  //         {nodes}
  //       </div>
  //     </div>

  //     <div className="from-accent/50 via-accent to-accent/50 h-1 bg-gradient-to-r"></div>
  //   </div>
  // );

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
