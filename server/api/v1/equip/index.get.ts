import {
    db,
    EquipSchema,
} from "~/server/db";

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
    const {name} = getQuery(event);

    //@ts-ignore
    const findEquip: iCreateEquip = (await db.select().from(EquipSchema).where(eq(EquipSchema.name, name)).execute())[0];
    if (!findEquip) {
        return createError({
            statusCode: 401,
            message: "Такого снаряжения не существует",
        })
    }
    return {
        status: "success",
        data: findEquip
    };
})