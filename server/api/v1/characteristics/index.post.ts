// @ts-ignore
import {db, CharacteristicsSchema, CharactericsSchemaSelect, CharactericsSchemaInsert} from "~/server/db";
// @ts-ignore
import {eq} from "drizzle-orm";

interface iCreateCharacteristics {
    username: string;
    str: number;
    agi: number;
    vit: number;
    acc: number;
    int: number;
    spd: number;
    luc: number;
    def: number;
}

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event) as any;
    const { username, image, str, agi, vit, acc, int, spd, luc, def } = body;

    if (!username
        || typeof image === "undefined"
        || typeof str === "undefined"
        || typeof agi === "undefined"
        || typeof vit === "undefined"
        || typeof acc === "undefined"
        || typeof int === "undefined"
        || typeof spd === "undefined"
        || typeof luc === "undefined"
        || typeof def === "undefined") {
        throw createError({
            statusCode: 400,
            statusMessage: "Все поля обязательны",
        });
    }

    const existingCharacter = await db
        .select()
        .from(CharacteristicsSchema)
        //@ts-ignore
        .where("username", username)
        .execute();

    if (existingCharacter.length > 0) {
        throw createError({
            statusCode: 409, // Конфликт, логин уже существует
            statusMessage: "Такой пользователь уже существует",
        });
    }

    const newCharacter = {
        username,
        image,
        str,
        agi,
        vit,
        acc,
        int,
        spd,
        luc,
        def
    }

    const result = await db.insert(CharacteristicsSchema).values(newCharacter).execute();

    return {
        status: "success",
        data: {
            ...newCharacter
        }
    };
})