<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TypeWriter",
    props: {
        text: {
            type: String,
            required: true,
        },
        speed: {
            type: Number,
            default: 50, // скорость печати в мс
        },
    },
    data: () => ({
        displayedText: '',
        typingInterval: null as number | null,
        index: 0,
        isFinished: false,
        isClosed: false,
    }),
    methods: {
        startTyping() {
            if (this.isClosed) return
            this.displayedText = '';
            this.index = 0;
            if (this.typingInterval) {
                clearInterval(this.typingInterval);
            }
            this.typingInterval = window.setInterval(() => {
                if (this.index < this.text.length) {
                    this.displayedText += this.text[this.index];
                    this.index++;
                } else {
                    if (this.typingInterval) {
                        clearInterval(this.typingInterval);
                        this.typingInterval = null;
                        this.isFinished = true;
                    }
                }
            }, this.speed);
        },
        onNext() {
            this.isClosed = true;
            this.$emit("next");
        }
    },
    beforeUnmount() {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
        }
    }
});
</script>

<template>
    <div class="typewriter">
        {{ displayedText }}&nbsp;&nbsp;&nbsp;&nbsp;<nuxt-icon @click="onNext" v-if="isFinished" class="typewriter__icon" name="global/arrow-right"/>
    </div>
</template>

<style scoped lang="scss">
@use "typewriter";
</style>