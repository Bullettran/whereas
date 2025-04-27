<script lang="ts">
import { defineComponent } from "vue";
import { useGameStore } from '~/stores/game'

export default defineComponent({
    name: "Log",
    setup() {
        const gameStore = useGameStore()
        return { gameStore }
    },
});
</script>

<template>
    <div class="log">
        <h2>Лог действий</h2>
        <ul>
            <li v-for="(entry, index) in gameStore.log" :key="index">{{ entry }}</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.log {
    margin-top: 20px;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    color: #fff;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin-bottom: 5px;
}
</style>