<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
});
</script>

<template>
    <div class="town">
        <div class="town__container container">
            <Char/>
            <div class="town__person town__person--arcanist town__person--idle"></div>
            <nuxt-link class="town__link" to="/game/1" style="color:#fff;">ТУда</nuxt-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/town/styles";
</style>