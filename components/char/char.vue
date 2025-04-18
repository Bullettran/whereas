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
            this.char.freeCount = this.char.freeCount - 1;
            this.char.setValChars(val, type);
        },
    },
    computed: {
        // Процент HP
        hpPercentage() {
            return (this.char.currentHp / this.maxHp) * 100;
        },
        // Процент MP
        mpPercentage() {
            return (this.char.currentMp / this.maxMp) * 100;
        },
        // Процент EXP
        expPercentage(): any {
            const expNeeded = this.char.level * 10;
            // Если опыт превышает необходимый для уровня
            if (this.char.currentExp >= expNeeded) {
                const excessExp = this.char.currentExp - expNeeded;
                this.char.setUpLevel();
                this.char.currentExp = excessExp; // Переносим избыточный опыт

                // Рекурсивно проверяем, не хватает ли избыточного опыта для следующего уровня
                if (this.char.currentExp >= this.char.level * 10) {
                    return this.expPercentage;
                }
            }
            return (this.char.currentExp / expNeeded) * 100;
        },
        physicalDmg() {
            let dmg = 1;
            let bonusStr = Math.floor(this.char.characteristic.str / 2);
            let bonusAgi = Math.floor(this.char.characteristic.agi / 3);
            return dmg + bonusStr + bonusAgi;
        },
        physicalDef() {
            let def = 1;
            let bonusDef = Math.floor(this.char.characteristic.def / 2);
            let bonusStr = Math.floor(this.char.characteristic.str / 2);
            let sum = def + bonusDef + bonusStr;
            if (sum > 70) {
                return 70
            } else {
                return sum
            }
            return sum;
        },
        maxHp() {
            let hp = 5;
            let bonus = Math.floor(this.char.characteristic.vit / 2);
            return hp + bonus;
        },
        maxMp() {
            let mp = 5;
            let bonus = Math.floor(this.char.characteristic.int / 2);
            return mp + bonus;
        },
        speed() {
            let spd = 1;
            let bonusSpb = Math.floor(this.char.characteristic.spd / 2);
            let bonusAgi = Math.floor(this.char.characteristic.agi / 3);
            return spd + bonusSpb + bonusAgi;
        },
        dodge() {
            let dodge = 0;
            let bonusAgi = Math.floor(this.char.characteristic.agi / 2);
            let bonusLuc = Math.floor(this.char.characteristic.luc / 2);
            let sum = dodge + bonusAgi + bonusLuc;
            if (sum > 30) {
                return 30;
            } else {
                return sum;
            }
        },
        criticalDmg() {
            let critical = 0;
            let bonusAgi = Math.floor(this.char.characteristic.agi / 3);
            let bonusLuc = Math.floor(this.char.characteristic.luc / 3);
            let bonusAcc = Math.floor(this.char.characteristic.acc / 2);
            let sum = critical + bonusAgi + bonusLuc + bonusAcc;
            if (sum > 50) {
                return 50;
            } else {
                return sum;
            }
        },
        hitChance() {
            let hit = 50;
            let bonusAcc = this.char.characteristic.acc;
            let bonusLuc = Math.floor(this.char.characteristic.luc / 3);
            let bonusInt = Math.floor(this.char.characteristic.int / 3);
            let sum = hit + bonusLuc + bonusAcc + bonusInt;
            if (sum > 100) {
                return 100
            } else {
                return sum;
            }
        },
    },
    mounted() {
        setTimeout(() => {
            this.char.currentExp = 1800;
        }, 3000)
    }
});
</script>

<template>
    <div class="char">
        <button class="char__button button" type="button" data-bs-toggle="modal"
                data-bs-target="#chars-stats">
            <nuxt-img class="char__image" src="/images/sprites/persons/arcanist/icon-arcanist.png"
                      alt="Иконка персонажа" />
        </button>
        <div class="char__health">
            <div class="char__wrap">
                <ProgressBar class="char__hp" :value="hpPercentage" :showValue="false"></ProgressBar>
                <div class="char__description">
                    Здоровье
                    <div class="char__value">
                        {{ char.currentHp }}/{{ maxHp }}
                    </div>
                </div>
            </div>
            <div class="char__wrap">
                <ProgressBar class="char__mp" :value="mpPercentage" :showValue="false"></ProgressBar>
                <div class="char__description">
                    Мана
                    <div class="char__value">
                        {{ char.currentMp }}/{{ maxMp }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Modal size="lg" id="chars-stats">
        <div class="block">
            <div class="block__block">
                <div class="block__wrapper">
                    <h3 class="block__title">Характеристики</h3>
                    <div class="block__counts">Доступно очков {{ char.freeCount }}</div>
                </div>
                <div class="block__characteristic characteristic">
                    <ul class="characteristic__main list">
                        <li class="characteristic__item">
                            <div class="characteristic__name">Сила</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.str }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'str')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Ловкость</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.agi }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'agi')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Выносливость</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.vit }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'vit')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Меткость</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.acc }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'acc')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Интелект</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.int }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'int')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Скорость</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.spd }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'spd')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Удача</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.luc }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'luc')">+
                                </button>
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Защита</div>
                            <div class="characteristic__value">
                                {{ char.characteristic.def }}
                                <button v-if="char.freeCount" class="characteristic__plus button" type="button"
                                        @click="onUpChars(1, 'def')">+
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="block__wrapper">
                    <h3 class="block__title">Статы</h3>
                    <div class="block__level">Ур. {{ char.level }}</div>
                    <div class="block__exp">
                        <ProgressBar class="block__progress" :value="expPercentage" :showValue="false"></ProgressBar>
                        <div class="block__value">
                            Опыт {{ char.currentExp }}/{{ char.level * 10 }}
                        </div>
                    </div>
                </div>

                <div class="block__stats">
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/heart" />
                        <div class="block__current">
                            {{ char.currentHp }}/{{ maxHp }}
                        </div>
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/mana" />
                        {{ char.currentMp }}/{{ maxMp }}
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--health" name="stats/dmg" />
                        {{ physicalDmg }}
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/shield" />
                        {{ physicalDef }}&nbsp;%
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/speed" />
                        {{ speed }}
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/critical" />
                        {{ criticalDmg }}&nbsp;%
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/dodge" />
                        {{ dodge }}&nbsp;%
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/hit" />
                        {{ hitChance }}&nbsp;%
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
</style>