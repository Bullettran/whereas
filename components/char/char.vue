<script lang="ts">
import { defineComponent } from "vue";
import { usePersonState } from "~/stores/person";

export default defineComponent({
    name: "Char",
    setup() {
        const char = usePersonState();
        const currentHp = 60;
        const currentMp = 20;
        const currentExp = 18;
        const maxExp = 100;
        const maxHp = 100;
        const maxMp = 100;
        const freeCount = 2;
        return {
            currentHp,
            currentMp,
            currentExp,
            maxExp,
            maxMp,
            maxHp,
            freeCount,
            char,
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
            return (this.char.currentHp / this.char.characteristic.maxHp) * 100;
        },
        // Процент MP
        mpPercentage() {
            return (this.char.currentMp / this.char.characteristic.maxMp) * 100;
        },
        // Процент EXP
        expPercentage() {
            return (this.char.currentExp / (this.char.level * 10)) * 100;
        },
        physicalDmg() {
            let dmg = 1;
            let bonusStr = Math.floor(this.char.characteristic.str / 2);
            let bonusAgi = Math.floor(this.char.characteristic.agi / 3);
            return dmg + bonusStr + bonusAgi;
        },
        mageDmg() {
            let dmg = 1;
            let bonusInt = Math.floor(this.char.characteristic.int / 2);
            let bonusAgi = Math.floor(this.char.characteristic.agi / 3);
            return dmg + bonusInt + bonusAgi;
        },
        physicalDef() {
            let def = 1;
            let bonusDef = Math.floor(this.char.characteristic.def / 2);
            let bonusStr = Math.floor(this.char.characteristic.str / 2);
            let sum = def + bonusDef + bonusStr;
            return sum;
        },
        mageDef() {
            let def = 1;
            let bonusDef = Math.floor(this.char.characteristic.def / 2);
            let bonusInt = Math.floor(this.char.characteristic.int / 2);
            let sum = def + bonusDef + bonusInt;
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
            return sum;
        },
    },
});
</script>

<template>
    <div class="char">
        <pre>{{ char }}</pre>
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
                        {{ char.currentHp }}/{{ char.characteristic.maxHp }}
                    </div>
                </div>
            </div>
            <div class="char__wrap">
                <ProgressBar class="char__mp" :value="mpPercentage" :showValue="false"></ProgressBar>
                <div class="char__description">
                    Мана
                    <div class="char__value">
                        {{ char.currentMp }}/{{ char.characteristic.maxMp }}
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
                        <nuxt-icon class="block__icon block__icon--health" name="stats/staff" />
                        {{ mageDmg }}
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/shield" />
                        {{ physicalDef }}&nbsp;%
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/mage-def" />
                        {{ mageDef }}&nbsp;%
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
                <Inventory />
            </div>
        </div>

    </Modal>
</template>

<style scoped lang="scss">
@use "char";
@use "block";
@use "characteristic";
</style>