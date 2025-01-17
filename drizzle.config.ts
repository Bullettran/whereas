//@ts-ignore
import { defineConfig } from "drizzle-kit";

//@ts-ignore
export default defineConfig({
    schema: ["./server/db/schemas/*.schema.ts"],
    dialect: "postgresql",
    dbCredentials: {
        // @ts-ignore
        url: process.env.DATABASE_URL
    }
});