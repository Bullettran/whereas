<script lang="ts">
import { usePersonState } from "~/stores/person";
import {api} from "~/api/api";

export default defineComponent({
    name: "Person",
    async setup() {
        const person = usePersonState();
        const { data, error }: any = await useFetch(`${api.characteristics}?username=${person.getLogin}`, {
            method: "GET",
        })
        const userCharacteristics = data.value.data;
        return {
            person,
            userCharacteristics
        }
    },
    props: {
        isVisibleCharacteristics: {
            required: false,
            type: Boolean,
            default: true,
        },
    },
    data: () => ({
        characteristic: "first" as string,
        currentHp: 1 as number,
        currentMana: 1 as number,
        isMageActive: false as boolean,
    }),
    computed: {
        physicalDmg() {
            let dmg = 1;
            let bonusStr = Math.floor(this.userCharacteristics.str / 2);
            let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
            return dmg + bonusStr + bonusAgi;
        },
        mageDmg() {
            let dmg = 1;
            let bonusInt = Math.floor(this.userCharacteristics.int / 2);
            let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
            return dmg + bonusInt + bonusAgi;
        },
        physicalDef() {
            let def = 1;
            let bonusDef = Math.floor(this.userCharacteristics.def / 2);
            let bonusStr = Math.floor(this.userCharacteristics.str / 2);
            let sum = def + bonusDef + bonusStr;
            return sum;
        },
        mageDef() {
            let def = 1;
            let bonusDef = Math.floor(this.userCharacteristics.def / 2);
            let bonusInt = Math.floor(this.userCharacteristics.int / 2);
            let sum = def + bonusDef + bonusInt;
            return sum;
        },
        maxHp() {
            let hp = 5;
            let bonus = Math.floor(this.userCharacteristics.vit / 2);
            return hp + bonus;
        },
        maxMana() {
            let mp = 5;
            let bonus = Math.floor(this.userCharacteristics.int / 2);
            return mp + bonus;
        },
        speed() {
            let spd = 1;
            let bonusSpb = Math.floor(this.userCharacteristics.spd / 2);
            let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
            return spd + bonusSpb + bonusAgi;
        },
        dodge() {
            let dodge = 0;
            let bonusAgi = Math.floor(this.userCharacteristics.agi / 2);
            let bonusLuc = Math.floor(this.userCharacteristics.luc / 2);
            let sum = dodge + bonusAgi + bonusLuc;
            if (sum > 30) {
                return 30
            } else {
                return sum
            }
        },
        criticalDmg() {
            let critical = 0;
            let bonusAgi = Math.floor(this.userCharacteristics.agi / 3);
            let bonusLuc = Math.floor(this.userCharacteristics.luc / 3);
            let bonusAcc = Math.floor(this.userCharacteristics.acc / 2);
            let sum = critical + bonusAgi + bonusLuc + bonusAcc;
            if (sum > 50) {
                return 50
            } else {
                return sum
            }
        },
        hitChance() {
            let hit = 50;
            let bonusAcc = this.userCharacteristics.acc;
            let bonusLuc = Math.floor(this.userCharacteristics.luc / 3);
            let bonusInt = Math.floor(this.userCharacteristics.int / 3);
            let sum = hit + bonusLuc + bonusAcc + bonusInt;
            return sum;
        },
    },
    methods: {
        onChangeTab(val: string): void {
            this.characteristic = val;
        },
        onStartVideo(val: string): void {
            let video = document.querySelector(`#${val}`);
            //@ts-ignore
            video && video.play();
        },
        onPauseVideo(val: string): void {
            let video = document.querySelector(`#${val}`);
            //@ts-ignore
            video && video.pause();
        },
        physicAttack() {
            this.$emit("physicsAttack", {
                name: "attack",
                rusName: "Физическая атака",
                dmg: this.physicalDmg,
                effect: ""
            });
        },
        onToggleMage(): void {
            this.isMageActive = !this.isMageActive;
        },
        mageAttack(value: any) {
            this.$emit("magicAttack", value)
        },
        onToggleElixirs() {

        },
        onElixirs() {

        },
        receiveDamage(power: any) {
            this.currentHp -= power;
            if (this.currentHp < 0) this.currentHp = 0; // Не допускаем отрицательного HP
        }
    },
    mounted() {
        //@ts-ignore
        this.currentHp = this.maxHp;
        this.currentMana = this.maxMana;
        //@ts-ignore
        let obj = {
            //@ts-ignore
            physicalDmg: this.physicalDmg,
            //@ts-ignore
            mageDmg: this.mageDmg,
            //@ts-ignore
            physicalDef: this.physicalDef,
            //@ts-ignore
            mageDef: this.mageDef,
            //@ts-ignore
            maxHp: this.maxHp,
            //@ts-ignore
            maxMana: this.maxMana,
            //@ts-ignore
            speed: this.speed,
            //@ts-ignore
            dodge: this.dodge,
            //@ts-ignore
            criticalDmg: this.criticalDmg,
            //@ts-ignore
            hitChance: this.hitChance
        };
        this.person.setCharacteristic(obj);
    }
})
</script>

