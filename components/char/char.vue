<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Char",
    setup() {
        const currentHp = 60;
        const currentMp = 20;
        const currentExp = 1;
        const maxExp = 100;
        const maxHp = 100;
        const maxMp = 100;
        return {
            currentHp,
            currentMp,
            currentExp,
            maxExp,
            maxMp,
            maxHp,
        };
    },
    computed: {
        // Процент HP
        hpPercentage() {
            return (this.currentHp / this.maxHp) * 100;
        },
        // Процент MP
        mpPercentage() {
            return (this.currentMp / this.maxMp) * 100;
        },
        // Процент EXP
        expPercentage() {
            return (this.currentExp / this.maxExp) * 100;
        },
        // physicalDmg() {
        //     let dmg = 1;
        //     let bonusStr = Math.floor(this.userCharacteristics.str / 2);
        //     let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
        //     return dmg + bonusStr + bonusAgi;
        // },
        // mageDmg() {
        //     let dmg = 1;
        //     let bonusInt = Math.floor(this.userCharacteristics.int / 2);
        //     let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
        //     return dmg + bonusInt + bonusAgi;
        // },
        // physicalDef() {
        //     let def = 1;
        //     let bonusDef = Math.floor(this.userCharacteristics.def / 2);
        //     let bonusStr = Math.floor(this.userCharacteristics.str / 2);
        //     let sum = def + bonusDef + bonusStr;
        //     return sum;
        // },
        // mageDef() {
        //     let def = 1;
        //     let bonusDef = Math.floor(this.userCharacteristics.def / 2);
        //     let bonusInt = Math.floor(this.userCharacteristics.int / 2);
        //     let sum = def + bonusDef + bonusInt;
        //     return sum;
        // },
        // maxHp() {
        //     let hp = 5;
        //     let bonus = Math.floor(this.userCharacteristics.vit / 2);
        //     return hp + bonus;
        // },
        // maxMp() {
        //     let mp = 5;
        //     let bonus = Math.floor(this.userCharacteristics.int / 2);
        //     return mp + bonus;
        // },
        // speed() {
        //     let spd = 1;
        //     let bonusSpb = Math.floor(this.userCharacteristics.spd / 2);
        //     let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
        //     return spd + bonusSpb + bonusAgi;
        // },
        // dodge() {
        //     let dodge = 0;
        //     let bonusAgi = Math.floor(this.userCharacteristics.agi / 2);
        //     let bonusLuc = Math.floor(this.userCharacteristics.luc / 2);
        //     let sum = dodge + bonusAgi + bonusLuc;
        //     if (sum > 30) {
        //         return 30
        //     } else {
        //         return sum
        //     }
        // },
        // criticalDmg() {
        //     let critical = 0;
        //     let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
        //     let bonusLuc = Math.floor(this.userCharacteristics.luc / 3);
        //     let bonusAcc = Math.floor(this.userCharacteristics.acc / 2);
        //     let sum = critical + bonusAgi + bonusLuc + bonusAcc;
        //     if (sum > 50) {
        //         return 50
        //     } else {
        //         return sum
        //     }
        // },
        // hitChance() {
        //     let hit = 50;
        //     let bonusAcc = this.userCharacteristics.acc;
        //     let bonusLuc = Math.floor(this.userCharacteristics.luc / 3);
        //     let bonusInt = Math.floor(this.userCharacteristics.int / 3);
        //     let sum = hit + bonusLuc + bonusAcc + bonusInt;
        //     return sum;
        // },
    },
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
                        {{ currentHp }}/{{ maxHp }}
                    </div>
                </div>
            </div>
            <div class="char__wrap">
                <ProgressBar class="char__mp" :value="mpPercentage" :showValue="false"></ProgressBar>
                <div class="char__description">
                    Мана
                    <div class="char__value">
                        {{ currentMp }}/{{ maxMp }}
                    </div>
                </div>
            </div>
            <!--            <div class="char__wrap">-->
            <!--                <div class="char__value">-->
            <!--                    {{currentExp}}/{{maxExp}}-->
            <!--                </div>-->
            <!--                <ProgressBar class="char__exp" :value="expPercentage" :showValue="false"></ProgressBar>-->
            <!--                <div class="char__description">Опыт</div>-->
            <!--            </div>-->
        </div>
    </div>
    <Modal size="lg" id="chars-stats">
        <div class="block">
            <div class="block__block">
                <h3 class="block__title">Характеристики</h3>
                <div class="block__characteristic characteristic">
                    <ul class="characteristic__main list">
                        <li class="characteristic__item">
                            <div class="characteristic__name">Сила</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.str}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1
                            </div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Ловкость</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.agi}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Выносливость</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.vit}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Меткость</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.acc}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Интелект</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.int}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Скорость</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.spd}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Удача</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.luc}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Защита</div>
<!--                            <div class="characteristic__value">{{userCharacteristics.def}}</div>-->
                            <div class="characteristic__value">
                                <button class="characteristic__plus button" type="button">+</button>
                                1</div>
                        </li>
                    </ul>
                </div>
                <h3 class="block__title">Статы</h3>
                <div class="block__stats">
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/heart" />
                        <div class="block__current">
                            {{ currentHp }}/{{ maxHp }}
                        </div>
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/mana" />
                        {{ currentMp }}/{{ maxMp }}
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--health" name="stats/dmg" />
                        <!--                            {{physicalDmg}}-->
                        2
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--health" name="stats/staff" />
                        <!--                            {{mageDmg}}-->
                        3
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/shield" />
                        <!--                            {{physicalDef}}&nbsp;%-->
                        3
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/mage-def" />
                        <!--                            {{mageDef}}&nbsp;%-->
                        4
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/speed" />
                        <!--                            {{speed}}-->
                        1
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/critical" />
                        <!--                            {{criticalDmg}}&nbsp;%-->
                        1
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/dodge" />
                        <!--                            {{dodge}}&nbsp;%-->
                        1
                    </div>
                    <div class="block__stat">
                        <nuxt-icon class="block__icon block__icon--" name="stats/hit" />
                        <!--                            {{hitChance}}&nbsp;%-->
                        1
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