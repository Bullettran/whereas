// @ts-ignore
import {boolean, pgEnum, pgTable, serial, varchar} from "drizzle-orm/pg-core";

// для множественных ролей
const userRoleEnum = pgEnum("user_role_enum", ["admin", "user", "moderator", "creator"]);

export const UserSchema = pgTable("user", {
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 255}).unique(),
    passwordHash: varchar("password_hash"),
    isSelectedSpecies: boolean("is_selected_species").default(false),
    isAdmin: boolean().default(false),
});

export type UserSchemaSelect = typeof UserSchema.$inferSelect;
export type UserSchemaInsert = typeof UserSchema.$inferInsert;