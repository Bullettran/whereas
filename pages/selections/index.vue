<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
    setup() {
        // @ts-ignore
        definePageMeta({
            layout: "selection",
        });
    },
    data: () => ({
        currentChoice: null,
        selectedSpecies: {
            value: "",
            name: "",
        } as any,
        characteristics: {
            str: 1,
            agi: 1,
            vit: 1,
            acc: 1,
            int: 1,
            spd: 1,
            luc: 1,
            def: 1,
        },
        upgrades: {},
        errorMessage: "" as string,
    }) as any,
    methods: {
        onChoice(type: string): void {
            this.currentChoice = type;
        },
        onSelect(val: string, name: string, characteristics: object, updates: object): void {
            this.selectedSpecies.value = val;
            this.selectedSpecies.name = name;
            this.characteristics = characteristics;
            this.upgrades = updates;
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
                    characteristics: this.characteristics,
                    upgrades: this.upgrades,
                });

                if (error) {
                    this.errorMessage = `Ошибка сохранения персонажа: ${error.message}`;
                    console.error(error);
                    return;
                }

                // Перенаправляем на другую страницу
                this.$router.push('/town/'); // Замените на нужный маршрут
            } catch (err) {
                this.errorMessage = "Неизвестная ошибка. Попробуйте позже.";
                console.error(err);
            }
        },
    },
});
</script>

