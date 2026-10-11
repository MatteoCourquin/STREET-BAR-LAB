"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";

// Sanity Studio, mounted at /studio by src/app/studio/[[...tool]]/page.tsx.
export default defineConfig({
  name: "default",
  title: "StreetBarLab",
  basePath: "/studio",
  projectId: "63wccw3u",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
