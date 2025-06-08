import { defineStore } from "pinia";

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    type: string,
    rare: string,
    chance: number,
    icon: string,
    quantity: number,
    stats: any,
    set: any,
    buffs: any,
    questItem: {
        isQuest: boolean,
        type: any,
    },
}

//@ts-ignore
export const useInventoryState = defineStore("inventory", {
    state: () => ({
        items: [] as InventoryItem[],
        gold: 0 as number,
    }),
    actions: {
        addItem(newItem: Omit<InventoryItem, "quantity">, count = 1) {
            const existing = this.items.find((item: any) => item.id === newItem.id);
            if (existing) {
                existing.quantity += count;
            } else {
                this.items.push({ ...newItem, quantity: count });
            }
        },
        removeItem(itemId: string, count = 1) {
            const existing = this.items.find((item: any) => item.id === itemId);
            if (!existing) return;
            existing.quantity -= count;
            if (existing.quantity <= 0) {
                this.items = this.items.filter((item: any) => item.id !== itemId);
            }
        },
        addGold(val: number) {
            this.gold += val;
        },
        removeGold(val: number) {
            this.gold -= val;
        },
        clearInventory() {
            this.items = [];
        },
    },
    getters: {
        // общее количество всех предметов в инвентаре
        totalItems: (state) => state.items.reduce((acc: any, item: any) => acc + item.quantity, 0),
        // функция, которая по id возвращает предмет из инвентаря
        getItemById: (state) => {
            return (id: string) => state.items.find((item: any) => item.id === id);
        },
    },
    persist: {
        storage: localStorage,
    },
});