<template>
    <div class="selections">
        <div class="selections__container container">
            <h1 class="selections__title">Выбор персонажа</h1>
            <div class="selections__wrap">
                <div class="selections__cards">
                    <button :class="[currentChoice === 'ranger' ? 'selections__card--active': '', 'selections__card']"
                            type="button" @click="onChoice('ranger')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/ranger/icon-ranger.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Рейнджер</div>
                    </button>
                    <button :class="[currentChoice === 'wrecker' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('wrecker')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/wrecker/icon-wrecker.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Крушитель</div>
                    </button>
                    <button :class="[currentChoice === 'arcanist' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('arcanist')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/arcanist/icon-arcanist.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Арканист</div>
                    </button>
                    <button :class="[currentChoice === 'monk' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('monk')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/monk/icon-monk.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Монах</div>
                    </button>
                    <button :class="[currentChoice === 'inferno' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('inferno')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/inferno/icon-inferno.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Инферно</div>
                    </button>
                    <button :class="[currentChoice === 'assasin' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('assasin')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/assasin/icon-assasin.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Ассасин</div>
                    </button>
                </div>
                <div class="selections__person animate">
                    <div v-if="currentChoice === 'ranger'"
                         class="selections__animate animate__ranger animate__idle"></div>
                    <div v-if="currentChoice === 'wrecker'"
                         class="selections__animate animate__wrecker animate__idle"></div>
                    <div v-if="currentChoice === 'arcanist'"
                         class="selections__animate animate__arcanist animate__idle"></div>
                    <div v-if="currentChoice === 'monk'" class="selections__animate animate__monk animate__idle"></div>
                    <div v-if="currentChoice === 'inferno'"
                         class="selections__animate animate__inferno animate__idle"></div>
                    <div v-if="currentChoice === 'assasin'"
                         class="selections__animate animate__assasin animate__idle"></div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'ranger'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">1</div>
                            </li>
                        </ul>
                    </div>
                    <h2 class="selections__subtitle">Описание</h2>
                    <div class="selections__description">
                        Рейнджер — неуловимый следопыт, чьи стрелы находят цель даже в кромешной тьме. Его дом — леса и
                        равнины, где он сливается с природой, подобно тени. Соколиный глаз и лёгкий шаг позволяют ему
                        наносить точечные удары, оставаясь незамеченным. Каждый выстрел — это вызов судьбе, а каждый
                        промах — лишь повод для новой охоты.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Прогресс:</strong></div>
                            <div class="selections__item-val">+1 к меткости каждые 5 уровней.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Особый слот:</strong></div>
                            <div class="selections__item-val">+1 к меткости.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Склонность:</strong></div>
                            <div class="selections__item-val">Приготовление пищи (бонусы к созданию блюд).</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Главный навык:</strong></div>
                            <div class="selections__item-val">Смертельный выстрел — карточка, дающая +100% к шансу
                                попадания на 1 ход.
                            </div>
                        </div>
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" data-bs-toggle="modal" data-bs-target="#accept-species"  type="button" @click="onSelect('ranger', 'Рейнджер', {
                        str: 1,
                        agi: 2,
                        vit: 1,
                        acc: 3,
                        int: 1,
                        spd: 2,
                        luc: 2,
                        def: 1,
                        },
                        {
                            progress: {
                                name: 'acc',
                                val: 1
                            },
                            slot: {
                                name: 'acc',
                                val: 1
                            },
                            card: {
                                name: 'Смертельный выстрел',
                                type: 'Атака',
                                rare: 'standard',
                                description: '+100% к шансу попадания на 1 ход',
                                count: 2,
                                icon: 'todo(kharal)',
                                bonus: { hitChance: true },
                                manaCost: 3,
                            },
                        })">Подтвердить
                        </button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'wrecker'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">2</div>
                            </li>
                        </ul>
                    </div>
                    <h2 class="selections__subtitle">Описание</h2>
                    <div class="selections__description">
                        Крушитель — несокрушимая гора, чей молот дробит скалы и врагов с равной лёгкостью. Его броня,
                        выкованная в недрах вулканов, отражает любой удар, а сердце пылает яростью клана. Он стоит на
                        передовой, принимая на себя главный удар, чтобы защитить союзников. Каждый бой для него —
                        проверка стойкости.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Прогресс:</strong></div>
                            <div class="selections__item-val">+1 к выносливости каждые 5 уровней.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Особый слот:</strong></div>
                            <div class="selections__item-val">+2 к защите</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Склонность:</strong></div>
                            <div class="selections__item-val">Кузнец (бонусы к созданию брони).</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Главный навык:</strong></div>
                            <div class="selections__item-val">Нерушимая стена — карточка, дающая +100% защиты на 1
                                ход.
                            </div>
                        </div>
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" data-bs-toggle="modal" data-bs-target="#accept-species"  type="button" @click="onSelect('wrecker', 'Крушитель', {
                        str: 3,
                        agi: 1,
                        vit: 2,
                        acc: 1,
                        int: 1,
                        spd: 1,
                        luc: 2,
                        def: 2,
                        },
                        {
                            progress: {
                                name: 'vit',
                                val: 1
                            },
                            slot: {
                                name: 'def',
                                val: 2
                            },
                            card: {
                                name: 'Нерушимая стена',
                                type: 'Защита',
                                rare: 'standard',
                                description: '+100% защиты на 1 ход',
                                count: 2,
                                icon: 'defence.png',
                                bonus: { immune: true },
                                manaCost: 3,
                            },
                        })">Подтвердить
                        </button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'arcanist'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">1</div>
                            </li>
                        </ul>
                    </div>
                    <h2 class="selections__subtitle">Описание</h2>
                    <div class="selections__description">
                        Арканист — повелитель тайн, чьи заклинания сотканы из нитей эфира. Его разум — лабиринт знаний,
                        а посох — проводник магической силы. Он манипулирует стихиями, замораживая врагов или испепеляя
                        их одним движением руки. Но за каждым заклинанием стоит цена, которую он готов заплатить ради
                        истины.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Прогресс:</strong></div>
                            <div class="selections__item-val">+1 к интеллекту каждые 5 уровней.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Особый слот:</strong></div>
                            <div class="selections__item-val">+1 к регенерации маны.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Склонность:</strong></div>
                            <div class="selections__item-val">Портняжное дело (бонусы к созданию ткани).</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Главный навык:</strong></div>
                            <div class="selections__item-val">Ледяной плен — карточка, замораживающая противника на 1
                                ход.
                            </div>
                        </div>
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" data-bs-toggle="modal" data-bs-target="#accept-species"  type="button" @click="onSelect('arcanist', 'Арканист', {
                        str: 1,
                        agi: 2,
                        vit: 1,
                        acc: 2,
                        int: 3,
                        spd: 2,
                        luc: 1,
                        def: 1,
                        },
                        {
                            progress: {
                                name: 'int',
                                val: 1
                            },
                            slot: {
                                name: 'mana',
                                val: 1
                            },
                            card: {
                                name: 'Ледяной плен',
                                type: 'Магия',
                                rare: 'standard',
                                description: 'заморозка противника на 1 ход',
                                count: 2,
                                icon: '',
                                bonus: { freeze: true },
                                manaCost: 3,
                            },
                        })">Подтвердить
                        </button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'monk'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">2</div>
                            </li>
                        </ul>
                    </div>
                    <h2 class="selections__subtitle">Описание</h2>
                    <div class="selections__description">
                        Монах — воплощение гармонии, чья душа чиста, как горный родник. Его кулаки — оружие, закалённое
                        годами тренировок, а разум — щит от соблазнов. Он движется с грацией ветра, уклоняясь от ударов
                        и очищая мир от скверны. Для монаха бой — это путь к просветлению, а не к разрушению.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Прогресс:</strong></div>
                            <div class="selections__item-val">+1 к удаче каждые 5 уровней.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Особый слот:</strong></div>
                            <div class="selections__item-val">+2% к шансу уворота.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Склонность:</strong></div>
                            <div class="selections__item-val">Алхимия (бонусы к созданию зелий).</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Главный навык:</strong></div>
                            <div class="selections__item-val">Чистота духа — карточка, снимающая все дебаффы с
                                персонажа.
                            </div>
                        </div>
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" data-bs-toggle="modal" data-bs-target="#accept-species"  type="button" @click="onSelect('monk', 'Монах', {
                        str: 2,
                        agi: 2,
                        vit: 2,
                        acc: 1,
                        int: 1,
                        spd: 2,
                        luc: 1,
                        def: 2,
                        },
                        {
                            progress: {
                                name: 'luc',
                                val: 1
                            },
                            slot: {
                                name: 'dodge',
                                val: 2
                            },
                            card: {
                                name: 'Чистота духа',
                                type: 'Защита',
                                rare: 'standard',
                                description: 'Снимает дебаффы с персонажа',
                                count: 2,
                                icon: '',
                                bonus: { dispel: true },
                                manaCost: 3,
                            },
                        })">Подтвердить
                        </button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'inferno'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">2</div>
                            </li>
                        </ul>
                    </div>
                    <h2 class="selections__subtitle">Описание</h2>
                    <div class="selections__description">
                        Инферно — пламя войны, чей меч горит жарче солнца. Его атаки подобны огненному шторму,
                        оставляющему за собой лишь пепел. Доспехи, пропитанные магией вулканов, делают его неуязвимым
                        для слабых. Он сражается не ради славы, а ради искры, что пылает в его душе.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Прогресс:</strong></div>
                            <div class="selections__item-val">+1 к силе каждые 5 уровней.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Особый слот:</strong></div>
                            <div class="selections__item-val">+2 к силе.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Склонность:</strong></div>
                            <div class="selections__item-val">Металлургия (бонусы к созданию оружия).</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Главный навык:</strong></div>
                            <div class="selections__item-val">Лечение души — карточка восстанавливающая здоровье за 1
                                ход.
                            </div>
                        </div>
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" data-bs-toggle="modal" data-bs-target="#accept-species"  type="button" @click="onSelect('inferno', 'Инферно', {
                        str: 2,
                        agi: 2,
                        vit: 3,
                        acc: 1,
                        int: 1,
                        spd: 1,
                        luc: 1,
                        def: 2,
                        },
                        {
                            progress: {
                                name: 'str',
                                val: 1
                            },
                            slot: {
                                name: 'str',
                                val: 2
                            },
                            card: {
                                name: 'Лечение души',
                                type: 'Бафф',
                                rare: 'standard',
                                description: 'Восстанавливает здоровье за 1 ход',
                                count: 2,
                                icon: '',
                                bonus: { regen: 1 },
                                manaCost: 3,
                            },
                        })">Подтвердить
                        </button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'assasin'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">1</div>
                            </li>
                        </ul>
                    </div>
                    <h2 class="selections__subtitle">Описание</h2>
                    <div class="selections__description">
                        Ассасин — призрак ночи, чьи клинки шепчут о смерти. Он скользит в тенях, нанося смертельные
                        удары, прежде чем враг успеет моргнуть. Его движения точны, как механизм часов, а глаза холодны,
                        как сталь. Ассасин не знает пощады, но его сердце хранит тайну, которую никто не раскроет.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Прогресс:</strong></div>
                            <div class="selections__item-val">+1 к ловкости каждые 5 уровней.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Особый слот:</strong></div>
                            <div class="selections__item-val">+2% к шансу критического удара.</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Склонность:</strong></div>
                            <div class="selections__item-val">Собирательство (бонусы к поиску редких ресурсов).</div>
                        </div>
                        <div class="selections__items">
                            <div class="selections__item-name"><strong>Главный навык:</strong></div>
                            <div class="selections__item-val">Кровавый танец — карточка, вызывающая кровотечение у
                                противника на 1 ход.
                            </div>
                        </div>
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" data-bs-toggle="modal" data-bs-target="#accept-species"  type="button" @click="onSelect('assasin', 'Ассасин', {
                        str: 1,
                        agi: 3,
                        vit: 1,
                        acc: 2,
                        int: 2,
                        spd: 2,
                        luc: 1,
                        def: 1,
                        },
                        {
                            progress: {
                                name: 'agi',
                                val: 1
                            },
                            slot: {
                                name: 'crit',
                                val: 2
                            },
                            card: {
                                name: 'Кровавый танец',
                                type: 'Атака',
                                rare: 'standard',
                                description: 'Вызывает кровотечение у противника на 1 ход',
                                count: 2,
                                icon: '',
                                bonus: { bleed: 1 },
                                manaCost: 3,
                            },
                        })">Подтвердить
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
                <button class="accept__button button button--metal" type="button" @click="onAccept">Подвердить</button>
                <button class="accept__button button button--metal" type="button" data-bs-dismiss="modal">Отменить
                </button>
            </div>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/selections/styles";
</style>