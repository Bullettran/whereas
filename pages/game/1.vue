<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
    methods: {
        onAttack(): void {
            const person = document.querySelector(".game__person");
            if (person) {
                // Удаляем класс неподвижного состояния
                person.classList.remove("game__person--idle");
                // Добавляем класс атаки
                person.classList.add("game__person--attack1");

                // Слушаем событие окончания анимации
                person.addEventListener(
                    "animationend",
                    () => {
                        // После завершения анимации атаки возвращаем класс неподвижного состояния
                        person.classList.remove("game__person--attack1");
                        person.classList.add("game__person--idle");
                    },
                    { once: true } // Событие сработает только один раз
                );
            }
        },
        onBigAttack(): void {
            const person = document.querySelector(".game__person");
            if (person) {
                // Удаляем класс неподвижного состояния
                person.classList.remove("game__person--idle");
                // Добавляем класс атаки
                person.classList.add("game__person--attack2");

                // Слушаем событие окончания анимации
                person.addEventListener(
                    "animationend",
                    () => {
                        // После завершения анимации атаки возвращаем класс неподвижного состояния
                        person.classList.remove("game__person--attack2");
                        person.classList.add("game__person--idle");
                    },
                    { once: true } // Событие сработает только один раз
                );
            }
        },
        onLargeAttack(): void {
            const person = document.querySelector(".game__person");
            if (person) {
                // Удаляем класс неподвижного состояния
                person.classList.remove("game__person--idle");
                // Добавляем класс атаки
                person.classList.add("game__person--attack3");

                // Слушаем событие окончания анимации
                person.addEventListener(
                    "animationend",
                    () => {
                        // После завершения анимации атаки возвращаем класс неподвижного состояния
                        person.classList.remove("game__person--attack3");
                        person.classList.add("game__person--idle");
                    },
                    { once: true } // Событие сработает только один раз
                );
            }
        },
        onSpecialAttack(): void {
            const person = document.querySelector(".game__person");
            if (person) {
                // Удаляем класс неподвижного состояния
                person.classList.remove("game__person--idle");
                // Добавляем класс атаки
                person.classList.add("game__person--special");

                // Слушаем событие окончания анимации
                person.addEventListener(
                    "animationend",
                    () => {
                        // После завершения анимации атаки возвращаем класс неподвижного состояния
                        person.classList.remove("game__person--attack3");
                        person.classList.add("game__person--special");
                    },
                    { once: true } // Событие сработает только один раз
                );
            }
        }
    }
});
</script>

<template>
    <div class="game">
        <div class="game__container container">
            <div class="game__block">
                <div class="game__person game__person--idle"></div>
                <div class="game__buttons button">
                    <button class="game__button button--metal" type="button" @click="onAttack()">а1</button>
                    <button class="game__button button--metal" type="button" @click="onBigAttack()">а2</button>
                    <button class="game__button button--metal" type="button" @click="onLargeAttack()">а3</button>
                    <button class="game__button button--metal" type="button" @click="onSpecialAttack()">а4</button>
                </div>
            </div>
            <div class="game__mob game__mob--idle"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/game/id/styles";
</style>