<script lang="ts">
import { defineComponent } from "vue";

interface Ingredient {
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
    ingredients: Ingredient[];
    requirements: string;
}

export default defineComponent({
    name: "Craft",
    setup() {
        // @ts-ignore
        const inventory = reactive([
            { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 20 },
            { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 40 },
            { id: "test", name: "test", icon: "🛡️", count: 5 },
        ]);
        const recipes = [
            {
                id: "health_potion",
                name: "Зелье здоровья",
                description: "Восстанавливает 50 HP",
                image: "🧪",
                ingredients: [
                    { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 3 },
                    { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 4 },
                ],
                requirements: "Уровень алхимии 2",
            },
            {
                id: "health_potion",
                name: "Зелье маны",
                description: "Восстанавливает 50 Маны",
                image: "🧪",
                ingredients: [
                    { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 2 },
                    { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 4 },
                ],
                requirements: "Уровень алхимии 2",
            },
            {
                id: "health_potion",
                name: "Зелье здоровья",
                description: "Восстанавливает 50 HP",
                image: "🧪",
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
        craftSlots: [] as Ingredient[],
    }),
    methods: {
        selectRecipe(recipe: Recipe) {
            this.selectedRecipe = recipe;
            this.craftSlots = []; // Сбрасываем слоты при выборе нового рецепта
        },
        removeAllIngridient() {
            this.craftSlots.forEach(slot => {
                const inventoryItem = this.inventory.find(i => i.id === slot.id);
                if (inventoryItem) inventoryItem.count += slot.count;
            });
            this.craftSlots = [];
        },
        addIngredient(item: Ingredient) {
            if (!this.selectedRecipe) return;

            // Проверяем, нужен ли этот предмет в рецепте
            const isNeeded = this.selectedRecipe.ingredients.some(
                ing => ing.id === item.id
            );

            if (!isNeeded) {
                alert('Этот предмет не нужен для выбранного рецепта!');
                return;
            }

            // Проверяем, есть ли уже такой предмет в слотах
            const existingIndex = this.craftSlots.findIndex(slot => slot.id === item.id);
            const inventoryItem = this.inventory.find(i => i.id === item.id);

            if (!inventoryItem || inventoryItem.count <= 0) {
                alert('Недостаточно предметов в инвентаре!');
                return;
            }

            if (existingIndex >= 0) {
                // Увеличиваем количество существующего предмета
                this.craftSlots[existingIndex].count++;
            } else {
                // Добавляем новый предмет в слоты
                this.craftSlots.push({ ...item, count: 1 });
            }

            // Уменьшаем количество в инвентаре
            if (inventoryItem) inventoryItem.count--;
        },

        removeIngredient(slotIndex: number) {
            const item = this.craftSlots[slotIndex];
            if (!item) return;

            // Возвращаем предмет в инвентарь
            const inventoryItem = this.inventory.find(i => i.id === item.id);
            if (inventoryItem) inventoryItem.count += 1;

            // Удаляем из слотов
            // Уменьшаем количество в слоте или удаляю, если 1
            if (item.count > 1) {
                this.craftSlots[slotIndex].count--;
            } else {
                this.craftSlots.splice(slotIndex, 1);
            }
        },

        craftItem() {
            if (!this.selectedRecipe) return;

            // Проверяем, все ли ингредиенты собраны в нужном количестве
            const hasAllIngredients = this.selectedRecipe.ingredients.every(recipeIng => {
                const slotIng = this.craftSlots.find(slot => slot.id === recipeIng.id);
                return slotIng && slotIng.count >= recipeIng.count;
            });

            if (hasAllIngredients) {
                alert(`Успешно создано: ${this.selectedRecipe.name}`);

                // Уменьшаем количество использованных предметов
                this.selectedRecipe.ingredients.forEach(recipeIng => {
                    const slotIndex = this.craftSlots.findIndex(slot => slot.id === recipeIng.id);
                    if (slotIndex >= 0) {
                        this.craftSlots[slotIndex].count -= recipeIng.count;
                        if (this.craftSlots[slotIndex].count <= 0) {
                            this.craftSlots.splice(slotIndex, 1);
                        }
                    }
                });

            } else {
                alert('Не хватает ингредиентов!');
            }
        }
    },
    computed: {
        canCraft(): boolean {
            if (!this.selectedRecipe) return false;

            return this.selectedRecipe.ingredients.every(recipeIng => {
                const slotIng = this.craftSlots.find(slot => slot.id === recipeIng.id);
                return slotIng && slotIng.count >= recipeIng.count;
            });
        },
    },
});
</script>

<template>
    <div class="craft">
        <Inventory :inventory="inventory" @item-click="addIngredient"
                   class="craft__inventory" />
        <CraftRecipes :recipes="recipes" @select-recipe="selectRecipe" class="craft__recipes" />
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
                        <span class="craft__count">{{ slot.count }}</span>
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
    </div>
</template>

<style scoped lang="scss">
@use "craft";
</style>