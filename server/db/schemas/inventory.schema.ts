// @ts-ignore
import {pgTable, varchar, integer, serial} from "drizzle-orm/pg-core";

export const InventorySchema = pgTable("inventory", {
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 255}),
    name: varchar(),
    rusName: varchar(),
    image: varchar(),
    type: varchar(),
    count: integer(),
});

export type InventorySchemaSelect = typeof InventorySchema.$inferSelect;
export type InventorySchemaInsert = typeof InventorySchema.$inferInsert;