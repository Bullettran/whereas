//@ts-ignore
import { drizzle } from "drizzle-orm/postgres-js";
//@ts-ignore
import postgres from "postgres";

//@ts-ignore
const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle({ client: queryClient });

export * from "./schemas/user.schema";
export * from "./schemas/characteristics.schema";
export * from "./schemas/equip.schema";
export * from "./schemas/inventory.schema";