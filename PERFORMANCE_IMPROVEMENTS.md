# 🚀 Análisis de Performance y Optimizaciones

## 📊 Resumen Ejecutivo

Análisis completo de optimizaciones de performance para el sitio web alckordev. Se identificaron **15 puntos de mejora críticos** que pueden mejorar significativamente el rendimiento, SEO y experiencia de usuario.

---

## 🎯 Optimizaciones Críticas

### 1. **Optimización de Next.js Config** ⚠️ ALTA PRIORIDAD

**Problema:** Falta configuración de optimización de compilación y bundle.

**Solución:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // ... existing config
  compress: true, // Habilitar compresión Gzip
  poweredByHeader: false, // Remover X-Powered-By header
  reactStrictMode: true,
  swcMinify: true, // Ya viene por defecto pero asegurarse
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remover console.logs en producción
  },
  experimental: {
    optimizeCss: true, // Optimizar CSS
  },
};
```

**Impacto:** ⚡ Reducción de bundle size ~15-20%

---

### 2. **Optimización de Imágenes SVG** ⚠️ ALTA PRIORIDAD

**Problema:**

- Logo se carga dos veces (light/dark) pero solo se muestra uno
- Imágenes SVG en footer sin optimización
- Falta `priority` para logo (above-the-fold)

**Solución:**

```typescript
// src/components/logo-brand.tsx
export const LogoBrand = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Link href="/" className={...}>
      <Image
        src={isDark ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"}
        alt="alckor.dev"
        width={125}
        height={30}
        priority // Above-the-fold
        quality={100} // SVG máximo calidad
      />
    </Link>
  );
};

// src/components/footer.tsx
<Image
  src="/assets/svg/nextjs.svg"
  alt="Next.js logo"
  width={16}
  height={16}
  loading="lazy" // Lazy load footer images
  fetchPriority="low"
  className="aspect-square object-contain"
/>
```

**Impacto:** ⚡ Mejora LCP ~200-300ms

---

### 3. **Optimización de Shiki (Code Highlighting)** ⚠️ ALTA PRIORIDAD

**Problema:**

- Se carga bundle completo de Shiki (`shiki/bundle/full`)
- Se procesa en cliente con `useLayoutEffect`
- Puede causar layout shift y slow FCP

**Solución:**

```typescript
// src/lib/shiki-shared.ts
import { codeToHast } from "shiki/core";
import { bundledLanguages, getHighlighter } from "shiki/bundle/web";

// Crear instancia singleton
let highlighter: ReturnType<typeof getHighlighter> | null = null;

export async function highlight(
  code: string,
  lang: string,
): Promise<JSX.Element> {
  if (!highlighter) {
    highlighter = await getHighlighter({
      themes: ["catppuccin-latte", "catppuccin-mocha"],
      langs: ["typescript", "javascript", "tsx", "jsx", "bash", "json", "css"], // Solo los que usas
    });
  }

  const out = codeToHast(code.trim(), {
    lang: lang as any,
    themes: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
    highlighter,
  });

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}
```

**Mejor aún:** Pre-renderizar código en el servidor:

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
// Mover el highlight al servidor, no al cliente
async function ArticleContent({ source }: { source: string }) {
  const { content } = await evaluate({
    source,
    options: {
      // ... existing options
    },
    components: {
      ...components,
      code: async (props) => {
        // Highlight en servidor, no cliente
        const highlighted = await highlight(
          props.children,
          props.className?.replace("language-", ""),
        );
        return highlighted;
      },
    },
  });
}
```

**Impacto:** ⚡ Reducción bundle ~500KB, mejora FCP ~500ms

---

### 4. **Optimización de Mermaid** ⚠️ MEDIA PRIORIDAD

**Problema:**

- Mermaid se carga completo en cliente
- Se inicializa múltiples veces innecesariamente
- No hay lazy loading

**Solución:**

```typescript
// src/components/mermaid.tsx
"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const MermaidGraph = dynamic(
  () => import("mermaid").then((m) => {
    m.default.initialize({
      startOnLoad: false, // Deshabilitar auto-start
      theme: 'default',
    });
    return m.default;
  }),
  {
    ssr: false,
    loading: () => <div>Loading diagram...</div>
  }
);

export function Mermaid({ graphCode }: { graphCode: string }) {
  const { theme, resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const render = async () => {
      await mermaid.run({
        nodes: [containerRef.current!],
        suppressErrors: true,
      });
    };

    render();
  }, [graphCode, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="mermaid my-6 overflow-hidden rounded-lg border border-neutral-500/10 bg-neutral-100 p-4 [.dark_&]:bg-neutral-900"
      data-theme={resolvedTheme === 'dark' ? 'dark' : 'default'}
    >
      {graphCode}
    </div>
  );
}
```

**Impacto:** ⚡ Reducción bundle ~200KB, carga bajo demanda

---

