-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"password_hash" varchar,
	"is_selected_species" boolean DEFAULT false,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "characteristics" (
	"username" varchar(255) PRIMARY KEY NOT NULL,
	"str" integer,
	"agi" integer,
	"vit" integer,
	"acc" integer,
	"int" integer,
	"spd" integer,
	"luc" integer,
	"def" integer,
	"image" varchar
);

*/