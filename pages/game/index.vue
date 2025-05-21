<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
    data: () => ({
        character: {
            x: 430,
            y: 800,
            speed: 3,
            facingLeft: false,
            previousX: 394,
            moving: false,
            moveInterval: null as any
        },
        char: usePersonState(),
        targets: {
            start: {
                x: 400,
                y: 600,
            },
            npc: {
                x: 400,
                y: 440,
                typewriter: false,
                text: "Ты пришёл... Хотя никто не звал. Вижу, в твоих глазах ещё теплится надежда — смешно. Эти земли давно забыли, что такое свет. Тени шепчутся за спиной, дороги ведут в никуда, а ворота позади тебя... хм. Они уже исчезли, не так ли? Ладно. Раз уж ты здесь — иди к Старому Алтарю. Может, тогда поймёшь, зачем тебя выбрали.",
                speed: 5
            },
            battle: {
                x: 300,
                y: 440,
            },
            violet: {
                x: 510,
                y: 390,
            }
        },
        gameProcess: {
            act: 0
        }
    }),
    methods: {
        moveTo(type: string) {
            if (this.character.moving) return
            this.character.moving = true;
            const target = {
                // @ts-ignore
                x: this.targets[type].x,
                // @ts-ignore
                y: this.targets[type].y
            }
            clearInterval(this.character.moveInterval);
            this.character.moveInterval = setInterval(() => {
                const dx = target.x - this.character.x;
                const dy = target.y - this.character.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Определяем направление по оси X
                if (dx < 0) {
                    this.character.facingLeft = true;
                } else if (dx > 0) {
                    this.character.facingLeft = false;
                }
                if (dist < this.character.speed) {
                    this.character.x = target.x;
                    this.character.y = target.y;
                    this.character.moving = false;
                    clearInterval(this.character.moveInterval);
                    if (type === "npc") {
                        this.targets.npc.typewriter = true;
                        setTimeout(() => {
                            (this.$refs.typewriter as any).startTyping();
                        }, 300)
                    } else if (type === "violet") {
                        navigateTo("/game/1");
                    }
                    return;
                }
                this.character.previousX = this.character.x;
                // Двигаем персонажа по направлению к цели
                this.character.x += (dx / dist) * this.character.speed;
                this.character.y += (dy / dist) * this.character.speed;
            }, 16); // ~60fps
        },
        onEndDialog() {
            this.targets.npc.typewriter = false;
            this.moveTo("battle");
            const container = document.querySelector(".game__container");
            if (container) {
                container.classList.add("container--shake");
            }
            setTimeout(() => {
                this.gameProcess.act = 1;
            }, 3000)
        },
    },
    mounted() {
        setTimeout(() => {
            this.moveTo("start");
        }, 1000)
    }
});
</script>

<template>
    <div class="game">
        <div :class="[gameProcess.act === 0 ? 'game__container' : 'game__container--1']">
            <div v-if="gameProcess.act === 0" class="game__npc game__npc--start" @click="moveTo('npc')">
                <img class="game__plug" src="/images/sprites/npc/npc-start.png" alt="Первый нпс">
                <TypeWriter @next="onEndDialog" :speed="targets.npc.speed" v-if="targets.npc.typewriter" ref="typewriter" class="game__typewriter game__typewriter--npc" :text="targets.npc.text"/>
            </div>
            <div @click="moveTo('violet')" v-if="gameProcess.act === 1" class="game__portal game__portal--violet"></div>
            <div :class="[
                character.moving ? `${char.character.species}--run` : `${char.character.species}--idle`,
                character.facingLeft ? `${char.character.species}--left` : '',
                 `${char.character.species ? char.character.species : 'arcanist'}`, 'game__person']"
                 ref="character" :style="{
                left: character.x + 'px',
                top: character.y + 'px',
            }"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/game/index/styles";
</style>