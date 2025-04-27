<script lang="ts">
import { defineComponent, reactive } from "vue";
// import Dice from "~/components/global/dice/dice.vue";
//
// // Константы для типов карт и эффектов
// const CARD_TYPES = {
//     ATTACK: "Атака",
//     DEFENSE: "Защита",
//     HEAL: "Лечение",
//     BUFF: "Бафф",
//     CONTROL: "Контроль",
//     UTILITY: "Утилита",
// } as const;
//
// const EFFECT_TYPES = {
//     BLEED: "bleed",
//     REGEN: "regen",
//     BUFF: "buff",
//     IMMUNE: "immune",
//     POISON: "poison",
//     BURN: "burn",
//     FREEZE: "freeze",
//     STUN: "stun",
//     DEBUFF: "debuff",
//     INVULNERABILITY: "invulnerability",
//     HIT_CHANCE: "hitChance",
//     CRITICAL_CHANCE: "criticalChance",
//     DODGE: "dodge",
//     MISS_CHANCE: "missChance",
//     LETHALITY: "lethality",
//     DOUBLE_SHOT: "doubleShot",
//     CRITICAL_NEXT: "criticalNext",
//     SPELL_DAMAGE: "spellDamage",
//     SPELL_COST_REDUCTION: "spellCostReduction",
//     REDIRECT_ATTACK: "redirectAttack",
//     DAMAGE_REDUCTION: "damageReduction",
//     BLOCK: "block",
//     HEAL_ON_DAMAGE: "healOnDamage",
//     AUTO_ATTACK_BURN: "autoAttackBurn",
//     BURN_STACKS: "burnStacks",
//     TRANSFORM: "transform",
//     COPY_CARD: "copyCard",
//     NEXT_SPIRITUAL_STRIKE: "nextSpiritualStrike",
//     NEXT_ATTACK: "nextAttack",
//     DEBUFF_IMMUNITY: "debuffImmunity",
//     NO_ATTACK: "noAttack",
//     BLOCK_HEALING: "blockHealing",
// } as const;
//
// // Типы для TypeScript
// interface Card {
//     id: string;
//     name: string;
//     type: string;
//     rare: string;
//     description: string;
//     count: number;
//     icon: string;
//     bonus: {
//         [key: string]: any;
//     };
//     manaCost: number;
//     duration?: number;
//     level: number;
//     maxLevel: number;
//     upgradeCost: number;
//     upgradeEffect: { [key: string]: any };
// }
//
// interface Effect {
//     type: string;
//     duration: number;
//     val: number | any;
//     sourceCard?: string;
//     icon: string;
//     stat?: string;
// }
//
// interface Stats {
//     attack: number;
//     critical: number;
//     hp: number;
//     mp: number;
//     hitChance: number;
//     dodge: number;
//     speed: number;
//     defence: number;
//     currentHp: number;
//     currentMp: number;
// }
//
// interface CardBonuses {
//     attack: number;
//     critical: number;
//     hp: number;
//     mp: number;
//     hitChance: number;
//     dodge: number;
//     speed: number;
//     defence: number;
//     lethalityStacks: number;
//     burnStacks: number;
//     trapCount: number;
// }

