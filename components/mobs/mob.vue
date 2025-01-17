<script lang="ts">
export default defineComponent({
    name: "Test",
    props: {
        mob: {
            required: true,
            type: Object,
            default: {
                name: "Тестовый заяц",
                image: "images/components/mobs/test.jpg",
                hp: 5,
                mana: 1,
                def: 1,
                mageDef: 0,
                dmg: 1,
                mageDmg: 0,
                hit: 50,
                speed: 1,
                critical: 0,
                dodge: 0,
                exp: 1,
            }
        },
        skills: {
            required: false,
            type: Array,
            default: [
                {
                    name: "Тестовый",
                    dmg: 1,
                    mass: false,
                    cooldown: 3
                }
            ]
        },
    },
    data: () => ({
        currentHp: 5,
    }),
    computed: {
        isDied() {
            return this.currentHp === 0;
        }
    },
    methods: {
        physicAttack() {
            //@ts-ignore
            this.$emit("physicsAttack", this.dmg);
        },
        receiveDamage(power: any) {
            this.currentHp -= power; // Уменьшаем HP на силу атаки
            if (this.currentHp < 0) this.currentHp = 0; // Не допускаем отрицательного HP
        }
    },
})
</script>

<template>
    <div :class="[isDied ? 'mob--disabled' : '', 'mob']">
        <div class="mob__picture">
            <nuxt-img class="mob__image" :src="mob.image" :alt="mob.name"/>
            <p class="mob__message" v-if="isDied">Убит</p>
        </div>
        <div class="mob__block">
            <h3 class="mob__name">{{mob.name}}</h3>
            <div class="mob__health">
                <nuxt-icon class="mob__icon mob__icon--" name="stats/heart"/>
                {{currentHp}}/{{mob.hp}}
            </div>
            <div class="mob__mana">
                <nuxt-icon class="mob__icon mob__icon--" name="stats/mana"/>
                {{mob.mana}}
            </div>
            <div class="mob__stats">
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--health" name="stats/dmg"/>
                    {{mob.dmg}}
                </div>
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--health" name="stats/staff"/>
                    {{mob.mageDmg}}
                </div>
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--" name="stats/shield"/>
                    {{mob.def}}&nbsp;%
                </div>
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--" name="stats/mage-def"/>
                    {{mob.mageDef}}&nbsp;%
                </div>
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--" name="stats/speed"/>
                    {{mob.speed}}
                </div>
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--" name="stats/critical"/>
                    {{mob.critical}}&nbsp;%
                </div>
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--" name="stats/dodge"/>
                    {{mob.dodge}}&nbsp;%
                </div>
                <div class="mob__stat">
                    <nuxt-icon class="mob__icon mob__icon--" name="stats/hit"/>
                    {{mob.hit}}&nbsp;%
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "mob";
</style>