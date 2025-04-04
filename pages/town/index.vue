<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
});
</script>

<template>
    <div class="town">
        <div class="town__container container">
            <Char />
            <div class="town__person town__person--arcanist town__person--idle"></div>
            <ul class="town__items list">
                <li class="town__item">
                    <nuxt-link class="town__link link link--white" to="/game/1">Путешествия</nuxt-link>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#achievements">Достижения
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#professions">Ремесло
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#craft">Крафт
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#citadel">Цитадель
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#talants">Таланты
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#shop">Магазин
                    </button>
                </li>
            </ul>
        </div>
        <Modal size="lg" id="achievements">
            <LazyAchievements/>
        </Modal>
        <Modal size="lg" id="professions">
            <div>
                Ремесло
            </div>
        </Modal>
        <Modal size="lg" id="craft">
            <LazyCraft/>
        </Modal>
        <Modal size="lg" id="citadel">
            <div>
                Цитадель
            </div>
        </Modal>
        <Modal size="lg" id="talants">
            <div>
                Таланты
            </div>
        </Modal>
        <Modal size="lg" id="shop">
            <div>
                Магазин
            </div>
        </Modal>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/town/styles";
</style>