// @ts-ignore
import {db, UserSchema, UserSchemaInsert, UserSchemaSelect} from "~/server/db";
// @ts-ignore
import {eq} from "drizzle-orm";

interface IUpdateUserData {
    username?: string;
    password?: string;
    isSelectedSpecies?: boolean;
}

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event);
    const { username, isSelectedSpecies } = body;
    let updatedData = {} as any;

    if (!username || typeof isSelectedSpecies === "undefined") {
        throw createError({
            statusCode: 400,
            statusMessage: 'Все поля обязательны',
        });
    }

    updatedData = {
        username,
        isSelectedSpecies
    }

    const updatedUser = await db.update(UserSchema)
        .set(updatedData)
        .where(eq(UserSchema.username, username))
        .execute();

    if (!updatedUser) {
        return createError({
            statusCode: 500,
            message: "Ошибка при обновлении данных пользователя",
        });
    } else {
        return {
            status: "success",
            message: "Данные пользователя обновлены",
        };
    }
})