// @ts-ignore
import {pgTable, varchar, integer} from "drizzle-orm/pg-core";

export const CharacteristicsSchema = pgTable("characteristics", {
    username: varchar("username", {length: 255}).primaryKey(),
    image: varchar(),
    str: integer(),
    agi: integer(),
    vit: integer(),
    acc: integer(),
    int: integer(),
    spd: integer(),
    luc: integer(),
    def: integer(),
});

export type CharactericsSchemaSelect = typeof CharacteristicsSchema.$inferSelect;
export type CharactericsSchemaInsert = typeof CharacteristicsSchema.$inferInsert;