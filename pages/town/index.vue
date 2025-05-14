<script lang="ts">
import { defineComponent } from "vue";
import Professions from "~/components/professions/professions.vue";

export default defineComponent({
    name: "Index",
    components: { Professions },
    // setup() {
    //     const char = usePersonState();
    //     return {
    //         char
    //     }
    // },
    data: () => ({
        errorMessage: "",
        species: "",
        char: usePersonState()
    }),
    methods: {
        async fetchCharacter() {
            try {
                // Получаем текущего пользователя
                const { data: userData, error: authError } = await this.$supabase.auth.getUser();

                if (authError || !userData.user) {
                    this.$router.push("/");
                    return;
                }

                const userId = userData.user.id;

                // Запрашиваем данные персонажа из таблицы characters
                const { data, error } = await this.$supabase
                    .from("characters")
                    .select("*")
                    .eq("id", userId)
                    .single();

                if (error) {
                    this.errorMessage = `Ошибка загрузки персонажа: ${error.message}`;
                    console.error(error);
                    return;
                }

                if (data) {
                    this.char.setCharacter(data);
                    this.species = data.species;
                    console.log(this.char);
                }
            } catch (err) {
                this.errorMessage = "Неизвестная ошибка. Попробуйте позже.";
                console.error(err);
            }
        },
    },
    async created() {
        await this.fetchCharacter();
    }
});
</script>

<template>
    <div class="town" v-cloak>
        <div class="town__container container">
            <Char />
            <div :class="`town__person town__person--${species ? species : char.character.species} town__person--idle`"></div>
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
            <Professions />
        </Modal>
        <Modal size="lg" id="craft">
            <LazyCraft/>
        </Modal>
        <Modal size="lg" id="beasts">
            <LazyBeasts/>
        </Modal>
        <Modal size="lg" id="talants">
            <LazyCards />
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