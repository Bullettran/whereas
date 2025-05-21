<script lang="ts">
import { defineComponent } from "vue";
import { usePersonState } from "~/stores/person";
// import { createClient } from "@supabase/supabase-js";

export default defineComponent({
    name: "Char",
    async setup() {
        const char = usePersonState();
        const inventory = reactive([
            { id: "herb-green", name: "Зеленая трава", icon: "🌿", count: 20, type: "material", description: "Простая трава" },
            { id: "beast-milk", name: "Молоко зверя", icon: "⚗️", count: 40, type: "material", description: "Простое молоко" },
            {
                id: "shield1", name: "Щит", icon: "🛡️", count: 1, type: "equip", description: "Щит со статами", stats: {
                    str: 1,
                    def: 0,
                    luc: 0,
                    spd: 0,
                    int: 0,
                    acc: 0,
                    vit: 1,
                    agi: 0,
                },
                set: {
                    type: "",
                },
            },
            {
                id: "weapon1", name: "Мечи", icon: "⚔️", count: 1, type: "weapon",
                description: "Оружие со статами",
                stats: {
                    str: 1,
                    def: 0,
                    luc: 0,
                    spd: 2,
                    int: 0,
                    acc: 0,
                    vit: 0,
                    agi: 0,
                },
                set: {
                    type: "",
                },
                buffs: {
                    value: 0,
                    type: "",
                },
            },
            {
                id: "potion1",
                name: "Зелье маны",
                icon: "️🧪",
                count: 2,
                type: "potion",
                description: "Восполняет ману на 1 ед.",
                buffs: {
                    value: 1,
                    type: "mp",
                },
            },
        ]);

        return {
            char,
            inventory,
        };
    },
    methods: {
        onUpChars(val: number, type: string): void {
            this.char.character.game_stats.freeCount = this.char.character.game_stats.freeCount - 1;
            this.char.setValChars(val, type);
        },
        profPercentage(exp:number, needExp: number): any {
            return (exp / needExp) * 100;
        }
    },
    computed: {
        // Процент HP
        // hpPercentage() {
        //     return (this.maxHp / this.maxHp) * 100;
        // },
        // // Процент MP
        // mpPercentage() {
        //     return (this.maxMp / this.maxMp) * 100;
        // },
        // Процент EXP
        expPercentage(): any {
            const expNeeded = this.char.character.game_stats.level * 10;
            // Если опыт превышает необходимый для уровня
            if (this.char.character.game_stats.currentExp >= expNeeded) {
                const excessExp = this.char.character.game_stats.currentExp - expNeeded;
                this.char.setUpLevel();
                this.char.character.game_stats.currentExp = excessExp; // Переносим избыточный опыт

                // Рекурсивно проверяем, не хватает ли избыточного опыта для следующего уровня
                if (this.char.character.game_stats.currentExp >= this.char.character.game_stats.level * 10) {
                    return this.expPercentage;
                }
            }
            return (this.char.character.game_stats.currentExp / expNeeded) * 100;
        },
    },
    mounted() {
    }
});
</script>

<template>
    <div class="char">
        <button class="char__button button" type="button" data-bs-toggle="modal"
                data-bs-target="#chars-stats">
            <nuxt-img class="char__image" :src="`/images/sprites/persons/${char.character.species}/icon-${char.character.species}.png`"
                      alt="Иконка персонажа" />
        </button>
        <div class="char__health">
<!--            <div class="char__wrap">-->
<!--                <ProgressBar class="char__hp" :value="hpPercentage" :showValue="false"></ProgressBar>-->
<!--                <div class="char__description">-->
<!--                    Здоровье-->
<!--                    <div class="char__value">-->
<!--                        {{ maxHp }}/{{ maxHp }}-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="char__wrap">-->
<!--                <ProgressBar class="char__mp" :value="mpPercentage" :showValue="false"></ProgressBar>-->
<!--                <div class="char__description">-->
<!--                    Мана-->
<!--                    <div class="char__value">-->
<!--                        {{ maxMp }}/{{ maxMp }}-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
    <Modal size="lg" id="chars-stats">
        <div class="block">
            <div class="block__block">
                <div class="block__wrapper">
                    <h3 class="block__title">Характеристики</h3>
                    <div class="block__counts">Доступно очков {{ char.character.game_stats.freeCount }}</div>
                </div>
                <div class="block__characteristic characteristic">
                    <ul class="characteristic__main list">
                        <li class="characteristic__item">
                            <div class="characteristic__name">Атака</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.attack }}
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'attack')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Крит. шанс</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.critical }}%
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'critical')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Здоровье</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.hp }}
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'hp')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Мана</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.mp }}
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'mp')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Меткость</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.hitChance }}%
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'hitChance')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Шанс уворота</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.dodge }}
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'dodge')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Скорость</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.speed }}
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'speed')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Защита</div>
                            <div class="characteristic__value">
                                {{ char.character.stats.defence }}
                                <button v-if="char.character.game_stats.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'defence')">+
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="block__line"></div>
                <div class="block__wrapper">
                    <h3 class="block__title">Профессии</h3>
                    <div class="block__level">Ур. {{ char.character.game_stats.level }}</div>
                    <div class="block__exp">
                        <ProgressBar class="block__progress" :value="expPercentage" :showValue="false"></ProgressBar>
                        <div class="block__value">
                            Опыт {{ char.character.game_stats.currentExp }}/{{ char.character.game_stats.level * 10 }}
                        </div>
                    </div>
                </div>

                <div class="block__professions prof">
                    <div class="prof__item" v-for="(prof, index) in char.character.professions" :key="index">
                        <div class="prof__name">{{prof.short}}</div>
                        <div class="prof__exp">
                            <div class="prof__wrap">
                                <ProgressBar class="prof__progress" :value="profPercentage(prof.exp, prof.needExp)" :showValue="false"></ProgressBar>
                                <div class="prof__description">
                                    Опыт
                                    <div class="prof__value">
                                        {{ prof.exp }}/{{ prof.needExp }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="prof__lvl">Ур. {{prof.lvl}}</div>
                    </div>
                </div>
            </div>
            <div class="block__wrap">
                <Equip />
                <Inventory :inventory="inventory" />
            </div>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
@use "char";
@use "block";
@use "characteristic";
@use "prof";
</style>