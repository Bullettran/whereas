// @ts-ignore
import {db, UserSchema, UserSchemaSelect} from "~/server/db";
// @ts-ignore
import {eq} from "drizzle-orm";
import {compare} from "bcrypt";

interface IAuthData {
    username: string;
    password: string;
}

export default defineEventHandler(async (event: any) => {
    const body: IAuthData = await readBody(event);

    const findUser: UserSchemaSelect = (await db.select().from(UserSchema).where(eq(UserSchema.username, body.username)).execute())[0];

    if (!findUser) {
        return createError({
            statusCode: 401,
            message: "Пользователя не найден",
        })
    }

    //@ts-ignore
    const comparePasswords = await compare(body.password, findUser.passwordHash);

    if (!comparePasswords) {
        return createError({
            statusCode: 401,
            message: "Имя пользователя или пароль введены не верно",
        })
    }

    const session = await setUserSession(event, {
        user: {
            ...findUser,
        },
        createdAt: Date.now(),
    });

    return session;
});