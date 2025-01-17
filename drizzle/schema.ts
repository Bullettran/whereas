import { pgTable, unique, serial, varchar, boolean, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: serial().primaryKey().notNull(),
	username: varchar({ length: 255 }),
	passwordHash: varchar("password_hash"),
	isSelectedSpecies: boolean("is_selected_species").default(false),
}, (table) => [
	unique("user_username_unique").on(table.username),
]);

export const characteristics = pgTable("characteristics", {
	username: varchar({ length: 255 }).primaryKey().notNull(),
	str: integer(),
	agi: integer(),
	vit: integer(),
	acc: integer(),
	int: integer(),
	spd: integer(),
	luc: integer(),
	def: integer(),
	image: varchar(),
});
