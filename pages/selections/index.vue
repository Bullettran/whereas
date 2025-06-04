<script lang="ts">
import { defineComponent } from "vue";

interface Character {
    value: string;
    name: string;
    stats: {
        attack: number;
        critical: number;
        hp: number;
        mp: number;
        hitChance: number;
        dodge: number;
        speed: number;
        defence: number;
    };
    description: string;
    professions: {
        name: string;
        short: string;
        lvl: number;
        description: string;
        exp: number;
        needExp: number;
    };
}

export default defineComponent({
    name: "Index",
    setup() {
        // @ts-ignore
        definePageMeta({
            layout: "selection",
        });
    },
    data: () => ({
        currentChoice: null as string | any,
        selectedSpecies: {
            value: "",
            name: "",
        },
        stats: {
            attack: 1,
            critical: 1,
            hp: 1,
            mp: 1,
            hitChance: 1,
            dodge: 1,
            speed: 1,
            defence: 1,
        },
        professions: {},
        errorMessage: "",
        characters: [
            {
                value: "ranger",
                name: "Рейнджер",
                stats: {
                    attack: 1,
                    critical: 2,
                    hp: 5,
                    mp: 5,
                    hitChance: 52,
                    dodge: 21,
                    speed: 2,
                    defence: 0,
                },
                description: "Рейнджер — неуловимый следопыт, чьи стрелы находят цель даже в кромешной тьме. Его дом — леса и\n" +
                    "                        равнины, где он сливается с природой, подобно тени. Соколиный глаз и лёгкий шаг позволяют ему\n" +
                    "                        наносить точечные удары, оставаясь незамеченным. Каждый выстрел — это вызов судьбе, а каждый\n" +
                    "                        промах — лишь повод для новой охоты.",
                professions: {
                    name: "cooking",
                    short: "Приготовление пищи",
                    lvl: 1,
                    description: "Приготовление пищи (бонусы к созданию блюд)",
                    exp: 0,
                    needExp: 10
                },
            },
            {
                value: "wrecker",
                name: "Крушитель",
                stats: {
                    attack: 3,
                    critical: 1,
                    hp: 8,
                    mp: 5,
                    hitChance: 50,
                    dodge: 20,
                    speed: 1,
                    defence: 3,
                },
                description: "Крушитель — несокрушимая гора, чей молот дробит скалы и врагов с равной лёгкостью. Его броня,\n" +
                    "                        выкованная в недрах вулканов, отражает любой удар, а сердце пылает яростью клана. Он стоит на\n" +
                    "                        передовой, принимая на себя главный удар, чтобы защитить союзников. Каждый бой для него —\n" +
                    "                        проверка стойкости.",
                professions: {
                    name: "blacksmith",
                    short: "Кузнец",
                    lvl: 1,
                    description: "Кузнец (бонусы к созданию брони)",
                    exp: 0,
                    needExp: 10
                },
            },
            {
                value: "arcanist",
                name: "Арканист",
                stats: {
                    attack: 3,
                    critical: 1,
                    hp: 6,
                    mp: 8,
                    hitChance: 50,
                    dodge: 20,
                    speed: 2,
                    defence: 1,
                },
                description: "Арканист — повелитель тайн, чьи заклинания сотканы из нитей эфира. Его разум — лабиринт знаний,\n" +
                    "                        а посох — проводник магической силы. Он манипулирует стихиями, замораживая врагов или испепеляя\n" +
                    "                        их одним движением руки. Но за каждым заклинанием стоит цена, которую он готов заплатить ради\n" +
                    "                        истины.",
                professions: {
                    name: "tailoring",
                    short: "Портняжное дело",
                    lvl: 1,
                    description: "Портняжное дело (бонусы к созданию ткани).",
                    exp: 0,
                    needExp: 10
                },
            },
            {
                value: "monk",
                name: "Монах",
                stats: {
                    attack: 1,
                    critical: 1,
                    hp: 6,
                    mp: 5,
                    hitChance: 50,
                    dodge: 21,
                    speed: 2,
                    defence: 2,
                },
                description: "Монах — воплощение гармонии, чья душа чиста, как горный родник. Его кулаки — оружие, закалённое\n" +
                    "                        годами тренировок, а разум — щит от соблазнов. Он движется с грацией ветра, уклоняясь от ударов\n" +
                    "                        и очищая мир от скверны. Для монаха бой — это путь к просветлению, а не к разрушению.",
                professions: {
                    name: "Alchemy",
                    short: "Алхимия",
                    lvl: 1,
                    description: "Алхимия (бонусы к созданию зелий).",
                    exp: 0,
                    needExp: 10
                },
            },
            {
                value: "inferno",
                name: "Инферно",
                stats: {
                    attack: 2,
                    critical: 2,
                    hp: 7,
                    mp: 6,
                    hitChance: 50,
                    dodge: 20,
                    speed: 2,
                    defence: 3,
                },
                description: "Инферно — пламя войны, чей меч горит жарче солнца. Его атаки подобны огненному шторму,\n" +
                    "                        оставляющему за собой лишь пепел. Доспехи, пропитанные магией вулканов, делают его неуязвимым\n" +
                    "                        для слабых. Он сражается не ради славы, а ради искры, что пылает в его душе.",
                professions: {
                    name: "gunsmith",
                    short: "Оружейник",
                    lvl: 1,
                    description: "Оружейник (бонусы к созданию оружия).",
                    exp: 0,
                    needExp: 10
                },
            },
            {
                value: "assassin",
                name: "Ассасин",
                stats: {
                    attack: 3,
                    critical: 5,
                    hp: 5,
                    mp: 5,
                    hitChance: 50,
                    dodge: 20,
                    speed: 2,
                    defence: 1,
                },
                description: "Ассасин — призрак ночи, чьи клинки шепчут о смерти. Он скользит в тенях, нанося смертельные\n" +
                    "                        удары, прежде чем враг успеет моргнуть. Его движения точны, как механизм часов, а глаза холодны,\n" +
                    "                        как сталь. Ассасин не знает пощады, но его сердце хранит тайну, которую никто не раскроет.",
                professions: {
                    name: "collector",
                    short: "Коллекционер",
                    lvl: 1,
                    description: "Коллекционер (бонусы к поиску редких ресурсов).",
                    exp: 0,
                    needExp: 10
                },
            },
        ] as Character[],
    }),
    methods: {
        onChoice(type: string): void {
            this.currentChoice = type;
        },
        // @ts-ignore
        onSelect(character: Character): void {
            this.selectedSpecies.value = character.value;
            this.selectedSpecies.name = character.name;
            this.stats = character.stats;
            this.professions = character.professions;
        },

        async onAccept(): Promise<any> {
            this.errorMessage = "";

            if (!this.selectedSpecies.value) {
                this.errorMessage = "Выберите персонажа";
                return;
            }

            try {
                const { data: userData, error: authError } = await this.$supabase.auth.getUser();

                if (authError || !userData.user) {
                    this.errorMessage = "Ошибка: пользователь не авторизован";
                    return;
                }

                const userId = userData.user.id;

                // Отправляем данные в таблицу characters
                const { error } = await this.$supabase.from("characters").upsert({
                    id: userId,
                    species: this.selectedSpecies.value,
                    species_name: this.selectedSpecies.name,
                    stats: this.stats,
                    game_stats: {
                        freeCount: 0,
                        currentExp: 0,
                        level: 1,
                        currentEnergy: 10,
                        maxEnergy: 10,
                    },
                    professions: [
                        this.professions
                    ]
                });

                if (error) {
                    this.errorMessage = `Ошибка сохранения персонажа: ${error.message}`;
                    console.error(error);
                    return;
                }

                // Обновляем юзера
                const { error: updateError } = await this.$supabase.auth.updateUser({
                    data: { isSelectedSpecies: true },
                });

                if (updateError) {
                    this.errorMessage = `Ошибка обновления пользователя: ${updateError.message}`;
                    console.error(updateError);
                    return;
                }

                let button = document.querySelector(".accept__button--close");
                if (button) {
                    // @ts-ignore
                    button.click();
                }
                this.$router.push("/town/");
            } catch (err) {
                this.errorMessage = "Неизвестная ошибка. Попробуйте позже.";
                console.error(err);
            }
        },
    },
    async mounted() {
        const { data: userData, error: authError } = await this.$supabase.auth.getUser();
        if (authError || !userData.user) {
            this.errorMessage = "Ошибка: пользователь не авторизован";
            this.$router.push("/");
            return;
        }
        if (userData.user.user_metadata.isSelectedSpecies) {
            // this.$router.push("/town/");
        }
    },
});
</script>

