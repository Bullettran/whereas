<script lang="ts">
import { defineComponent, reactive } from "vue";
import Dice from "~/components/global/dice/dice.vue";

// Константы для типов карт и эффектов
const CARD_TYPES = {
    ATTACK: "Атака",
    DEFENSE: "Защита",
    MAGIC: "Магия",
    HEAL: "Лечение",
    BUFF: "Бафф",
} as const;

const EFFECT_TYPES = {
    BLEED: "bleed",
    REGEN: "regen",
    BUFF: "buff",
    IMMUNE: "immune",
    // todo(kharal): удобство
    // POISON: "poison",
} as const;

// Типы для TypeScript
interface Card {
    name: string;
    type: string;
    rare: string;
    description: string;
    count: number;
    icon: string;
    bonus: {
        [key: string]: number | boolean;
    };
    manaCost: number;
    duration?: number;
}

interface Effect {
    type: string;
    duration: number;
    val: number;
    sourceCard?: string;
    icon: string;
    stat?: string;
}

interface Stats {
    attack: number;
    critical: number;
    hp: number;
    mp: number;
    hitChance: number;
    dodge: number;
    speed: number;
    defence: number;
    currentHp: number;
    currentMp: number;
}

interface CardBonuses {
    attack: number;
    critical: number;
    hp: number;
    mp: number;
    hitChance: number;
    dodge: number;
    speed: number;
    defence: number;
}

