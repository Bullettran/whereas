<script lang="ts">
import { defineComponent } from "vue";
import Professions from "~/components/professions/professions.vue";

export default defineComponent({
    name: "Index",
    components: { Professions },
    data: () => ({
        errorMessage: "",
        species: "",
        char: usePersonState(),
        character: {
            x: 394,
            y: 520,
            speed: 3,
            facingLeft: false,
            previousX: 394,
            moving: false,
            moveInterval: null as any
        },
        buildings: {
            craft: {
                x: 740,
                y: 500,
            },
            professions: {
                x: 100,
                y: 540
            },
            shop: {
                x: 400,
                y: 450,
            },
            talants: {
                x: 560,
                y: 300,
            },
            game: {
                x: 394,
                y: 800,
            }
        },
    }),
    methods: {
        playGame() {
            navigateTo("/game");
        },
        moveToBuilding(type: string) {
            if (this.character.moving) return
            this.character.moving = true;
            const target = {
                // @ts-ignore
                x: this.buildings[type].x,
                // @ts-ignore
                y: this.buildings[type].y
            }
            clearInterval(this.character.moveInterval);
            this.character.moveInterval = setInterval(() => {
                const dx = target.x - this.character.x;
                const dy = target.y - this.character.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Определяем направление по оси X
                if (dx < 0) {
                    this.character.facingLeft = true;
                } else if (dx > 0) {
                    this.character.facingLeft = false;
                }
                if (dist < this.character.speed) {
                    this.character.x = target.x;
                    this.character.y = target.y;
                    this.character.moving = false;
                    clearInterval(this.character.moveInterval);
                    if (type !== "game") {
                        //@ts-ignore
                        const modal = new this.$bootstrap.Modal(document.getElementById(type));
                        modal.show();
                    } else {
                        this.playGame();
                    }
                    return;
                }
                this.character.previousX = this.character.x;
                // Двигаем персонажа по направлению к цели
                this.character.x += (dx / dist) * this.character.speed;
                this.character.y += (dy / dist) * this.character.speed;
            }, 16); // ~60fps
        },
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
    },
});
</script>

<template>
    <div class="town" v-cloak>
        <div class="town__container container">
            <div class="town__professions" @click="moveToBuilding('professions')">
                <img class="town__plug" src="/images/pages/town/professions.png">
                <div class="town__desc town__desc--professions">Профессии</div>
            </div>
            <div class="town__shop" @click="moveToBuilding('shop')">
                <img class="town__plug" src="/images/pages/town/shop.png">
                <div class="town__desc town__desc--shop">Магазин</div>
            </div>
            <div class="town__game" @click="moveToBuilding('game')">
                <img class="town__plug" src="/images/pages/town/game.png">
                <div class="town__desc town__desc--game">Путешествия</div>
            </div>
            <div class="town__beasts" data-bs-toggle="modal" data-bs-target="#beasts">
                <img class="town__plug" src="/images/pages/town/beasts.png">
                <div class="town__desc town__desc--beasts">Бестиарий</div>
            </div>
            <div class="town__talants" @click="moveToBuilding('talants')">
                <img class="town__plug" src="/images/pages/town/talants.png">
                <div class="town__desc town__desc--talants">Таланты</div>
            </div>
            <div class="town__craft" @click="moveToBuilding('craft')">
                <img class="town__plug" src="/images/pages/town/craft.png">
                <div class="town__desc town__desc--craft">Крафт</div>
            </div>
            <div class="town__char">
                <Char />
            </div>
            <div :class="[
                character.moving ? 'town__person--run' : 'town__person--idle',
                character.facingLeft ? 'town__person--left' : '',
                 `town__person--${species ? species : char.character.species}`,
                  'town__person']"
                 ref="character" :style="{
                left: character.x + 'px',
                top: character.y + 'px',
            }"></div>
<!--            todo(kharal): Придумтаь где будут достижения -->
<!--            <ul class="town__items list">-->
<!--                <li class="town__item">-->
<!--                    <button class="town__link link link&#45;&#45;white" type="button" data-bs-toggle="modal"-->
<!--                            data-bs-target="#achievements" title="Достижения">-->
<!--                        <nuxt-img class="town__image" src="/images/pages/town/achiev.png" alt="Изображение Достижения"/>-->
<!--                    </button>-->
<!--                </li>-->
<!--            </ul>-->
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
            <LazyShop />
        </Modal>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/town/styles";
</style>