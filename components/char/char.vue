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
            maxHp
        }
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
    }
});
</script>

<template>
    <div class="char">
        <button class="char__button button" type="button" data-bs-toggle="modal"
                data-bs-target="#chars-stats">
            <nuxt-img class="char__image" src="/images/sprites/persons/arcanist/icon-arcanist.png" alt="Иконка персонажа"/>
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
                        {{currentMp}}/{{maxMp}}
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
        <div class="inventory">
            <div>123</div>
            <div>123</div>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
@use "char";

.inventory {
    background: url("/images/components/modal/big-frame.png") 0 0/cover no-repeat;
    width: 100%;
    height: 450px;
    padding: 32px;
    border-radius: 12px;
}
</style>