export default defineComponent({
    name: "Game",
//     components: { Dice },
//     setup() {
//         const char = usePersonState();
//         // Карты по классам
//         const cardsByClass = {
//             ranger: [
//                 {
//                     id: "ranger-sniper-shot",
//                     name: "Снайперский выстрел",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 1 урон, повышает шанс попадания на 100% на 1 ход.",
//                     icon: "ranger-sniper-shot.png",
//                     manaCost: 1,
//                     count: 1,
//                     bonus: {
//                         attack: 1,
//                         hitChance: { value: 100, duration: 1 },
//                     },
//                     level: 1,
//                     maxLevel: 10,
//                     upgradeCost: 4,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "ranger-hunters-mark",
//                     name: "Метка охотника",
//                     type: CARD_TYPES.BUFF,
//                     rare: "rare",
//                     description: "С шансом 30% позволяет сделать дополнительный выстрел в течение 1 хода.",
//                     icon: "ranger-hunters-mark.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: {
//                         doubleShot: { chance: 30, duration: 1 },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { doubleShot: { chance: 5 } },
//                 },
//                 {
//                     id: "ranger-rapid-fire",
//                     name: "Быстрая стрельба",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 3 удара по 1 урону. Если все попадают, следующая атака с 100% шансом критического удара.",
//                     icon: "ranger-rapid-fire.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: {
//                         attack: 1,
//                         count: 3,
//                         criticalNext: { chance: 100, condition: "allHits" },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "ranger-hunting-trap",
//                     name: "Охотничья ловушка",
//                     type: CARD_TYPES.CONTROL,
//                     rare: "rare",
//                     description: "Снижает скорость врага на 5 на 2 хода. Две ловушки оглушают на 1 ход.",
//                     icon: "ranger-hunting-trap.png",
//                     manaCost: 1,
//                     count: 1,
//                     bonus: {
//                         speed: { value: -5, duration: 2 },
//                         stun: { duration: 1, condition: "twoTraps" },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 4,
//                     upgradeEffect: { speed: { value: -1 } },
//                 },
//                 {
//                     id: "ranger-explosive-shot",
//                     name: "Взрывной выстрел",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 2 урона, снижает все характеристики врага на 20% на 1 ход.",
//                     icon: "ranger-explosive-shot.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: {
//                         attack: 2,
//                         debuff: { value: -20, duration: 1, stats: ["all"] },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "ranger-aimed-shot",
//                     name: "Меткий выстрел",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "common",
//                     description: "Наносит 2 урона, с шансом 30% наносит дополнительный 1 урон.",
//                     icon: "ranger-aimed-shot.png",
//                     manaCost: 2,
//                     count: 2,
//                     bonus: {
//                         attack: 2,
//                         extraAttack: { value: 1, chance: 30 },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 3,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "ranger-healing-salve",
//                     name: "Целебный бальзам",
//                     type: CARD_TYPES.HEAL,
//                     rare: "common",
//                     description: "Восстанавливает 3 HP.",
//                     icon: "ranger-healing-salve.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { heal: 3 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 3,
//                     upgradeEffect: { heal: 1 },
//                 },
//                 {
//                     id: "ranger-camouflage",
//                     name: "Камуфляж",
//                     type: CARD_TYPES.DEFENSE,
//                     rare: "rare",
//                     description: "Увеличивает уклонение на 30% на 2 хода.",
//                     icon: "ranger-camouflage.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { dodge: { value: 30, duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { dodge: { value: 5 } },
//                 },
//                 {
//                     id: "ranger-hunters-sense",
//                     name: "Чувство охотника",
//                     type: CARD_TYPES.BUFF,
//                     rare: "epic",
//                     description: "Повышает шанс критического удара на 70% до первого промаха.",
//                     icon: "ranger-hunters-sense.png",
//                     manaCost: 4,
//                     count: 1,
//                     bonus: { criticalChance: { value: 70, condition: "untilMiss" } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 7,
//                     upgradeEffect: { criticalChance: { value: 10 } },
//                 },
//             ],
//             wrecker: [
//                 {
//                     id: "wrecker-smash",
//                     name: "Сокрушение",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 3 урона, игнорирует 50 защиты врага.",
//                     icon: "wrecker-smash.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { attack: 3, ignoreDefense: 50 },
//                     level: 1,
//                     maxLevel: 10,
//                     upgradeCost: 3,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "wrecker-diamond-shield",
//                     name: "Алмазный щит",
//                     type: CARD_TYPES.DEFENSE,
//                     rare: "rare",
//                     description: "Добавляет 2 защиты, наносит 1 урон атакующему при блоке на 2 хода.",
//                     icon: "wrecker-diamond-shield.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { defense: 2, counterAttack: 1, duration: 2 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { defense: 1 },
//                 },
//                 {
//                     id: "wrecker-shock-wave",
//                     name: "Ударная волна",
//                     type: CARD_TYPES.CONTROL,
//                     rare: "rare",
//                     description: "Оглушает врага на 1 ход и снижает характеристики на 20% на 2 хода.",
//                     icon: "wrecker-shock-wave.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: {
//                         stun: { duration: 1 },
//                         debuff: { value: -20, duration: 2, stats: ["all"] },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { debuff: { value: -5 } },
//                 },
//                 {
//                     id: "wrecker-surge-of-strength",
//                     name: "Прилив сил",
//                     type: CARD_TYPES.HEAL,
//                     rare: "rare",
//                     description: "Восстанавливает 4 HP и 2 маны.",
//                     icon: "wrecker-surge-of-strength.png",
//                     manaCost: 2,
//                     count: 4,
//                     bonus: { heal: 4, mana: 2 },
//                     level: 1,
//                     maxLevel: 10,
//                     upgradeCost: 3,
//                     upgradeEffect: { heal: 1, mana: 1 },
//                 },
//                 {
//                     id: "wrecker-crystal-infusion",
//                     name: "Кристальная инфузия",
//                     type: CARD_TYPES.BUFF,
//                     rare: "rare",
//                     description: "Увеличивает атаку на 4 и даёт невосприимчивость к дебаффам на 3 хода.",
//                     icon: "wrecker-crystal-infusion.png",
//                     manaCost: 5,
//                     count: 1,
//                     bonus: { attack: 4, debuffImmunity: { duration: 3 } },
//                     level: 1,
//                     maxLevel: 10,
//                     upgradeCost: 4,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "wrecker-farcical-blow",
//                     name: "Фарсированный удар",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 3 урона ±1 урон в зависимости от HP врага (±50% урона при низком/высоком HP).",
//                     icon: "wrecker-farcical-blow.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { attack: 3, conditionalDamage: { value: 1, condition: "enemyHP" } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "wrecker-crystallization",
//                     name: "Кристаллизация",
//                     type: CARD_TYPES.DEFENSE,
//                     rare: "rare",
//                     description: "Делает неуязвимым на 2 хода, но блокирует нанесение урона.",
//                     icon: "wrecker-crystallization.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { invulnerability: { duration: 2 }, noAttack: { duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { invulnerability: { duration: 1 } },
//                 },
//                 {
//                     id: "wrecker-jewelers-precision",
//                     name: "Точность ювелира",
//                     type: CARD_TYPES.BUFF,
//                     rare: "rare",
//                     description: "Гарантирует попадание атак на 2 хода.",
//                     icon: "wrecker-jewelers-precision.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { hitChance: { value: 100, duration: 2 } },
//                     level: 1,
//                     maxLevel: 4,
//                     upgradeCost: 5,
//                     upgradeEffect: { hitChance: { duration: 1 } },
//                 },
//                 {
//                     id: "wrecker-powerful-blow",
//                     name: "Мощный удар",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 2 урона +1 урон за каждую сыгранную карту в этом ходу.",
//                     icon: "wrecker-powerful-blow.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { attack: 2, bonusPerCard: 1 },
//                     level: 1,
//                     maxLevel: 8,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//             ],
//             arcanist: [
//                 {
//                     id: "arcanist-fireball",
//                     name: "Огненный шар",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 3 магического урона.",
//                     icon: "arcanist-fireball.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { attack: 3 },
//                     level: 1,
//                     maxLevel: 20,
//                     upgradeCost: 2,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "arcanist-frost-arrow",
//                     name: "Ледяная стрела",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 2 урона и замораживает врага на 1 ход.",
//                     icon: "arcanist-frost-arrow.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { attack: 2, freeze: { duration: 1 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "arcanist-magical-flash",
//                     name: "Магическая вспышка",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 1 урон, +2 урона, если маны больше 50%.",
//                     icon: "arcanist-magical-flash.png",
//                     manaCost: 1,
//                     count: 1,
//                     bonus: { attack: 1, conditionalAttack: { value: 2, condition: "manaAbove50" }, isMagic: true },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 4,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "arcanist-frost-barrier",
//                     name: "Ледяной барьер",
//                     type: CARD_TYPES.DEFENSE,
//                     rare: "rare",
//                     description: "Добавляет 4 брони и замораживает атакующих на 1 ход.",
//                     icon: "arcanist-frost-barrier.png",
//                     manaCost: 4,
//                     count: 1,
//                     bonus: { defence: 4, freeze: { duration: 1, onDefend: true } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { defence: 1 },
//                 },
//                 {
//                     id: "arcanist-magic-trick",
//                     name: "Магическая уловка",
//                     type: CARD_TYPES.UTILITY,
//                     rare: "rare",
//                     description: "Перенаправляет следующую атаку врага обратно в него.",
//                     icon: "arcanist-magic-trick.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { redirectAttack: { duration: 1 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { redirectAttack: { duration: 1 } },
//                 },
//                 {
//                     id: "arcanist-surge-of-power",
//                     name: "Прилив сил",
//                     type: CARD_TYPES.HEAL,
//                     rare: "rare",
//                     description: "Восстанавливает 4 HP и 4 маны.",
//                     icon: "arcanist-surge-of-power.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { heal: 4, mana: 4 },
//                     level: 1,
//                     maxLevel: 20,
//                     upgradeCost: 5,
//                     upgradeEffect: { heal: 1, mana: 1 },
//                 },
//                 {
//                     id: "arcanist-rings-of-cold",
//                     name: "Кольца холода",
//                     type: CARD_TYPES.CONTROL,
//                     rare: "rare",
//                     description: "Обездвиживает врага на 2 хода.",
//                     icon: "arcanist-rings-of-cold.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { freeze: { duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { freeze: { duration: 1 } },
//                 },
//                 {
//                     id: "arcanist-true-trinity",
//                     name: "Истинное триединство",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "epic",
//                     description: "Наносит 5 урона, накладывает поджог (3 хода) и заморозку (2 хода).",
//                     icon: "arcanist-true-trinity.png",
//                     manaCost: 7,
//                     count: 1,
//                     bonus: {
//                         attack: 5,
//                         burn: { value: 2, duration: 3 },
//                         freeze: { duration: 2 },
//                     },
//                     level: 1,
//                     maxLevel: 10,
//                     upgradeCost: 8,
//                     upgradeEffect: { attack: 1, burn: { value: 1 } },
//                 },
//                 {
//                     id: "arcanist-hidden-knowledge",
//                     name: "Скрытые знания",
//                     type: CARD_TYPES.BUFF,
//                     rare: "rare",
//                     description: "Увеличивает урон заклинаний на 1 и снижает их стоимость на 1 на 2 хода.",
//                     icon: "arcanist-hidden-knowledge.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { spellDamage: 1, spellCostReduction: 1, duration: 2 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { spellDamage: 1 },
//                 },
//             ],
//             monk: [
//                 {
//                     id: "monk-meditation",
//                     name: "Медитация",
//                     type: CARD_TYPES.HEAL,
//                     rare: "rare",
//                     description: "Восстанавливает 3 HP.",
//                     icon: "monk-meditation.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { heal: 3 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 4,
//                     upgradeEffect: { heal: 1 },
//                 },
//                 {
//                     id: "monk-spiritual-strike",
//                     name: "Духовный удар",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 2 урона, +20% шанс критического удара.",
//                     icon: "monk-spiritual-strike.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { attack: 2, criticalChance: 20 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "monk-tiger-strike",
//                     name: "Удар тигра",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 2 урона, увеличивает урон следующего Духовного удара на 1.",
//                     icon: "monk-tiger-strike.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { attack: 2, nextSpiritualStrike: { bonus: 1 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "monk-dragon-strike",
//                     name: "Удар дракона",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 2 урона, поджигает врага (2 урона, 2 хода), усиливает следующий Духовный удар на 1.",
//                     icon: "monk-dragon-strike.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: {
//                         attack: 2,
//                         burn: { value: 2, duration: 2 },
//                         nextSpiritualStrike: { bonus: 1 },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "monk-stone-armor",
//                     name: "Каменный доспех",
//                     type: CARD_TYPES.DEFENSE,
//                     rare: "rare",
//                     description: "Полностью блокирует 1 атаку.",
//                     icon: "monk-stone-armor.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { block: { attacks: 1 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { block: { attacks: 1 } },
//                 },
//                 {
//                     id: "monk-balance",
//                     name: "Равновесие",
//                     type: CARD_TYPES.HEAL,
//                     rare: "rare",
//                     description: "Восстанавливает 1 HP после получения урона в течение 2 ходов.",
//                     icon: "monk-balance.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { healOnDamage: { value: 1, duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { healOnDamage: { value: 1 } },
//                 },
//                 {
//                     id: "monk-path-of-goodness",
//                     name: "Путь добра",
//                     type: CARD_TYPES.HEAL,
//                     rare: "epic",
//                     description: "Восстанавливает 80 HP, но блокирует использование других исцеляющих карт.",
//                     icon: "monk-path-of-goodness.png",
//                     manaCost: 4,
//                     count: 1,
//                     bonus: { heal: 80, blockHealing: true },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 7,
//                     upgradeEffect: { heal: 10 },
//                 },
//                 {
//                     id: "monk-path-of-hate",
//                     name: "Путь ненависти",
//                     type: CARD_TYPES.BUFF,
//                     rare: "epic",
//                     description: "Увеличивает урон на 4 до конца боя, но блокирует исцеляющие карты.",
//                     icon: "monk-path-of-hate.png",
//                     manaCost: 4,
//                     count: 1,
//                     bonus: { attack: 4, blockHealing: true, duration: "permanent" },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 7,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "monk-strike-of-the-rising-sun",
//                     name: "Удар восходящего солнца",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 1 урон, увеличивает урон следующей атаки на 1.",
//                     icon: "monk-strike-of-the-rising-sun.png",
//                     manaCost: 1,
//                     count: 1,
//                     bonus: { attack: 1, nextAttack: { bonus: 1 } },
//                     level: 1,
//                     maxLevel: 20,
//                     upgradeCost: 4,
//                     upgradeEffect: { attack: 1 },
//                 },
//             ],
//             inferno: [
//                 {
//                     id: "inferno-hell-explosion",
//                     name: "Адский взрыв",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 3 урона и накладывает 3 стака поджога (1 урон/ход).",
//                     icon: "inferno-hell-explosion.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { attack: 3, burn: { value: 1, stacks: 3, duration: 3 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "inferno-flame-shield",
//                     name: "Огненный щит",
//                     type: CARD_TYPES.DEFENSE,
//                     rare: "rare",
//                     description: "Добавляет 3 защиты на 2 хода, накладывает 1 стак поджога атакующему.",
//                     icon: "inferno-flame-shield.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { defense: 3, burn: { value: 1, stacks: 1, onDefend: true, duration: 2 }, duration: 2 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { defense: 1 },
//                 },
//                 {
//                     id: "inferno-wrath-of-Inferno",
//                     name: "Гнев инферно",
//                     type: CARD_TYPES.BUFF,
//                     rare: "rare",
//                     description: "Увеличивает количество стаков поджога на 2 для всех атак на 2 хода.",
//                     icon: "inferno-wrath-of-Inferno.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { burnStacks: { value: 2, duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { burnStacks: { value: 1 } },
//                 },
//                 {
//                     id: "inferno-eternal-flame",
//                     name: "Вечное пламя",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "epic",
//                     description: "При 10 стаках поджога превращает игрока в Вечное пламя (2 урона/ход до конца боя).",
//                     icon: "inferno-eternal-flame.png",
//                     manaCost: 5,
//                     count: 1,
//                     bonus: { transform: { attack: 2, condition: "10burnStacks", duration: "permanent" } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 7,
//                     upgradeEffect: { transform: { attack: 1 } },
//                 },
//                 {
//                     id: "inferno-live-bomb",
//                     name: "Живая бомба",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 1 урон за каждый стак поджога на враге.",
//                     icon: "inferno-live-bomb.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { attackPerBurnStack: 1 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attackPerBurnStack: 1 },
//                 },
//                 {
//                     id: "inferno-holy-flame",
//                     name: "Святое пламя",
//                     type: CARD_TYPES.HEAL,
//                     rare: "rare",
//                     description: "Восстанавливает 1 HP за каждый стак поджога на враге.",
//                     icon: "inferno-holy-flame.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { healPerBurnStack: 1 },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { healPerBurnStack: 1 },
//                 },
//                 {
//                     id: "inferno-small-flame",
//                     name: "Малое пламя",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "common",
//                     description: "Наносит 1 урон и 1 стак поджога. Два Малых пламени усиливают эффект в 3 раза.",
//                     icon: "inferno-small-flame.png",
//                     manaCost: 1,
//                     count: 1,
//                     bonus: {
//                         attack: 1,
//                         burn: { value: 1, stacks: 1, duration: 2 },
//                         combo: { multiplier: 3, condition: "twoSmallFlames" },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 3,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "inferno-flame-control",
//                     name: "Контроль пламени",
//                     type: CARD_TYPES.CONTROL,
//                     rare: "rare",
//                     description: "Оглушает врага на 1 ход за каждые 5 стаков поджога.",
//                     icon: "inferno-flame-control.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { stun: { durationPer5BurnStacks: 1 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { stun: { durationPer5BurnStacks: 1 } },
//                 },
//                 {
//                     id: "inferno-blade-of-flame",
//                     name: "Клинок пламени",
//                     type: CARD_TYPES.BUFF,
//                     rare: "rare",
//                     description: "Автоатаки с шансом 50% накладывают 1 стак поджога на 2 хода.",
//                     icon: "inferno-blade-of-flame.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { autoAttackBurn: { chance: 50, stacks: 1, duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { autoAttackBurn: { chance: 10 } },
//                 },
//             ],
//             assassin: [
//                 {
//                     id: "assassin-fatal-strike",
//                     name: "Смертельный удар",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 3 урона, добавляет 3 заряда смертоносности для усиления других карт.",
//                     icon: "assassin-fatal-strike.png",
//                     manaCost: 4,
//                     count: 1,
//                     bonus: { attack: 3, lethality: { stacks: 3 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "assassin-poison-strike",
//                     name: "Ядовитый удар",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 2 урона, накладывает яд (2 урона/ход, 2 хода). Удваивается при наличии смертоносности.",
//                     icon: "assassin-poison-strike.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: {
//                         attack: 2,
//                         poison: { value: 2, duration: 2 },
//                         lethalityBonus: { multiplier: 2 },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { poison: { value: 1 } },
//                 },
//                 {
//                     id: "assassin-trick",
//                     name: "Уловка",
//                     type: CARD_TYPES.DEFENSE,
//                     rare: "rare",
//                     description: "Снижает получаемый урон на 50% на 2 хода.",
//                     icon: "assassin-trick.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { damageReduction: { value: 50, duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { damageReduction: { value: 10 } },
//                 },
//                 {
//                     id: "assassin-little-tricks",
//                     name: "Маленькие хитрости",
//                     type: CARD_TYPES.BUFF,
//                     rare: "rare",
//                     description: "Копирует любую карту (кроме ультимейта) на этом ходу.",
//                     icon: "assassin-little-tricks.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: { copyCard: { exclude: "epic" } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { copyCard: { duration: 1 } },
//                 },
//                 {
//                     id: "assassin-blind",
//                     name: "Ослепление",
//                     type: CARD_TYPES.UTILITY,
//                     rare: "rare",
//                     description: "Накладывает на врага 30% шанс промаха на 2 хода.",
//                     icon: "assassin-blind.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { missChance: { value: 30, duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { missChance: { value: 5 } },
//                 },
//                 {
//                     id: "assassin-insidious-strike",
//                     name: "Коварный удар",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 1 урон, добавляет 1 заряд смертоносности.",
//                     icon: "assassin-insidious-strike.png",
//                     manaCost: 2,
//                     count: 1,
//                     bonus: { attack: 1, lethality: { stacks: 1 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 4,
//                     upgradeEffect: { attack: 1 },
//                 },
//                 {
//                     id: "assassin-blow-to-the-heart",
//                     name: "Удар в сердце",
//                     type: CARD_TYPES.CONTROL,
//                     rare: "rare",
//                     description: "Оглушает на 1 ход, удваивает длительность при наличии смертоносности.",
//                     icon: "assassin-blow-to-the-heart.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: {
//                         stun: { duration: 1 },
//                         lethalityBonus: { multiplier: 2, stat: "stunDuration" },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { stun: { duration: 1 } },
//                 },
//                 {
//                     id: "assassin-deadly-technique",
//                     name: "Смертельный приём",
//                     type: CARD_TYPES.BUFF,
//                     rare: "epic",
//                     description: "Удваивает эффект смертоносности на 2 хода.",
//                     icon: "assassin-deadly-technique.png",
//                     manaCost: 6,
//                     count: 1,
//                     bonus: { lethalityMultiplier: { value: 2, duration: 2 } },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 7,
//                     upgradeEffect: { lethalityMultiplier: { duration: 1 } },
//                 },
//                 {
//                     id: "assassin-serial-killer",
//                     name: "Серийный убийца",
//                     type: CARD_TYPES.ATTACK,
//                     rare: "rare",
//                     description: "Наносит 1 урон, с шансом 40% наносит 2 удара. Удваивается при наличии смертоносности.",
//                     icon: "assassin-serial-killer.png",
//                     manaCost: 3,
//                     count: 1,
//                     bonus: {
//                         attack: 1,
//                         multiStrike: { chance: 40, strikes: 2 },
//                         lethalityBonus: { multiplier: 2 },
//                     },
//                     level: 1,
//                     maxLevel: 3,
//                     upgradeCost: 5,
//                     upgradeEffect: { attack: 1 },
//                 },
//             ],
//         };
//
//         // Выбираем карты для текущего класса (например, ranger)
//         const allCards: Card[] = reactive(cardsByClass.ranger); // Можно динамически выбирать класс
//
//         return { allCards, char };
//     },
//     data: () => ({
//         levelCards: [] as Card[],
//         choices: Array(9).fill(null) as (Card | null)[],
//         showDice: false,
//         isAnimating: false,
//         battleLog: [] as string[],
//         selectedCards: 0,
//         maxSelectedCards: 3,
//         useCardIndices: [] as number[],
//         baseStats: {
//             person: {
//                 attack: 2,
//                 critical: 2,
//                 hp: 10,
//                 mp: 10,
//                 hitChance: 100,
//                 dodge: 20,
//                 speed: 2,
//                 defence: 3,
//                 currentHp: 10,
//                 currentMp: 10,
//             },
//             mob: {
//                 attack: 1,
//                 critical: 5,
//                 hp: 15,
//                 mp: 1,
//                 hitChance: 50,
//                 dodge: 20,
//                 speed: 1,
//                 defence: 1,
//                 currentHp: 15,
//                 currentMp: 1,
//             },
//         } as { person: Stats; mob: Stats },
//         cardBonuses: {
//             person: {
//                 attack: 0,
//                 critical: 0,
//                 hp: 0,
//                 mp: 0,
//                 hitChance: 0,
//                 dodge: 0,
//                 speed: 0,
//                 defence: 0,
//                 lethalityStacks: 0,
//                 burnStacks: 0,
//                 trapCount: 0,
//             },
//         } as { person: CardBonuses },
//         activeEffects: {
//             mob: [] as Effect[],
//             person: [] as Effect[],
//         },
//         messages: {
//             mob: { type: "", message: "" },
//             person: { type: "", message: "" },
//             turnKey: 0,
//         },
//         turnCount: 1,
//         COMBO_TYPES: {
//             CRITICAL: "critical",
//             HIT_CHANCE: "hitChance",
//             ATTACK: "attack",
//         },
//         hasMissed: false, // Для карты "Чувство охотника"
//         rapidFireHits: 0, // Для отслеживания попаданий "Быстрая стрельба"
//         spiritualStrikeBonus: 0, // Для карт монаха
//     }),
//     mounted() {
//         this.initCards();
//         // Обновляем характеристики персонажа из char
//         this.baseStats.person.attack = this.char.character.stats.attack;
//         this.baseStats.person.defence = this.char.character.stats.defence;
//         this.baseStats.person.critical = this.char.character.stats.critical;
//         this.baseStats.person.hp = 10;
//         this.baseStats.person.mp = 10;
//         this.baseStats.person.hitChance = this.char.character.stats.hitChance;
//         this.baseStats.person.dodge = this.char.character.stats.dodge;
//         this.baseStats.person.speed = this.char.character.stats.speed;
//         this.baseStats.person.currentHp = this.maxHp("person");
//         this.baseStats.person.currentMp = this.maxMp("person");
//     },
//     computed: {
//         personStats(): Stats & {
//             physicalDmg: number;
//             physicalDef: number;
//         } {
//             return {
//                 ...this.baseStats.person,
//                 physicalDmg: this.physicalDmg("person"),
//                 physicalDef: this.physicalDef("person"),
//             };
//         },
//         mobStats(): Stats & {
//             physicalDmg: number;
//             physicalDef: number;
//         } {
//             return {
//                 ...this.baseStats.mob,
//                 physicalDmg: this.physicalDmg("mob"),
//                 physicalDef: this.physicalDef("mob"),
//             };
//         },
//         isAttackDisabled(): boolean {
//             return this.isAnimating || this.activeEffects.person.some(e => e.type === EFFECT_TYPES.NO_ATTACK);
//         },
//         activeCombos() {
//             const lines = [
//                 { indices: [0, 3, 6], type: this.COMBO_TYPES.CRITICAL },
//                 { indices: [1, 4, 7], type: this.COMBO_TYPES.HIT_CHANCE },
//                 { indices: [2, 5, 8], type: this.COMBO_TYPES.ATTACK },
//             ];
//
//             return lines.filter(line =>
//                 line.indices.every(index => this.choices[index] !== null),
//             ).map(line => line.type);
//         },
//         comboIndices() {
//             const indices = new Set<number>();
//             if (this.activeCombos.includes(this.COMBO_TYPES.CRITICAL)) {
//                 [0, 3, 6].forEach(index => indices.add(index));
//             }
//             if (this.activeCombos.includes(this.COMBO_TYPES.HIT_CHANCE)) {
//                 [1, 4, 7].forEach(index => indices.add(index));
//             }
//             if (this.activeCombos.includes(this.COMBO_TYPES.ATTACK)) {
//                 [2, 5, 8].forEach(index => indices.add(index));
//             }
//             return Array.from(indices);
//         },
//     },
//     methods: {
//         getStat(target: "person" | "mob", stat: keyof Stats): number {
//             let base = this.baseStats[target][stat];
//             if (target === "person") {
//                 base += this.cardBonuses.person[stat] || 0;
//             }
//             const debuff = this.activeEffects[target].find(e => e.type === EFFECT_TYPES.DEBUFF && (e.stat === stat || e.stat === "all"));
//             if (debuff) {
//                 base *= (100 + debuff.val) / 100;
//             }
//             return Math.max(0, base);
//         },
//         maxHp(target: "person" | "mob", bonus: number = 0): number {
//             return this.getStat(target, "hp") + bonus;
//         },
//         maxMp(target: "person" | "mob", bonus: number = 0): number {
//             return this.getStat(target, "mp") + bonus;
//         },
//         physicalDmg(target: "person" | "mob", bonus: number = 0): number {
//             return this.getStat(target, "attack") + bonus;
//         },
//         physicalDef(target: "person" | "mob", bonus: number = 0): number {
//             return this.getStat(target, "defence") + bonus;
//         },
//         speed(target: "person" | "mob", bonus: number = 0): number {
//             return this.getStat(target, "speed") + bonus;
//         },
//         dodge(target: "person" | "mob", bonus: number = 0): number {
//             return this.getStat(target, "dodge") + bonus;
//         },
//         criticalDmg(target: "person" | "mob", bonus: number = 0): number {
//             let critical = this.getStat(target, "critical") + bonus;
//             if (target === "person") {
//                 const huntersSense = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.CRITICAL_CHANCE && e.val.condition === "untilMiss");
//                 if (huntersSense && !this.hasMissed) {
//                     critical += huntersSense.val.value;
//                 }
//                 const criticalNext = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.CRITICAL_NEXT);
//                 if (criticalNext) {
//                     critical += criticalNext.val.chance;
//                 }
//             }
//             return critical;
//         },
//         hitChance(target: "person" | "mob", bonus: number = 0): number {
//             let chance = this.getStat(target, "hitChance") + bonus;
//             if (target === "mob") {
//                 const blind = this.activeEffects.mob.find(e => e.type === EFFECT_TYPES.MISS_CHANCE);
//                 if (blind) {
//                     chance -= blind.val;
//                 }
//             }
//             return Math.max(0, Math.min(100, chance));
//         },
//         getRandomCards(count: number): Card[] {
//             const shuffled = [...this.allCards].sort(() => 0.5 - Math.random());
//             return shuffled.slice(0, count);
//         },
//         initCards() {
//             this.levelCards = this.getRandomCards(5);
//             this.choices = Array(9).fill(null);
//             this.selectedCards = 0;
//             this.useCardIndices = [];
//             this.resetCardBonuses();
//             this.rapidFireHits = 0;
//             this.spiritualStrikeBonus = 0;
//         },
//         resetCardBonuses() {
//             this.cardBonuses.person = {
//                 attack: 0,
//                 critical: 0,
//                 hp: 0,
//                 mp: 0,
//                 hitChance: 0,
//                 dodge: 0,
//                 speed: 0,
//                 defence: 0,
//                 lethalityStacks: 0,
//                 burnStacks: 0,
//                 trapCount: 0,
//             };
//         },
//         addEffect(target: "person" | "mob", effect: Effect) {
//             if (target === "mob" && effect.type === EFFECT_TYPES.DEBUFF && this.activeEffects.person.some(e => e.type === EFFECT_TYPES.DEBUFF_IMMUNITY)) {
//                 this.addToLog("Дебафф заблокирован иммунитетом!");
//                 return;
//             }
//             this.activeEffects[target].push({ ...effect });
//         },
//         applyCardBonuses() {
//             this.resetCardBonuses();
//
//             this.activeCombos.forEach(combo => {
//                 switch (combo) {
//                     case this.COMBO_TYPES.CRITICAL:
//                         this.cardBonuses.person.critical += 5;
//                         this.addToLog("Активирована комбинация: Критический урон +5%!");
//                         break;
//                     case this.COMBO_TYPES.HIT_CHANCE:
//                         this.cardBonuses.person.hitChance += 5;
//                         this.addToLog("Активирована комбинация: Шанс попадания +5%!");
//                         break;
//                     case this.COMBO_TYPES.ATTACK:
//                         this.cardBonuses.person.attack += 1;
//                         this.addToLog("Активирована комбинация: Атака +1!");
//                         break;
//                 }
//             });
//
//             let smallFlameCount = 0;
//             this.choices.forEach((choice) => {
//                 if (!choice) return;
//
//                 // Подсчет карт "Малое пламя" для комбо
//                 if (choice.id === "inferno-small-flame") {
//                     smallFlameCount++;
//                 }
//
//                 // Обработка маны с учетом снижения стоимости заклинаний
//                 let manaCost = choice.manaCost;
//                 const spellCostReduction = this.activeEffects.person.find(
//                     e => e.type === EFFECT_TYPES.SPELL_COST_REDUCTION,
//                 );
//                 if (spellCostReduction && choice.bonus.isMagic) {
//                     manaCost = Math.max(0, manaCost - spellCostReduction.val);
//                 }
//                 this.baseStats.person.currentMp -= manaCost;
//
//                 // Лечение
//                 if (choice.bonus.heal && !this.activeEffects.person.some(e => e.type === EFFECT_TYPES.BLOCK_HEALING)) {
//                     this.baseStats.person.currentHp = Math.min(
//                         this.baseStats.person.currentHp + choice.bonus.heal,
//                         this.maxHp("person"),
//                     );
//                     this.addToLog(`Персонаж восстановил ${choice.bonus.heal} HP!`);
//                     this.showActionText("person", `+${choice.bonus.heal} HP`, "heal");
//                 }
//
//                 // Мана
//                 if (choice.bonus.mana) {
//                     this.baseStats.person.currentMp = Math.min(
//                         this.baseStats.person.currentMp + choice.bonus.mana,
//                         this.maxMp("person"),
//                     );
//                     this.addToLog(`Персонаж восстановил ${choice.bonus.mana} MP!`);
//                     this.showActionText("person", `+${choice.bonus.mana} MP`, "mana-restore");
//                 }
//
//                 // Ranger: Снайперский выстрел
//                 if (choice.id === "ranger-sniper-shot") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.HIT_CHANCE,
//                         duration: choice.bonus.hitChance.duration,
//                         val: choice.bonus.hitChance.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.hitChance += choice.bonus.hitChance.value;
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                 }
//
//                 // Ranger: Метка охотника
//                 if (choice.id === "ranger-hunters-mark") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.DOUBLE_SHOT,
//                         duration: choice.bonus.doubleShot.duration,
//                         val: choice.bonus.doubleShot.chance,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Ranger: Быстрая стрельба (обрабатывается в characterAttack)
//
//                 // Ranger: Охотничья ловушка
//                 if (choice.id === "ranger-hunting-trap") {
//                     this.cardBonuses.person.trapCount += 1;
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.BUFF,
//                         duration: choice.bonus.speed.duration,
//                         val: choice.bonus.speed.value,
//                         stat: "speed",
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     if (this.cardBonuses.person.trapCount >= 2) {
//                         this.addEffect("mob", {
//                             type: EFFECT_TYPES.STUN,
//                             duration: choice.bonus.stun.duration,
//                             val: 1,
//                             sourceCard: choice.name,
//                             icon: choice.icon,
//                         });
//                         this.cardBonuses.person.trapCount = 0;
//                         this.addToLog("Охотничья ловушка оглушила врага!");
//                     }
//                 }
//
//                 // Ranger: Взрывной выстрел
//                 if (choice.id === "ranger-explosive-shot") {
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.DEBUFF,
//                         duration: choice.bonus.debuff.duration,
//                         val: choice.bonus.debuff.value,
//                         stat: "all",
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                 }
//
//                 // Ranger: Меткий выстрел
//                 if (choice.id === "ranger-aimed-shot") {
//                     let attack = choice.bonus.attack;
//                     if (Math.random() * 100 <= choice.bonus.extraAttack.chance) {
//                         attack += choice.bonus.extraAttack.value;
//                         this.addToLog("Меткий выстрел нанёс дополнительный урон!");
//                     }
//                     this.cardBonuses.person.attack += attack;
//                 }
//
//                 // Ranger: Целебный бальзам (уже обработано в heal)
//
//                 // Ranger: Камуфляж
//                 if (choice.id === "ranger-camouflage") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.DODGE,
//                         duration: choice.bonus.dodge.duration,
//                         val: choice.bonus.dodge.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.dodge += choice.bonus.dodge.value;
//                 }
//
//                 // Ranger: Чувство охотника
//                 if (choice.id === "ranger-hunters-sense") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.CRITICAL_CHANCE,
//                         duration: 999,
//                         val: { value: choice.bonus.criticalChance.value, condition: "untilMiss" },
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Wrecker: Сокрушение
//                 if (choice.id === "wrecker-smash") {
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     // Игнорирование защиты обрабатывается в characterAttack
//                 }
//
//                 // Wrecker: Алмазный щит
//                 if (choice.id === "wrecker-diamond-shield") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.BUFF,
//                         duration: choice.bonus.duration,
//                         val: choice.bonus.defense,
//                         stat: "defence",
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.defence += choice.bonus.defense;
//                     // Контрудар обрабатывается в mobAttack
//                 }
//
//                 // Wrecker: Ударная волна
//                 if (choice.id === "wrecker-shock-wave") {
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.STUN,
//                         duration: choice.bonus.stun.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.DEBUFF,
//                         duration: choice.bonus.debuff.duration,
//                         val: choice.bonus.debuff.value,
//                         stat: "all",
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addToLog("Ударная волна оглушила и ослабила врага!");
//                 }
//
//                 // Wrecker: Прилив сил (уже обработано в heal и mana)
//
//                 // Wrecker: Кристальная инфузия
//                 if (choice.id === "wrecker-crystal-infusion") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.DEBUFF_IMMUNITY,
//                         duration: choice.bonus.debuffImmunity.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                 }
//
//                 // Wrecker: Фарсированный удар
//                 if (choice.id === "wrecker-farcical-blow") {
//                     const enemyHpPercent = (this.baseStats.mob.currentHp / this.maxHp("mob")) * 100;
//                     let attack = choice.bonus.attack;
//                     if (enemyHpPercent < 50) {
//                         attack -= choice.bonus.conditionalDamage.value;
//                     } else {
//                         attack += choice.bonus.conditionalDamage.value;
//                     }
//                     this.cardBonuses.person.attack += attack;
//                 }
//
//                 // Wrecker: Кристаллизация
//                 if (choice.id === "wrecker-crystallization") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.INVULNERABILITY,
//                         duration: choice.bonus.invulnerability.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.NO_ATTACK,
//                         duration: choice.bonus.noAttack.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addToLog("Кристаллизация активирована: неуязвимость, но без атак!");
//                 }
//
//                 // Wrecker: Точность ювелира
//                 if (choice.id === "wrecker-jewelers-precision") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.HIT_CHANCE,
//                         duration: choice.bonus.hitChance.duration,
//                         val: choice.bonus.hitChance.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.hitChance += choice.bonus.hitChance.value;
//                 }
//
//                 // Wrecker: Мощный удар
//                 if (choice.id === "wrecker-powerful-blow") {
//                     this.cardBonuses.person.attack +=
//                         choice.bonus.attack + choice.bonus.bonusPerCard * this.selectedCards;
//                     this.addToLog(
//                         `Мощный удар усилен на ${choice.bonus.bonusPerCard * this.selectedCards} за сыгранные карты!`,
//                     );
//                 }
//
//                 // Arcanist: Огненный шар
//                 if (choice.id === "arcanist-fireball") {
//                     const spellDamage = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.SPELL_DAMAGE);
//                     this.cardBonuses.person.attack += choice.bonus.attack + (spellDamage ? spellDamage.val : 0);
//                 }
//
//                 // Arcanist: Ледяная стрела
//                 if (choice.id === "arcanist-frost-arrow") {
//                     const spellDamage = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.SPELL_DAMAGE);
//                     this.cardBonuses.person.attack += choice.bonus.attack + (spellDamage ? spellDamage.val : 0);
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.FREEZE,
//                         duration: choice.bonus.freeze.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Arcanist: Магическая вспышка
//                 if (choice.id === "arcanist-magical-flash") {
//                     const spellDamage = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.SPELL_DAMAGE);
//                     let attack = choice.bonus.attack + (spellDamage ? spellDamage.val : 0);
//                     if (this.baseStats.person.currentMp > this.maxMp("person") * 0.5) {
//                         attack += choice.bonus.conditionalAttack.value;
//                         this.addToLog("Магическая вспышка усилена за счёт маны!");
//                     }
//                     this.cardBonuses.person.attack += attack;
//                 }
//
//                 // Arcanist: Ледяной барьер
//                 if (choice.id === "arcanist-frost-barrier") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.BUFF,
//                         duration: 1,
//                         val: choice.bonus.defence,
//                         stat: "defence",
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.defence += choice.bonus.defence;
//                     // Заморозка атакующих обрабатывается в mobAttack
//                 }
//
//                 // Arcanist: Магическая уловка
//                 if (choice.id === "arcanist-magic-trick") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.REDIRECT_ATTACK,
//                         duration: choice.bonus.redirectAttack.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Arcanist: Прилив сил (уже обработано в heal и mana)
//
//                 // Arcanist: Кольца холода
//                 if (choice.id === "arcanist-rings-of-cold") {
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.FREEZE,
//                         duration: choice.bonus.freeze.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addToLog("Кольца холода обездвижили врага!");
//                 }
//
//                 // Arcanist: Истинное триединство
//                 if (choice.id === "arcanist-true-trinity") {
//                     const spellDamage = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.SPELL_DAMAGE);
//                     this.cardBonuses.person.attack += choice.bonus.attack + (spellDamage ? spellDamage.val : 0);
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.BURN,
//                         duration: choice.bonus.burn.duration,
//                         val: choice.bonus.burn.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.FREEZE,
//                         duration: choice.bonus.freeze.duration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addToLog("Истинное триединство применило поджог и заморозку!");
//                 }
//
//                 // Arcanist: Скрытые знания
//                 if (choice.id === "arcanist-hidden-knowledge") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.SPELL_DAMAGE,
//                         duration: choice.bonus.duration,
//                         val: choice.bonus.spellDamage,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.SPELL_COST_REDUCTION,
//                         duration: choice.bonus.duration,
//                         val: choice.bonus.spellCostReduction,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Monk: Медитация (уже обработано в heal)
//
//                 // Monk: Духовный удар
//                 if (choice.id === "monk-spiritual-strike") {
//                     this.cardBonuses.person.attack += choice.bonus.attack + this.spiritualStrikeBonus;
//                     this.cardBonuses.person.critical += choice.bonus.criticalChance;
//                     this.spiritualStrikeBonus = 0;
//                 }
//
//                 // Monk: Удар тигра
//                 if (choice.id === "monk-tiger-strike") {
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     this.spiritualStrikeBonus += choice.bonus.nextSpiritualStrike.bonus;
//                 }
//
//                 // Monk: Удар дракона
//                 if (choice.id === "monk-dragon-strike") {
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.BURN,
//                         duration: choice.bonus.burn.duration,
//                         val: choice.bonus.burn.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.spiritualStrikeBonus += choice.bonus.nextSpiritualStrike.bonus;
//                 }
//
//                 // Monk: Каменный доспех
//                 if (choice.id === "monk-stone-armor") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.BLOCK,
//                         duration: 1,
//                         val: choice.bonus.block.attacks,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Monk: Равновесие
//                 if (choice.id === "monk-balance") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.HEAL_ON_DAMAGE,
//                         duration: choice.bonus.healOnDamage.duration,
//                         val: choice.bonus.healOnDamage.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Monk: Путь добра
//                 if (choice.id === "monk-path-of-goodness") {
//                     if (!this.activeEffects.person.some(e => e.type === EFFECT_TYPES.BLOCK_HEALING)) {
//                         this.baseStats.person.currentHp = Math.min(
//                             this.baseStats.person.currentHp + choice.bonus.heal,
//                             this.maxHp("person"),
//                         );
//                         this.addToLog(`Персонаж восстановил ${choice.bonus.heal} HP!`);
//                         this.showActionText("person", `+${choice.bonus.heal} HP`, "heal");
//                         this.addEffect("person", {
//                             type: EFFECT_TYPES.BLOCK_HEALING,
//                             duration: 999,
//                             val: 1,
//                             sourceCard: choice.name,
//                             icon: choice.icon,
//                         });
//                     }
//                 }
//
//                 // Monk: Путь ненависти
//                 if (choice.id === "monk-path-of-hate") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.BUFF,
//                         duration: choice.bonus.duration || 999,
//                         val: choice.bonus.attack,
//                         stat: "attack",
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.BLOCK_HEALING,
//                         duration: 999,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Monk: Удар восходящего солнца
//                 if (choice.id === "monk-strike-of-the-rising-sun") {
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.NEXT_ATTACK,
//                         duration: 1,
//                         val: choice.bonus.nextAttack.bonus,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Inferno: Адский взрыв
//                 if (choice.id === "inferno-hell-explosion") {
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     const burnStacks = choice.bonus.burn.stacks + (this.cardBonuses.person.burnStacks || 0);
//                     this.cardBonuses.person.burnStacks += burnStacks;
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.BURN,
//                         duration: choice.bonus.burn.duration,
//                         val: choice.bonus.burn.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Inferno: Огненный щит
//                 if (choice.id === "inferno-flame-shield") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.BUFF,
//                         duration: choice.bonus.duration,
//                         val: choice.bonus.defense,
//                         stat: "defence",
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.defence += choice.bonus.defense;
//                     // Поджог атакующего обрабатывается в mobAttack
//                 }
//
//                 // Inferno: Гнев инферно
//                 if (choice.id === "inferno-wrath-of-Inferno") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.BURN_STACKS,
//                         duration: choice.bonus.burnStacks.duration,
//                         val: choice.bonus.burnStacks.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.burnStacks += choice.bonus.burnStacks.value;
//                 }
//
//                 // Inferno: Вечное пламя
//                 if (choice.id === "inferno-eternal-flame" && this.cardBonuses.person.burnStacks >= 10) {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.TRANSFORM,
//                         duration: 999,
//                         val: choice.bonus.transform.attack,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.cardBonuses.person.attack += choice.bonus.transform.attack;
//                     this.addToLog("Игрок превратился в Вечное пламя!");
//                 }
//
//                 // Inferno: Живая бомба
//                 if (choice.id === "inferno-live-bomb") {
//                     this.cardBonuses.person.attack += this.cardBonuses.person.burnStacks * choice.bonus.attackPerBurnStack;
//                 }
//
//                 // Inferno: Святое пламя
//                 if (choice.id === "inferno-holy-flame") {
//                     if (!this.activeEffects.person.some(e => e.type === EFFECT_TYPES.BLOCK_HEALING)) {
//                         const heal = this.cardBonuses.person.burnStacks * choice.bonus.healPerBurnStack;
//                         this.baseStats.person.currentHp = Math.min(
//                             this.baseStats.person.currentHp + heal,
//                             this.maxHp("person"),
//                         );
//                         this.addToLog(`Персонаж восстановил ${heal} HP за стаки поджога!`);
//                         this.showActionText("person", `+${heal} HP`, "heal");
//                     }
//                 }
//
//                 // Inferno: Малое пламя
//                 if (choice.id === "inferno-small-flame") {
//                     let attack = choice.bonus.attack;
//                     let stacks = choice.bonus.burn.stacks;
//                     if (smallFlameCount >= 2) {
//                         attack *= choice.bonus.combo.multiplier;
//                         stacks *= choice.bonus.combo.multiplier;
//                         this.addToLog("Два Малых пламени увеличили эффект в 3 раза!");
//                     }
//                     this.cardBonuses.person.attack += attack;
//                     this.cardBonuses.person.burnStacks += stacks;
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.BURN,
//                         duration: choice.bonus.burn.duration,
//                         val: choice.bonus.burn.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Inferno: Контроль пламени
//                 if (choice.id === "inferno-flame-control") {
//                     const stunDuration =
//                         Math.floor(this.cardBonuses.person.burnStacks / 5) * choice.bonus.stun.durationPer5BurnStacks;
//                     if (stunDuration > 0) {
//                         this.addEffect("mob", {
//                             type: EFFECT_TYPES.STUN,
//                             duration: stunDuration,
//                             val: 1,
//                             sourceCard: choice.name,
//                             icon: choice.icon,
//                         });
//                         this.addToLog(`Контроль пламени оглушил врага на ${stunDuration} ход(а)!`);
//                     }
//                 }
//
//                 // Inferno: Клинок пламени
//                 if (choice.id === "inferno-blade-of-flame") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.AUTO_ATTACK_BURN,
//                         duration: choice.bonus.autoAttackBurn.duration,
//                         val: { chance: choice.bonus.autoAttackBurn.chance, stacks: choice.bonus.autoAttackBurn.stacks },
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Assassin: Смертельный удар
//                 if (choice.id === "assassin-fatal-strike") {
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     this.cardBonuses.person.lethalityStacks += choice.bonus.lethality.stacks;
//                     this.addToLog(`Добавлено ${choice.bonus.lethality.stacks} зарядов смертоносности!`);
//                 }
//
//                 // Assassin: Ядовитый удар
//                 if (choice.id === "assassin-poison-strike") {
//                     let poisonValue = choice.bonus.poison.value;
//                     if (this.cardBonuses.person.lethalityStacks > 0) {
//                         poisonValue *= choice.bonus.lethalityBonus.multiplier;
//                         const multiplier =
//                             this.activeEffects.person.find(e => e.type === EFFECT_TYPES.LETHALITY_MULTIPLIER)?.val || 1;
//                         poisonValue *= multiplier;
//                     }
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.POISON,
//                         duration: choice.bonus.poison.duration,
//                         val: poisonValue,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Assassin: Уловка
//                 if (choice.id === "assassin-trick") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.DAMAGE_REDUCTION,
//                         duration: choice.bonus.damageReduction.duration,
//                         val: choice.bonus.damageReduction.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Assassin: Маленькие хитрости
//                 if (choice.id === "assassin-little-tricks") {
//                     const nonUltimateCards = this.levelCards.filter(c => c.rare !== "epic");
//                     if (nonUltimateCards.length > 0) {
//                         const randomCard = nonUltimateCards[Math.floor(Math.random() * nonUltimateCards.length)];
//                         this.levelCards.push({ ...randomCard });
//                         this.addToLog(`Скопирована карта: ${randomCard.name}`);
//                     }
//                 }
//
//                 // Assassin: Ослепление
//                 if (choice.id === "assassin-blind") {
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.MISS_CHANCE,
//                         duration: choice.bonus.missChance.duration,
//                         val: choice.bonus.missChance.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                 }
//
//                 // Assassin: Коварный удар
//                 if (choice.id === "assassin-insidious-strike") {
//                     this.cardBonuses.person.attack += choice.bonus.attack;
//                     this.cardBonuses.person.lethalityStacks += choice.bonus.lethality.stacks;
//                     this.addToLog(`Добавлен 1 заряд смертоносности!`);
//                 }
//
//                 // Assassin: Удар в сердце
//                 if (choice.id === "assassin-blow-to-the-heart") {
//                     let stunDuration = choice.bonus.stun.duration;
//                     if (this.cardBonuses.person.lethalityStacks > 0) {
//                         stunDuration *= choice.bonus.lethalityBonus.multiplier;
//                         const multiplier =
//                             this.activeEffects.person.find(e => e.type === EFFECT_TYPES.LETHALITY_MULTIPLIER)?.val || 1;
//                         stunDuration *= multiplier;
//                     }
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.STUN,
//                         duration: stunDuration,
//                         val: 1,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addToLog(`Удар в сердце оглушил врага на ${stunDuration} ход(а)!`);
//                 }
//
//                 // Assassin: Смертельный приём
//                 if (choice.id === "assassin-deadly-technique") {
//                     this.addEffect("person", {
//                         type: EFFECT_TYPES.LETHALITY_MULTIPLIER,
//                         duration: choice.bonus.lethalityMultiplier.duration,
//                         val: choice.bonus.lethalityMultiplier.value,
//                         sourceCard: choice.name,
//                         icon: choice.icon,
//                     });
//                     this.addToLog("Смертельный приём удвоил эффект смертоносности!");
//                 }
//
//                 // Assassin: Серийный убийца
//                 if (choice.id === "assassin-serial-killer") {
//                     let strikes = 1;
//                     let multiStrikeChance = choice.bonus.multiStrike.chance;
//                     if (this.cardBonuses.person.lethalityStacks > 0) {
//                         multiStrikeChance *= choice.bonus.lethalityBonus.multiplier;
//                         const multiplier =
//                             this.activeEffects.person.find(e => e.type === EFFECT_TYPES.LETHALITY_MULTIPLIER)?.val || 1;
//                         multiStrikeChance *= multiplier;
//                     }
//                     if (Math.random() * 100 <= multiStrikeChance) {
//                         strikes = choice.bonus.multiStrike.strikes;
//                         this.addToLog("Серийный убийца нанёс двойной удар!");
//                     }
//                     this.cardBonuses.person.attack += choice.bonus.attack * strikes;
//                 }
//             });
//         },
//
//         characterAttack() {
//             let totalDamage = this.cardBonuses.person.attack;
//             let hits = 1;
//             let isCritical = false;
//             let isHit = Math.random() * 100 <= this.hitChance("person");
//             const doubleShot = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.DOUBLE_SHOT);
//
// // Обработка двойного выстрела (ranger-hunters-mark)
//             if (doubleShot && Math.random() * 100 <= doubleShot.val) {
//                 hits = 2;
//                 this.addToLog("Метка охотника позволила сделать дополнительный выстрел!");
//             }
//
// // Обработка Быстрой стрельбы
//             const rapidFire = this.choices.find(c => c?.id === "ranger-rapid-fire");
//             if (rapidFire) {
//                 hits = rapidFire.bonus.count;
//                 totalDamage = rapidFire.bonus.attack * hits;
//                 this.rapidFireHits = 0;
//             }
//
//             for (let i = 0; i < hits; i++) {
//                 if (!isHit) {
//                     this.hasMissed = true;
//                     this.addToLog("Персонаж промахнулся!");
//                     continue;
//                 }
//
//                 if (rapidFire) {
//                     this.rapidFireHits++;
//                 }
//
// // Проверка критического удара
//                 isCritical = Math.random() * 100 <= this.criticalDmg("person");
//                 let damage = totalDamage / hits;
//                 if (isCritical) {
//                     damage *= 2;
//                     this.addToLog("Критический удар!");
//                 }
//
// // Обработка игнорирования защиты (wrecker-smash)
//                 const wreckerSmash = this.choices.find(c => c?.id === "wrecker-smash");
//                 let mobDefense = this.physicalDef("mob");
//                 if (wreckerSmash) {
//                     mobDefense = Math.max(0, mobDefense - wreckerSmash.bonus.ignoreDefense);
//                 }
//
// // Учёт защиты врага
//                 damage = Math.max(0, damage - mobDefense);
//
// // Применение урона
//                 this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - damage);
//                 this.addToLog(`Персонаж нанёс ${damage} урона врагу!`);
//                 this.showActionText("mob", `-${damage} HP`, "damage");
//
// // Обработка дополнительных эффектов
//                 const autoAttackBurn = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.AUTO_ATTACK_BURN);
//                 if (autoAttackBurn && Math.random() * 100 <= autoAttackBurn.val.chance) {
//                     this.cardBonuses.person.burnStacks += autoAttackBurn.val.stacks;
//                     this.addEffect("mob", {
//                         type: EFFECT_TYPES.BURN,
//                         duration: autoAttackBurn.duration,
//                         val: 1,
//                         sourceCard: autoAttackBurn.sourceCard,
//                         icon: autoAttackBurn.icon,
//                     });
//                     this.addToLog("Клинок пламени наложил поджог!");
//                 }
//
// // Обработка следующей атаки (monk-strike-of-the-rising-sun)
//                 const nextAttack = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.NEXT_ATTACK);
//                 if (nextAttack) {
//                     totalDamage += nextAttack.val;
//                     this.activeEffects.person = this.activeEffects.person.filter(e => e !== nextAttack);
//                 }
//             }
//
// // Проверка условия для criticalNext (ranger-rapid-fire)
//             if (rapidFire && this.rapidFireHits === rapidFire.bonus.count) {
//                 this.addEffect("person", {
//                     type: EFFECT_TYPES.CRITICAL_NEXT,
//                     duration: 1,
//                     val: { chance: rapidFire.bonus.criticalNext.chance },
//                     sourceCard: rapidFire.name,
//                     icon: rapidFire.icon,
//                 });
//                 this.addToLog("Все выстрелы Быстрой стрельбы попали! Следующая атака с 100% критическим шансом!");
//             }
//         },
//         mobAttack() {
//             if (this.activeEffects.mob.some(e => e.type === EFFECT_TYPES.STUN || e.type === EFFECT_TYPES.FREEZE)) {
//                 this.addToLog("Враг оглушён или заморожен и пропускает ход!");
//                 return;
//             }
//
//             let damage = this.physicalDmg("mob");
//             const isHit = Math.random() * 100 <= this.hitChance("mob");
//             const isCritical = Math.random() * 100 <= this.criticalDmg("mob");
//
//             if (!isHit) {
//                 this.addToLog("Враг промахнулся!");
//                 return;
//             }
//
//             if (isCritical) {
//                 damage *= 2;
//                 this.addToLog("Враг нанёс критический удар!");
//             }
//
//             // Проверка неуязвимости
//             if (this.activeEffects.person.some(e => e.type === EFFECT_TYPES.INVULNERABILITY)) {
//                 this.addToLog("Персонаж неуязвим и не получил урон!");
//                 return;
//             }
//
//             // Проверка перенаправления атаки
//             const redirect = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.REDIRECT_ATTACK);
//             if (redirect) {
//                 this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - damage);
//                 this.addToLog(`Атака врага перенаправлена обратно! Враг получил ${damage} урона!`);
//                 this.showActionText("mob", `-${damage} HP`, "damage");
//                 return;
//             }
//
//             // Проверка блока
//             const block = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.BLOCK);
//             if (block) {
//                 block.val -= 1;
//                 this.addToLog("Каменный доспех заблокировал атаку!");
//                 if (block.val <= 0) {
//                     this.activeEffects.person = this.activeEffects.person.filter(e => e !== block);
//                 }
//                 return;
//             }
//
//             // Учёт защиты персонажа
//             damage = Math.max(0, damage - this.physicalDef("person"));
//
//             // Учёт снижения урона
//             const damageReduction = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.DAMAGE_REDUCTION);
//             if (damageReduction) {
//                 damage *= (100 - damageReduction.val) / 100;
//             }
//
//             // Применение урона
//             this.baseStats.person.currentHp = Math.max(0, this.baseStats.person.currentHp - damage);
//             this.addToLog(`Враг нанёс ${damage} урона персонажу!`);
//             this.showActionText("person", `-${damage} HP`, "damage");
//
//             // Контрудар от Алмазного щита
//             const diamondShield = this.activeEffects.person.find(
//                 e => e.sourceCard === "Алмазный щит" && e.stat === "defence",
//             );
//             if (diamondShield) {
//                 this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - 1);
//                 this.addToLog("Алмазный щит нанёс 1 урон врагу в ответ!");
//                 this.showActionText("mob", "-1 HP", "damage");
//             }
//
//             // Заморозка от Ледяного барьера
//             const frostBarrier = this.activeEffects.person.find(
//                 e => e.sourceCard === "Ледяной барьер" && e.stat === "defence",
//             );
//             if (frostBarrier) {
//                 this.addEffect("mob", {
//                     type: EFFECT_TYPES.FREEZE,
//                     duration: 1,
//                     val: 1,
//                     sourceCard: "Ледяной барьер",
//                     icon: frostBarrier.icon,
//                 });
//                 this.addToLog("Ледяной барьер заморозил врага!");
//             }
//
//             // Поджог от Огненного щита
//             const flameShield = this.activeEffects.person.find(
//                 e => e.sourceCard === "Огненный щит" && e.stat === "defence",
//             );
//             if (flameShield) {
//                 this.addEffect("mob", {
//                     type: EFFECT_TYPES.BURN,
//                     duration: 2,
//                     val: 1,
//                     sourceCard: "Огненный щит",
//                     icon: flameShield.icon,
//                 });
//                 this.cardBonuses.person.burnStacks += 1;
//                 this.addToLog("Огненный щит поджёг врага!");
//             }
//
//             // Лечение при получении урона
//             const healOnDamage = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.HEAL_ON_DAMAGE);
//             if (healOnDamage && !this.activeEffects.person.some(e => e.type === EFFECT_TYPES.BLOCK_HEALING)) {
//                 this.baseStats.person.currentHp = Math.min(
//                     this.baseStats.person.currentHp + healOnDamage.val,
//                     this.maxHp("person"),
//                 );
//                 this.addToLog(`Равновесие восстановило ${healOnDamage.val} HP!`);
//                 this.showActionText("person", `+${healOnDamage.val} HP`, "heal");
//             }
//         },
//
//         updateEffects() {
//             ["person", "mob"].forEach(target => {
//                 const effects = this.activeEffects[target as "person" | "mob"];
//                 const updatedEffects: Effect[] = [];
//
//                 effects.forEach(effect => {
//                     // Уменьшение длительности
//                     if (effect.duration && effect.duration > 0) {
//                         effect.duration -= 1;
//                     }
//
//                     // Применение эффектов
//                     if (effect.type === EFFECT_TYPES.BURN) {
//                         const damage = effect.val * (this.cardBonuses.person.burnStacks || 1);
//                         this.baseStats[target].currentHp = Math.max(0, this.baseStats[target].currentHp - damage);
//                         this.addToLog(`${effect.sourceCard} нанесла ${damage} урона от поджога!`);
//                         this.showActionText(target, `-${damage} HP`, "burn");
//                     } else if (effect.type === EFFECT_TYPES.POISON) {
//                         this.baseStats[target].currentHp = Math.max(0, this.baseStats[target].currentHp - effect.val);
//                         this.addToLog(`${effect.sourceCard} нанесла ${effect.val} урона от яда!`);
//                         this.showActionText(target, `-${effect.val} HP`, "poison");
//                     } else if (effect.type === EFFECT_TYPES.TRANSFORM) {
//                         this.baseStats[target].currentHp = Math.max(0, this.baseStats[target].currentHp - effect.val);
//                         this.addToLog(`${effect.sourceCard} нанесла ${effect.val} урона!`);
//                         this.showActionText(target, `-${effect.val} HP`, "damage");
//                     }
//
//                     // Сохранение эффекта, если длительность не истекла
//                     if (!effect.duration || effect.duration > 0) {
//                         updatedEffects.push(effect);
//                     }
//                 });
//
//                 this.activeEffects[target as "person" | "mob"] = updatedEffects;
//             });
//
//             // Проверка критического шанса "Чувство охотника"
//             if (this.hasMissed) {
//                 this.activeEffects.person = this.activeEffects.person.filter(
//                     e => !(e.type === EFFECT_TYPES.CRITICAL_CHANCE && e.val.condition === "untilMiss"),
//                 );
//             }
//
//             // Удаление эффекта критического удара после атаки
//             this.activeEffects.person = this.activeEffects.person.filter(e => e.type !== EFFECT_TYPES.CRITICAL_NEXT);
//
//             // Проверка условий победы/поражения
//             if (this.baseStats.person.currentHp <= 0) {
//                 this.addToLog("Персонаж погиб! Игра окончена.");
//                 // Логика завершения игры
//             } else if (this.baseStats.mob.currentHp <= 0) {
//                 this.addToLog("Враг побеждён! Победа!");
//                 // Логика победы
//             }
//         },
//
//         selectCard(index: number) {
//             if (this.isAnimating || this.selectedCards >= this.maxSelectedCards || !this.levelCards[index]) {
//                 return;
//             }
//
//             // Проверка маны
//             const card = this.levelCards[index];
//             let manaCost = card.manaCost;
//             const spellCostReduction = this.activeEffects.person.find(e => e.type === EFFECT_TYPES.SPELL_COST_REDUCTION);
//             if (spellCostReduction && card.bonus.isMagic) {
//                 manaCost = Math.max(0, manaCost - spellCostReduction.val);
//             }
//             if (this.baseStats.person.currentMp < manaCost) {
//                 this.addToLog("Недостаточно маны для выбора этой карты!");
//                 return;
//             }
//
//             // Поиск свободного слота
//             const emptyIndex = this.choices.findIndex(slot => slot === null);
//             if (emptyIndex === -1) {
//                 this.addToLog("Нет свободных слотов для карты!");
//                 return;
//             }
//
//             this.choices[emptyIndex] = card;
//             this.levelCards.splice(index, 1);
//             this.selectedCards += 1;
//             this.useCardIndices.push(emptyIndex);
//         },
//
//         deselectCard(index: number) {
//             if (this.isAnimating || !this.choices[index]) {
//                 return;
//             }
//
//             const card = this.choices[index];
//             this.levelCards.push(card!);
//             this.choices[index] = null;
//             this.selectedCards -= 1;
//             this.useCardIndices = this.useCardIndices.filter(i => i !== index);
//         },
//
//         async playCards() {
//             if (this.isAnimating || this.useCardIndices.length === 0) {
//                 return;
//             }
//
//             this.isAnimating = true;
//
//             // Применение бонусов карт
//             this.applyCardBonuses();
//
//             // Атака персонажа
//             await this.characterAttack();
//
//             // Проверка Быстрой стрельбы
//             const rapidFire = this.choices.find(c => c?.id === "ranger-rapid-fire");
//             if (rapidFire && this.rapidFireHits === rapidFire.bonus.count) {
//                 this.addEffect("person", {
//                     type: EFFECT_TYPES.CRITICAL_NEXT,
//                     duration: 1,
//                     val: { chance: 100 },
//                     sourceCard: rapidFire.name,
//                     icon: rapidFire.icon,
//                 });
//                 this.addToLog("Все выстрелы Быстрой стрельбы попали! Следующая атака критическая!");
//             }
//
//             // Обновление эффектов
//             this.updateEffects();
//
//             // Атака врага
//             if (this.baseStats.mob.currentHp > 0) {
//                 await new Promise(resolve => setTimeout(resolve, 1000));
//                 this.mobAttack();
//             }
//
//             // Обновление эффектов после атаки врага
//             this.updateEffects();
//
//             // Сброс и подготовка к новому ходу
//             this.turnCount += 1;
//             this.choices = Array(9).fill(null);
//             this.useCardIndices = [];
//             this.selectedCards = 0;
//             this.levelCards = this.getRandomCards(5);
//             this.baseStats.person.currentMp = Math.min(this.baseStats.person.currentMp + 1, this.maxMp("person"));
//             this.isAnimating = false;
//         },
//
//         addToLog(message: string) {
//             this.battleLog.push(`${this.turnCount}: ${message}`);
//             if (this.battleLog.length > 10) {
//                 this.battleLog.shift();
//             }
//         },
//
//         showActionText(target: "person" | "mob", message: string, type: string) {
//             this.messages[target] = { type, message };
//             this.messages.turnKey += 1;
//             setTimeout(() => {
//                 if (this.messages[target].message === message) {
//                     this.messages[target] = { type: "", message: "" };
//                 }
//             }, 2000);
//         },
//     },
});
</script>

