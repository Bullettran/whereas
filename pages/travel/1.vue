<script lang="ts">
import { usePersonState } from "~/stores/person";
import { useSuccessChance } from "~/composables/useSuccessChance";
import { usePercent } from "~/composables/usePercent";

export default defineComponent({
    name: "Index",
    setup() {
        const person = usePersonState();
        return {
            person,
        };
    },
    data: () => ({
        personPhysicsDmg: 0,
        isFight: false,
        mobsStats: {
            name: "Тестовый заяц",
            image: "images/components/mobs/test.jpg",
            hp: 10,
            mana: 1,
            def: 1,
            mageDef: 0,
            dmg: 1,
            mageDmg: 0,
            hit: 50,
            speed: 5,
            critical: 2,
            dodge: 0,
            exp: 1,
        },
    }),
    methods: {
        getDmgValue(target: any, value: any) {
            console.log(target);
            console.log(value);
            const targetChar = this.$refs[target];
            if (targetChar) {
                //@ts-ignore
                targetChar.receiveDamage(value.dmg);
            }
        },
        mobAttack() {
            const hit = useSuccessChance(this.mobsStats.hit);
            if (hit) {
                const dodge = useSuccessChance(this.person.characteristic.dodge);
                if (!dodge) {
                    const critical = useSuccessChance(this.mobsStats.critical);
                    if (critical) {
                        console.log("Персонаж получил критический урон");
                        let dmgFromMob = usePercent(this.mobsStats.dmg * 2, this.person.characteristic.physicalDef);
                        console.log(dmgFromMob);
                    } else {
                        console.log("Персонаж получил урон");
                        let dmgFromMob = usePercent(this.mobsStats.dmg, this.person.characteristic.physicalDef);
                        console.log(dmgFromMob);
                    }
                } else {
                    console.log("Персонаж увернулся");
                }

            } else {
                console.log("Моб промахнулся");
            }
        },
        onStartFight() {
            this.isFight = true;
            if (this.mobsStats.speed > this.person.characteristic.speed) {
                this.mobAttack();
            }
        },
    },
});
</script>

<template>
    <div class="detail">
        <div class="detail__container container">
            <div class="detail__fight" v-if="isFight">
                <div class="detail__person">
                    <Person
                        ref="person"
                        :isVisibleCharacteristics="false"
                        @physicsAttack="getDmgValue('mob', $event)"
                        @magicAttack="getDmgValue('mob', $event)"
                    />
                </div>
                <div class="detail__mobs">
                    <div class="detail__mob">
                        <MobsMob :mob="mobsStats"
                            ref="mob"
                            @physicsAttack="getDmgValue('person', $event)"
                        />
                    </div>
                </div>
            </div>
            <div class="detail__start" v-else>
                <button class="detail__button-start animated-button1" type="button" @click="onStartFight">Начать бой
                </button>
                <nuxt-link to="/my/" class="detail__button-start link animated-button4">Вернуться</nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/travel/id/styles";
</style>