import { defineConfig } from "orval";

export default defineConfig({
  backend: {
    input: {
      target: "https://ai-app-node-staging.up.railway.app/api-docs/json",
    },
    output: {
      mode: "tags-split",
      target: "src/generated/api",
      schemas: "src/generated/api/schemas",
      client: "react-query",
      mock: true,
      override: {
        mutator: {
          path: "src/config/mutator.ts",
          name: "customInstance",
        },
      },
    },
  },
  backendZod: {
    input: {
      target: "https://ai-app-node-staging.up.railway.app/api-docs/json",
    },
    output: {
      mode: "tags-split",
      target: "src/generated/api",
      schemas: "src/generated/api/schemas",
      client: "zod",
      fileExtension: ".zod.ts",
    },
  },
});
