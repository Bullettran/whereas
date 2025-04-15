<script lang="ts">
import { defineComponent } from "vue";
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
                bonus: {
                    str: 1,
                },
                manaCost: 2,
            },
            {
                name: "Редкая защита",
                type: "Защита",
                rare: "rare",
                description: "Физическая защита +2",
                count: 2,
                icon: "defence.png",
                bonus: {
                    def: 2,
                },
                manaCost: 1,
            },
            {
                name: "Ледянное копье",
                type: "Магия",
                rare: "standard",
                description: "Магическая атака +1",
                count: 1,
                icon: "frost-ball-1.png",
                bonus: {
                    int: 1,
                },
                manaCost: 2,
            },
            {
                name: "Легендарное лечение",
                type: "Лечение",
                rare: "legend",
                description: "Жизни +3",
                count: 3,
                icon: "heal-1.png",
                bonus: {
                    hp: 3,
                },
                manaCost: 2,
            },
            {
                name: "Простое лечение",
                type: "Лечение",
                rare: "standard",
                description: "Жизни +1",
                count: 1,
                icon: "heal-1.png",
                bonus: {
                    hp: 1,
                },
                manaCost: 2,
            },
            {
                name: "Мощный удар",
                type: "Атака",
                rare: "rare",
                description: "Физическая атака +2",
                count: 2,
                icon: "attack.png",
                bonus: {
                    str: 2,
                },
                manaCost: 2,
            },
            {
                name: "Ледяная буря",
                type: "Магия",
                rare: "legend",
                description: "Магическая атака +3",
                count: 3,
                icon: "frost-ball-1.png",
                bonus: {
                    int: 3,
                },
                manaCost: 2,
            },
            {
                name: "Щит молний",
                type: "Защита",
                rare: "rare",
                description: "Защита от магии +20",
                count: 2,
                icon: "defence.png",
                bonus: {
                    def: 40,
                },
                manaCost: 2,
            },
            {
                name: "Кровавая рана",
                type: "Атака",
                rare: "rare",
                description: "Наносит кровотечение (2 урона за ход, 3 хода)",
                count: 1,
                icon: "bleed-1.png",
                bonus: {
                    bleed: 2,
                },
                manaCost: 3,
            },
            {
                name: "Магический источник",
                type: "Магия",
                rare: "rare",
                description: "Восстанавливает 3 маны",
                count: 1,
                icon: "mana-1.png", // Предполагаем, что у тебя есть такая иконка
                bonus: { mp: 3 }, // Новый эффект: восстановление маны
                manaCost: 0,
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
        selectedCards: 0,
        maxSelectedCards: 3,
        useCardIndices: [] as number[],
        baseStats: {
            person: {
                currentHp: 8000,
                currentMp: 5,
                str: 5,
                def: 10,
                luc: 10,
                spd: 10,
                int: 1,
                acc: 10,
                vit: 80000,
                agi: 10,
            },
            mob: {
                currentHp: 20,
                currentMp: 5,
                str: 10,
                def: 0,
                luc: 10,
                spd: 3,
                int: 10,
                acc: 10,
                vit: 80,
                agi: 10,
            },
        },
        cardBonuses: {
            person: {
                str: 0,
                def: 0,
                luc: 0,
                spd: 0,
                int: 0,
                acc: 0,
                vit: 0,
                agi: 0,
            },
        },
        activeEffects: {
            mob: [] as Array<{
                type: string;
                duration: number;
                val: number;
                sourceCard?: string;
                icon: string;
            }>,
            person: [] as Array<{
                type: string;
                duration: number;
                val: number;
                sourceCard?: string;
                icon: string;
            }>,
        },
        messages: {
            mob: {
                type: "",
                message: "",
            },
            person: {
                type: "",
                message: "",
            },
            turnKey: 0,
        },
    }),
    mounted() {
        this.initCards();
    },
    computed: {
        personStats() {
            return {
                ...this.baseStats.person,
                physicalDmg: this.physicalDmg("person"),
                physicalDef: this.physicalDef("person"),
                speed: this.speed("person"),
                dodge: this.dodge("person"),
                criticalDmg: this.criticalDmg("person"),
                hitChance: this.hitChance("person"),
            };
        },
        mobStats() {
            return {
                ...this.baseStats.mob,
                physicalDmg: this.physicalDmg("mob"),
                physicalDef: this.physicalDef("mob"),
                speed: this.speed("mob"),
                dodge: this.dodge("mob"),
                criticalDmg: this.criticalDmg("mob"),
                hitChance: this.hitChance("mob"),
            };
        },
        isAttackDisabled(): boolean {
            return this.isAnimating;
        },
    },
    methods: {
        // Основные методы расчета характеристик
        getStat(target: "person" | "mob", stat: string): number {
            // @ts-ignore
            const base = this.baseStats[target][stat];
            // @ts-ignore
            return target === "person" ? base + this.cardBonuses.person[stat] : base;
        },

        maxHp(target: "person" | "mob", bonus: number = 0) {
            const hp = 5;
            const vit = this.getStat(target, "vit");
            return hp + Math.floor(vit / 2) + bonus;
        },
        maxMp(target: "person" | "mob", bonus: number = 0) {
            const mp = 5;
            const int = this.getStat(target, "int");
            return mp + Math.floor(int / 2) + bonus;
        },

        physicalDmg(target: "person" | "mob", bonus: number = 0): number {
            const str = this.getStat(target, "str");
            const agi = this.getStat(target, "agi");
            const int = this.getStat(target, "int");
            const baseDmg = 1;
            return baseDmg + Math.floor(str / 3) +  Math.floor(int / 3) + Math.floor(agi / 3) + bonus;
        },

        physicalDef(target: "person" | "mob", bonus: number = 0): number {
            const def = this.getStat(target, "def");
            const str = this.getStat(target, "str");
            const sum = 1 + Math.floor(def / 2) + Math.floor(str / 2) + bonus;
            return Math.min(sum, 70);
        },

        speed(target: "person" | "mob", bonus: number = 0): number {
            const spd = this.getStat(target, "spd");
            const agi = this.getStat(target, "agi");
            return 1 + Math.floor(spd / 2) + Math.floor(agi / 3) + bonus;
        },

        dodge(target: "person" | "mob", bonus: number = 0): number {
            const agi = this.getStat(target, "agi");
            const luc = this.getStat(target, "luc");
            const sum = Math.floor(agi / 2) + Math.floor(luc / 2) + bonus;
            return Math.min(sum, 30);
        },

        criticalDmg(target: "person" | "mob", bonus: number = 0): number {
            const agi = this.getStat(target, "agi");
            const luc = this.getStat(target, "luc");
            const acc = this.getStat(target, "acc");
            const sum = Math.floor(agi / 3) + Math.floor(luc / 3) + Math.floor(acc / 2) + bonus;
            return Math.min(sum, 50);
        },

        hitChance(target: "person" | "mob", bonus: number = 0): number {
            const acc = this.getStat(target, "acc");
            const luc = this.getStat(target, "luc");
            const int = this.getStat(target, "int");
            const sum = 50 + acc + Math.floor(luc / 3) + Math.floor(int / 3) + bonus;
            return Math.min(sum, 100);
        },


        // Работа с картами
        getRandomCards(count: number) {
            const shuffled = [...this.allCards].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        },

        initCards() {
            this.levelCards = this.getRandomCards(5);
            this.choices = Array(9).fill(null);
            this.selectedCards = 0;
            this.useCardIndices = [];
            // todo(kharal): Придумать как пополнять ману от интелекта может быть реген сделать?
            // this.baseStats.person.currentMp = this.maxMp("person");
            this.resetCardBonuses();
        },

        resetCardBonuses() {
            this.cardBonuses.person = {
                str: 0,
                def: 0,
                luc: 0,
                spd: 0,
                int: 0,
                acc: 0,
                vit: 0,
                agi: 0,
            };
        },

        applyCardBonuses() {
            this.resetCardBonuses();
            // @ts-ignore
            this.choices.forEach(choice => {
                if (choice?.bonus) {
                    // Обрабатываем лечение
                    if (choice.bonus.hp) {
                        this.baseStats.person.currentHp = Math.min(
                            this.baseStats.person.currentHp + choice.bonus.hp,
                            this.maxHp("person"),
                        );
                        this.addToLog(`Персонаж восстановил ${choice.bonus.hp} HP!`);
                        this.showActionText("person", `+${choice.bonus.hp} HP`, "heal");
                    }

                    // Обрабатываем восстановление маны
                    if (choice.bonus.mp) {
                        this.baseStats.person.currentMp = Math.min(
                            this.baseStats.person.currentMp + choice.bonus.mp,
                            this.maxMp("person"),
                        );
                        this.addToLog(`Персонаж восстановил ${choice.bonus.mp} MP!`);
                        this.showActionText("person", `+${choice.bonus.mp} MP`, "mana-restore");
                    }

                    // Обрабатываем остальные бонусы
                    for (const [stat, value] of Object.entries(choice.bonus)) {
                        if (stat !== "hp" && stat !== "bleed" && stat !== "mp" && stat in this.cardBonuses.person) {
                            this.cardBonuses.person[stat as keyof typeof this.cardBonuses.person] += value as number;
                        }
                    }
                }
            });
        },

        addEffect(target: "person" | "mob", effect: { type: string; duration: number; val: number; sourceCard?: string; icon: string; }) {
            this.activeEffects[target].push({
                ...effect,
                icon: effect.icon,
            });
        },

        processEffects() {
            // Обрабатываем эффекты для моба
            this.activeEffects.mob = this.activeEffects.mob.filter(effect => {
                if (effect.type === "bleed") {
                    this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - effect.val);
                    this.addToLog(`Кровотечение наносит ${effect.val} урона мобу`);
                    this.showActionText("mob", `-${effect.val} (кровотечение)`, "dmg");
                }

                effect.duration -= 1;
                return effect.duration > 0;
            });

            // Обрабатываем эффекты для персонажа
            this.activeEffects.person = this.activeEffects.person.filter(effect => {
                // Можно добавить другие эффекты для персонажа
                effect.duration -= 1;
                return effect.duration > 0;
            });
        },

        // Боевая система
        async playBattleSequence() {
            if (this.speed("person") >= this.speed("mob")) {
                await this.characterAttack();
                if (this.baseStats.mob.currentHp > 0) {
                    await this.mobAttack();
                }
            } else {
                await this.mobAttack();
                if (this.baseStats.person.currentHp > 0) {
                    await this.characterAttack();
                }
            }
        },

        async characterAttack() {
            const hitRoll = Math.random() * 100;
            if (hitRoll > this.hitChance("person") - this.dodge("mob")) {
                this.addToLog("Персонаж промахнулся!");
                this.showActionText("person", "Промах!", "miss");
                return;
            }

            const damage = Math.max(1, this.physicalDmg("person") - this.physicalDef("mob"));
            this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - damage);
            this.addToLog(`Персонаж атакует и наносит ${damage} урона!`);
            this.showActionText("mob", `-${damage}`, "dmg");

            // @ts-ignore
            this.choices.forEach(choice => {
                if (choice?.bonus?.bleed) {
                    const bleedValue = choice.bonus.bleed;
                    this.addEffect("mob", {
                        type: "bleed",
                        duration: 3,
                        val: bleedValue,
                        sourceCard: choice.name,
                        icon: choice.icon
                    });
                    this.addToLog(`У моба началось кровотечение (${bleedValue} урона за ход)`);
                }
            });

            await this.playAnimationSequence("game__person--attack2", "game__mob--hurt", damage);

            if (this.baseStats.mob.currentHp <= 0) {
                this.addToLog("Моб побежден!");
                this.showActionText("mob", "Побежден!", "death");
                await this.playDeathAnimation("mob");
            }
        },

        async mobAttack() {
            const hitRoll = Math.random() * 100;
            if (hitRoll > this.hitChance("mob") - this.dodge("person")) {
                this.addToLog("Моб промахнулся!");
                this.showActionText("mob", "Промах!", "miss");
                return;
            }

            const damage = Math.max(1, this.physicalDmg("mob") - this.physicalDef("person"));
            this.baseStats.person.currentHp = Math.max(0, this.baseStats.person.currentHp - damage);
            this.addToLog(`Моб атакует и наносит ${damage} урона!`);
            this.showActionText("person", `-${damage}`, "dmg");

            await this.playAnimationSequence("game__mob--attack", "game__person--hurt", damage);

            if (this.baseStats.person.currentHp <= 0) {
                this.addToLog("Персонаж побежден!");
                this.showActionText("person", "Побежден!", "death");
                await this.playDeathAnimation("person");
            }
        },

        // Drag and Drop
        onDragStart(event: DragEvent, cardIndex: number) {
            if (this.selectedCards >= this.maxSelectedCards) return;
            if (this.useCardIndices.includes(cardIndex)) return;
            const card = this.levelCards[cardIndex];
            if (card.manaCost > this.baseStats.person.currentMp) return;
            if (event.dataTransfer) {
                event.dataTransfer.setData("text/plain", cardIndex.toString());
                event.dataTransfer.effectAllowed = "move";
            }
        },

        onDrop(event: DragEvent, choiceIndex: number) {
            event.preventDefault();
            if (this.selectedCards >= this.maxSelectedCards && !this.choices[choiceIndex]) return;

            const cardIndex = event.dataTransfer?.getData("text/plain");
            if (cardIndex === undefined || cardIndex === "") return;

            const parsedIndex = parseInt(cardIndex);
            if (isNaN(parsedIndex)) return;

            // Проверяем, не была ли карта уже выбрана
            if (this.useCardIndices.includes(parsedIndex)) return;

            const card = this.levelCards[parsedIndex];
            if (card.manaCost > this.baseStats.person.currentMp) return; // Проверяем ману
            const previousCard = this.choices[choiceIndex];

            const hadCardBefore = !!this.choices[choiceIndex];
            this.choices[choiceIndex] = card;

            if (!hadCardBefore && this.choices[choiceIndex]) {
                this.selectedCards++;
                this.useCardIndices.push(parsedIndex);
                this.baseStats.person.currentMp -= card.manaCost;
            } else if (hadCardBefore && !this.choices[choiceIndex]) {
                this.selectedCards--;
                // Возвращаем ману за предыдущую карту
                if (previousCard) {
                    this.baseStats.person.currentMp += previousCard.manaCost;
                } else if (hadCardBefore && this.choices[choiceIndex]) {
                    // Если заменили карту, возвращаем ману за старую и вычитаем за новую
                    if (previousCard) {
                        this.baseStats.person.currentMp += previousCard.manaCost;
                    }
                    this.baseStats.person.currentMp -= card.manaCost;
                }
            }
        },

        // Вспомогательные методы
        async changeCards() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.applyCardBonuses();

            this.processEffects();

            // Проверяем, не умер ли моб от эффектов
            if (this.baseStats.mob.currentHp <= 0) {
                this.addToLog("Моб побежден от эффектов!");
                this.showActionText("mob", "Побежден!", "death");
                await this.playDeathAnimation("mob");
            } else {
                await this.playBattleSequence();
            }

            this.showDice = true;
            setTimeout(() => {
                this.showDice = false;
                this.initCards();
                this.resetMessages();
                this.isAnimating = false;
            }, 1500);
        },

        resetMessages() {
            this.messages.person = { type: "", message: "" };
            this.messages.mob = { type: "", message: "" };
            this.messages.turnKey++;
        },

        showActionText(target: "person" | "mob", message: string, type: string = "") {
            this.messages[target] = { message, type };
        },

        addToLog(message: string) {
            this.battleLog.push(message);
        },

        // Анимации
        async playAnimationSequence(
            attackAnimation: string,
            hurtAnimation: string,
            damage: number,
        ): Promise<void> {
            return new Promise((resolve) => {
                const attacker = attackAnimation.includes("person")
                    ? document.querySelector(".game__person")
                    : document.querySelector(".game__mob");

                const defender = hurtAnimation.includes("person")
                    ? document.querySelector(".game__person")
                    : document.querySelector(".game__mob");

                if (attacker && defender) {
                    attacker.classList.remove(
                        attackAnimation.includes("person") ? "game__person--idle" : "game__mob--idle",
                    );
                    attacker.classList.add(attackAnimation);

                    defender.classList.remove(
                        hurtAnimation.includes("person") ? "game__person--idle" : "game__mob--idle",
                    );
                    defender.classList.add(hurtAnimation);

                    attacker.addEventListener(
                        "animationend",
                        () => {
                            attacker.classList.remove(attackAnimation);
                            attacker.classList.add(
                                attackAnimation.includes("person") ? "game__person--idle" : "game__mob--idle",
                            );

                            defender.classList.remove(hurtAnimation);
                            defender.classList.add(
                                hurtAnimation.includes("person") ? "game__person--idle" : "game__mob--idle",
                            );

                            resolve();
                        },
                        { once: true },
                    );
                } else {
                    resolve();
                }
            });
        },

        async playDeathAnimation(target: "person" | "mob"): Promise<void> {
            return new Promise((resolve) => {
                const element = document.querySelector(
                    target === "person" ? ".game__person" : ".game__mob",
                );

                if (element) {
                    element.classList.remove(
                        target === "person" ? "game__person--idle" : "game__mob--idle",
                    );
                    element.classList.add(
                        target === "person" ? "game__person--death" : "game__mob--death",
                    );

                    element.addEventListener(
                        "animationend",
                        () => {
                            resolve();
                        },
                        { once: true },
                    );
                } else {
                    resolve();
                }
            });
        },
    },
});
</script>

