import fs from "fs";
import path from "path";
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
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(distDir, "index.html");

      if (!fs.existsSync(indexPath)) {
        console.warn("[og-pages] dist/index.html not found, skipping.");
        return;
      }

      const baseHtml = fs.readFileSync(indexPath, "utf-8");

      for (const route of routes) {
        // Build meta tags string
        const metaTags = [
          `<title>${route.title}</title>`,
          `<meta name="description" content="${route.description}" />`,
          `<meta property="og:title" content="${route.title}" />`,
          `<meta property="og:description" content="${route.description}" />`,
          `<meta property="og:type" content="website" />`,
          route.url ? `<meta property="og:url" content="${route.url}" />` : "",
          route.image ? `<meta property="og:image" content="${route.image}" />` : "",
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${route.title}" />`,
          `<meta name="twitter:description" content="${route.description}" />`,
          route.image ? `<meta name="twitter:image" content="${route.image}" />` : "",
        ]
          .filter(Boolean)
          .join("\n    ");

        // Replace existing title and description, inject OG tags
        let html = baseHtml;

        // Replace <title>
        html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

        // Replace meta description
        html = html.replace(
          /<meta name="description"[^>]*\/?>/, 
          `<meta name="description" content="${route.description}" />`
        );

        // Replace og:image if exists, otherwise inject before </head>
        if (route.image) {
          if (html.includes('property="og:image"')) {
            html = html.replace(
              /<meta property="og:image"[^>]*\/?>/, 
              `<meta property="og:image" content="${route.image}" />`
            );
          } else {
            html = html.replace(
              "</head>",
              `    <meta property="og:image" content="${route.image}" />\n  </head>`
            );
          }
        }

        // Inject OG + Twitter tags before </head> (remove duplicates first)
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
          .join("\n    ");

        html = html.replace("</head>", `    ${ogBlock}\n  </head>`);

        // Write to route directory
        const routePath = route.path === "/" ? "" : route.path;
        const dir = path.join(distDir, routePath);
        
        if (routePath) {
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
          console.log(`[og-pages] Generated ${routePath}/index.html`);
        } else {
          // Overwrite root index.html with updated meta
          fs.writeFileSync(indexPath, html, "utf-8");
          console.log(`[og-pages] Updated /index.html`);
        }
      }
    },
  };
}
