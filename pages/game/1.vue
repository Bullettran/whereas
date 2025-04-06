<script lang="ts">
import { defineComponent } from "vue";
import { SymbolKind } from "vscode-languageserver-types";
import Array = SymbolKind.Array;
import Dice from "~/components/global/dice/dice.vue";

export default defineComponent({
    name: "Index",
    components: { Dice },
    setup() {
        const allCards = reactive([
            {
                name: "Физическая атака",
                type: "Атака",
                rare: "standard",
                description: "Физическая ататка +1",
                count: 1,
                icon: "attack.png",
            },
            {
                name: "Редкая защита",
                type: "Защита",
                rare: "rare",
                description: "Физическая защита +2",
                count: 2,
                icon: "defence.png",
            },
            {
                name: "Ледянное копье",
                type: "Магия",
                rare: "standard",
                description: "Магическая атака +1",
                count: 1,
                icon: "frost-ball-1.png",
            },
            {
                name: "Легендарное лечение",
                type: "Лечение",
                rare: "legend",
                description: "Жизни +3",
                count: 3,
                icon: "heal-1.png",
            },
            {
                name: "Простое лечение",
                type: "Лечение",
                rare: "standard",
                description: "Жизни +1",
                count: 1,
                icon: "heal-1.png",
            },
            {
                name: "Мощный удар",
                type: "Атака",
                rare: "rare",
                description: "Физическая атака +2",
                count: 2,
                icon: "attack.png",
            },
            {
                name: "Ледяная буря",
                type: "Магия",
                rare: "legend",
                description: "Магическая атака +3",
                count: 3,
                icon: "frost-ball-1.png",
            },
            {
                name: "Щит молний",
                type: "Защита",
                rare: "rare",
                description: "Защита от магии +2",
                count: 2,
                icon: "defence.png",
            },
        ]);
        return {
            allCards,
        };
    },
    data: () => ({
        levelCards: [] as any,
        choices: [null, null, null, null, null, null, null, null, null] as any,
        showDice: false,
        isAnimating: false,
        battleLog: [] as string[],
        mobStats: {
            maxHp: 10,
            maxMp: 5,
            currentHp: 1,
            currentMp: 5,
            physicalDmg: 1,
            mageDmg: 0,
            physicalDef: 0,
            mageDef: 0,
            speed: 3,
            dodge: 0,
            criticalDmg: 0,
            hitChance: 50,
        },
        personStats: {
            maxHp: 20,
            maxMp: 5,
            currentHp: 5,
            currentMp: 5,
            physicalDmg: 2,
            mageDmg: 0,
            physicalDef: 0,
            mageDef: 0,
            speed: 1,
            dodge: 0,
            criticalDmg: 0,
            hitChance: 50,
        },
    }),
    mounted() {
        this.initCards();
    },
    methods: {
        getRandomCards(count: number) {
            const shuffled = [...this.allCards].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        },
        initCards() {
            this.levelCards = this.getRandomCards(5);
            this.choices = [null, null, null, null, null, null, null, null, null];
        },
        async changeCards() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            await this.playBattleSequence();

            this.showDice = true;
            setTimeout(() => {
                this.showDice = false;
                this.initCards();
                this.isAnimating = false;
            }, 1000);
        },
        // бой
        async playBattleSequence() {
            // Определяем кто атакует первым по скорости
            if (this.personStats.speed >= this.mobStats.speed) {
                await this.characterAttack();
                if (this.mobStats.currentHp > 0) {
                    await this.mobAttack();
                } else {
                    // todo(kharal): Придумать как сделать победу
                }
            } else {
                await this.mobAttack();
                if (this.personStats.currentHp > 0) {
                    await this.characterAttack();
                } else {
                    // todo(kharal): Придумать как сделать пройгрыш
                }
            }
        },
        async characterAttack() {
            // Проверка на попадание
            const hitRoll = Math.random() * 100;
            if (hitRoll > this.personStats.hitChance - this.mobStats.dodge) {
                this.addToLog("Персонаж промахнулся!");
                return;
            }
            // Расчет урона
            const damage = Math.max(1, this.personStats.physicalDmg - this.mobStats.physicalDef);
            this.mobStats.currentHp = Math.max(0, this.mobStats.currentHp - damage);
            this.addToLog(`Персонаж атакует и наносит ${damage} урона!`);
            // Анимация атаки
            await this.playAnimationSequence("game__person--attack2", "game__mob--hurt", damage,);
            if (this.mobStats.currentHp <= 0) {
                this.addToLog("Моб побежден!");
                await this.playDeathAnimation("mob");
            }
        },
        async mobAttack() {
            // Проверка на попадание
            const hitRoll = Math.random() * 100;
            if (hitRoll > this.mobStats.hitChance - this.personStats.dodge) {
                this.addToLog("Моб промахнулся!");
                return;
            }
            // Расчет урона
            const damage = Math.max(1, this.mobStats.physicalDmg - this.personStats.physicalDef);
            this.personStats.currentHp = Math.max(0, this.personStats.currentHp - damage);
            this.addToLog(`Моб атакует и наносит ${damage} урона!`);
            // Анимация атаки
            await this.playAnimationSequence("game__mob--attack", "game__person--hurt", damage,);
            if (this.personStats.currentHp <= 0) {
                this.addToLog("Персонаж побежден!");
                await this.playDeathAnimation("person");
            }
        },

        async playAnimationSequence(attackAnimation: string, hurtAnimation: string, damage: number): Promise<void> {
            return new Promise((resolve) => {
                const attacker = attackAnimation.includes("person") ? document.querySelector(".game__person") : document.querySelector(".game__mob");

                const defender = hurtAnimation.includes("person") ? document.querySelector(".game__person") : document.querySelector(".game__mob");

                if (attacker && defender) {
                    // Анимация атаки
                    attacker.classList.remove(attackAnimation.includes("person") ? "game__person--idle" : "game__mob--idle");
                    attacker.classList.add(attackAnimation);

                    // Анимация получения урона
                    defender.classList.remove(hurtAnimation.includes("person") ? "game__person--idle" : "game__mob--idle");
                    defender.classList.add(hurtAnimation);

                    attacker.addEventListener("animationend", () => {
                        // Возврат в исходное состояние
                        attacker.classList.remove(attackAnimation);
                        attacker.classList.add(attackAnimation.includes("person") ? "game__person--idle" : "game__mob--idle");

                        defender.classList.remove(hurtAnimation);
                        defender.classList.add(hurtAnimation.includes("person") ? "game__person--idle" : "game__mob--idle");

                        resolve();
                    }, { once: true });
                } else {
                    resolve();
                }
            });
        },

        async playDeathAnimation(target: "person" | "mob"): Promise<void> {
            return new Promise((resolve) => {
                const element = target === "person" ? document.querySelector(".game__person") : document.querySelector(".game__mob") as any;

                if (element) {
                    element.classList.remove(target === "person" ? "game__person--idle" : "game__mob--idle",);
                    element.classList.add(target === "person" ? "game__person--death" : "game__mob--death",);

                    element.addEventListener("animationend", () => {
                        resolve();
                    }, { once: true });
                } else {
                    resolve();
                }
            });
        },

        addToLog(message: string) {
            this.battleLog.push(message);
        },
        onDragStart(event: DragEvent, cardIndex: number) {
            if (event.dataTransfer) {
                event.dataTransfer.setData("text/plain", cardIndex.toString());
                event.dataTransfer.effectAllowed = "move";
            }
        },
        onDrop(event: DragEvent, choiceIndex: number) {
            const cardIndex = event.dataTransfer?.getData("text/plain");
            if (cardIndex !== undefined && cardIndex !== "") {
                const parsedIndex = parseInt(cardIndex);
                if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < this.levelCards.length) {
                    this.choices[choiceIndex] = this.levelCards[parsedIndex];
                }
            }
        },
    },
});
</script>

