// @ts-ignore
import {pgTable, varchar, integer, serial} from "drizzle-orm/pg-core";

export const EquipSchema = pgTable("equip", {
    id: serial("id").primaryKey(),
    name: varchar(),
    rusName: varchar(),
    type: varchar(),
    image: varchar(),
    set: varchar(),
    attack: integer(),
    str: integer(),
    agi: integer(),
    vit: integer(),
    acc: integer(),
    int: integer(),
    spd: integer(),
    luc: integer(),
    def: integer(),
});

export type EquipSchemaSelect = typeof EquipSchema.$inferSelect;
export type EquipSchemaInsert = typeof EquipSchema.$inferInsert;