### 5. **Caché de MDX Processing** ⚠️ MEDIA PRIORIDAD

**Problema:**

- `getPostsInfo` se ejecuta múltiples veces
- Solo hay caché de 5 minutos para slugs
- No hay caché de frontmatter

**Solución:**

```typescript
// src/lib/server/mdx.ts
const frontmatterCache = new Map<
  string,
  {
    data: Frontmatter;
    timestamp: number;
  }
>();
const FRONTMATTER_CACHE_TTL = 10 * 60 * 1000; // 10 minutos

export const getPostInfo = (slug: string): Frontmatter | undefined => {
  const cached = frontmatterCache.get(slug);
  if (cached && Date.now() - cached.timestamp < FRONTMATTER_CACHE_TTL) {
    return cached.data;
  }

  const source = readMdxSync(slug);
  if (!source) return undefined;

  const { frontmatter } = getFrontmatter<Frontmatter>(source);
  const data = {
    ...frontmatter,
    slug: path.basename(slug, ".mdx"),
    readingTime: readingTime(source).minutes,
  };

  frontmatterCache.set(slug, { data, timestamp: Date.now() });
  return data;
};

// Limpiar caché periódicamente (opcional)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of frontmatterCache.entries()) {
      if (now - value.timestamp > FRONTMATTER_CACHE_TTL) {
        frontmatterCache.delete(key);
      }
    }
  }, 60 * 1000); // Cada minuto
}
```

**Impacto:** ⚡ Reducción tiempo de respuesta ~100-200ms

---

### 6. **API Route Caching** ⚠️ MEDIA PRIORIDAD

**Problema:**

- No hay caché explícito en API routes
- Cada request procesa todos los posts

**Solución:**

```typescript
// src/app/api/articles/route.ts
export const revalidate = 3600; // Cache por 1 hora

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "en";

  // ... existing code

  return NextResponse.json(
    {
      articles,
      totalCount: sortedPosts.length,
      currentOffset: offset,
      hasMore: endIndex < sortedPosts.length,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
```

**Impacto:** ⚡ Reducción tiempo de respuesta ~200-300ms

---

### 7. **Font Loading Optimization** ⚠️ BAJA PRIORIDAD

**Problema:**

- Fuentes no tienen `display: swap`
- Pueden causar FOIT (Flash of Invisible Text)

**Solución:**

```typescript
// src/app/[locale]/layout.tsx
const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Agregar display swap
  preload: true,
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
```

**Impacto:** ⚡ Mejora CLS, mejor FCP

---

### 8. **Sitemap Dinámico Completo** ⚠️ BAJA PRIORIDAD

**Problema:**

- Sitemap estático e incompleto
- No incluye todas las rutas de blog

**Solución:**

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getPostsInfo } from "@/lib/server/mdx";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}`]),
        ),
      },
    });
  }

  // Blog pages
  for (const locale of routing.locales) {
    const posts = getPostsInfo(`blog/${locale}`);

    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}/blog`]),
        ),
      },
    });

    // Individual blog posts
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales
              .map((l) => {
                const postInLocale = getPostsInfo(`blog/${l}`).find(
                  (p) => p.slug === post.slug,
                );
                return postInLocale
                  ? [l, `${SITE_URL}/${l}/blog/${post.slug}`]
                  : null;
              })
              .filter(Boolean) as [string, string][],
          ),
        },
      });
    }
  }

  return entries;
}
```

**Impacto:** 🔍 Mejora SEO significativa

---

### 9. **Metadata Mejorada** ⚠️ BAJA PRIORIDAD

**Problema:**

- Falta canonical URLs
- Falta structured data (JSON-LD)

**Solución:**

```typescript
// En layout.tsx o page.tsx
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: `${process.env.SITE_URL}/${locale}`,
    languages: {
      es: `${process.env.SITE_URL}/es`,
      en: `${process.env.SITE_URL}/en`,
    },
  },
};