<template>
<!--    <div class="game">-->
<!--        <div class="game__container container">-->
<!--            <div class="game__logs">-->
<!--                <Char />-->
<!--                <div class="game__battle-log">-->
<!--                    <div class="game__battle-item" v-for="(log, index) in battleLog" :key="index">{{ log }}</div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="game__buffs buffs">-->
<!--                <div class="buffs__person">-->
<!--                    <div class="buffs__buff" v-for="(effect, index) in activeEffects.person"-->
<!--                         :key="'person-effect-' + index">-->
<!--                        <nuxt-img class="buffs__image" :src="`/images/pages/game/${effect.icon}`" alt="Эффект" />-->
<!--                        <span class="buffs__counter" v-if="effect.duration && effect.duration < 999">{{ effect.duration-->
<!--                            }}</span>-->
<!--                    </div>-->
<!--                    HP: {{ baseStats.person.currentHp }}/{{ maxHp("person") }}-->
<!--                    MP: {{ baseStats.person.currentMp }}/{{ maxMp("person") }}-->
<!--                    <div class="buffs__stats">-->
<!--                        ATK: {{ personStats.physicalDmg }} | DEF: {{ personStats.physicalDef }} |-->
<!--                        CRIT: {{ personStats.critical }}% | HIT: {{ personStats.hitChance }}% |-->
<!--                        DODGE: {{ personStats.dodge }}% | SPD: {{ personStats.speed }}-->
<!--                    </div>-->
<!--                    <div v-if="cardBonuses.person.lethalityStacks > 0" class="buffs__lethality">-->
<!--                        Lethality Stacks: {{ cardBonuses.person.lethalityStacks }}-->
<!--                    </div>-->
<!--                    <div v-if="cardBonuses.person.burnStacks > 0" class="buffs__burn">-->
<!--                        Burn Stacks: {{ cardBonuses.person.burnStacks }}-->
<!--                    </div>-->
<!--                    <div v-if="cardBonuses.person.trapCount > 0" class="buffs__trap">-->
<!--                        Trap Count: {{ cardBonuses.person.trapCount }}-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="buffs__mob">-->
<!--                    <div class="buffs__buff" v-for="(effect, index) in activeEffects.mob" :key="'mob-effect-' + index">-->
<!--                        <nuxt-img class="buffs__image" :src="`/images/pages/game/${effect.icon}`" alt="Эффект" />-->
<!--                        <span class="buffs__counter" v-if="effect.duration && effect.duration < 999">{{ effect.duration-->
<!--                            }}</span>-->
<!--                    </div>-->
<!--                    HP: {{ baseStats.mob.currentHp }}/{{ maxHp("mob") }}-->
<!--                    <div class="buffs__stats">-->
<!--                        ATK: {{ mobStats.physicalDmg }} | DEF: {{ mobStats.physicalDef }} |-->
<!--                        CRIT: {{ mobStats.critical }}% | HIT: {{ mobStats.hitChance }}% |-->
<!--                        DODGE: {{ mobStats.dodge }}% | SPD: {{ mobStats.speed }}-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="game__actions game-actions">-->
<!--                <div-->
<!--                    :key="'person-' + messages.turnKey"-->
<!--                    :class="[-->
<!--                        messages.person.type === 'miss' ? 'game-actions__action&#45;&#45;miss' : '',-->
<!--                        messages.person.type === 'damage' ? 'game-actions__action&#45;&#45;dmg' : '',-->
<!--                        messages.person.type === 'death' ? 'game-actions__action&#45;&#45;death' : '',-->
<!--                        messages.person.type === 'heal' ? 'game-actions__action&#45;&#45;heal' : '',-->
<!--                        messages.person.type === 'mana-restore' ? 'game-actions__action&#45;&#45;mana' : '',-->
<!--                        messages.person.type === 'burn' ? 'game-actions__action&#45;&#45;burn' : '',-->
<!--                        messages.person.type === 'poison' ? 'game-actions__action&#45;&#45;poison' : '',-->
<!--                        'game-actions__action game-actions__person'-->
<!--                    ]"-->
<!--                >-->
<!--                    {{ messages.person.message }}-->
<!--                </div>-->
<!--                <div-->
<!--                    :key="'mob-' + messages.turnKey"-->
<!--                    :class="[-->
<!--                        messages.mob.type === 'miss' ? 'game-actions__action&#45;&#45;miss-mob' : '',-->
<!--                        messages.mob.type === 'damage' ? 'game-actions__action&#45;&#45;dmg-mob' : '',-->
<!--                        messages.mob.type === 'death' ? 'game-actions__action&#45;&#45;death-mob' : '',-->
<!--                        messages.mob.type === 'heal' ? 'game-actions__action&#45;&#45;heal-mob' : '',-->
<!--                        messages.mob.type === 'burn' ? 'game-actions__action&#45;&#45;burn-mob' : '',-->
<!--                        messages.mob.type === 'poison' ? 'game-actions__action&#45;&#45;poison-mob' : '',-->
<!--                        'game-actions__action game-actions__mob'-->
<!--                    ]"-->
<!--                >-->
<!--                    {{ messages.mob.message }}-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="game__window">-->
<!--                <div class="game__block game__block&#45;&#45;person">-->
<!--                    <div :class="`game__person game__person&#45;&#45;${char.character.species} game__person&#45;&#45;idle`"></div>-->
<!--                </div>-->
<!--                <div class="game__choices">-->
<!--                    <div class="game__wrap">-->
<!--                        <div-->
<!--                            class="game__choice"-->
<!--                            @dragover.prevent-->
<!--                            @dragenter.prevent-->
<!--                            @drop="onDrop($event, choiceIndex)"-->
<!--                            @click="deselectCard(choiceIndex)"-->
<!--                            v-for="(choice, choiceIndex) in choices"-->
<!--                            :key="choiceIndex"-->
<!--                        >-->
<!--                            <div v-if="choice" class="game__picture">-->
<!--                                <div class="game__stats">+{{ choice.count }}</div>-->
<!--                                <div class="game__wrapper">-->
<!--                                    <nuxt-img :src="`/images/pages/game/${choice.icon}`" :alt="choice.name"-->
<!--                                              class="game__icon" />-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="game__attacks">-->
<!--                        <button class="game__attack button button&#45;&#45;metal" @click="playCards"-->
<!--                                :disabled="isAttackDisabled || useCardIndices.length === 0">-->
<!--                            Атака-->
<!--                        </button>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="game__block game__block&#45;&#45;mobs">-->
<!--                    <div class="game__mob game__mob&#45;&#45;idle"></div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="game__buttons container">-->
<!--            <div class="game__buttons-block">-->
<!--                <div-->
<!--                    :class="[-->
<!--                        card.rare ? `card-game&#45;&#45;${card.rare}` : 'card-game&#45;&#45;standard',-->
<!--                        useCardIndices.includes(index) ? 'card-game&#45;&#45;used' : '',-->
<!--                        'game__card card-game button'-->
<!--                    ]"-->
<!--                    v-for="(card, index) in levelCards"-->
<!--                    :key="index"-->
<!--                    draggable="true"-->
<!--                    @click="selectCard(index)"-->
<!--                >-->
<!--                    <div class="card-game__picture">-->
<!--                        <nuxt-img class="card-game__image" :src="`/images/components/cards/ranger/${card.icon}`" alt="Карта" />-->
<!--                    </div>-->
<!--                    <div class="card-game__name">{{ card.name }}</div>-->
<!--                    <div class="card-game__type">{{ card.type }}</div>-->
<!--                    <div class="card-game__description">{{ card.description }}</div>-->
<!--                    <div class="card-game__mana">-->
<!--                        <nuxt-icon class="card-game__icon-mana" name="stats/mana" />-->
<!--                        {{ card.manaCost }}-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="game__counts">-->
<!--                Выбранные карточки {{ selectedCards }} / {{ maxSelectedCards }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <Dice v-if="showDice" />-->
<!--    </div>-->
</template>
<style scoped lang="scss">
//@use "assets/scss/pages/game/id/styles";
</style>