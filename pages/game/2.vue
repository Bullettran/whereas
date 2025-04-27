<script lang="ts">
import { defineComponent } from "vue";
import { useGameStore } from "~/stores/game";

export default defineComponent({
    name: "Index",
    setup() {
        const gameStore = useGameStore();
        const selectedClass = ref("ranger");

        const startGameWithClass = () => {
            gameStore.setClass(selectedClass.value);
            gameStore.startGame();
        };

        return { gameStore, selectedClass, startGameWithClass };
    },
});
</script>

<template>
    <div class="game-container">
        <h1>Карточная RPG</h1>
        <div v-if="!gameStore.player.class" class="class-selection">
            <h2>Выберите класс</h2>
            <select v-model="selectedClass">
                <option value="ranger">Рейнджер</option>
                <option value="wrecker">Разрушитель</option>
                <option value="arcanist">Арканист</option>
                <option value="monk">Монах</option>
                <option value="inferno">Инферно</option>
                <option value="assassin">Ассасин</option>
            </select>
            <button @click="startGameWithClass">Начать игру</button>
        </div>
        <div v-else-if="!gameStore.gameOver" class="battlefield">
            <div class="status">
                <p>Игрок: HP {{ gameStore.player.stats.hp }} / {{ gameStore.player.stats.maxHp }} | MP
                    {{ gameStore.player.stats.mp }} / {{ gameStore.player.stats.maxMp }}</p>
                <p>Моб: {{ gameStore.mob?.name }} | HP {{ gameStore.mob?.stats.hp }} / {{ gameStore.mob?.stats.maxHp
                    }}</p>
            </div>
            <div class="entities">
                <GameCharacter />
                <GameMob />
            </div>
            <div class="hand">
                <h2>Рука</h2>
                <div class="cards">
                    <GameCard v-for="(card, index) in gameStore.hand" :key="card.id + index" :card="card" :index="index" />
                </div>
            </div>
            <button :disabled="gameStore.turn !== 'player' || gameStore.gameOver" @click="gameStore.endTurn">Завершить
                ход
            </button>
        </div>
        <GameReward v-if="gameStore.gameOver && gameStore.winner === 'player'" />
        <div v-if="gameStore.gameOver && gameStore.winner === 'mob'" class="game-over">
            <h2>Поражение!</h2>
            <p>Вы проиграли бой.</p>
            <button @click="gameStore.startGame">Начать заново</button>
        </div>
        <GameLog />
    </div>
</template>

<style scoped lang="scss">
.game-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    z-index: 80000;
}
.battlefield {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.status {
    display: flex;
    justify-content: space-between;
}
.entities {
    display: flex;
    justify-content: space-between;
}
.hand {
    margin-top: 20px;
}
.cards {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;
}
button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
.game-over {
    text-align: center;
    margin-top: 20px;
}
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    color: var(--white);
}

.game__person--special {
    animation: critical 1s;
}
.game__person--attack1 {
    animation: miss 1s;
}
.game__person--attack2 {
    animation: attack 1s;
}
.game__person--hurt {
    animation: hurt 1s;
}
.game__person--death {
    animation: death 1s;
}
.game__mob--attack {
    animation: attack 1s;
}
.game__mob--hurt {
    animation: hurt 1s;
}
.game__mob--death {
    animation: death 1s;
}

@keyframes critical {
    0% { transform: scale(1); background-color: #4CAF50; }
    50% { transform: scale(1.2); background-color: #ff9800; }
    100% { transform: scale(1); background-color: #4CAF50; }
}
@keyframes miss {
    0% { transform: translateX(0); }
    50% { transform: translateX(10px); }
    100% { transform: translateX(0); }
}
@keyframes attack {
    0% { transform: translateX(0); }
    50% { transform: translateX(-10px); }
    100% { transform: translateX(0); }
}
@keyframes hurt {
    0% { background-color: #f44336; }
    50% { background-color: #b71c1c; }
    100% { background-color: #f44336; }
}
@keyframes death {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
</style>