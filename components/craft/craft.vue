<script lang="ts">
import { defineComponent } from "vue";

interface Stats {
    attack: string,
    critical: string,
    hp: string,
    mp: string,
    speed: string,
    defence: string,
}

interface Set {
    type: string;
}

interface Buffs {
    value: number;
    type: "hp" | "mp" | "str" | string;
}

interface InventoryItem {
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
    questItem: any,
}

interface RecipeIngredient {
    id: string;
    name: string;
    icon: string;
    count: number;
}

interface Recipe {
    id: string;
    name: string;
    description: string;
    icon: string;
    type: "potion" | string; // Уточните возможные типы рецептов
    buffs?: Buffs;
    ingredients: RecipeIngredient[];
    requirements: string;
    effect: any;
}

export default defineComponent({
    name: "Craft",
    setup() {
        // @ts-ignore
        const inventory = useInventoryState();
        const recipes = [
            {
                id: "health-potion-1",
                name: "Зелье здоровья",
                description: "Восстанавливает 2 HP",
                type: "potion",
                rare: "standard",
                icon: "/images/potions/hp-1.png",
                ingredients: [
                    // { id: "moonstone", name: "Лунный камень", icon: "moonstone", count: 1 },
                    { id: "tree", name: "Простая древесина", icon: "/images/components/rewards/tree.png", count: 1 },
                ],
                requirements: "",
            },
        ];
        return {
            recipes,
            inventory,
        };
    },
    data: () => ({
        selectedRecipe: null as Recipe | null,
        craftSlots: [] as InventoryItem[],
    }),
    methods: {
        selectRecipe(recipe: Recipe) {
            this.selectedRecipe = recipe;
            this.craftSlots = []; // Сбрасываем слоты при выборе нового рецепта
        },
        removeAllIngridient() {
            this.craftSlots.forEach(slot => {
                // @ts-ignore
                const inventoryItem = this.inventory.items.find((i: any) => i.id === slot.id);
                if (inventoryItem) inventoryItem.quantity += slot.quantity;
            });
            this.craftSlots = [];
        },
        addIngredient(item: InventoryItem) {
            if (!this.selectedRecipe) return;
            // Проверяем, нужен ли этот предмет в рецепте
            const isNeeded = this.selectedRecipe.ingredients.some(
                ing => ing.id === item.id,
            );

            if (!isNeeded) {
                alert("Этот предмет не нужен для выбранного рецепта!");
                return;
            }

            // Проверяем, есть ли уже такой предмет в слотах
            const existingIndex = this.craftSlots.findIndex(slot => slot.id === item.id);
            // @ts-ignore
            const inventoryItem = this.inventory.items.find((i: any) => i.id === item.id);

            if (!inventoryItem || inventoryItem.quantity <= 0) {
                alert("Недостаточно предметов в инвентаре!");
                return;
            }

            if (existingIndex >= 0) {
                // Увеличиваем количество существующего предмета
                this.craftSlots[existingIndex].quantity++;
            } else {
                // Добавляем новый предмет в слоты
                this.craftSlots.push({ ...item, quantity: 1 });
            }

            // Уменьшаем количество в инвентаре
            if (inventoryItem) inventoryItem.quantity--;
        },

        removeIngredient(slotIndex: number) {
            const item = this.craftSlots[slotIndex];
            if (!item) return;

            // Возвращаем предмет в инвентарь
            // @ts-ignore
            const inventoryItem = this.inventory.items.find((i: any) => i.id === item.id);
            if (inventoryItem) inventoryItem.quantity += 1;

            // Удаляем из слотов
            // Уменьшаем количество в слоте или удаляю, если 1
            if (item.quantity > 1) {
                this.craftSlots[slotIndex].quantity--;
            } else {
                this.craftSlots.splice(slotIndex, 1);
            }
        },

        craftItem() {
            if (!this.selectedRecipe) return;

            // Проверяем, все ли ингредиенты собраны в нужном количестве
            const hasAllIngredients = this.selectedRecipe.ingredients.every(recipeIng => {
                const slotIng = this.craftSlots.find(slot => slot.id === recipeIng.id);
                return slotIng && slotIng.quantity >= recipeIng.count;
            });

            if (hasAllIngredients) {
                // Уменьшаем количество использованных предметов
                this.selectedRecipe.ingredients.forEach(recipeIng => {
                    // @ts-ignore
                    const slotIndex = this.craftSlots.findIndex(slot => slot.id === recipeIng.id);
                    if (slotIndex >= 0) {
                        this.craftSlots[slotIndex].quantity -= recipeIng.count;
                        if (this.craftSlots[slotIndex].quantity <= 0) {
                            this.craftSlots.splice(slotIndex, 1);
                        }
                    }
                    // уменьшаем количество в интвентаре
                    const invItem = this.inventory.items.find((item: any) => item.id === recipeIng.id);
                    if (invItem) {
                        invItem.quantity -= recipeIng.count;
                        if (invItem.quantity <= 0) {
                            this.inventory.removeItem(invItem.id, 0); // удалит если quantity <= 0
                        }
                    }
                });
                // Создаем готовый предмет
                const craftedItem: InventoryItem = {
                    id: this.selectedRecipe.id,
                    name: this.selectedRecipe.name,
                    icon: this.selectedRecipe.icon,
                    quantity: 1,
                    type: this.selectedRecipe.type,
                    description: this.selectedRecipe.description,
                    buffs: this.selectedRecipe.buffs,
                    chance: 0,
                    rare: "",
                    stats: {},
                    set: {},
                    questItem: {
                        isQuest: false, type: ""
                    },
                };
                this.inventory.addItem(craftedItem);
            } else {
                alert("Не хватает ингредиентов!");
            }
        },
    },
    computed: {
        canCraft(): boolean {
            if (!this.selectedRecipe) return false;

            return this.selectedRecipe.ingredients.every(recipeIng => {
                const slotIng = this.craftSlots.find(slot => slot.id === recipeIng.id);
                return slotIng && slotIng.quantity >= recipeIng.count;
            });
        },
    },
});
</script>

<template>
    <div class="craft">
        <div class="craft__bug">
            <div class="craft__wrap">
                <h4 class="craft__title">{{ selectedRecipe?.name || "Выберите рецепт" }}</h4>
                <div class="craft__image">
                    <img class="craft__icon" :src="selectedRecipe?.icon" :alt="selectedRecipe?.name">
                </div>
            </div>
            <div class="craft__system">
                <div
                    v-for="(slot, index) in craftSlots"
                    :key="index"
                    class="craft__item"
                    @click="slot ? removeIngredient(index) : null"
                >
                    <div v-if="slot" class="craft__slot-content">
                        <img class="craft__icon" :src="slot.icon">
                        <span class="craft__count">{{ slot.quantity }}</span>
                    </div>
                    <div v-else class="craft__empty-slot">Слот {{ index + 1 }}</div>
                </div>
            </div>
            <div class="craft__buttons">
                <button class="craft__button button button--metal-sm" type="button" :disabled="!canCraft"
                        @click="craftItem">Создать
                </button>
                <button class="craft__button button button--metal-sm" type="button"
                        @click="removeAllIngridient">Сбросить
                </button>
            </div>
        </div>
        <CraftRecipes :recipes="recipes" @select-recipe="selectRecipe" class="craft__recipes" />
        <Inventory :inventory="inventory.items" location="craft"
                   @item-click="addIngredient"
                   class="craft__inventory" />
    </div>
</template>

<style scoped lang="scss">
@use "craft";
</style>