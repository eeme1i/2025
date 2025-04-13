import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "eeru.net",
    description: "my personal website",
    link: "https://eemeli.co",
    tags: ["react", "react-router", "development", "ui/ux design"],
  },
  {
    title: "write",
    description:
      "extremely minimal, fast and fully local place for quick note taking",
    link: "https://write.eeru.net",
    tags: ["vanilla js"],
  },
  {
    title: "bookmarks",
    description: "lightweight bookmark manager with authentication",
    link: "https://svelte-bookmarks.vercel.app",
    tags: ["svelte", "auth", "database", "development", "ui/ux design"],
  },
  {
    title: "sahko",
    description: "analyse data of finland's electricity grid",
    link: "https://sahko.eemeli.co",
    tags: ["remix/react", "development", "ui/ux design"],
  },
  {
    title: "thevoid",
    description: "twitter like social media app",
    link: "https://thevoid.eemeli.co",
    tags: ["nextjs/react", "development", "database", "ui/ux design"],
  },
  {
    title: "lettucewatch",
    description:
      "a web app that allows users to select what movie they want to watch through a tinder-style ui.",
    link: "https://lettuce.watch",
    tags: ["remix", "frontend", "ui/ux design"],
  },
  {
    title: "insync",
    description:
      "a web app that generates spotify playlists based on the user's choices.",
    link: "https://insync.vercel.app",
    tags: ["remix", "ui/ux design"],
  },
];
