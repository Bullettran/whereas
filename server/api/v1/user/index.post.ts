import {genSalt, hash} from "bcrypt";
// @ts-ignore
import {db, UserSchema, UserSchemaInsert, UserSchemaSelect} from "~/server/db";
// @ts-ignore
import {eq} from "drizzle-orm";

interface iCreateUser {
    username: string;
    password: string;
    isSelectedSpecies: boolean;
    isAdmin: boolean;
}

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event);
    const salt = await genSalt(10);

    // для безопасности пароль хэшируем
    const getPasswordHash = await hash(body.password, salt);

    const candidate = {
        username: body.username,
        passwordHash: getPasswordHash,
        isSelectedSpecies: body.isSelectedSpecies,
        isAdmin: body.isAdmin
    };

    // drizzle всегда возвращает массив, поэтому обернул и вызвал первый элемент
    const findUser: UserSchemaSelect = (await db.select().from(UserSchema).where(eq(UserSchema.username, body.username)).execute())[0];

    if (findUser) {
        return createError({
            statusCode: 401,
            message: "Пользователь существует",
        })
    }

    const user: any = await db.insert(UserSchema).values({...candidate})

    const {passwordHash, ...result} = user;

    return result;
})