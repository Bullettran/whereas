<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        const { $gsap } = useNuxtApp() as any;
        return {
            $gsap
        }
    },
    data: () => ({
        currentIcon: "",
    }) as any,
    name: "MagicInventory",
    methods: {
        onAnimate(event: any) {
            this.currentIcon = document.querySelector(`.${event}`);
            const enemy = document.querySelector(".detail__mob");
            const overlay = document.querySelector('.overlay');
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            if (overlay) {
                overlay.classList.add('active');
            }
            this.$gsap.to(this.currentIcon, {
                x: -this.currentIcon.offsetLeft, // Смещаем иконку в левый верхний угол
                y: -this.currentIcon.offsetTop,
                width: screenWidth - 1000,
                height: screenHeight - 1000,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    // После завершения анимации дергаем врага
                    this.shakeEnemy();
                },
            });
        },
        shakeEnemy() {
            const enemy = document.querySelector('.detail__mob');
            const overlay = document.querySelector('.overlay');
            // Анимация дергания врага
            this.$gsap.to(enemy, {
                x: '+=10', // Двигаем врага вправо
                y: '+=10', // Двигаем врага вниз
                duration: 0.1,
                repeat: 5, // Повторяем 5 раз
                yoyo: true, // Возвращаем врага в исходное положение
                ease: 'power1.inOut',
                onComplete: () => {
                    // После завершения возвращаем иконку
                    this.resetIcon();
                },
            });
        },

        resetIcon() {
            const overlay = document.querySelector('.overlay');
            // Анимация возврата иконки
            this.$gsap.to(this.currentIcon, {
                x: 0,
                y: 0,
                width: 69,
                height: 69,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Выключаем затемнение фона
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                },
            });
        },

        onActive(name: string, rusName: string, dmg: number, effect: string, event: any): void {
            this.onAnimate(event);
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
    <div class="overlay"></div>
    <div class="magic-inventory">
        <div class="magic-inventory__items">
            <div class="magic-inventory__item">
                <button class="magic-inventory__button button" type="button" @click="onActive('fireball', 'Огненый шар', 1, '', 'magic-inventory__image--fireball')">
                    <img class="magic-inventory__image magic-inventory__image--fireball" src="/images/components/magic/fireball.jpg" alt="Декоративное изображение">
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
                <button class="magic-inventory__button button" type="button" @click="onActive('fireball', 'Ледянной осколок', 2, '', 'magic-inventory__image--iceshard')">
                    <img class="magic-inventory__image magic-inventory__image--iceshard" src="/images/components/magic/iceshard.jpg" alt="Декоративное изображение">
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
            <div class="magic-inventory__item">
                <button class="magic-inventory__button button" type="button" @click="onActive('fireball', 'Ледянной осколок', 2, '', 'magic-inventory__image--iceshard')">
                    <img class="magic-inventory__image magic-inventory__image--iceshard" src="/images/components/magic/iceshard.jpg" alt="Декоративное изображение">
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
            <div class="magic-inventory__item">
                <button class="magic-inventory__button button" type="button" @click="onActive('fireball', 'Ледянной осколок', 2, '', 'magic-inventory__image--iceshard')">
                    <img class="magic-inventory__image magic-inventory__image--iceshard" src="/images/components/magic/iceshard.jpg" alt="Декоративное изображение">
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
@use "overlay";
</style>