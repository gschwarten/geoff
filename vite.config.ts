import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

interface RouteOGConfig {
  path: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

function ogPages(routes: RouteOGConfig[]): Plugin {
  return {
    name: "vite-plugin-og-pages",
    apply: "build",
    transformIndexHtml: {
      order: "post" as const,
      handler(html: string, ctx: { path: string; filename: string; bundle?: Record<string, any> }) {
        // For the root index.html, inject the root route's OG tags
        const rootRoute = routes.find(r => r.path === "/");
        if (rootRoute) {
          html = injectOGTags(html, rootRoute);
        }
        return html;
      },
    },
    generateBundle(_, bundle) {
      const indexEntry = bundle["index.html"];
      if (!indexEntry || indexEntry.type !== "asset") return;

      const baseHtml = typeof indexEntry.source === "string"
        ? indexEntry.source
        : new TextDecoder().decode(indexEntry.source);

      for (const route of routes) {
        if (route.path === "/") continue; // already handled by transformIndexHtml

        const html = injectOGTags(baseHtml, route);
        const routePath = route.path.replace(/^\//, "");

        this.emitFile({
          type: "asset",
          fileName: `${routePath}/index.html`,
          source: html,
        });
      }
    },
  };
}

function injectOGTags(html: string, route: RouteOGConfig): string {
  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description"[^>]*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace og:title
  if (html.includes('og:title')) {
    html = html.replace(/<meta property="og:title"[^>]*\/?>/, `<meta property="og:title" content="${route.title}" />`);
  }

  // Replace og:description
  if (html.includes('og:description')) {
    html = html.replace(/<meta property="og:description"[^>]*\/?>/, `<meta property="og:description" content="${route.description}" />`);
  }

  // Replace og:image
  if (route.image && html.includes('og:image')) {
    html = html.replace(/<meta property="og:image"[^>]*\/?>/, `<meta property="og:image" content="${route.image}" />`);
  }

  // Replace og:url
  if (route.url && html.includes('og:url')) {
    html = html.replace(/<meta property="og:url"[^>]*\/?>/, `<meta property="og:url" content="${route.url}" />`);
  }

  // Replace twitter tags
  if (route.twitterCard && html.includes('twitter:card')) {
    html = html.replace(/<meta name="twitter:card"[^>]*\/?>/, `<meta name="twitter:card" content="${route.twitterCard}" />`);
  }
  const twTitle = route.twitterTitle || route.title;
  if (html.includes('twitter:title')) {
    html = html.replace(/<meta name="twitter:title"[^>]*\/?>/, `<meta name="twitter:title" content="${twTitle}" />`);
  }
  const twDesc = route.twitterDescription || route.description;
  if (html.includes('twitter:description')) {
    html = html.replace(/<meta name="twitter:description"[^>]*\/?>/, `<meta name="twitter:description" content="${twDesc}" />`);
  }
  if (route.image && html.includes('twitter:image')) {
    html = html.replace(/<meta name="twitter:image"[^>]*\/?>/, `<meta name="twitter:image" content="${route.image}" />`);
  }

  return html;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    ogPages([
      {
        path: "/",
        title: "Geoff Schwarten | Marketing & Growth Leader",
        description: "Helping impact-oriented businesses find repeatable, scalable growth formulas. Expertise in performance marketing, SEO, lifecycle marketing, and conversion optimization.",
        image: "https://geoff.lovable.app/lovable-uploads/formula-og-image.png",
        url: "https://geoff.lovable.app",
      },
      {
        path: "/bookrun",
        title: "BookRun Library Book Finder | Geoff Schwarten",
        description: "An app I made because I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. Now I know before I go.",
        image: "https://geoff.lovable.app/lovable-uploads/bookrun-og.png",
        url: "https://geoff.lovable.app/bookrun",
        twitterCard: "summary",
        twitterTitle: "BookRun — Library Book Finder",
        twitterDescription: "AI-powered book recommendations from your Goodreads list, with real-time library availability.",
      },
      {
        path: "/wonderschool",
        title: "Geoff Schwarten | Marketing & Growth Leader",
        description: "Helping impact-oriented businesses find repeatable, scalable growth formulas.",
        url: "https://geoff.lovable.app/wonderschool",
      },
      {
        path: "/gilead",
        title: "Geoff Schwarten | Marketing & Growth Leader",
        description: "Helping impact-oriented businesses find repeatable, scalable growth formulas.",
        url: "https://geoff.lovable.app/gilead",
      },
      {
        path: "/lovable",
        title: "Geoff Schwarten | Marketing & Growth Leader",
        description: "Helping impact-oriented businesses find repeatable, scalable growth formulas.",
        url: "https://geoff.lovable.app/lovable",
      },
    ]),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