export default defineComponent({
    name: "Index",
    components: { Dice },
    setup() {
        const char = usePersonState();
        // Карты игры
        // @ts-ignore
        const allCards: Card[] = reactive([
            {
                name: "Физическая атака",
                type: CARD_TYPES.ATTACK,
                rare: "standard",
                description: "Физическая атака +1",
                count: 1,
                icon: "attack.png",
                bonus: { str: 1 },
                manaCost: 2,
            },
            {
                name: "Редкая защита",
                type: CARD_TYPES.DEFENSE,
                rare: "rare",
                description: "Физическая защита +2",
                count: 2,
                icon: "defence.png",
                bonus: { def: 2 },
                manaCost: 1,
            },
            {
                name: "Ледяное копье",
                type: CARD_TYPES.MAGIC,
                rare: "standard",
                description: "Магическая атака +1",
                count: 1,
                icon: "frost-ball-1.png",
                bonus: { int: 1 },
                manaCost: 2,
            },
            {
                name: "Легендарное лечение",
                type: CARD_TYPES.HEAL,
                rare: "legend",
                description: "Жизни +3",
                count: 3,
                icon: "heal-1.png",
                bonus: { hp: 3 },
                manaCost: 2,
            },
            {
                name: "Простое лечение",
                type: CARD_TYPES.HEAL,
                rare: "standard",
                description: "Жизни +1",
                count: 1,
                icon: "heal-1.png",
                bonus: { hp: 1 },
                manaCost: 2,
            },
            {
                name: "Мощный удар",
                type: CARD_TYPES.ATTACK,
                rare: "rare",
                description: "Физическая атака +2",
                count: 2,
                icon: "attack.png",
                bonus: { str: 2 },
                manaCost: 2,
            },
            {
                name: "Ледяная буря",
                type: CARD_TYPES.MAGIC,
                rare: "legend",
                description: "Магическая атака +3",
                count: 3,
                icon: "frost-ball-1.png",
                bonus: { int: 3 },
                manaCost: 2,
            },
            {
                name: "Щит молний",
                type: CARD_TYPES.DEFENSE,
                rare: "rare",
                description: "Защита от магии +20",
                count: 2,
                icon: "defence.png",
                bonus: { def: 40 },
                manaCost: 2,
            },
            {
                name: "Кровавая рана",
                type: CARD_TYPES.ATTACK,
                rare: "rare",
                description: "Наносит кровотечение (2 урона за ход, 3 хода)",
                count: 1,
                icon: "bleed-1.png",
                bonus: { bleed: 2 },
                manaCost: 3,
            },
            {
                name: "Магический источник",
                type: CARD_TYPES.MAGIC,
                rare: "rare",
                description: "Восстанавливает 3 маны",
                count: 1,
                icon: "mana-1.png",
                bonus: { mp: 3 },
                manaCost: 0,
            },
            {
                name: "Регенерация",
                type: CARD_TYPES.BUFF,
                rare: "rare",
                description: "Восстанавливает 1 HP каждый ход (3 хода)",
                count: 1,
                icon: "regen.png",
                bonus: { regen: 1 },
                manaCost: 2,
                duration: 3,
            },
            {
                name: "Защитный ритуал",
                type: CARD_TYPES.BUFF,
                rare: "rare",
                description: "Полная защита от урона (1 ход)",
                count: 2,
                icon: "prevent-all.png",
                bonus: { immune: true },
                manaCost: 3,
                duration: 1,
            },
            {
                name: "Очищение",
                type: CARD_TYPES.DEFENSE,
                rare: "rare",
                description: "Снимает все негативные эффекты",
                count: 1,
                icon: "dispel.png",
                bonus: { dispel: true },
                manaCost: 3,
            },
        ]);

        return { allCards, char };
    },
    data: () => ({
        levelCards: [] as Card[],
        choices: Array(9).fill(null) as (Card | null)[],
        showDice: false,
        isAnimating: false,
        battleLog: [] as string[],
        selectedCards: 0,
        maxSelectedCards: 3,
        useCardIndices: [] as number[],
        baseStats: {
            person: {
                attack: 2,
                critical: 2,
                hp: 10,
                mp: 10,
                hitChance: 50,
                dodge: 20,
                speed: 2,
                defence: 3,
                currentHp: 10,
                currentMp: 10,
            },
            mob: {
                attack: 1,
                critical: 5,
                hp: 15,
                mp: 1,
                hitChance: 50,
                dodge: 20,
                speed: 1,
                defence: 5,
                currentHp: 15,
                currentMp: 1,
            },
        } as { person: Stats; mob: Stats },
        // @ts-ignore
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
        } as { person: CardBonuses },
        activeEffects: {
            mob: [] as Effect[],
            person: [] as Effect[],
        },
        messages: {
            mob: { type: "", message: "" },
            person: { type: "", message: "" },
            turnKey: 0,
        },
        turnCount: 1,
        COMBO_TYPES: {
            CRITICAL: "critical",
            HIT_CHANCE: "hitChance",
            ATTACK: "attack",
        },
    }),
    mounted() {
        this.initCards();
        this.baseStats.person.attack = this.char.character.stats.attack;
        this.baseStats.person.defence = this.char.character.stats.defence;
        this.baseStats.person.critical = this.char.character.stats.critical;
        this.baseStats.person.hp = this.char.character.stats.hp;
        this.baseStats.person.mp = this.char.character.stats.mp;
        this.baseStats.person.hitChance = this.char.character.stats.hitChance;
        this.baseStats.person.dodge = this.char.character.stats.dodge;
        this.baseStats.person.speed = this.char.character.stats.speed;
        this.baseStats.person.currentHp = this.maxHp("person");
        this.baseStats.person.currentMp = this.maxMp("person");
    },
    computed: {
        personStats(): Stats & {
            physicalDmg: number;
            physicalDef: number;
        } {
            return {
                ...this.baseStats.person,
                physicalDmg: this.physicalDmg("person"),
                physicalDef: this.physicalDef("person"),
            };
        },
        mobStats(): Stats & {
            physicalDmg: number;
            physicalDef: number;
        } {
            return {
                ...this.baseStats.mob,
                physicalDmg: this.physicalDmg("mob"),
                physicalDef: this.physicalDef("mob"),
            };
        },
        isAttackDisabled(): boolean {
            return this.isAnimating;
        },
        activeCombos() {
            const lines = [
                { indices: [0, 3, 6], type: this.COMBO_TYPES.CRITICAL },    // 1-4-7
                { indices: [1, 4, 7], type: this.COMBO_TYPES.HIT_CHANCE },  // 2-5-8
                { indices: [2, 5, 8], type: this.COMBO_TYPES.ATTACK },      // 3-6-9
            ];

            return lines.filter(line =>
                line.indices.every(index => this.choices[index] !== null),
            ).map(line => line.type);
        },

        comboIndices() {
            const indices = new Set<number>();

            if (this.activeCombos.includes(this.COMBO_TYPES.CRITICAL)) {
                [0, 3, 6].forEach(index => indices.add(index));
            }
            if (this.activeCombos.includes(this.COMBO_TYPES.HIT_CHANCE)) {
                [1, 4, 7].forEach(index => indices.add(index));
            }
            if (this.activeCombos.includes(this.COMBO_TYPES.ATTACK)) {
                [2, 5, 8].forEach(index => indices.add(index));
            }

            return Array.from(indices);
        },
    },
    methods: {
        // Получение значения статы с учетом бонусов
        getStat(target: "person" | "mob", stat: keyof Stats): number {
            const base = this.baseStats[target][stat];
            // @ts-ignore
            return target === "person" ? base + (this.cardBonuses.person[stat] || 0) : base;
        },

        // Максимальное здоровье
        maxHp(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "hp") + bonus;
        },

        // Максимальная мана
        maxMp(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "mp") + bonus;
        },

        // Физический урон
        physicalDmg(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "attack") + bonus;
        },

        // Физическая защита
        physicalDef(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "defence") + bonus;
        },

        // Скорость
        speed(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "speed") + bonus;
        },

        // Уклонение
        dodge(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "dodge") + bonus;
        },

        // Критический урон
        criticalDmg(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "critical") + bonus;
        },

        // Шанс попадания
        hitChance(target: "person" | "mob", bonus: number = 0): number {
            return this.getStat(target, "hitChance") + bonus;
        },

        // Получение случайных карт
        getRandomCards(count: number): Card[] {
            const shuffled = [...this.allCards].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        },

        // Инициализация карт
        initCards() {
            this.levelCards = this.getRandomCards(5);
            this.choices = Array(9).fill(null);
            this.selectedCards = 0;
            this.useCardIndices = [];
            this.resetCardBonuses();
        },

        // Сброс бонусов карт
        resetCardBonuses() {
            this.cardBonuses.person = {
                attack: 0,
                critical: 0,
                hp: 0,
                mp: 0,
                hitChance: 0,
                dodge: 0,
                speed: 0,
                defence: 0,
            };
        },

        // Добавление эффекта
        addEffect(
            target: "person" | "mob",
            effect: Effect,
        ) {
            this.activeEffects[target].push({ ...effect });
        },

        // Применение бонусов карт
        applyCardBonuses() {
            this.resetCardBonuses();

            this.activeCombos.forEach(combo => {
                switch (combo) {
                    case this.COMBO_TYPES.CRITICAL:
                        this.cardBonuses.person.critical += 5; // Увеличиваем критический урон
                        this.addToLog("Активирована комбинация: Критический урон +5%!");
                        break;
                    case this.COMBO_TYPES.HIT_CHANCE:
                        this.cardBonuses.person.hitChance += 5; // Увеличиваем шанс попадания
                        this.addToLog("Активирована комбинация: Шанс попадания +5%!");
                        break;
                    case this.COMBO_TYPES.ATTACK:
                        this.cardBonuses.person.attack += 1; // Увеличиваем атаку
                        this.addToLog("Активирована комбинация: Атака +1!");
                        break;
                }
            });

            this.choices.forEach((choice) => {
                if (!choice) return;

                // Лечение
                if (choice.bonus.hp) {
                    this.baseStats.person.currentHp = Math.min(
                        this.baseStats.person.currentHp + (choice.bonus.hp as number),
                        this.maxHp("person"),
                    );
                    this.addToLog(`Персонаж восстановил ${choice.bonus.hp} HP!`);
                    this.showActionText("person", `+${choice.bonus.hp} HP`, "heal");
                }

                // Мана
                if (choice.bonus.mp) {
                    this.baseStats.person.currentMp = Math.min(
                        this.baseStats.person.currentMp + (choice.bonus.mp as number),
                        this.maxMp("person"),
                    );
                    this.addToLog(`Персонаж восстановил ${choice.bonus.mp} MP!`);
                    this.showActionText("person", `+${choice.bonus.mp} MP`, "mana-restore");
                }

                // Диспел
                if (choice.bonus.dispel) {
                    this.activeEffects.person = [];
                    this.addToLog("Все негативные эффекты сняты!");
                    this.showActionText("person", "Очищение", "heal");
                }

                // Эффекты с длительностью
                if (choice.duration) {
                    // todo(kharal): удобство
                    // if (choice.bonus.poison) {
                    //     this.addEffect("person", {
                    //         type: EFFECT_TYPES.POISON,
                    //         duration: choice.duration,
                    //         val: choice.bonus.poison as number,
                    //         sourceCard: choice.name,
                    //         icon: choice.icon,
                    //     });
                    // }
                    if (choice.bonus.regen) {
                        this.addEffect("person", {
                            type: EFFECT_TYPES.REGEN,
                            duration: choice.duration,
                            val: choice.bonus.regen as number,
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                    } else if (choice.bonus.immune) {
                        this.addEffect("person", {
                            type: EFFECT_TYPES.IMMUNE,
                            duration: choice.duration,
                            val: 1,
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                    } else if (choice.bonus.def || choice.bonus.str) {
                        this.addEffect("person", {
                            type: EFFECT_TYPES.BUFF,
                            duration: choice.duration,
                            val: (choice.bonus.def || choice.bonus.str || 0) as number,
                            stat: choice.bonus.def ? "def" : "str",
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                        if (choice.bonus.def) {
                            this.cardBonuses.person.def += choice.bonus.def as number;
                        }
                        if (choice.bonus.str) {
                            this.cardBonuses.person.str += choice.bonus.str as number;
                        }
                    }
                }

                // Обычные бонусы
                for (const [stat, value] of Object.entries(choice.bonus)) {
                    if (
                        !["hp", "bleed", "mp", "regen", "dispel", "immune"].includes(stat) &&
                        stat in this.cardBonuses.person
                    ) {
                        this.cardBonuses.person[stat as keyof CardBonuses] += value as number;
                    }
                }
            });
        },

        // Обработка эффектов
        processEffects() {
            // Проверка иммунитета для персонажа
            const isImmune = this.activeEffects.person.some(
                (e) => e.type === EFFECT_TYPES.IMMUNE,
            );

            // Эффекты моба
            this.activeEffects.mob.forEach((effect) => {
                if (effect.type === EFFECT_TYPES.BLEED) {
                    this.baseStats.mob.currentHp = Math.max(
                        0,
                        this.baseStats.mob.currentHp - effect.val,
                    );
                    this.addToLog(`Кровотечение наносит ${effect.val} урона мобу`);
                    this.showActionText("mob", `-${effect.val} (кровотечение)`, "dmg");
                }
                // todo(kharal): удобство
                // if (effect.type === EFFECT_TYPES.POISON && !isImmune) {
                //     this.baseStats.person.currentHp = Math.max(0, this.baseStats.person.currentHp - effect.val);
                //     this.addToLog(`Яд наносит ${effect.val} урона персонажу`);
                //     this.showActionText("person", `-${effect.val} (яд)`, "dmg");
                // }
            });

            // Эффекты персонажа
            this.activeEffects.person.forEach((effect) => {
                if (effect.type === EFFECT_TYPES.BLEED) {
                    if (!isImmune) {
                        this.baseStats.person.currentHp = Math.max(
                            0,
                            this.baseStats.person.currentHp - effect.val,
                        );
                        this.addToLog(`Кровотечение наносит ${effect.val} урона персонажу`);
                        this.showActionText("person", `-${effect.val} (кровотечение)`, "dmg");
                    } else {
                        this.addToLog(`Кровотечение заблокировано иммунитетом!`);
                        this.showActionText("person", `Заблокировано!`, "heal");
                    }
                } else if (effect.type === EFFECT_TYPES.REGEN) {
                    this.baseStats.person.currentHp = Math.min(
                        this.baseStats.person.currentHp + effect.val,
                        this.maxHp("person"),
                    );
                    this.addToLog(`Регенерация восстанавливает ${effect.val} HP`);
                    this.showActionText("person", `+${effect.val} HP (реген)`, "heal");
                }
            });

            // Кровотечение от моба каждые 2 хода
            if (this.turnCount % 2 === 0 && this.baseStats.mob.currentHp > 0) {
                if (!isImmune) {
                    this.addEffect("person", {
                        type: EFFECT_TYPES.BLEED,
                        duration: 2,
                        val: 2,
                        sourceCard: "Атака моба",
                        icon: "bleed-1.png",
                    });
                    this.addToLog("Моб наложил кровотечение на персонажа!");
                } else {
                    this.addToLog("Моб пытался наложить кровотечение, но иммунитет заблокировал!");
                    this.showActionText("person", "Заблокировано!", "heal");
                }
            }

            this.turnCount++;
        },

        // Уменьшение длительности эффектов
        decreaseEffectDurations() {
            this.activeEffects.mob = this.activeEffects.mob.filter((effect) => {
                effect.duration -= 1;
                return effect.duration > 0;
            });

            this.activeEffects.person = this.activeEffects.person.filter((effect) => {
                effect.duration -= 1;
                return effect.duration > 0;
            });
        },

        // Боевая последовательность
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

        // Вспомогательная функцию для проверки критического удара
        isCriticalHit(target: "person" | "mob"): boolean {
            const criticalChance = this.criticalDmg(target); // Шанс критического удара (например, 0-50%)
            const roll = Math.random() * 100;
            return roll <= criticalChance; // Если roll попадает в шанс критического удара
        },

        // Атака персонажа
        async characterAttack() {
            const hitRoll = Math.random() * 100;
            if (hitRoll > this.hitChance("person") - this.dodge("mob")) {
                this.addToLog("Персонаж промахнулся!");
                this.showActionText("person", "Промах!", "miss");
                return;
            }

            const isCritical = this.isCriticalHit("person");
            let damage = Math.max(1, this.physicalDmg("person") - this.physicalDef("mob"));
            const criticalMultiplier = 2; // Множитель критического урона
            if (isCritical) {
                damage *= criticalMultiplier;
                this.addToLog(`Критический удар! Персонаж наносит ${damage} урона!`);
                this.showActionText("mob", `-${damage} (КРИТ!)`, "dmg-critical");
            } else {
                this.addToLog(`Персонаж атакует и наносит ${damage} урона!`);
                this.showActionText("mob", `-${damage}`, "dmg");
            }
            this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - damage);

            this.choices.forEach((choice) => {
                if (choice?.bonus?.bleed) {
                    const bleedValue = choice.bonus.bleed as number;
                    this.addEffect("mob", {
                        type: EFFECT_TYPES.BLEED,
                        duration: 3,
                        val: bleedValue,
                        sourceCard: choice.name,
                        icon: choice.icon,
                    });
                    this.addToLog(`У моба началось кровотечение (${bleedValue} урона за ход)`);
                }
            });

            this.playAnimationSequence(isCritical ? "game__person--special" : "game__person--attack2", "game__mob--hurt", damage);
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (this.baseStats.mob.currentHp <= 0) {
                this.addToLog("Моб побежден!");
                this.showActionText("mob", "Побежден!", "death");
                await this.playDeathAnimation("mob");
            }
        },

        // Атака моба
        async mobAttack() {
            const hitRoll = Math.random() * 100;
            if (hitRoll > this.hitChance("mob") - this.dodge("person")) {
                this.addToLog("Моб промахнулся!");
                this.showActionText("mob", "Промах!", "miss");
                return;
            }

            const isImmune = this.activeEffects.person.some(
                (e) => e.type === EFFECT_TYPES.IMMUNE,
            );
            if (isImmune) {
                this.addToLog("Моб атакует, но персонаж невосприимчив к урону!");
                this.showActionText("person", "Заблокировано!", "heal");
                return;
            }

            const isCritical = this.isCriticalHit("mob");
            let damage = Math.max(1, this.physicalDmg("mob") - this.physicalDef("person"));
            const criticalMultiplier = 2; // Множитель критического урона
            if (isCritical) {
                damage *= criticalMultiplier;
                this.addToLog(`Критический удар! Моб наносит ${damage} урона!`);
                this.showActionText("person", `-${damage} (КРИТ!)`, "dmg-critical");
            } else {
                this.addToLog(`Моб атакует и наносит ${damage} урона!`);
                this.showActionText("person", `-${damage}`, "dmg");
            }
            this.baseStats.person.currentHp = Math.max(0, this.baseStats.person.currentHp - damage);

            this.playAnimationSequence(isCritical ? "game__mob--attack" : "game__mob--attack", "game__person--hurt", damage);
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (this.baseStats.person.currentHp <= 0) {
                this.addToLog("Персонаж побежден!");
                this.showActionText("person", "Побежден!", "death");
                await this.playDeathAnimation("person");
            }
        },

        // Перетаскивание карт
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

        isInCombo(index: number) {
            return this.comboIndices.includes(index);
        },

        getComboType(index: number) {
            if ([0, 3, 6].includes(index)) return this.COMBO_TYPES.CRITICAL;
            if ([1, 4, 7].includes(index)) return this.COMBO_TYPES.HIT_CHANCE;
            if ([2, 5, 8].includes(index)) return this.COMBO_TYPES.ATTACK;
            return null;
        },

        // Сброс карты
        onDrop(event: DragEvent, choiceIndex: number) {
            event.preventDefault();
            if (this.selectedCards >= this.maxSelectedCards && !this.choices[choiceIndex]) return;

            const cardIndex = event.dataTransfer?.getData("text/plain");
            if (cardIndex === undefined || cardIndex === "") return;

            const parsedIndex = parseInt(cardIndex);
            if (isNaN(parsedIndex)) return;

            if (this.useCardIndices.includes(parsedIndex)) return;

            const card = this.levelCards[parsedIndex];
            if (card.manaCost > this.baseStats.person.currentMp) return;

            // Проверяем, не пытаемся ли мы переместить карту в тот же слот
            if (this.choices[choiceIndex] && this.useCardIndices[choiceIndex] === parsedIndex) {
                return;
            }

            const previousCard = this.choices[choiceIndex];
            const hadCardBefore = !!this.choices[choiceIndex];

            this.choices[choiceIndex] = card;

            if (!hadCardBefore && this.choices[choiceIndex]) {
                this.selectedCards++;
                this.useCardIndices.push(parsedIndex);
                this.baseStats.person.currentMp -= card.manaCost;
            } else if (hadCardBefore && !this.choices[choiceIndex]) {
                this.selectedCards--;
                if (previousCard) {
                    this.baseStats.person.currentMp += previousCard.manaCost;
                }
            } else if (hadCardBefore && this.choices[choiceIndex]) {
                if (previousCard) {
                    this.baseStats.person.currentMp += previousCard.manaCost;
                }
                this.baseStats.person.currentMp -= card.manaCost;
            }

            if (hadCardBefore) {
                const prevIndex = this.useCardIndices.indexOf(parsedIndex);
                if (prevIndex !== -1) {
                    this.useCardIndices.splice(prevIndex, 1);
                }
            }
        },

        // Смена карт и ход
        async changeCards() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.applyCardBonuses();
            this.processEffects();

            if (this.baseStats.mob.currentHp <= 0) {
                this.addToLog("Моб побежден от эффектов!");
                this.showActionText("mob", "Побежден!", "death");
                await this.playDeathAnimation("mob");
            } else {
                await this.playBattleSequence();
            }

            // Уменьшаем длительность эффектов после боя
            this.decreaseEffectDurations();

            this.showDice = true;
            setTimeout(() => {
                this.showDice = false;
                this.initCards();
                this.resetMessages();
                this.isAnimating = false;
            }, 1500);
        },

        // Сброс сообщений
        resetMessages() {
            this.messages.person = { type: "", message: "" };
            this.messages.mob = { type: "", message: "" };
            this.messages.turnKey++;
        },

        // Отображение текста действия
        showActionText(target: "person" | "mob", message: string, type: string = "") {
            this.messages[target] = { message, type };
        },

        // Добавление в лог
        addToLog(message: string) {
            this.battleLog.unshift(message);
        },

        // Анимация боя
        playAnimationSequence(
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

        // Анимация смерти
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
                    <div class="buffs__buff" v-for="(effect, index) in activeEffects.person"
                         :key="'person-effect-' + index">
                        <nuxt-img class="buffs__image" :src="`/images/pages/game/${effect.icon}`" alt="Эффект" />
                        <span class="buffs__counter">{{ effect.duration }}</span>
                    </div>
                    HP: {{ baseStats.person.currentHp }}/{{ maxHp("person") }}
                    MP: {{ baseStats.person.currentMp }}/{{ maxMp("person") }}
                </div>
                <div class="buffs__mob">
                    <div class="buffs__buff" v-for="(effect, index) in activeEffects.mob" :key="'mob-effect-' + index">
                        <nuxt-img class="buffs__image" :src="`/images/pages/game/${effect.icon}`" alt="Эффект" />
                        <span class="buffs__counter">{{ effect.duration }}</span>
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
          ]"
                >
                    {{ messages.person.message }}
                </div>
                <div
                    :key="'mob-' + messages.turnKey"
                    :class="[
            messages.mob.type === 'miss' ? 'game-actions__action--miss-mob' : '',
            messages.mob.type === 'dmg' ? 'game-actions__action--dmg-mob' : '',
            messages.mob.type === 'death' ? 'game-actions__action--death-mob' : '',
            messages.mob.type === 'heal' ? 'game-actions__action--heal-mob' : '',
            'game-actions__action game-actions__person'
          ]"
                >
                    {{ messages.mob.message }}
                </div>
            </div>
            <div class="game__window">
                <div class="game__block game__block--person">
                    <div :class="`game__person game__person--${char.character.species} game__person--idle`"></div>
                </div>
                <div class="game__choices">
                    <div class="game__wrap">
                        <div
                            class="game__choice"
                            @dragover.prevent
                            @dragenter.prevent
                            @drop="onDrop($event, choiceIndex)"
                            v-for="(choice, choiceIndex) in choices"
                            :key="choiceIndex"
                            :class="{
            'game__choice--combo': isInCombo(choiceIndex),
            'game__choice--critical': isInCombo(choiceIndex) && getComboType(choiceIndex) === COMBO_TYPES.CRITICAL,
            'game__choice--hit': isInCombo(choiceIndex) && getComboType(choiceIndex) === COMBO_TYPES.HIT_CHANCE,
            'game__choice--attack': isInCombo(choiceIndex) && getComboType(choiceIndex) === COMBO_TYPES.ATTACK
        }"

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
                                :disabled="isAttackDisabled">
                            Атака
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
                    :class="[
            card.rare ? `card-game--${card.rare}` : 'card-game--standard',
            useCardIndices.includes(index) ? 'card-game--used' : '',
            'game__card card-game button'
          ]"
                    v-for="(card, index) in levelCards"
                    :key="index"
                    draggable="true"
                    @dragstart="onDragStart($event, index)"
                >
                    <div class="card-game__picture">
                        <nuxt-img class="card-game__image" :src="`/images/pages/game/${card.icon}`" alt="Карта" />
                    </div>
                    <div class="card-game__name">{{ card.name }}</div>
                    <div class="card-game__type">{{ card.type }}</div>
                    <div class="card-game__description">{{ card.description }}</div>
                    <div class="card-game__mana">
                        <nuxt-icon class="card-game__icon-mana" name="stats/mana" />
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