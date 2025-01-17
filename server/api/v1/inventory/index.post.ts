// @ts-ignore
import {db, InventorySchema} from "~/server/db";
// @ts-ignore
import {eq} from "drizzle-orm";

interface iCreateInventory {
    username: string;
    name: string;
    rusName: string;
    image: string;
    type: string;
    count: number;
}

export default defineEventHandler(async (event: any) => {
    const body = await readBody(event) as any;
    const {username, name, rusName, image, type, count} = body;

    if (!username
        || !name
        || !rusName
        || !type
        || !count
        || typeof image === "undefined") {
        throw createError({
            statusCode: 400,
            statusMessage: "Все поля обязательны",
        });
    }

    const newItem = {
        username,
        name,
        rusName,
        image,
        type,
        count
    }

    const result = await db.insert(InventorySchema).values(newItem).execute();

    return {
        status: "success",
        data: {
            ...newItem
        }
    };
})