import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerenderStatic from "vite-plugin-prerender-static";

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
    prerenderStatic({
      headTags: '',
      render: () => '<div id="root"></div>',
      routes: [
        {
          path: "/",
          tags: {
            title: "Geoff Schwarten | Marketing & Growth Leader",
            description: "Helping impact-oriented businesses find repeatable, scalable growth formulas. Expertise in performance marketing, SEO, lifecycle marketing, and conversion optimization.",
            image: "https://geoff.lovable.app/lovable-uploads/formula-og-image.png",
            url: "https://geoff.lovable.app",
          },
        },
        {
          path: "/bookrun",
          tags: {
            title: "BookRun | Geoff Schwarten",
            description: "An app I made because I kept showing up to the library with 50 books on my Goodreads list and zero clue which ones were actually on the shelf. Now I know before I go.",
            image: "https://geoff.lovable.app/lovable-uploads/bookrun-og.png",
            url: "https://geoff.lovable.app/bookrun",
          },
        },
        {
          path: "/wonderschool",
          tags: {
            title: "Geoff Schwarten | Marketing & Growth Leader",
            description: "Helping impact-oriented businesses find repeatable, scalable growth formulas.",
            url: "https://geoff.lovable.app/wonderschool",
          },
        },
        {
          path: "/gilead",
          tags: {
            title: "Geoff Schwarten | Marketing & Growth Leader",
            description: "Helping impact-oriented businesses find repeatable, scalable growth formulas.",
            url: "https://geoff.lovable.app/gilead",
          },
        },
        {
          path: "/lovable",
          tags: {
            title: "Geoff Schwarten | Marketing & Growth Leader",
            description: "Helping impact-oriented businesses find repeatable, scalable growth formulas.",
            url: "https://geoff.lovable.app/lovable",
          },
        },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
