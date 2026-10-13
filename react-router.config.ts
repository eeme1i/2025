import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";

export default {
  ssr: false,
  prerender: [
    "/",
    "/blog",
    ...readdirSync(new URL("./content/blog/", import.meta.url))
      .filter((file) => file.endsWith(".md"))
      .map((file) => `/blog/${file.slice(0, -3)}`),
  ],
} satisfies Config;
