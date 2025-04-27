<script lang="ts">
import { defineComponent } from "vue";
import { useGameStore } from "~/stores/game";

export default defineComponent({
    name: "Reward",
    setup() {
        const gameStore = useGameStore();
        return { gameStore };
    },
});
</script>

<template>
    <div class="reward">
        <h2>Победа!</h2>
        <p>Награда: Золото +50, Ресурсы +20</p>
        <button @click="gameStore.startGame">Начать заново</button>
    </div>
</template>

<style scoped lang="scss">
.reward {
    text-align: center;
    margin-top: 20px;
    background-color: #e7f3e7;
    padding: 20px;
    border-radius: 5px;
}
button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}
</style>