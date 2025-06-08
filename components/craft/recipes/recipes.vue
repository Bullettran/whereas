<script lang="ts">
import { defineComponent } from "vue";

interface Recipe {
    id: string;
    name: string;
    icon: string;
}

export default defineComponent({
    name: "CraftRecipes",
    props: {
        recipes: {
            type: Array as () => Array<{
                id: string;
                name: string;
                description: string;
                icon: string;
                ingredients: Array<{
                    id: string;
                    name: string;
                    icon: string;
                    count: number;
                }>;
                requirements: string;
            }>,
            required: true,
        },
    },
    data: () => ({
        isSelected: "" as string,
    }),
    methods: {
        selectRecipe(recipe: Recipe) {
            this.isSelected = recipe.id;
            this.$emit("select-recipe", recipe);
        },
    },
});
</script>

<template>
    <div class="recipes">
        <div class="recipes__wrap">
            <h3 class="recipes__title">Рецепты</h3>
            <div class="recipes__filters">
                <button class="recipes__filter button button--metal-sm active" type="button">
                    Все
                </button>
                <button class="recipes__filter button button--metal-sm" type="button">
                    Оружия
                </button>
                <button class="recipes__filter button button--metal-sm" type="button">
                    Зелья
                </button>
            </div>
        </div>
        <ul class="recipes__items list">
            <li :class="[isSelected === recipe.id ? 'recipes__item--active' : '', 'recipes__item']"
                v-for="(recipe, index) in recipes" :key="index" @click="selectRecipe(recipe)">
                <div class="recipes__block">
                    <div class="recipes__name"><strong>{{ recipe.name }}</strong></div>
                    <div class="recipes__image">
                        <img class="recipes__icon" :src="recipe.icon" :alt="recipe.name">
                    </div>
                </div>
                <div class="recipes__description">{{ recipe.description }}</div>
                <h4 class="recipes__subtitle">Ингредиенты</h4>
                <div class="recipes__ingredients">
                    <div class="recipes__ingredient" v-for="(ingr, j) in recipe.ingredients" :key="j">
                        <div class="recipes__icon">
                            <img class="recipes__icon" :src="ingr.icon" :alt="ingr.name">
                        </div>
                        <div class="recipes__ingredient-name">{{ ingr.name }}&nbsp;x{{ ingr.count }}</div>
                    </div>
                </div>
                <div class="recipes__requirements">
                    <h4 class="recipes__subtitle">Требования</h4>
                    <div class="recipes__requirement">{{ recipe.requirements }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@use "recipes";
</style>