<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Defeat",
    methods: {
        onBack() {
            navigateTo("/town/");
        }
    }
});
</script>

<template>
    <div class="defeat">
        <h2 class="defeat__title">
            Вы проиграли
        </h2>
        <div class="defeat__buttons">
            <button class="defeat__button button button--metal" @click="onBack" data-bs-dismiss="modal" aria-label="Вернуться в город">Вернуться в город</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "defeat";
</style>