<template>
    <div class="game">
        <div class="game__container container">
            <div class="game__logs">
                <Char />
                <div class="battle-log">
                    <div v-for="(log, index) in battleLog" :key="index">{{ log }}</div>
                </div>
            </div>
            <div class="health-bar">
                HP: {{ personStats.currentHp }}/{{ personStats.maxHp }}
            </div>
            <div class="health-bar">
                HP: {{ mobStats.currentHp }}/{{ mobStats.maxHp }}
            </div>
            <div class="game__window">
                <div class="game__block game__block--person">
                    <div class="game__person game__person--idle"></div>
                </div>
                <div class="game__choices">
                    <div class="game__wrap">
                        <div class="game__choice"
                             @dragover.prevent
                             @dragenter.prevent
                             @drop="onDrop($event, choiceIndex)"
                             v-for="(choice, choiceIndex) in choices"
                             :key="choiceIndex"
                        >
                            <div v-if="choice" class="game__picture">
                                <div class="game__stats">+{{ choice.count }}</div>
                                <div class="game__wrapper">
                                    <nuxt-img :src="`/images/pages/game/${choice.icon}`" :alt="choice.name"
                                              class="game__icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="game__attacks">
                        <button class="game__attack button button--metal" @click="changeCards">Атака</button>
                    </div>
                </div>
                <div class="game__block game__block--mobs">
                    <div class="game__mob game__mob--idle"></div>
                </div>
            </div>
        </div>
        <div class="game__buttons container">
            <div :class="[card.rare ? `card-game--${card.rare}` : 'card-game--standard', 'game__card card-game button']"
                 v-for="(card, index) in levelCards"
                 :key="index"
                 draggable="true"
                 @dragstart="onDragStart($event, index)"
            >
                <div class="card-game__picture">
                    <nuxt-img class="card-game__image" :src="`/images/pages/game/${card.icon}`"
                              alt="Декоративное изображение" />
                </div>
                <div class="card-game__name">{{ card.name }}</div>
                <div class="card-game__type">{{ card.type }}</div>
                <div class="card-game__description">{{ card.description }}</div>
            </div>
        </div>
        <Dice v-if="showDice" />
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/game/id/styles";
</style>