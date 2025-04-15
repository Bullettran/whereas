<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Dice",
});
</script>

<template>
    <div class="dice">
        <div class="dice__element">🎲</div>
    </div>
</template>

<style scoped lang="scss">
@use "dice";
</style>