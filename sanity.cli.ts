import { defineCliConfig } from "sanity/cli";

// Lets `npx sanity …` (schema deploy, cors, documents) run from the project root.
export default defineCliConfig({
  api: {
    projectId: "63wccw3u",
    dataset: "production",
  },
});
