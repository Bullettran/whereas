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
                    <nuxt-link class="town__link link link--white" to="/game/1" title="Отправиться в путешествие">
                        <nuxt-img class="town__image" src="/images/pages/town/battle.png" alt="Изображение Путешествий"/>
                    </nuxt-link>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#achievements" title="Достижения">
                        <nuxt-img class="town__image" src="/images/pages/town/achiev.png" alt="Изображение Достижения"/>
                    </button>
                </li>
                <li class="town__item town__item--craft">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#professions" title="Ремесло">
                        <nuxt-img class="town__image" src="/images/pages/town/proffesions.png" alt="Изображение Ремесла"/>
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#craft" title="Крафт">
                        <nuxt-img class="town__image" src="/images/pages/town/craft.png" alt="Изображение Крафта"/>
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#beasts" title="Бестиарий">
                        <nuxt-img class="town__image" src="/images/pages/town/beasts.png" alt="Изображение Бестиария"/>
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#talants" title="Таланты">
                        <nuxt-img class="town__image" src="/images/pages/town/talants.png" alt="Изображение Талантов"/>
                    </button>
                </li>
                <li class="town__item">
                    <button class="town__link link link--white" type="button" data-bs-toggle="modal"
                            data-bs-target="#shop" title="Магазин">
                        <nuxt-img class="town__image" src="/images/pages/town/shop.png" alt="Изображение Достижений"/>
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
        <Modal size="lg" id="beasts">
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