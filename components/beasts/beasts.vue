<script lang="ts">
import { defineComponent } from "vue";
import Swiper from "swiper";

interface Beast {
    id: string;
    name: string;
    icon: string;
    idle: string;
    description: string;
    stats: {
        attack: number,
        critical: number,
        hp: number,
        mp: number,
        speed: number,
        defence: number,
    };
    abilities: string[];
}

export default defineComponent({
    name: "Beasts",
    data: () => ({
        selectedBeast: null as Beast | null,
        beasts: [
            {
                id: "red-demon",
                name: "Красный демон",
                icon: "/images/sprites/mobs/red-flying-demon/icon.png",
                idle: "/images/sprites/mobs/red-flying-demon/idle.png",
                description: "Красный демон — дитя огненной преисподней, чья кожа пылает, как угли. Рождённый из искр древнего вулкана, он мал, но коварен. Его когти оставляют огненные шрамы, а рык повергает врагов в ужас. В бою он танцует, как пламя, уклоняясь и атакуя. Легенды говорят, что он стережёт портал в ад, и лишь победивший его раскроет его тайны… или сгорит.",
                stats: {
                    attack: 4,
                    critical: 0,
                    hp: 10,
                    mp: 6,
                    speed: 1,
                    defence: 2,
                },
                abilities: [
                    "Огненный коготь - вешает кровотечение каждые 2 хода",
                ],
            },
        ],
    }),
    methods: {
        selectBeast(beast: Beast) {
            this.selectedBeast = beast;
        },
        getBeastImageClass(id: string): string {
            return `beasts__image--${id}`;
        },
    },
    mounted() {
        new Swiper(".js-beasts-slider", {
            slidesPerView: "auto",
            spaceBetween: 24,
            direction: "vertical",
        });
    },
});
</script>

<template>
    <div class="beasts">
        <h2 class="beasts__title">
            Бестиарий
        </h2>
        <div class="beasts__grid">
            <div class="beasts__items js-beasts-slider">
                <div class="swiper-wrapper">
                    <div
                        v-for="beast in beasts"
                        :key="beast.id"
                        class="beasts__item swiper-slide"
                        @click="selectBeast(beast)"
                        :class="{ 'beasts__item--active': selectedBeast?.id === beast.id }"
                    >
                        <img
                            class="beasts__image"
                            :class="getBeastImageClass(beast.id)"
                            :src="beast.icon"
                            :alt="beast.name"
                        >
                    </div>
                </div>
            </div>
            <div class="beasts__block" v-if="selectedBeast">
                <div class="beasts__wrap">
                    <div class="beasts__wrapper">
                        <div class="beasts__beast beasts__beast--idle"></div>
                    </div>
                    <div class="beasts__stats">
                        <h4 class="beasts__subtitle">Характеристики:</h4>
                        <ul class="beasts__list list">
                            <li>Здоровье: {{ selectedBeast.stats?.hp }}</li>
                            <li>Мана: {{ selectedBeast.stats?.mp }}</li>
                            <li>Урон: {{ selectedBeast.stats?.attack }}</li>
                            <li>Защита: {{ selectedBeast.stats?.defence }}</li>
                            <li>Скорость: {{ selectedBeast.stats?.speed }}</li>
                            <li>Крит. урон: {{ selectedBeast.stats?.critical }}%</li>
                        </ul>
                    </div>
                </div>
                <div class="beasts__description">
                    <h3 class="beasts__beast-name">{{ selectedBeast.name }}</h3>
                    <p class="beasts__beast-desc">{{ selectedBeast.description }}</p>
                    <div class="beasts__abilities">
                        <h4>Способности:</h4>
                        <ul class="beasts__list list">
                            <li v-for="(ability, index) in selectedBeast.abilities" :key="index">{{ ability }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "beasts";
</style>