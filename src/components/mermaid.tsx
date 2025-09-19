"use client";

import React, { useCallback, useEffect } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

type MermaidGraphProps = {
  graphCode: string;
};

const MermaidGraph: React.FC<MermaidGraphProps> = ({ graphCode }) => {
  const { theme } = useTheme();

  const generateStyledGraphCode = useCallback(() => {
    const styledGraphCode = graphCode;
    const linkSequence: string[] = [];

    // Assign indices to each link in the Mermaid graph
    graphCode.split("\n").forEach((line) => {
      const match = line.match(/([^\s]+)\s*-->\|([^\|]+)\|\s*([^\s]+)/);
      if (match) {
        const fromNode = match[1].replace(/\(\(.+\)\)/, ""); // Remove extra parentheses
        const label = match[2]; // This is the link label, e.g., "0a"
        const toNode = match[3].replace(/\(\(.+\)\)/, ""); // Remove extra parentheses
        const linkKey = `${fromNode}->${label}->${toNode}`;
        linkSequence.push(linkKey);
      }
    });

    return styledGraphCode;
  }, [graphCode]);

  const getGraphWithConfig = useCallback(() => {
    const config = `
    ---
      config:
        theme: '${theme === "dark" ? "dark" : "neutral"}'
    ---\n
    `;
    return config + generateStyledGraphCode();
  }, [theme, generateStyledGraphCode]);

  useEffect(() => {
    // Initialize Mermaid only on the client
    mermaid.initialize({ startOnLoad: true });
  }, []);

  useEffect(() => {
    // Cleanup any previously created SVG elements
    const container = document.querySelector(".mermaid");
    if (container) {
      container.innerHTML = "";
    }

    const renderMermaid = async () => {
      await mermaid.contentLoaded();
      // Add the graph code dynamically
      const graphContainer = document.querySelector(".mermaid");
      if (graphContainer) {
        graphContainer.innerHTML = `<div class="mermaid">${getGraphWithConfig()}</div>`;
        mermaid.initialize({ startOnLoad: true });
        mermaid.contentLoaded();
      }
    };
    renderMermaid();
  }, [getGraphWithConfig]);

  return <div key={graphCode} className="mermaid" />;
};

export { MermaidGraph };