<template>
    <div class="game">
        <div class="game__container container">
            <div class="game__logs">
                <Char />
                <div class="game__battle-log">
                    <div class="game__battle-item" v-for="(log, index) in battleLog" :key="index">{{ log }}</div>
                </div>
            </div>
            <div class="game__buffs buffs">
                <div class="buffs__person">
                    <div class="buffs__buff" v-for="(effect, index) in activeEffects.person" :key="'person-effect-' + index">
                        <nuxt-img class="buffs__image" :src="`/images/pages/game/${effect.icon}`"
                                  alt="Декоративное изображение" />
                        <span class="buffs__counter">{{effect.duration}}</span>
                    </div>
                    HP: {{ baseStats.person.currentHp }}/{{ maxHp("person") }}
                    MP: {{ baseStats.person.currentMp }}/{{ maxMp("person") }}
                </div>
                <div class="buffs__mob">
                    <div class="buffs__buff" v-for="(effect, index) in activeEffects.mob" :key="'mob-effect-' + index">
                        <nuxt-img class="buffs__image" :src="`/images/pages/game/${effect.icon}`"
                                  alt="Декоративное изображение" />
                        <span class="buffs__counter">{{effect.duration}}</span>
                    </div>
                    HP: {{ baseStats.mob.currentHp }}/{{ maxHp("mob") }}
                </div>
            </div>
            <div class="game__actions game-actions">
                <div
                    :key="'person-' + messages.turnKey"
                    :class="[
                        messages.person.type === 'miss' ? 'game-actions__action--miss' : '',
                         messages.person.type === 'dmg' ? 'game-actions__action--dmg' : '',
                          messages.person.type === 'death' ? 'game-actions__action--death' : '',
                          messages.person.type === 'heal' ? 'game-actions__action--heal' : '',
                          messages.person.type === 'mana-restore' ? 'game-actions__action--mana' : '',
                           'game-actions__action game-actions__person'
                           ]">
                    {{ messages.person.message }}
                </div>
                <div
                    :key="'mob-' + messages.turnKey"
                    :class="[
                        messages.mob.type === 'miss' ? 'game-actions__action--miss-mob' : '',
                         messages.mob.type === 'dmg' ? 'game-actions__action--dmg-mob' : '',
                          messages.mob.type === 'death' ? 'game-actions__action--death-mob' : '',
                          messages.mob.type === 'heal' ? 'game-actions__action--heal-mob' : '',
                           'game-actions__action game-actions__person']">
                    {{ messages.mob.message }}
                </div>
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
                        <button class="game__attack button button--metal" @click="changeCards"
                                :disabled="isAttackDisabled">Атака
                        </button>
                    </div>
                </div>
                <div class="game__block game__block--mobs">
                    <div class="game__mob game__mob--idle"></div>
                </div>
            </div>
        </div>
        <div class="game__buttons container">
            <div class="game__buttons-block">
                <div
                    :class="[card.rare ? `card-game--${card.rare}` : 'card-game--standard', useCardIndices.includes(index) ? 'card-game--used' : '', 'game__card card-game button']"
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
                    <div class="card-game__mana">
                        <nuxt-icon class="card-game__icon-mana" name="stats/mana"/>
                        {{ card.manaCost }}
                    </div>
                </div>
            </div>
            <div class="game__counts">
                Выбранные карточки {{ selectedCards }} / {{ maxSelectedCards }}
            </div>
        </div>
        <Dice v-if="showDice" />
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/game/id/styles";
</style>