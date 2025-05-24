<script lang="ts">
import { defineComponent } from "vue";
import { sk } from "cronstrue/dist/i18n/locales/sk";

export default defineComponent({
    name: "FlyDemon",
    data: () => ({
        char: usePersonState(),
        log: [] as Array<any>,
        mob: {
            stats: {
                attack: 1,
                critical: 0,
                hp: 20,
                mp: 6,
                speed: 1,
                defence: 2,
                currentHp: 17,
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
                state: "idle",
            },
            buffs: [],
            debuffs: [] as any,
            image: "/images/sprites/mobs/red-flying-demon/icon.png",
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
                currentHp: 7,
                currentMp: 6,
            },
            skills: [
                {
                    id: "auto-attack",
                    name: "Автоатака",
                    description: "Наносит урон врагу",
                    type: "attack",
                    manaCost: 0,
                    effect: {
                        damage: 0,
                        duration: 0,
                        element: "",
                    },
                    animType: "attack",
                },
                {
                    id: "burning",
                    name: "Огненный шар",
                    description: "Наносит урон врагу",
                    type: "attack",
                    manaCost: 1,
                    effect: {
                        damage: 2,
                        duration: 0,
                        element: "",
                    },
                    animType: "attack1",
                },
                {
                    id: "blade-of-flame",
                    name: "Меч пламени",
                    description: "Наносит множесветнный урон врагу",
                    type: "attack",
                    manaCost: 2,
                    effect: {
                        damage: 3,
                        duration: 0,
                        element: "",
                    },
                    animType: "attack2",
                },
                {
                    id: "eternal-flame",
                    name: "блабла",
                    description: "Атакует и вешает дебаф",
                    type: "attack",
                    manaCost: 3,
                    effect: {
                        damage: 1,
                        damagePerTurn: 1,
                        duration: 2,
                        description: "Каждый ход получает урон",
                        element: "bleed",
                    },
                    animType: "attack3",
                },
                {
                    id: "flame-control",
                    name: "бббб",
                    description: "Восстанавливает жизни 2 хода",
                    type: "buff",
                    manaCost: 3,
                    effect: {
                        healPerTurn: 1,
                        duration: 2,
                        element: "heal",
                    },
                    animType: "buff",
                },
                {
                    id: "flame-shield",
                    name: "ббб",
                    description: "Увеличивает атаку на 5 ходов",
                    type: "buff",
                    manaCost: 4,
                    effect: {
                        attack: 3,
                        duration: 5,
                        element: "buff",
                    },
                    animType: "buff",
                },
            ],
            potions: [
                {
                    id: "hp-1",
                    name: "Эликсир здоровья",
                    description: "Восполняет 2 здоровья",
                    type: "potion",
                    manaCost: 0,
                    effect: {
                        heal: 2,          // Урон, наносимый скиллом
                        duration: 0,        // Продолжительность эффекта (0 — мгновенный)
                        element: "heal",     // Тип урона/эффекта (огонь)
                    },
                },
                {
                    id: "mp-1",
                    name: "Эликсир маны",
                    description: "Восполняет 2 маны",
                    type: "potion",
                    manaCost: 0,
                    effect: {
                        mp: 2,          // Урон, наносимый скиллом
                        duration: 0,        // Продолжительность эффекта (0 — мгновенный)
                        element: "mana",     // Тип урона/эффекта (огонь)
                    },
                },
                {
                    id: "def-1",
                    name: "Эликсир маны",
                    description: "Увеличивает защиту на ",
                    type: "potion",
                    manaCost: 0,
                    effect: {
                        defence: 2,          // Урон, наносимый скиллом
                        duration: 0,        // Продолжительность эффекта (0 — мгновенный)
                        element: "defence",     // Тип урона/эффекта (огонь)
                    },
                },
            ],
            buffs: [],
            debuffs: [] as any,
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
        // Метож передвижения персонажа
        moveTo(type: string, skill: any) {
            if (this.person.actions.moving) return;
            this.person.actions.moving = true;
            this.person.actions.state = "run";
            const target = {
                // @ts-ignore
                x: this.targets[type].x,
                // @ts-ignore
                y: this.targets[type].y,
            };
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
                        this.onFightPerson(type, skill);
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
        // Метод самой битвы для персонажа
        onFightPerson(type: any, skill: any) {
            if (skill.animType === "buff") {
                this.playAnimType(skill.animType);
            } else {
                this.playAnimType(skill.animType);
                if (skill.effect.element === "bleed") {
                    // todo(kharal): Вынести в отдельный метод ВАЖНО
                    this.mob.debuffs.push({
                        duration: skill.effect.duration,
                        damagePerTurn: skill.effect.damagePerTurn,
                        image: `/images/skills/${this.char.character.species}/${skill.id}.png`,
                        desc: skill.effect.description,
                    })
                } else {
                    const dmg = skill.effect.damage + this.char.character.stats.attack;
                    this.applyDamageToMob(this.isCriticalHit("person", dmg));
                }
                this.onReturnStart();
            }
        },
        // Возврат к месту стойки персонажа
        onReturnStart() {
            setTimeout(() => {
                this.moveTo("start", null);
            }, 1000);
        },
        // Анимация получения урона мобом
        mobHitAnimation() {
            this.mob.actions.state = "hit";
            setTimeout(() => {
                this.mob.actions.state = "idle";
            }, 1000);
        },
        // Анимации атак и бафоф
        playAnimType(animType: string) {
            const characterEl = this.$refs.character;
            if (!characterEl) return;
            // @ts-ignore
            const classList = characterEl.classList;
            [
                `${this.char.character.species}--attack`,
                `${this.char.character.species}--attack1`,
                `${this.char.character.species}--attack2`,
                `${this.char.character.species}--attack3`,
                `${this.char.character.species}--def`,
                `${this.char.character.species}--buff`,
            ].forEach(cls => classList.remove(cls));
            if (animType) {
                classList.add(`${this.char.character.species}--${animType}`);
            }
            setTimeout(() => {
                classList.remove(`${this.char.character.species}--${animType}`);
            }, 1000);
        },
        // Использование скиллов
        useSkill(skill: any) {
            // Если баф то не бежим к мобу
            if (skill.animType !== "buff") {
                this.moveTo("battle", skill);
            } else {
                this.onFightPerson("battle", skill);
            }
        },
        // Получение урона мобом
        applyDamageToMob(damage: number) {
            if (damage > this.mob.stats.defence) {
                this.mob.stats.currentHp -= (damage - this.mob.stats.defence);
                this.setLogs(`Нанесено ${damage - this.mob.stats.defence} ед. урона мобу`);
            } else {
                this.setLogs("Защита не пробита");
            }
            if (this.mob.stats.currentHp < 0) this.mob.stats.currentHp = 0;
            this.mobHitAnimation();
        },
        // Получение процента
        onPercentage(exp: number, needExp: number): any {
            return (exp / needExp) * 100;
        },
        // Расчет критического урона
        isCriticalHit(target: "person" | "mob", dmg: number): number {
            let criticalChance = 0 as number;
            if (target === "person") {
                criticalChance = this.char.character.stats.critical;
                this.log.unshift("Успех критического удара");
            } else {
                criticalChance = this.mob.stats.critical;
            }
            const roll = Math.random() * 100;
            if (roll <= criticalChance) {
                return dmg * 2
            } else {
                return dmg
            }
        },

        drinkPotion() {

        },
        setLogs(text: string) {
            this.log.unshift(text);
        }
    },
    mounted() {
    },
});
</script>

<template>
    <div class="fight">
        <div class="fight__container container">
            <div class="fight__stats stats">
                <div class="stats__wrapper">
                    <div class="stats__block stats__block--person">
                        <div class="stats__picture">
                            <img class="stats__image" alt="Изображение персонажа"
                                 :src="`/images/sprites/persons/${char.character.species}/icon-${char.character.species}.png`">
                        </div>
                        <div class="stats__specifications">
                            <ProgressBar class="stats__hp"
                                         :value="onPercentage(person.stats.currentHp, char.character.stats.hp)">
                                {{ person.stats.currentHp }}/{{ char.character.stats.hp }}
                            </ProgressBar>
                            <ProgressBar class="stats__mp"
                                         :value="onPercentage(person.stats.currentMp, char.character.stats.mp)">
                                {{ person.stats.currentMp }}/{{ char.character.stats.mp }}
                            </ProgressBar>
                            <div class="stats__buffs">
                                <p class="stats__text">Бафы:</p>
                                <div class="stats__wrap" v-for="buff in person.buffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }}
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration
                                        }}</div>
                                </div>
                            </div>
                            <div class="stats__buffs">
                                <p class="stats__text">Дебафы:</p>
                                <div class="stats__wrap" v-for="buff in person.debuffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }}
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fight__logs logs">
                        <div class="logs__log" v-for="item in log">
                            {{item}}
                        </div>
                    </div>
                </div>
                <div class="stats__mobs">
                    <div class="stats__block stats__block--mob">
                        <div class="stats__picture">
                            <img class="stats__image" :src="mob.image" alt="Изображение моба">
                        </div>
                        <div class="stats__specifications">
                            <ProgressBar class="stats__hp" :value="onPercentage(mob.stats.currentHp, mob.stats.hp)">
                                {{ mob.stats.currentHp }}/{{ mob.stats.hp }}
                            </ProgressBar>
                            <ProgressBar class="stats__mp" :value="onPercentage(mob.stats.currentMp, mob.stats.mp)">
                                {{ mob.stats.currentMp }}/{{ mob.stats.mp }}
                            </ProgressBar>
                            <div class="stats__buffs">
                                <p class="stats__text">Бафы:</p>
                                <div class="stats__wrap" v-for="buff in mob.buffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }}
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration}}</div>
                                </div>
                            </div>
                            <div class="stats__buffs">
                                <p class="stats__text">Дебафы:</p>
                                <div class="stats__wrap" v-for="buff in mob.debuffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }} {{
                                            //@ts-ignore
                                            buff.damagePerTurn}} ед.
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    :class="[
                    mob.actions.state === 'hit' ? 'fight__mob--hit' : 'fight__mob--idle',
                    'fight__mob'
                    ]" ref="mob" :style="{
                left: mob.actions.x + 'px',
                top: mob.actions.y + 'px',
            }"></div>
            </div>
            <div class="fight__skills skills">
                <div class="skills__wrap">
                    <div class="skills__skill" v-for="skill in person.skills" @click="useSkill(skill)">
                        <img class="skills__image" :src="`/images/skills/${char.character.species}/${skill.id}.png`"
                             :alt="skill.name">
                        <div class="skills__desc">{{ skill.description }}</div>
                        <div class="skills__cost">
                            {{ skill.manaCost }}
                            <nuxt-icon class="skills__icon-mana" name="stats/mana" />
                        </div>
                    </div>
                </div>
                <div class="skills__wrap skills__wrap--potions">
                    <div class="skills__skill" v-for="potion in person.potions" @click="drinkPotion()">
                        <img class="skills__image" :src="`/images/potions/${potion.id}.png`"
                             :alt="potion.name">
                        <div class="skills__desc skills__desc--potions">{{ potion.description }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/game/fly-demon/styles";
</style>