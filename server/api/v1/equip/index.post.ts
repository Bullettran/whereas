// @ts-ignore
import {db, EquipSchema, EquipSchemaSelect, EquipSchemaInsert} from "~/server/db";
// @ts-ignore
import {eq} from "drizzle-orm";

interface iCreateEquip {
    name: string,
    rusName: string,
    type: string,
    image: string,
    set: string | null,
    attack: number | null,
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
    const { name, rusName, type, image, set, attack, str, agi, vit, acc, int, spd, luc, def } = body;

    if (!name || !rusName || !type
        || typeof str === "undefined"
        || typeof agi === "undefined"
        || typeof vit === "undefined"
        || typeof acc === "undefined"
        || typeof int === "undefined"
        || typeof spd === "undefined"
        || typeof luc === "undefined"
        || typeof def === "undefined"
    ) {
        throw createError({
            statusCode: 400,
            statusMessage: "Все поля обязательны",
        });
    }

    const existingCharacter = await db
        .select()
        .from(EquipSchema)
        //@ts-ignore
        .where("name", name)
        .execute();

    if (existingCharacter.length > 0) {
        throw createError({
            statusCode: 409, // Конфликт, логин уже существует
            statusMessage: "Такое снаряжение уже существует",
        });
    }

    const newEquip = {
        name,
        rusName,
        type,
        image,
        set,
        attack,
        str,
        agi,
        vit,
        acc,
        int,
        spd,
        luc,
        def,
    }

    const result = await db.insert(EquipSchema).values(newEquip).execute();

    return {
        status: "success",
        data: {
            ...newEquip
        }
    };
})