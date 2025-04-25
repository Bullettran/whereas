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
        currentHp: number;
        currentMp: number;
        str: number;
        def: number;
        luc: number;
        spd: number;
        int: number;
        acc: number;
        vit: number;
        agi: number;
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
                    currentHp: 25,
                    currentMp: 15,
                    str: 5,
                    def: 0,
                    luc: 1,
                    spd: 3,
                    int: 3,
                    acc: 5,
                    vit: 1,
                    agi: 1,
                },
                abilities: [
                    "Огненный коготь - вешает кровоток каждые 2 хода",
                ],
            },
            {
                id: "red-demon",
                name: "Красный демон",
                icon: "/images/sprites/mobs/red-flying-demon/icon.png",
                idle: "/images/sprites/mobs/red-flying-demon/idle.png",
                description: "Красный демон — порождение огненных глубин преисподней, чья кожа пылает, как раскалённые угли. Говорят, он был рождён из искр древнего вулкана, чья ярость уничтожила целое королевство. Этот младший демон, хоть и невелик ростом, обладает коварным нравом и обжигающей силой. Его когти оставляют за собой огненные шрамы, а демонический рык заставляет даже самых стойких воинов дрожать от страха. В бою он танцует, словно пламя, ускользая от ударов и нанося яростные атаки. Легенды гласят, что Красный демон охраняет тайный портал в адский мир, и лишь тот, кто одолеет его, сможет раскрыть его секреты… или сгореть в попытке.",
                stats: {
                    currentHp: 25,
                    currentMp: 15,
                    str: 5,
                    def: 0,
                    luc: 1,
                    spd: 3,
                    int: 3,
                    acc: 5,
                    vit: 1,
                    agi: 1,
                },
                abilities: [
                    "Огненный коготь - наносит урон + поджигает",
                    "Демонический рык - снижает защиту врага",
                ],
            },
            {
                id: "red-demon",
                name: "Красный демон",
                icon: "/images/sprites/mobs/red-flying-demon/icon.png",
                idle: "/images/sprites/mobs/red-flying-demon/idle.png",
                description: "Красный демон — порождение огненных глубин преисподней, чья кожа пылает, как раскалённые угли. Говорят, он был рождён из искр древнего вулкана, чья ярость уничтожила целое королевство. Этот младший демон, хоть и невелик ростом, обладает коварным нравом и обжигающей силой. Его когти оставляют за собой огненные шрамы, а демонический рык заставляет даже самых стойких воинов дрожать от страха. В бою он танцует, словно пламя, ускользая от ударов и нанося яростные атаки. Легенды гласят, что Красный демон охраняет тайный портал в адский мир, и лишь тот, кто одолеет его, сможет раскрыть его секреты… или сгореть в попытке.",
                stats: {
                    currentHp: 25,
                    currentMp: 15,
                    str: 5,
                    def: 0,
                    luc: 1,
                    spd: 3,
                    int: 3,
                    acc: 5,
                    vit: 1,
                    agi: 1,
                },
                abilities: [
                    "Огненный коготь - наносит урон + поджигает",
                    "Демонический рык - снижает защиту врага",
                ],
            },
            {
                id: "red-demon",
                name: "Красный демон",
                icon: "/images/sprites/mobs/red-flying-demon/icon.png",
                idle: "/images/sprites/mobs/red-flying-demon/idle.png",
                description: "Красный демон — порождение огненных глубин преисподней, чья кожа пылает, как раскалённые угли. Говорят, он был рождён из искр древнего вулкана, чья ярость уничтожила целое королевство. Этот младший демон, хоть и невелик ростом, обладает коварным нравом и обжигающей силой. Его когти оставляют за собой огненные шрамы, а демонический рык заставляет даже самых стойких воинов дрожать от страха. В бою он танцует, словно пламя, ускользая от ударов и нанося яростные атаки. Легенды гласят, что Красный демон охраняет тайный портал в адский мир, и лишь тот, кто одолеет его, сможет раскрыть его секреты… или сгореть в попытке.",
                stats: {
                    currentHp: 25,
                    currentMp: 15,
                    str: 5,
                    def: 0,
                    luc: 1,
                    spd: 3,
                    int: 3,
                    acc: 5,
                    vit: 1,
                    agi: 1,
                },
                abilities: [
                    "Огненный коготь - наносит урон + поджигает",
                    "Демонический рык - снижает защиту врага",
                ],
            },
            {
                id: "red-demon",
                name: "Красный демон",
                icon: "/images/sprites/mobs/red-flying-demon/icon.png",
                idle: "/images/sprites/mobs/red-flying-demon/idle.png",
                description: "Красный демон — порождение огненных глубин преисподней, чья кожа пылает, как раскалённые угли. Говорят, он был рождён из искр древнего вулкана, чья ярость уничтожила целое королевство. Этот младший демон, хоть и невелик ростом, обладает коварным нравом и обжигающей силой. Его когти оставляют за собой огненные шрамы, а демонический рык заставляет даже самых стойких воинов дрожать от страха. В бою он танцует, словно пламя, ускользая от ударов и нанося яростные атаки. Легенды гласят, что Красный демон охраняет тайный портал в адский мир, и лишь тот, кто одолеет его, сможет раскрыть его секреты… или сгореть в попытке.",
                stats: {
                    currentHp: 25,
                    currentMp: 15,
                    str: 5,
                    def: 0,
                    luc: 1,
                    spd: 3,
                    int: 3,
                    acc: 5,
                    vit: 1,
                    agi: 1,
                },
                abilities: [
                    "Огненный коготь - наносит урон + поджигает",
                    "Демонический рык - снижает защиту врага",
                ],
            },
        ],
    }),
    methods: {
        selectBeast(beast: Beast) {
            this.selectedBeast = beast;
        },
        getStat(target: "person" | "mob", stat: keyof Beast["stats"]): number {
            if (target === "mob" && this.selectedBeast) {
                return this.selectedBeast.stats[stat];
            }
            return 0; // Для person можно добавить логику, если потребуется
        },
        maxHp(target: "person" | "mob", bonus: number = 0): number {
            const hp = 5;
            const vit = this.getStat(target, "vit");
            return hp + Math.floor(vit / 2) + bonus;
        },
        // Максимальная мана
        maxMp(target: "person" | "mob", bonus: number = 0): number {
            const mp = 5;
            const int = Number(this.getStat(target, "int"));
            return mp + Math.floor(int / 2) + bonus;
        },
        // Физический урон
        physicalDmg(target: "person" | "mob", bonus: number = 0): number {
            const str = this.getStat(target, "str");
            const agi = this.getStat(target, "agi");
            const int = this.getStat(target, "int");
            const baseDmg = 1;
            return baseDmg + Math.floor(str / 3) + Math.floor(int / 3) + Math.floor(agi / 3) + bonus;
        },
        // Физическая защита
        physicalDef(target: "person" | "mob", bonus: number = 0): number {
            const def = this.getStat(target, "def");
            const str = this.getStat(target, "str");
            const sum = 1 + Math.floor(def / 2) + Math.floor(str / 2) + bonus;
            return Math.min(sum, 70);
        },
        // Скорость
        speed(target: "person" | "mob", bonus: number = 0): number {
            const spd = this.getStat(target, "spd");
            const agi = this.getStat(target, "agi");
            return 1 + Math.floor(spd / 2) + Math.floor(agi / 3) + bonus;
        },
        // Уклонение
        dodge(target: "person" | "mob", bonus: number = 0): number {
            const agi = this.getStat(target, "agi");
            const luc = this.getStat(target, "luc");
            const sum = Math.floor(agi / 2) + Math.floor(luc / 2) + bonus;
            return Math.min(sum, 30);
        },
        // Критический урон
        criticalDmg(target: "person" | "mob", bonus: number = 0): number {
            const agi = this.getStat(target, "agi");
            const luc = this.getStat(target, "luc");
            const acc = this.getStat(target, "acc");
            const sum = Math.floor(agi / 3) + Math.floor(luc / 3) + Math.floor(acc / 2) + bonus;
            return Math.min(sum, 50);
        },
        // Шанс попадания
        hitChance(target: "person" | "mob", bonus: number = 0): number {
            const acc = this.getStat(target, "acc");
            const luc = this.getStat(target, "luc");
            const int = this.getStat(target, "int");
            const sum = 50 + acc + Math.floor(luc / 3) + Math.floor(int / 3) + bonus;
            return Math.min(sum, 100);
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
                        :class="{ 'active': selectedBeast?.id === beast.id }"
                    >
                        <nuxt-img
                            class="beasts__image"
                            :class="getBeastImageClass(beast.id)"
                            :src="beast.icon"
                            :alt="beast.name"
                        />
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
                            <li>Здоровье: {{ maxHp("mob") }} HP</li>
                            <li>Мана: {{ maxMp("mob") }} MP</li>
                            <li>Урон: {{ physicalDmg("mob") }}</li>
                            <li>Защита: {{ physicalDef("mob") }}</li>
                            <li>Скорость: {{ speed("mob") }}</li>
                            <li>Крит. урон: {{ criticalDmg("mob") }}%</li>
                            <li>Уклонение: {{ dodge("mob") }}%</li>
                            <li>Шанс попадания: {{ hitChance("mob") }}%</li>
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