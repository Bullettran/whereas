<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Achievements",
    setup() {
        const achievements = [
            {
                id: 1,
                name: "Первое достижение",
                description: "Вы вошли в игру",
                need: "Первый раз зайти в игру",
                reward: {
                    type: "freeCount", // freeCount, stats, recipes, combo
                    value: 1,
                    name: "Очки прокачки",
                    id: "",
                },
            },
            {
                id: 2,
                name: "Второе достижение",
                description: "Вы достигли 5 уровня",
                need: "Уровень больше или равен 5",
                reward: {
                    type: "recipes", // freeCount, stats, recipes, combo
                    value: 1,
                    name: "Рецепт маны ур. 1",
                    id: "recipe-mp-1",
                },
            },
        ];
        return {
            achievements,
        };
    },
    data: () => ({
        typeMap: new Map([
            ["recipes", "Рецепт"],
            ["freeCount", "Очки навыков"],
            ["combo", "Дополнительные улучшения"],
            ["stats", "Характеристики"],
        ]),
    }),
    methods: {
        computeTypeMap(type: string) {
            return this.typeMap.get(type);
        },
    },
});
</script>

<template>
    <div class="achievements">
        <h2 class="achievements__title">Достижения</h2>
        <div class="achievements__items">
            <div class="achievements__item" v-for="(item, index) in achievements" :key="index">
                <div class="achievements__name">{{ item.name }}</div>
                <div class="achievements__description">{{ item.description }}</div>
                <div class="achievements__rewards">
                    <div class="achievements__reward">Награда</div>
                    <div class="achievements__values">
                        <div class="achievements__type">{{ computeTypeMap(item.reward.type) }}</div>
                        <div class="achievements__block">
                            <div class="achievements__type">{{ item.reward.name }}</div>
                            <div class="achievements__value">x{{ item.reward.value }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "achievements";
</style>