"use client";

import { useState } from "react";
import { RiFileCopyLine, RiCheckLine } from "@remixicon/react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-md opacity-0 transition-all group-hover:opacity-100"
      title={copied ? "Copied!" : "Copy code"}
      type="button"
    >
      {copied ? (
        <RiCheckLine className="h-4 w-4 text-green-500" />
      ) : (
        <RiFileCopyLine className="h-4 w-4" />
      )}
    </button>
  );
}
