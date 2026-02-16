import type { Plugin } from "vite";

interface RouteOGConfig {
  path: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export default function ogPages(routes: RouteOGConfig[]): Plugin {
  return {
    name: "vite-plugin-og-pages",
    apply: "build",
    generateBundle(_, bundle) {
      // Find the main index.html in the bundle
      const indexEntry = bundle["index.html"];
      if (!indexEntry || indexEntry.type !== "asset") {
        console.warn("[og-pages] index.html not found in bundle, skipping.");
        return;
      }

      const baseHtml = typeof indexEntry.source === "string" 
        ? indexEntry.source 
        : new TextDecoder().decode(indexEntry.source);

      for (const route of routes) {
        let html = baseHtml;

        // Replace <title>
        html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

        // Replace meta description
        html = html.replace(
          /<meta name="description"[^>]*\/?>/,
          `<meta name="description" content="${route.description}" />`
        );

        // Replace or inject og:image
        if (route.image) {
          if (html.includes('property="og:image"') || html.includes("property='og:image'")) {
            html = html.replace(
              /<meta property="og:image"[^>]*\/?>/,
              `<meta property="og:image" content="${route.image}" />`
            );
          } else {
            html = html.replace(
              "</head>",
              `<meta property="og:image" content="${route.image}" />\n</head>`
            );
          }
        }

        // Build OG + Twitter block
        const ogBlock = [
          `<meta property="og:title" content="${route.title}" />`,
          `<meta property="og:description" content="${route.description}" />`,
          `<meta property="og:type" content="website" />`,
          route.url ? `<meta property="og:url" content="${route.url}" />` : "",
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${route.title}" />`,
          `<meta name="twitter:description" content="${route.description}" />`,
          route.image ? `<meta name="twitter:image" content="${route.image}" />` : "",
        ]
          .filter(Boolean)
          .join("\n");

        html = html.replace("</head>", `${ogBlock}\n</head>`);

        // Emit as asset
        const routePath = route.path === "/" ? "" : route.path.replace(/^\//, "");

        if (routePath) {
          this.emitFile({
            type: "asset",
            fileName: `${routePath}/index.html`,
            source: html,
          });
          console.log(`[og-pages] Emitted ${routePath}/index.html`);
        } else {
          // Update root index.html in place
          (indexEntry as any).source = html;
          console.log(`[og-pages] Updated root index.html`);
        }
      }
    },
  };
}
