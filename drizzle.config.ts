import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:YD8en7iRwPIl@ep-summer-mountain-a5tl4w5v.us-east-2.aws.neon.tech/ai-kids-story-builder?sslmode=require",
  },
  verbose: true,
  strict: true,
});