<template>
    <div class="selections">
        <div class="selections__container container">
            <h1 class="selections__title">Выбор персонажа</h1>
            <div class="selections__wrap">
                <div class="selections__cards">
                    <button
                        v-for="char in characters"
                        :key="char.value"
                        :class="[
              currentChoice === char.value ? 'selections__card--active' : '',
              'selections__card'
            ]"
                        type="button"
                        @click="onChoice(char.value)"
                    >
                        <div class="selections__picture">
                            <nuxt-img
                                class="selections__image"
                                :src="`images/sprites/persons/${char.value}/icon-${char.value}.png`"
                                :alt="`Иконка ${char.name}`"
                            />
                        </div>
                        <div class="selections__type">{{ char.name }}</div>
                    </button>
                </div>

                <div class="selections__person animate">
                    <div
                        v-if="currentChoice"
                        :class="`selections__animate ${currentChoice} ${currentChoice}--idle`"
                    ></div>
                </div>

                <div class="selections__info" v-if="currentChoice">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item"
                                v-for="(value, stat) in characters.find(c => c.value === currentChoice)?.stats"
                                :key="stat">
                                <div class="selections__name">{{ {
                                    hp: "Здоровье",
                                    mp: "Мана",
                                    attack: "Атака",
                                    critical: "Критический шанс",
                                    hitChance: "Меткость",
                                    dodge: "Шанс уворота",
                                    speed: "Скорость",
                                    defence: "Защита",
                                }[stat] }}
                                </div>
                                <div class="selections__value">{{ value }}{{stat === "critical" || stat === "hitChance" || stat === "dodge" ? "%" : ""}}</div>
                            </li>
                        </ul>
                    </div>

                    <h2 class="selections__subtitle">Описание</h2>
                    <div class="selections__description">
                        {{ characters.find(c => c.value === currentChoice)?.description }}
                    </div>

                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Склонность:</strong></div>
                            <div class="selections__item-val">
                                {{ characters.find(c => c.value === currentChoice)?.professions?.description }}
                            </div>
                        </div>
                    </div>

                    <div class="selections__buttons">
                        <button class="selections__button button--metal"
                                data-bs-toggle="modal"
                                data-bs-target="#accept-species"
                                type="button"
                                @click="onSelect(
                                    //@ts-ignore
                                    characters.find(c => c.value === currentChoice)
                                    )"
                        >
                            Подтвердить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal size="sm" id="accept-species">
        <div class="accept">
            <h2 class="accept__title h3">Вы выбрали расу: {{ selectedSpecies.name }}</h2>
            <div class="accept__buttons">
                <button class="accept__button button button--metal" type="button" @click="onAccept">Подтвердить</button>
                <button
                    class="accept__button accept__button--close button button--metal"
                    type="button"
                    data-bs-dismiss="modal"
                >
                    Отменить
                </button>
            </div>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/selections/styles";
</style>