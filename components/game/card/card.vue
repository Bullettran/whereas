<script lang="ts">
import { defineComponent } from "vue";
import { useGameStore } from "~/stores/game";


export default defineComponent({
    name: "Card",
    props: {
        card: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const gameStore = useGameStore();
        const canPlay = computed(() => gameStore.player.stats.mp >= props.card.manaCost && gameStore.turn === "player" && !gameStore.gameOver);

        const playCard = () => {
            if (canPlay.value) {
                gameStore.playCard(props.index);
            }
        };

        return { canPlay, playCard };
    },
});
</script>

<template>
    <div class="card" :class="{ 'card--disabled': !canPlay }" @click="playCard">
        <img :src="card.icon" alt="Card icon" class="card-icon" />
        <h3>{{ card.name }}</h3>
        <p>{{ card.description }}</p>
        <p>Мана: {{ card.manaCost }}</p>
        <p>Редкость: {{ card.rare }}</p>
    </div>
</template>

<style scoped lang="scss">
.card {
    border: 1px solid #ccc;
    padding: 10px;
    width: 150px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.05);
}

.card--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.card-icon {
    width: 50px;
    height: 50px;
}
</style>