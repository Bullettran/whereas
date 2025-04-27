<script lang="ts">
import { defineComponent } from "vue";
import { useGameStore } from '~/stores/game'

export default defineComponent({
    name: "Mob",
    setup() {
        const gameStore = useGameStore()
        return { gameStore }
    },
});
</script>

<template>
    <div class="mob">
        <div :class="['mob-sprite', gameStore.mobAnimation]"></div>
        <div v-if="gameStore.mobStatusText" class="status-text">{{ gameStore.mobStatusText }}</div>
    </div>
</template>

<style scoped lang="scss">
.mob {
    position: relative;
}
.mob-sprite {
    width: 100px;
    height: 100px;
    background-color: #f44336;
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
</style>