// Para blog posts
export async function generateMetadata({ params }) {
  // ... existing code
  return {
    // ... existing metadata
    alternates: {
      canonical: `${process.env.SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        es: `${process.env.SITE_URL}/es/blog/${slug}`,
        en: `${process.env.SITE_URL}/en/blog/${slug}`,
      },
    },
  };
}
```

**Impacto:** 🔍 Mejora SEO

---

### 10. **Component Memoization** ⚠️ BAJA PRIORIDAD

**Problema:**

- Componentes que se re-renderizan innecesariamente
- `ArticleCard` se re-renderiza en cada scroll

**Solución:**

```typescript
// src/components/article-card.tsx
import { memo } from "react";

export const ArticleCard = memo(
  function ArticleCard({ article }: ArticleCardProps) {
    // ... existing code
  },
  (prev, next) => prev.article.slug === next.article.slug,
);

// src/components/infinite-articles-list.tsx
const ArticleCardMemo = memo(ArticleCard);
```

**Impacto:** ⚡ Mejora rendimiento de scroll

---

### 11. **Bundle Analysis** ⚠️ MEDIA PRIORIDAD

**Problema:**

- No hay análisis de bundle size
- No sabemos qué está ocupando espacio

**Solución:**

```bash
# package.json
"scripts": {
  "analyze": "ANALYZE=true next build",
  // ... existing scripts
}

# Instalar @next/bundle-analyzer
npm install -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
```

**Impacto:** 📊 Visibilidad de bundle size

---

### 12. **Preload Critical Resources** ⚠️ MEDIA PRIORIDAD

**Problema:**

- No hay preload de recursos críticos
- OG image no está preloaded

**Solución:**

```typescript
// src/app/[locale]/layout.tsx
export default async function Layout({ children, params }: Props) {
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preload"
          href="/assets/og.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/logo-light.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/assets/logo-dark.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      {/* ... */}
    </html>
  );
}
```

**Impacto:** ⚡ Mejora LCP ~100-150ms

---

### 13. **Client Component Lazy Loading** ⚠️ MEDIA PRIORIDAD

**Problema:**

- Componentes pesados se cargan inmediatamente
- `InfiniteArticlesList` es client component pero podría lazy load

**Solución:**

```typescript
// src/app/[locale]/blog/page.tsx
import dynamic from 'next/dynamic';

const InfiniteArticlesList = dynamic(
  () => import('@/components/infinite-articles-list').then(m => ({ default: m.InfiniteArticlesList })),
  {
    ssr: false,
    loading: () => <div>Loading articles...</div>
  }
);
```

**Impacto:** ⚡ Mejora TTI ~200-300ms

---

### 14. **Optimización de GitHub API** ⚠️ BAJA PRIORIDAD

**Problema:**

- GitHub API se llama en cada request
- Aunque hay revalidate, podría mejorarse

**Solución:**

```typescript
// src/lib/server/github.ts
// Ya está bien, pero asegurar que el fetch cache funcione
export async function getGitHubRepositories(): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(process.env.GITHUB_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: {
          login: process.env.GITHUB_LOGIN,
          limit: parseInt(process.env.GITHUB_LIMIT || "10"),
        },
      }),
      next: {
        revalidate: 3600, // ✅ Ya está bien
        tags: ['github-repos'], // Agregar tag para revalidación manual
      },
    });
    // ... rest of code
  }
}
```

**Impacto:** ⚡ Consistencia de caché

---

### 15. **Error Boundaries** ⚠️ BAJA PRIORIDAD

**Problema:**

- No hay error boundaries
- Si Shiki o Mermaid fallan, rompe toda la página

**Solución:**

```typescript
// src/components/error-boundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

// Usar en páginas
<ErrorBoundary fallback={<CodeBlockFallback />}>
  <CodeBlock {...props} />
</ErrorBoundary>
```

**Impacto:** 🛡️ Mejor experiencia de usuario

---

## 📈 Métricas Esperadas Post-Optimización

| Métrica         | Antes (Estimado) | Después (Estimado) | Mejora |
| --------------- | ---------------- | ------------------ | ------ |
| **LCP**         | ~2.5s            | ~1.8s              | ⬇️ 28% |
| **FID**         | ~50ms            | ~30ms              | ⬇️ 40% |
| **CLS**         | ~0.05            | ~0.02              | ⬇️ 60% |
| **Bundle Size** | ~500KB           | ~350KB             | ⬇️ 30% |
| **First Byte**  | ~200ms           | ~150ms             | ⬇️ 25% |

---

## 🎯 Priorización de Implementación

### Fase 1 - Impacto Inmediato (1-2 días)

1. ✅ Optimización Next.js Config
2. ✅ Optimización de Imágenes SVG
3. ✅ Preload Critical Resources

### Fase 2 - Mejoras Significativas (3-5 días)

4. ✅ Optimización de Shiki
5. ✅ Caché de MDX Processing
6. ✅ API Route Caching
7. ✅ Bundle Analysis

### Fase 3 - Refinamiento (1 semana)

8. ✅ Optimización de Mermaid
9. ✅ Client Component Lazy Loading
10. ✅ Font Loading Optimization

### Fase 4 - SEO y Estabilidad (1 semana)

11. ✅ Sitemap Dinámico Completo
12. ✅ Metadata Mejorada
13. ✅ Error Boundaries

### Fase 5 - Optimizaciones Finales (Opcional)

14. ✅ Component Memoization
15. ✅ Optimización de GitHub API

---

## 📝 Notas Adicionales

- Todas las optimizaciones son compatibles con la arquitectura actual
- No se requiere refactor mayor
- Mantener testing después de cada cambio
- Monitorear métricas con Lighthouse después de implementar cada fase

---

## 🔗 Recursos Útiles

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Shiki Documentation](https://shiki.matsu.io/)
- [Mermaid Documentation](https://mermaid.js.org/)
