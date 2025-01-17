// @ts-ignore
import {db, CharacteristicsSchema, UserSchemaSelect, UserSchema} from "~/server/db";
// @ts-ignore
import {eq} from "drizzle-orm";

interface iCreateCharacteristics {
    username: string;
    image: string;
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
    const { username } = getQuery(event);
    //@ts-ignore
    const findUser: iCreateCharacteristics = (await db.select().from(CharacteristicsSchema).where(eq(CharacteristicsSchema.username, username)).execute())[0];
    if (!findUser) {
        return createError({
            statusCode: 401,
            message: "Пользователя не существует",
        })
    }
    return {
        status: "success",
        data: findUser
    };
})