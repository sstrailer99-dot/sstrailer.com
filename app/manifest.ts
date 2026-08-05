import type { MetadataRoute } from "next";
import { company } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.shortName} — ${company.name}`,
    short_name: company.shortName,
    description: company.slogan,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f6f8",
    theme_color: "#0a2342",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
