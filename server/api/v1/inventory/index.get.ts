// @ts-ignore
import {db, InventorySchema, EquipSchema} from "~/server/db";
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
    const {username} = getQuery(event);
    //@ts-ignore
    const findUser: iCreateInventory = await db.select().from(InventorySchema).where(eq(InventorySchema.username, username)).execute();
    //@ts-ignore
    if (findUser.length === 0) {
        return createError({
            statusCode: 401,
            message: "Пользователя не существует",
        })
    }
    const equip = [] as any;
    const mines = [] as any;
    //@ts-ignore
    const result = await Promise.all(findUser.map(async (user) => {
        const {name, type, rusName, image, count} = user;
        if (type === "equip") {
            let findEquip = (await db.select().from(EquipSchema).where(eq(EquipSchema.name, name)).execute())[0];
            equip.push(findEquip);
        } else {
            let findItem = {
                name,
                type,
                rusName,
                image,
                count
            }
            mines.push(findItem);
        }
    }));
    return {
        status: "success",
        data: {
            attributes: {mines, equip}
        }

    };
})