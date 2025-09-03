import { cn } from "@/lib/cn";
import {
  RiAlertLine,
  RiDoubleQuotesL,
  RiErrorWarningLine,
  RiLightbulbLine,
} from "@remixicon/react";
import React from "react";

const CALLOUT_CONFIG = {
  TIP: {
    icon: RiLightbulbLine,
    className:
      "border-blue-500/50 bg-blue-50/30 text-blue-800 [.dark_&]:bg-blue-950/30 [.dark_&]:text-blue-200",
    iconClassName: "text-blue-600 [.dark_&]:text-blue-400",
  },
  IMPORTANT: {
    icon: RiErrorWarningLine,
    className:
      "border-purple-500/50 bg-purple-50/30 text-purple-800 [.dark_&]:bg-purple-950/30 [.dark_&]:text-purple-200",
    iconClassName: "text-purple-600 [.dark_&]:text-purple-400",
  },
  NOTE: {
    icon: RiErrorWarningLine,
    className:
      "border-blue-500/50 bg-blue-50/30 text-blue-800 [.dark_&]:bg-blue-950/30 [.dark_&]:text-blue-200",
    iconClassName: "text-blue-600 [.dark_&]:text-blue-400",
  },
  WARNING: {
    icon: RiAlertLine,
    className:
      "border-yellow-500/50 bg-yellow-50/30 text-yellow-800 [.dark_&]:bg-yellow-950/30 [.dark_&]:text-yellow-200",
    iconClassName: "text-yellow-600 [.dark_&]:text-yellow-400",
  },
  CAUTION: {
    icon: RiErrorWarningLine,
    className:
      "border-orange-500/50 bg-orange-50/30 text-orange-800 [.dark_&]:bg-orange-950/30 [.dark_&]:text-orange-200",
    iconClassName: "text-orange-600 [.dark_&]:text-orange-400",
  },
} as const;

type CalloutType = keyof typeof CALLOUT_CONFIG;

const extractTextFromReactNode = (node: React.ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return node.toString();
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join("");
  }

  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props && props.children) {
      return extractTextFromReactNode(props.children);
    }
  }

  return "";
};

const parseCallout = (children: React.ReactNode) => {
  const textContent = extractTextFromReactNode(children).trim();

  const calloutMatch = textContent.match(
    /^\[!(TIP|IMPORTANT|NOTE|WARNING|CAUTION)\]\s*([\s\S]*)/i,
  );

  if (calloutMatch) {
    const [, type, content] = calloutMatch;
    return {
      isCallout: true,
      type: type.toUpperCase() as CalloutType,
      content: content.trim(),
    };
  }

  return {
    isCallout: false,
    content: children,
  };
};

const processCalloutContent = (content: string): React.ReactNode => {
  return content;
};

const processChildren = (
  children: React.ReactNode,
  calloutContent?: string,
): React.ReactNode => {
  if (calloutContent) {
    return processCalloutContent(calloutContent);
  }

  return children;
};

interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Blockquote = ({ children, ...props }: BlockquoteProps) => {
  const parsedContent = parseCallout(children);

  // console.log("Parsed content:", parsedContent);

  if (parsedContent.isCallout && parsedContent.type) {
    const config = CALLOUT_CONFIG[parsedContent.type];
    const IconComponent = config?.icon || RiErrorWarningLine;

    return (
      <div
        className={cn(
          "relative my-6 rounded-lg border-l-4 p-4",
          config?.className ||
            "border-accent-500 bg-neutral-900/10 text-neutral-950 [.dark_&]:bg-neutral-900 [.dark_&]:text-neutral-400",
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        <div className="flex items-start gap-3">
          <IconComponent
            className={`h-5 w-5 flex-shrink-0 ${
              config?.iconClassName || "text-gray-600"
            }`}
          />
          <div className="flex-1">
            <div className="mb-2 text-sm font-semibold tracking-wide uppercase">
              {parsedContent.type}
            </div>
            <div className="text-sm leading-relaxed">
              {processChildren(children, parsedContent.content)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <blockquote
      className={cn(
        "relative my-6 rounded-lg border-l-4 p-4 text-sm leading-relaxed",
        "border-accent-500/50 bg-gray-50/30 text-gray-800 [.dark_&]:bg-gray-950/30 [.dark_&]:text-gray-200",
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <RiDoubleQuotesL className="text-accent-600 h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          <div className="space-y-6 text-sm leading-relaxed [&>p]:mb-0">
            {processChildren(children)}
          </div>
        </div>
      </div>
    </blockquote>
  );
};
