<script lang="ts">
import { defineComponent } from "vue";
import {usePersonState} from "~/stores/person";
// @ts-ignore
import { Howl } from "howler";

export default defineComponent({
    name: "Default",
    setup() {
        // const {clear, user, session, loggedIn} = useUserSession();
        // const person = usePersonState();
        // if (!loggedIn.value) {
        //     navigateTo("/");
        // }
        // if (!person.isSelectedSpecies) {
        //     navigateTo("/selection/");
        // }
        // return {
        //     loggedIn
        // }
    },
    data: () => ({
        backgroundMusic: null as Howl | null,
        isPlaying: true,
    }) as any,
    methods: {
        onToggleBgSound() {
            if (!this.backgroundMusic) return;
            if (this.isPlaying) {
                this.backgroundMusic.pause();
                this.isPlaying = false;
            } else {
                this.backgroundMusic.play();
                this.isPlaying = true;
            }
        },
    },
    created() {
        this.backgroundMusic = new Howl({
            src: ["/sounds/pages/town/main-theme.mp3"],
            loop: true,
            volume: 0.3
        });
        // this.backgroundMusic.play();
    }
});
</script>

<template>
    <template>
        <Header/>
        <div class="bg-sound">
            <button class="bg-sound__button button button--metal" type="button" @click="onToggleBgSound()">
                <nuxt-icon class="bg-sound__icon" name="global/sound"/>
            </button>
        </div>
        <main class="default">
            <slot></slot>
        </main>
    </template>
<!--    <template v-else>-->
<!--        Ошибка-->
<!--    </template>-->
</template>

<style lang="scss">
@use "assets/scss/pages/layouts/default/default";
</style>
