<script lang="ts">
import { defineComponent } from "vue";
import { Howl } from "howler";

export default defineComponent({
    name: "BgSound",
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
    mounted() {
        this.backgroundMusic = new Howl({
            src: ["/sounds/pages/town/main-theme.mp3"],
            loop: true,
            volume: 0.2
        });
        window.addEventListener("click", () => {
            this.backgroundMusic.play();
        }, {once: true})
    }
});
</script>

<template>
    <div class="bg-sound">
        <button class="bg-sound__button button" type="button" @click="onToggleBgSound()">
            <nuxt-icon class="bg-sound__icon" name="global/sound"/>
        </button>
    </div>
</template>

<style scoped lang="scss">
@use "bg-sound";
</style>