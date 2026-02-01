"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { RiLoaderLine } from "@remixicon/react";

type MermaidGraphProps = {
  graphCode: string;
};

// Singleton pattern to prevent multiple Mermaid initializations
/* eslint-disable @typescript-eslint/no-explicit-any */
let mermaidPromise: Promise<any> | null = null;

const getMermaid = async () => {
  if (mermaidPromise) return mermaidPromise;

  mermaidPromise = import("mermaid").then((m) => {
    return m.default;
  });

  return mermaidPromise;
};

const MermaidGraph: React.FC<MermaidGraphProps> = ({ graphCode }) => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mermaidInstance, setMermaidInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const renderKeyRef = useRef(0);

  // Lazy load Mermaid library
  useEffect(() => {
    getMermaid().then((m) => {
      setMermaidInstance(m);
      setIsLoading(false);
    });
  }, []);

  // Render diagram when Mermaid instance is ready
  useEffect(() => {
    if (!mermaidInstance || !containerRef.current || isLoading) return;

    const container = containerRef.current;
    renderKeyRef.current += 1;
    const id = `mermaid-${renderKeyRef.current}-${Date.now()}`;

    // Clear previous content
    container.innerHTML = "";

    // Custom theme aligned with design (accent blue, neutrals)
    const isDark = resolvedTheme === "dark";

    const themeVariables = isDark
      ? {
        darkMode: true,
        background: "#0a0a0a",
        primaryColor: "#171717",
        primaryTextColor: "#e5e5e5",
        primaryBorderColor: "#3b82f6",
        lineColor: "#60a5fa",
        textColor: "#a3a3a3",
        secondaryColor: "#262626",
        tertiaryColor: "#171717",
      }
      : {
        darkMode: false,
        background: "#fafafa",
        primaryColor: "#ffffff",
        primaryTextColor: "#171717",
        primaryBorderColor: "#3b82f6",
        lineColor: "#2563eb",
        textColor: "#525252",
        secondaryColor: "#eff6ff",
        tertiaryColor: "#f5f5f5",
      };

    mermaidInstance.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      themeVariables,
    });

    // Clean and normalize the code
    const cleanCode = graphCode.trim().replace(/^\n+|\n+$/g, "");

    // Render diagram using Mermaid render() API
    const renderMermaid = async () => {
      try {
        // Render diagram directly (render() validates internally)
        const { svg } = await mermaidInstance.render(id, cleanCode);
        container.innerHTML = svg;
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        container.innerHTML = `<div class="p-4 text-sm text-red-500">
          <p class="font-semibold mb-2">Error rendering diagram:</p>
          <p class="text-xs font-mono break-all">${errorMessage}</p>
          <details class="mt-2">
            <summary class="cursor-pointer text-xs">Show code</summary>
            <pre class="mt-2 text-xs bg-neutral-200 dark:bg-neutral-800 p-2 rounded overflow-auto whitespace-pre-wrap">${cleanCode}</pre>
          </details>
        </div>`;
      }
    };

    renderMermaid();

    // Cleanup function
    return () => {
      if (container && container.innerHTML) {
        container.innerHTML = "";
      }
    };
  }, [mermaidInstance, graphCode, resolvedTheme, isLoading]);

  if (isLoading) {
    return (
      <div className="my-6 flex items-center justify-center overflow-hidden rounded-lg border border-neutral-500/10 bg-neutral-100 p-8 shadow-lg [.dark_&]:bg-neutral-900 [.dark_&]:shadow-black/20">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <RiLoaderLine className="h-5 w-5 animate-spin" />
          <span>Loading diagram...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      key={`${graphCode}-${resolvedTheme}`}
      className="group my-6 overflow-hidden rounded-lg border border-neutral-500/10 bg-neutral-100 p-4 shadow-lg [.dark_&]:bg-neutral-900 [.dark_&]:shadow-black/20"
    />
  );
};

export { MermaidGraph };
