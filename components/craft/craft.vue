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
    image: string;
    type: "potion" | string; // Уточните возможные типы рецептов
    buffs?: Buffs;
    ingredients: RecipeIngredient[];
    requirements: string;
}

export default defineComponent({
    name: "Craft",
    setup() {
        // @ts-ignore
        const inventory = useInventoryState();
        const recipes = [
            {
                id: "health_potion",
                name: "Зелье здоровья",
                description: "Восстанавливает 50 HP",
                image: "🧪",
                type: "potion",
                buffs: {
                    value: 1,
                    type: "hp",
                },
                ingredients: [
                    { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 3 },
                    { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 4 },
                    { id: "potion1", name: "Зелье маны", icon: "🧪", count: 1 },
                ],
                requirements: "Уровень алхимии 2",
            },
            {
                id: "mana_potion",
                name: "Зелье маны",
                description: "Восстанавливает 50 Маны",
                image: "🧪",
                type: "potion",
                ingredients: [
                    { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 2 },
                    { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 4 },
                ],
                requirements: "Уровень алхимии 2",
            },
            {
                id: "str_potion1",
                name: "Зелье силы",
                description: "Добавляет 1 силы в бою",
                image: "🧪",
                type: "potion",
                buffs: {
                    value: 1,
                    type: "str",
                },
                ingredients: [
                    { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 4 },
                    { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 5 },
                ],
                requirements: "Уровень алхимии 2",
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
                const inventoryItem = this.inventory.find((i: any) => i.id === slot.id);
                if (inventoryItem) inventoryItem.count += slot.quantity;
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
            const inventoryItem = this.inventory.find((i: any) => i.id === item.id);

            if (!inventoryItem || inventoryItem.count <= 0) {
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
            if (inventoryItem) inventoryItem.count--;
        },

        removeIngredient(slotIndex: number) {
            const item = this.craftSlots[slotIndex];
            if (!item) return;

            // Возвращаем предмет в инвентарь
            // @ts-ignore
            const inventoryItem = this.inventory.find((i: any) => i.id === item.id);
            if (inventoryItem) inventoryItem.count += 1;

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
                // @ts-ignore
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
                });
                // Создаем готовый предмет
                const craftedItem: InventoryItem = {
                    id: this.selectedRecipe.id,
                    name: this.selectedRecipe.name,
                    icon: this.selectedRecipe.image,
                    quantity: 1,
                    type: this.selectedRecipe.type,
                    description: this.selectedRecipe.description,
                    buffs: this.selectedRecipe.buffs,
                    chance: 0,
                    rare: "",
                    stats: {},
                    set: {},
                    questItem: {},
                };
                // проверяем наличие в инвентаре
                // @ts-ignore
                const exitingItem = this.inventory.find((item: any) => item.id === craftedItem.id);
                if (exitingItem) {
                    exitingItem.count += craftedItem.quantity;
                } else {
                    this.inventory.addItem(craftedItem);
                }
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
                <div class="craft__image">{{ selectedRecipe?.image || "❓" }}</div>
            </div>
            <div class="craft__system">
                <div
                    v-for="(slot, index) in craftSlots"
                    :key="index"
                    class="craft__item"
                    @click="slot ? removeIngredient(index) : null"
                >
                    <div v-if="slot" class="craft__slot-content">
                        {{ slot.icon }}
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