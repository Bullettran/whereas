<script lang="ts">
// import { defineComponent } from "vue";
// import { useGameStore } from "~/stores/game";
//
// export default defineComponent({
//     name: "Index",
//     setup() {
//         const gameStore = useGameStore();
//         const selectedClass = ref("ranger");
//
//         const startGameWithClass = () => {
//             gameStore.setClass(selectedClass.value);
//             gameStore.startGame();
//         };
//
//         return { gameStore, selectedClass, startGameWithClass };
//     },
// });
</script>

<template>
<!--    <div class="game-container">-->
<!--        <h1>Карточная RPG</h1>-->
<!--        <div v-if="!gameStore.player.class" class="class-selection">-->
<!--            <h2>Выберите класс</h2>-->
<!--            <select v-model="selectedClass">-->
<!--                <option value="ranger">Рейнджер</option>-->
<!--                <option value="wrecker">Разрушитель</option>-->
<!--                <option value="arcanist">Арканист</option>-->
<!--                <option value="monk">Монах</option>-->
<!--                <option value="inferno">Инферно</option>-->
<!--                <option value="assassin">Ассасин</option>-->
<!--            </select>-->
<!--            <button @click="startGameWithClass">Начать игру</button>-->
<!--        </div>-->
<!--        <div v-else-if="!gameStore.gameOver" class="battlefield">-->
<!--            <div class="status">-->
<!--                <p>Игрок: HP {{ gameStore.player.stats.hp }} / {{ gameStore.player.stats.maxHp }} | MP-->
<!--                    {{ gameStore.player.stats.mp }} / {{ gameStore.player.stats.maxMp }}</p>-->
<!--                <p>Моб: {{ gameStore.mob?.name }} | HP {{ gameStore.mob?.stats.hp }} / {{ gameStore.mob?.stats.maxHp-->
<!--                    }}</p>-->
<!--            </div>-->
<!--            <div class="entities">-->
<!--                <GameCharacter />-->
<!--                <GameMob />-->
<!--            </div>-->
<!--            <div class="hand">-->
<!--                <h2>Рука</h2>-->
<!--                <div class="cards">-->
<!--                    <GameCard v-for="(card, index) in gameStore.hand" :key="card.id + index" :card="card" :index="index" />-->
<!--                </div>-->
<!--            </div>-->
<!--            <button :disabled="gameStore.turn !== 'player' || gameStore.gameOver" @click="gameStore.endTurn">Завершить-->
<!--                ход-->
<!--            </button>-->
<!--        </div>-->
<!--        <GameReward v-if="gameStore.gameOver && gameStore.winner === 'player'" />-->
<!--        <div v-if="gameStore.gameOver && gameStore.winner === 'mob'" class="game-over">-->
<!--            <h2>Поражение!</h2>-->
<!--            <p>Вы проиграли бой.</p>-->
<!--            <button @click="gameStore.startGame">Начать заново</button>-->
<!--        </div>-->
<!--        <GameLog />-->
<!--    </div>-->
</template>

<style scoped lang="scss">
</style>