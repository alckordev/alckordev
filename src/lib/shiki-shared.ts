import { Fragment, JSX } from "react";
import { BundledLanguage, codeToHast } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsx, jsxs } from "react/jsx-runtime";

export async function highlight(
  code: string,
  lang: BundledLanguage,
): Promise<JSX.Element> {
  const out = await codeToHast(code.trim(), {
    lang,
    themes: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}
