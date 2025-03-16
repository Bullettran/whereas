<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "MagicInventory",
    methods: {
        onActive(name: string, rusName: string, dmg: number, effect: string): void {
            this.$emit("onChoiceMagic", {
                name,
                rusName,
                dmg,
                effect
            });
        }
    }
});
</script>

<template>
    <div class="magic-inventory">
        <div class="magic-inventory__items">
            <div class="magic-inventory__item">
                <button class="magic-inventory__button button" type="button" @click="onActive('fireball', 'Огненый шар', 1, '')">
                    <img class="magic-inventory__image" src="/images/components/magic/fireball.jpg" alt="Декоративное изображение">
                    <span class="magic-inventory__count">1</span>
                </button>
                <div class="magic-inventory__tooltip">
                    <div class="magic-inventory__name">Огненый шар</div>
                    <div class="magic-inventory__description">Наносит противнику огненный урон</div>
                    <div class="magic-inventory__stats">
                        <div class="magic-inventory__dmg">
                            <nuxt-icon class="fight__icon fight__icon--health" name="stats/staff"/>
                            1
                        </div>
                    </div>
                </div>
            </div>
            <div class="magic-inventory__item">
                <button class="magic-inventory__button button" type="button" @click="onActive('fireball', 'Ледянной осколок', 2, '')">
                    <img class="magic-inventory__image" src="/images/components/magic/iceshard.jpg" alt="Декоративное изображение">
                    <span class="magic-inventory__count">2</span>
                </button>
                <div class="magic-inventory__tooltip">
                    <div class="magic-inventory__name">Ледянной осколок</div>
                    <div class="magic-inventory__description">Наносит противнику ледянной урон</div>
                    <div class="magic-inventory__stats">
                        <div class="magic-inventory__dmg">
                            <nuxt-icon class="fight__icon fight__icon--health" name="stats/staff"/>
                            2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "magic-inventory";
</style>