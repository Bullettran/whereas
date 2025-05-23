<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "FlyDemon",
    data: () => ({
        char: usePersonState(),
        mob: {
            stats: {
                attack: 1,
                critical: 0,
                hp: 20,
                mp: 6,
                speed: 1,
                defence: 1,
                currentHp: 20,
                currentMp: 6,
            },
            actions: {
                x: 640,
                y: 520,
                speed: 3,
                facingLeft: false,
                previousX: 394,
                moving: false,
                moveInterval: null as any,
                state: "idle"
            },
        },
        person: {
            actions: {
                x: 200,
                y: 410,
                speed: 3,
                facingLeft: false,
                previousX: 394,
                moving: false,
                moveInterval: null as any,
                state: "idle",
            },
            stats: {
                attack: 1,
                critical: 2,
                hp: 7,
                mp: 6,
                speed: 2,
                defence: 3,
                currentHp: 7,
                currentMp: 6
            },
            skills: [
                {
                    id: "burning",
                    name: "Огненный шар",
                    description: "Наносит 2 огненного урона врагу",
                    type: "attack",       // Тип скилла: атака, защита, баф и т.д.
                    manaCost: 1,          // Стоимость маны
                    effect: {
                        damage: 2,          // Урон, наносимый скиллом
                        duration: 0,        // Продолжительность эффекта (0 — мгновенный)
                        element: "fire"     // Тип урона/эффекта (огонь)
                    }
                },
                {
                    id: "blade-of-flame",
                    name: "Лечение",
                    description: "Восстанавливает 1 здоровье союзнику",
                    type: "defense",      // Защитный скилл (хил, баф)
                    manaCost: 2,
                    effect: {
                        heal: 1,            // Восстановление здоровья
                        duration: 0,
                        element: "heal"
                    }
                },
                {
                    id: "eternal-flame",
                    name: "Регенерация",
                    description: "Восстанавливает 1 здоровье в течение 2 ходов",
                    type: "buff",         // Баф (положительный эффект)
                    manaCost: 3,
                    effect: {
                        healPerTurn: 1,     // Восстановление здоровья за ход
                        duration: 2,
                        element: "heal"
                    }
                },
                {
                    id: "flame-control",
                    name: "Кровотечение",
                    description: "Наносит 1 урона в течение 2 ходов",
                    type: "attack",
                    manaCost: 3,
                    effect: {
                        damagePerTurn: 1,   // Урон за ход
                        duration: 2,
                        element: "bleed"    // Тип эффекта — кровотечение
                    }
                },
                {
                    id: "flame-shield",
                    name: "Рассеивание",
                    description: "Снимает все дебафы с союзника",
                    type: "defense",
                    manaCost: 4,
                    effect: {
                        dispelDebuffs: true, // Флаг снятия дебафов
                        duration: 0,
                        element: "dispel"
                    }
                }
            ]
        },
        targets: {
            start: {
                x: 200,
                y: 410,
            },
            battle: {
                x: 460,
                y: 440,
            },
        },
    }),
    methods: {
        moveTo(type: string) {
            if (this.person.actions.moving) return
            this.person.actions.moving = true;
            this.person.actions.state = "run";
            const target = {
                // @ts-ignore
                x: this.targets[type].x,
                // @ts-ignore
                y: this.targets[type].y
            }
            clearInterval(this.person.actions.moveInterval);
            this.person.actions.moveInterval = setInterval(() => {
                const dx = target.x - this.person.actions.x;
                const dy = target.y - this.person.actions.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Определяем направление по оси X
                if (dx < 0) {
                    this.person.actions.facingLeft = true;
                } else if (dx > 0) {
                    this.person.actions.facingLeft = false;
                }
                if (dist < this.person.actions.speed) {
                    this.person.actions.x = target.x;
                    this.person.actions.y = target.y;
                    this.person.actions.moving = false;
                    clearInterval(this.person.actions.moveInterval);
                    if (type === "battle") {
                        this.person.actions.state = "attack";

                        this.applyDamageToMob(1);

                        setTimeout(() => {
                            this.moveTo("start");
                        }, 1000)
                    } else if (type === "start") {
                        this.person.actions.state = "idle";
                        this.person.actions.facingLeft = false;
                    }
                    return;
                }
                this.person.actions.previousX = this.person.actions.x;
                // Двигаем персонажа по направлению к цели
                this.person.actions.x += (dx / dist) * this.person.actions.speed;
                this.person.actions.y += (dy / dist) * this.person.actions.speed;
            }, 16); // ~60fps
        },
        mobHitAnimation() {
            this.mob.actions.state = "hit";
            setTimeout(() => {
                this.mob.actions.state = "idle";
            }, 1000)
        },
        applyDamageToMob(damage: number) {
            this.mob.stats.currentHp -= damage;
            if (this.mob.stats.currentHp < 0) this.mob.stats.currentHp = 0;
            this.mobHitAnimation();
        }
    },
    mounted() {
    }
});
</script>

<template>
    <div class="fight">
        <div class="fight__container container">
            <div :class="[
                person.actions.state === 'run' ? `${char.character.species}--run` :
                person.actions.state === 'attack' ? `${char.character.species}--attack` :
                `${char.character.species}--idle`,
                person.actions.facingLeft ? `${char.character.species}--left` : '',
                 `${char.character.species ? char.character.species : 'arcanist'}`,
                  'fight__person'
                  ]"
                 ref="character" :style="{
                left: person.actions.x + 'px',
                top: person.actions.y + 'px',
            }"></div>
            <div class="fight__mobs">
                <div
                    @click="moveTo('battle')"
                    :class="[
                    mob.actions.state === 'hit' ? 'fight__mob--hit' : 'fight__mob--idle',
                    'fight__mob'
                    ]" ref="mob" :style="{
                left: mob.actions.x + 'px',
                top: mob.actions.y + 'px',
            }"></div>
            </div>
            <div class="fight__skills skills">
                <div class="skills__skill" v-for="skill in person.skills" @click="moveTo('battle')">
                    <img class="skills__image" :src="`/images/skills/${char.character.species}/${skill.id}.png`" :alt="skill.name">
                    <div class="skills__desc">{{skill.description}}</div>
                    <div class="skills__cost">
                        {{skill.manaCost}}
                        <nuxt-icon class="skills__icon-mana" name="stats/mana" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/game/fly-demon/styles";
</style>