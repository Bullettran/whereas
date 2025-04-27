<script lang="ts">
import { defineComponent } from "vue";
import { useGameStore } from "~/stores/game";

export default defineComponent({
    name: "Character",
    setup() {
        const gameStore = useGameStore();
        return { gameStore };
    },
});
</script>

<template>
    <div class="character">
        <div :class="['character-sprite', gameStore.playerAnimation]"></div>
        <div v-if="gameStore.playerStatusText" class="status-text">{{ gameStore.playerStatusText }}</div>
    </div>
</template>

<style scoped lang="scss">
.character {
    position: relative;
}

.character-sprite {
    width: 100px;
    height: 100px;
    background-color: #4CAF50;
}

.status-text {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 3px;
    animation: fadeOut 2s forwards;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>