<template>
    <div class="person">
        <div :class="[isVisibleCharacteristics ? '' : 'person__main--small', 'person__main']">
            <div class="person__block">
                <div class="person__login">
                    {{ person.getLogin }}
                </div>
                <div class="person__level">Уровень: {{ person.getLevel }}</div>
            </div>
            <div class="person__picture"
                 @mouseover="onStartVideo('person-image')"
                 @mouseout="onPauseVideo('person-image')"
            >
                <video id="person-image" class="person__image"
                       loop
                       muted
                >
                    <source :src="userCharacteristics.image">
                </video>
            </div>
        </div>
        <div class="person__characteristic characteristic" v-if="isVisibleCharacteristics">
            <h2 class="characteristic__title">Иформация о персонаже</h2>
            <div class="characteristic__block">
                <div class="characteristic__description">
                    Первый легендарный персонаж игры whereas
                </div>
                <div class="characteristic__tabs">
                    <button
                        :class="[characteristic === 'first' ? 'active' : '', 'characteristic__tab button button--tab']"
                        type="button"
                        @click="onChangeTab('first')">
                        Первичные&nbsp;характеристики
                    </button>
                    <button
                        :class="[characteristic === 'secondary' ? 'active' : '', 'characteristic__tab button button--tab']"
                        type="button"
                        @click="onChangeTab('secondary')">
                        Вторичные&nbsp;характеристики
                    </button>
                </div>
                <div class="characteristic__content" v-if="characteristic === 'first'">
                    <h3 class="characteristic__subtitle characteristic__subtitle--centered h3">Характеристики</h3>
                    <ul class="characteristic__main list">
                        <li class="characteristic__item">
                            <div class="characteristic__name">Сила</div>
                            <div class="characteristic__value">{{userCharacteristics.str}}</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Ловкость</div>
                            <div class="characteristic__value">{{userCharacteristics.agi}}</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Выносливость</div>
                            <div class="characteristic__value">{{userCharacteristics.vit}}</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Меткость</div>
                            <div class="characteristic__value">{{userCharacteristics.acc}}</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Интелект</div>
                            <div class="characteristic__value">{{userCharacteristics.int}}</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Скорость</div>
                            <div class="characteristic__value">{{userCharacteristics.spd}}</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Удача</div>
                            <div class="characteristic__value">{{userCharacteristics.luc}}</div>
                        </li>
                        <li class="characteristic__item">
                            <div class="characteristic__name">Защита</div>
                            <div class="characteristic__value">{{userCharacteristics.def}}</div>
                        </li>
                    </ul>
                    <h3 class="characteristic__subtitle characteristic__subtitle--centered h3">Основные показатели</h3>
                    <ul class="characteristic__stats list">
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Макс. здоровье</div>
                            <div class="characteristic__value">{{maxHp}}</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Макс. мана</div>
                            <div class="characteristic__value">{{maxMana}}</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Физ. урон</div>
                            <div class="characteristic__value">{{physicalDmg}}</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Маг. урон</div>
                            <div class="characteristic__value">{{mageDmg}}</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Физ. защита</div>
                            <div class="characteristic__value">{{physicalDef}} %</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Маг. защита</div>
                            <div class="characteristic__value">{{mageDef}} %</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Скорость</div>
                            <div class="characteristic__value">{{speed}}</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Шанс уклонения</div>
                            <div class="characteristic__value">{{dodge}} %</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Шанс крит. урона</div>
                            <div class="characteristic__value">{{criticalDmg}} %</div>
                        </li>
                        <li class="characteristic__stat">
                            <div class="characteristic__name">Шанс попадания</div>
                            <div class="characteristic__value">{{hitChance}} %</div>
                        </li>
                    </ul>
                </div>
                <ul class="characteristic__secondary list" v-if="characteristic === 'secondary'">
                    <li class="characteristic__item">
                        <div class="characteristic__name">Портняжник</div>
                        <div class="characteristic__value">1</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="person__fight fight" v-if="!isVisibleCharacteristics">
            <div class="fight__health">
                <nuxt-icon class="fight__icon fight__icon--" name="stats/heart"/>
                <div class="fight__current">
                    {{currentHp}}/{{maxHp}}
                </div>
            </div>
            <div class="fight__mana">
                <nuxt-icon class="fight__icon fight__icon--" name="stats/mana"/>
                {{currentMana}}/{{maxMana}}
            </div>
            <div class="fight__stats">
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--health" name="stats/dmg"/>
                    {{physicalDmg}}
                </div>
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--health" name="stats/staff"/>
                    {{mageDmg}}
                </div>
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--" name="stats/shield"/>
                    {{physicalDef}}&nbsp;%
                </div>
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--" name="stats/mage-def"/>
                    {{mageDef}}&nbsp;%
                </div>
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--" name="stats/speed"/>
                    {{speed}}
                </div>
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--" name="stats/critical"/>
                    {{criticalDmg}}&nbsp;%
                </div>
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--" name="stats/dodge"/>
                    {{dodge}}&nbsp;%
                </div>
                <div class="fight__stat">
                    <nuxt-icon class="fight__icon fight__icon--" name="stats/hit"/>
                    {{hitChance}}&nbsp;%
                </div>
            </div>
        </div>
        <div class="person__attack" v-if="!isVisibleCharacteristics">
            <button class="person__button button button--metal person__button--attack" type="button" @click="onToggleElixirs">Использовать эликсиры</button>
            <div class="person__magic person-elixirs"></div>
            <button class="person__button button button--metal person__button--attack" type="button" @click="physicAttack">Физическая атака</button>
            <button class="person__button button button--metal person__button--attack" type="button" @click="onToggleMage">Магическая атака</button>
            <PersonMagicInventory v-if="isMageActive" @onChoiceMagic="mageAttack($event)"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "person";
@use "characteristic";
@use "fight";
</style>