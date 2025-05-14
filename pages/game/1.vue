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
    CONTROL: "Контроль", // Добавлен тип CONTROL для новых карт
    UTILITY: "Утилита",  // Добавлен тип UTILITY для новых карт
} as const;

const EFFECT_TYPES = {
    BLEED: "bleed",
    REGEN: "regen",
    BUFF: "buff",
    IMMUNE: "immune",
    POISON: "poison",  // Активирован тип POISON
    BURN: "burn",      // Добавлен тип BURN для эффекта горения
    FREEZE: "freeze",  // Добавлен тип FREEZE для заморозки
    STUN: "stun",      // Добавлен тип STUN для оглушения
    HEAL_BLOCK: "healBlock", // Добавлен тип HEAL_BLOCK для блокировки исцеления
} as const;

// Типы для TypeScript
interface Card {
    id: string;        // Добавлено поле id
    name: string;
    type: string;
    rare: string;
    description: string;
    count: number;
    icon: string;
    bonus: {
        [key: string]: number | boolean | { [key: string]: number | boolean };
    };
    manaCost: number;
    duration?: number;
    level?: number;    // Добавлено поле level
    maxLevel?: number; // Добавлено поле maxLevel
    upgradeCost?: number; // Добавлено поле upgradeCost
    upgradeEffect?: { [key: string]: any }; // Добавлено поле upgradeEffect
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
    ignoreDefense?: number; // Добавлено для игнорирования защиты
    debuffImmune?: boolean; // Добавлено для иммунитета к дебаффам
}

export default defineComponent({
    name: "Index",
    components: { Dice },
    setup() {
        const char = usePersonState();
        const allCards = {
            ranger: [
                {
                    id: "ranger-Sniper-shot",
                    name: "Снайперский выстрел",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 3 урона, +100% шанс попадания на 1 ход",
                    icon: "ranger-sniper-shot.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 3, buff: { hitChance: true, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1, buff: { hitChance: true, duration: 0.2 } },
                },
                {
                    id: "ranger-Hunter's-mark",
                    name: "Метка охотника",
                    type: "buff",
                    rare: "rare",
                    description: "Накладывает кровотечение (2 урона за ход, 3 хода)",
                    icon: "ranger-hunters-mark.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { debuff: { bleed: { value: 2, duration: 3 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { bleed: { value: 1, duration: 0.3 } } },
                },
                {
                    id: "ranger-Rapid-fire",
                    name: "Быстрая стрельба",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 5 урона, накладывает яд (2 урона за ход, 3 хода)",
                    icon: "ranger-rapid-fire.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 5, debuff: { poison: { value: 2, duration: 3 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1, debuff: { poison: { value: 0.5, duration: 0.3 } } },
                },
                {
                    id: "ranger-Hunting-trap",
                    name: "Охотничья ловушка",
                    type: "control",
                    rare: "rare",
                    description: "Замедляет врага (-5 скорости на 2 хода)",
                    icon: "ranger-hunting-trap.png",
                    manaCost: 1,
                    count: 1,
                    bonus: { debuff: { speed: -5, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { speed: -0.5, duration: 0.2 } },
                },
                {
                    id: "ranger-Explosive-shot",
                    name: "Взрывной выстрел",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 урона, +5 уклонения на 2 хода",
                    icon: "ranger-explosive-shot.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { attack: 2, buff: { dodge: 5, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5, buff: { dodge: 1, duration: 0.2 } },
                },
                {
                    id: "ranger-Aimed-shot",
                    name: "Меткий выстрел",
                    type: "attack",
                    rare: "common",
                    description: "Наносит 2 урона, +10 меткости на 2 хода",
                    icon: "ranger-aimed-shot.png",
                    manaCost: 2,
                    count: 2,
                    bonus: { attack: 2, buff: { hitChance: 10, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 3,
                    upgradeEffect: { attack: 0.5, buff: { hitChance: 1, duration: 0.2 } },
                },
                {
                    id: "ranger-Healing-salve",
                    name: "Целебный бальзам",
                    type: "heal",
                    rare: "common",
                    description: "Восстанавливает 3 HP",
                    icon: "ranger-healing-salve.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { hp: 3 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 3,
                    upgradeEffect: { hp: 1 },
                },
                {
                    id: "ranger-Camouflage",
                    name: "Камуфляж",
                    type: "defense",
                    rare: "rare",
                    description: "+30 уклонения на 2 хода",
                    icon: "ranger-camouflage.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { dodge: 30, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { dodge: 2, duration: 0.2 } },
                },
                {
                    id: "ranger-Hunter's-sense",
                    name: "Чувство охотника",
                    type: "buff",
                    rare: "epic",
                    description: "+5 урона, +10% шанс критического удара на 1 ход",
                    icon: "ranger-hunters-sense.png",
                    manaCost: 4,
                    count: 1,
                    bonus: { buff: { attack: 5, critical: 10, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 7,
                    upgradeEffect: { buff: { attack: 1, critical: 2, duration: 0.2 } },
                },
            ],
            wrecker: [
                {
                    id: "wrecker-Smash",
                    name: "Сокрушение",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 3 урона, игнорирует 50% защиты на 2 хода",
                    icon: "wrecker-smash.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 3, buff: { ignoreDefense: 50, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1, buff: { ignoreDefense: 2, duration: 0.2 } },
                },
                {
                    id: "wrecker-Diamond-shield",
                    name: "Алмазный щит",
                    type: "defense",
                    rare: "rare",
                    description: "+2 защиты, +1 урона на 2 хода",
                    icon: "wrecker-diamond-shield.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { defence: 2, attack: 1, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { defence: 1, attack: 0.5, duration: 0.2 } },
                },
                {
                    id: "wrecker-Shock-wave",
                    name: "Ударная волна",
                    type: "control",
                    rare: "rare",
                    description: "Оглушает на 1 ход, -20% защиты на 2 хода",
                    icon: "wrecker-shock-wave.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { debuff: { stun: true, ignoreDefense: 20, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { stun: true, ignoreDefense: 2, duration: 0.2 } },
                },
                {
                    id: "wrecker-Surge-of-strength",
                    name: "Прилив сил",
                    type: "heal",
                    rare: "rare",
                    description: "Восстанавливает 4 HP",
                    icon: "wrecker-surge-of-strength.png",
                    manaCost: 2,
                    count: 4,
                    bonus: { hp: 4 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { hp: 1 },
                },
                {
                    id: "wrecker-Crystal-infusion",
                    name: "Кристальная инфузия",
                    type: "buff",
                    rare: "rare",
                    description: "+4 урона, невосприимчивость к дебаффам на 3 хода",
                    icon: "wrecker-crystal-infusion.png",
                    manaCost: 5,
                    count: 1,
                    bonus: { buff: { attack: 4, debuffImmune: true, duration: 3 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { attack: 1, debuffImmune: true, duration: 0.3 } },
                },
                {
                    id: "wrecker-Farcical-blow",
                    name: "Фарсированный удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 3 урона",
                    icon: "wrecker-farcical-blow.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { attack: 3 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1 },
                },
                {
                    id: "wrecker-Crystallization",
                    name: "Кристаллизация",
                    type: "defense",
                    rare: "rare",
                    description: "+10 защиты на 1 ход",
                    icon: "wrecker-crystallization.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { defence: 10, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { defence: 2, duration: 0.2 } },
                },
                {
                    id: "wrecker-Jeweler's-precision",
                    name: "Точность ювелира",
                    type: "buff",
                    rare: "rare",
                    description: "+100% меткости на 2 хода",
                    icon: "wrecker-jewelers-precision.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { hitChance: true, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { hitChance: true, duration: 0.3 } },
                },
                {
                    id: "wrecker-Powerful-blow",
                    name: "Мощный удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 урона, +1 урона на 1 ход",
                    icon: "wrecker-powerful-blow.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { attack: 2, buff: { attack: 1, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1, buff: { attack: 0.5, duration: 0.2 } },
                },
            ],
            arcanist: [
                {
                    id: "arcanist-Fireball",
                    name: "Огненный шар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 3 магического урона",
                    icon: "arcanist-fireball.png",
                    manaCost: 5,
                    count: 1,
                    bonus: { attack: 3 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1 },
                },
                {
                    id: "arcanist-Frost-arrow",
                    name: "Ледяная стрела",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 магического урона, замораживает на 1 ход",
                    icon: "arcanist-frost-arrow.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 2, debuff: { freeze: { duration: 1 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5, debuff: { freeze: { duration: 0.2 } } },
                },
                {
                    id: "arcanist-Magical-flash",
                    name: "Магическая вспышка",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 1 магического урона, замораживает на 1 ход",
                    icon: "arcanist-magical-flash.png",
                    manaCost: 1,
                    count: 1,
                    bonus: { attack: 1, debuff: { freeze: { duration: 1 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.3, debuff: { freeze: { duration: 0.2 } } },
                },
                {
                    id: "arcanist-Frost-barrier",
                    name: "Ледяной барьер",
                    type: "defense",
                    rare: "rare",
                    description: "+4 защиты, замораживает врагов на 1 ход при защите",
                    icon: "arcanist-frost-barrier.png",
                    manaCost: 4,
                    count: 1,
                    bonus: { buff: { defence: 4, duration: 1 }, debuff: { freeze: { duration: 1 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { defence: 1, duration: 0.2 }, debuff: { freeze: { duration: 0.2 } } },
                },
                {
                    id: "arcanist-Magic-trick",
                    name: "Магическая уловка",
                    type: "utility",
                    rare: "rare",
                    description: "Восстанавливает 5 маны на 3 хода",
                    icon: "arcanist-magic-trick.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { mp: 5, duration: 3 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { mp: 1, duration: 0.3 } },
                },
                {
                    id: "arcanist-Surge-of-power",
                    name: "Прилив сил",
                    type: "heal",
                    rare: "rare",
                    description: "Восстанавливает 4 HP и 4 маны",
                    icon: "arcanist-surge-of-power.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { hp: 4, buff: { mp: 4 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { hp: 1, buff: { mp: 1 } },
                },
                {
                    id: "arcanist-Rings-of-cold",
                    name: "Кольца холода",
                    type: "control",
                    rare: "rare",
                    description: "Замораживает врагов на 2 хода",
                    icon: "arcanist-rings-of-cold.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { debuff: { freeze: { duration: 2 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { freeze: { duration: 0.3 } } },
                },
                {
                    id: "arcanist-True-trinity",
                    name: "Истинное тринити",
                    type: "attack",
                    rare: "epic",
                    description: "Наносит 5 магического урона, накладывает горение (2 урона за ход, 3 хода), замораживает на 1 ход",
                    icon: "arcanist-true-trinity.png",
                    manaCost: 7,
                    count: 1,
                    bonus: { attack: 5, debuff: { burn: { value: 2, duration: 3 }, freeze: { duration: 1 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 7,
                    upgradeEffect: { attack: 1, debuff: { burn: { value: 0.5, duration: 0.3 }, freeze: { duration: 0.2 } } },
                },
                {
                    id: "arcanist-Hidden-knowledge",
                    name: "Скрытые знания",
                    type: "buff",
                    rare: "rare",
                    description: "+5 магического урона на 2 хода",
                    icon: "arcanist-hidden-knowledge.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { attack: 5, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { attack: 1, duration: 0.3 } },
                },
                {
                    id: "arcanist-Magic-shield",
                    name: "Магический щит",
                    type: "defense",
                    rare: "common",
                    description: "+3 защиты на 2 хода",
                    icon: "arcanist-magic-shield.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { defence: 3, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 3,
                    upgradeEffect: { buff: { defence: 1, duration: 0.2 } },
                },
                {
                    id: "arcanist-Lightning",
                    name: "Молния",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 3 магического урона",
                    icon: "arcanist-lightning.png",
                    manaCost: 4,
                    count: 1,
                    bonus: { attack: 3 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1 },
                },
                {
                    id: "arcanist-magic-explosion",
                    name: "Магический взрыв",
                    type: "attack",
                    rare: "epic",
                    description: "Наносит 2 магического урона всем врагам",
                    icon: "arcanist-magic-explosion.png",
                    manaCost: 6,
                    count: 1,
                    bonus: { attack: 2, aoe: true },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 7,
                    upgradeEffect: { attack: 0.5 },
                },
                {
                    id: "arcanist-Mana-restore",
                    name: "Восстановление маны",
                    type: "buff",
                    rare: "common",
                    description: "Восстанавливает 5 маны",
                    icon: "arcanist-mana-restore.png",
                    manaCost: 0,
                    count: 1,
                    bonus: { buff: { mp: 5 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 3,
                    upgradeEffect: { buff: { mp: 1 } },
                },
                {
                    id: "arcanist-Ice-barrier",
                    name: "Ледяной барьер",
                    type: "defense",
                    rare: "rare",
                    description: "+2 защиты на 2 хода",
                    icon: "arcanist-ice-barrier.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { defence: 2, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { defence: 1, duration: 0.2 } },
                },
                {
                    id: "arcanist-Fire-arrow",
                    name: "Огненная стрела",
                    type: "attack",
                    rare: "common",
                    description: "Наносит 2 магического урона",
                    icon: "arcanist-fire-arrow.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { attack: 2 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 3,
                    upgradeEffect: { attack: 0.5 },
                },
                {
                    id: "arcanist-Magic-aura",
                    name: "Магическая аура",
                    type: "buff",
                    rare: "rare",
                    description: "+2 магического урона на 2 хода",
                    icon: "arcanist-magic-aura.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { attack: 2, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { attack: 0.5, duration: 0.2 } },
                },
                {
                    id: "arcanist-Freeze",
                    name: "Заморозка",
                    type: "control",
                    rare: "rare",
                    description: "Замораживает врага на 1 ход",
                    icon: "arcanist-freeze.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { debuff: { freeze: { duration: 1 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { freeze: { duration: 0.3 } } },
                },
            ],
            monk: [
                {
                    id: "monk-Meditation",
                    name: "Медитация",
                    type: "buff",
                    rare: "rare",
                    description: "+3 защиты, +3 урона на 3 хода",
                    icon: "monk-meditation.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { defence: 3, attack: 3, duration: 3 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { defence: 1, attack: 1, duration: 0.3 } },
                },
                {
                    id: "monk-spiritual-strike",
                    name: "Духовный удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 урона, +20% шанс критического удара",
                    icon: "monk-spiritual-strike.png",
                    manaCost: 5,
                    count: 1,
                    bonus: { attack: 2, buff: { critical: 20 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1, buff: { critical: 2 } },
                },
                {
                    id: "monk-Tiger-strike",
                    name: "Удар тигра",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 урона, +2 урона на 2 хода",
                    icon: "monk-tiger-strike.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { attack: 2, buff: { attack: 2, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5, buff: { attack: 0.5, duration: 0.2 } },
                },
                {
                    id: "monk-Dragon-strike",
                    name: "Удар дракона",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 урона, накладывает горение (2 урона за ход, 2 хода)",
                    icon: "monk-dragon-strike.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 2, debuff: { burn: { value: 2, duration: 2 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5, debuff: { burn: { value: 0.5, duration: 0.2 } } },
                },
                {
                    id: "monk-Stone-armor",
                    name: "Каменный доспех",
                    type: "defense",
                    rare: "rare",
                    description: "Блокирует атаку на 1 ход",
                    icon: "monk-stone-armor.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { immune: true, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { immune: true, duration: 0.2 } },
                },
                {
                    id: "monk-Balance",
                    name: "Равновесие",
                    type: "heal",
                    rare: "rare",
                    description: "Исцеляет 1 HP в течение 4 ходов",
                    icon: "monk-balance.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { hp: 1, duration: 4 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { hp: 0.5, duration: 0.4 } },
                },
                {
                    id: "monk-Path-of-goodness",
                    name: "Путь добра",
                    type: "heal",
                    rare: "epic",
                    description: "Исцеляет 100% HP, блокирует исцеление на 7 ходов",
                    icon: "monk-path-of-goodness.png",
                    manaCost: 4,
                    count: 1,
                    bonus: { hp: 20, debuff: { healBlock: true, duration: 7 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 7,
                    upgradeEffect: { debuff: { healBlock: true, duration: -0.7 } },
                },
                {
                    id: "monk-Path-of-hate",
                    name: "Путь ненависти",
                    type: "buff",
                    rare: "epic",
                    description: "+4 урона на 7 ходов, блокирует исцеление",
                    icon: "monk-path-of-hate.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { attack: 4, duration: 7 }, debuff: { healBlock: true, duration: 7 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 7,
                    upgradeEffect: { buff: { attack: 1, duration: -0.5 }, debuff: { healBlock: true, duration: -0.5 } },
                },
                {
                    id: "monk-Strike-of-the-rising-sun",
                    name: "Удар восходящего солнца",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 1 урон, восстанавливает 2 маны на 2 хода",
                    icon: "monk-strike-of-the-rising-sun.png",
                    manaCost: 1,
                    count: 1,
                    bonus: { attack: 1, buff: { mp: 2, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.3, buff: { mp: 0.5, duration: 0.2 } },
                },
            ],
            inferno: [
                {
                    id: "inferno-Hell-explosion",
                    name: "Адский взрыв",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 магического урона",
                    icon: "inferno-hell-explosion.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 2 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5 },
                },
                {
                    id: "inferno-Flame-shield",
                    name: "Огненный щит",
                    type: "defense",
                    rare: "rare",
                    description: "+3 защиты на 2 хода, накладывает горение (1 урона за ход, 2 хода)",
                    icon: "inferno-flame-shield.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { defence: 3, duration: 2 }, debuff: { burn: { value: 1, duration: 2 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { defence: 1, duration: 0.2 }, debuff: { burn: { value: 0.3, duration: 0.2 } } },
                },
                {
                    id: "inferno-Wrath-of-Inferno",
                    name: "Гнев инферно",
                    type: "buff",
                    rare: "epic",
                    description: "+3 магического урона на 6 ходов",
                    icon: "inferno-wrath-of-Inferno.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { attack: 3, duration: 6 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 7,
                    upgradeEffect: { buff: { attack: 1, duration: 0.4 } },
                },
                {
                    id: "inferno-Eternal-flame",
                    name: "Вечное пламя",
                    type: "attack",
                    rare: "rare",
                    description: "Накладывает горение (2 урона за ход, 5 ходов)",
                    icon: "inferno-eternal-flame.png",
                    manaCost: 5,
                    count: 1,
                    bonus: { debuff: { burn: { value: 2, duration: 5 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { burn: { value: 0.5, duration: 0.5 } } },
                },
                {
                    id: "inferno-Live-bomb",
                    name: "Живая бомба",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 3 магического урона, +2 урона на 1 ход",
                    icon: "inferno-live-bomb.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 3, buff: { attack: 2, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1, buff: { attack: 0.5, duration: 0.2 } },
                },
                {
                    id: "inferno-Holy-flame",
                    name: "Святое пламя",
                    type: "heal",
                    rare: "rare",
                    description: "Исцеляет на 5 HP",
                    icon: "inferno-holy-flame.png",
                    manaCost: 5,
                    count: 1,
                    bonus: { hp: 5 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { hp: 1 },
                },
                {
                    id: "inferno-Small-flame",
                    name: "Малое пламя",
                    type: "attack",
                    rare: "common",
                    description: "Наносит 1 магического урона, накладывает горение (2 урона за ход, 2 хода)",
                    icon: "inferno-small-flame.png",
                    manaCost: 1,
                    count: 1,
                    bonus: { attack: 1, debuff: { burn: { value: 2, duration: 2 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 3,
                    upgradeEffect: { attack: 0.3, debuff: { burn: { value: 0.5, duration: 0.2 } } },
                },
                {
                    id: "inferno-Flame-control",
                    name: "Контроль пламени",
                    type: "control",
                    rare: "rare",
                    description: "Оглушает на 1 ход",
                    icon: "inferno-flame-control.png",
                    manaCost: 1,
                    count: 1,
                    bonus: { debuff: { stun: true, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { stun: true, duration: 0.2 } },
                },
                {
                    id: "inferno-Blade-of-flame",
                    name: "Клинок пламени",
                    type: "buff",
                    rare: "rare",
                    description: "+2 магического урона на 2 хода",
                    icon: "inferno-blade-of-flame.png",
                    manaCost: 1,
                    count: 1,
                    bonus: { buff: { attack: 2, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { attack: 0.5, duration: 0.2 } },
                },
            ],
            assassin: [
                {
                    id: "assassin-Fatal-strike",
                    name: "Смертельный удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 1 урон, +10% шанс критического удара на 3 хода",
                    icon: "assassin-fatal-strike.png",
                    manaCost: 5,
                    count: 1,
                    bonus: { attack: 1, buff: { critical: 10, duration: 3 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5, buff: { critical: 2, duration: 0.3 } },
                },
                {
                    id: "assassin-Poison-strike",
                    name: "Ядовитый удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 урона, накладывает яд (2 урона за ход, 3 хода)",
                    icon: "assassin-poison-strike.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 2, debuff: { poison: { value: 2, duration: 3 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5, debuff: { poison: { value: 0.5, duration: 0.3 } } },
                },
                {
                    id: "assassin-First-aid",
                    name: "Первая помощь",
                    type: "heal",
                    rare: "rare",
                    description: "Исцеляет 4 HP в течение 2 ходов",
                    icon: "assassin-first-aid.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { hp: 4, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { hp: 1, duration: 0.2 } },
                },
                {
                    id: "assassin-Little-tricks",
                    name: "Маленькие хитрости",
                    type: "buff",
                    rare: "rare",
                    description: "+3 урона на 2 хода",
                    icon: "assassin-little-tricks.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { attack: 3, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { attack: 1, duration: 0.2 } },
                },
                {
                    id: "assassin-Blind",
                    name: "Ослепление",
                    type: "control",
                    rare: "rare",
                    description: "30% шанс промаха у врага на 2 хода",
                    icon: "assassin-blind.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { debuff: { hitChance: -30, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { hitChance: -3, duration: 0.2 } },
                },
                {
                    id: "assassin-Insidious-strike",
                    name: "Коварный удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 1 урон, +1 урона на 1 ход",
                    icon: "assassin-insidious-strike.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { attack: 1, buff: { attack: 1, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5, buff: { attack: 0.3, duration: 0.2 } },
                },
                {
                    id: "assassin-Blow-to-the-heart",
                    name: "Удар в сердце",
                    type: "control",
                    rare: "rare",
                    description: "Оглушает на 1 ход",
                    icon: "assassin-blow-to-the-heart.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { debuff: { stun: true, duration: 1 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { stun: true, duration: 0.5 } },
                },
                {
                    id: "assassin-Deadly-technique",
                    name: "Смертельный прием",
                    type: "attack",
                    rare: "epic",
                    description: "Наносит 5 урона",
                    icon: "assassin-deadly-technique.png",
                    manaCost: 7,
                    count: 1,
                    bonus: { attack: 5 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 7,
                    upgradeEffect: { attack: 1 },
                },
                {
                    id: "assassin-Sprint",
                    name: "Спринт",
                    type: "buff",
                    rare: "rare",
                    description: "+5 скорости на 2 хода",
                    icon: "assassin-sprint.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { speed: 5, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { speed: 1, duration: 0.2 } },
                },
                {
                    id: "assassin-Shadow-veil",
                    name: "Теневая завеса",
                    type: "defense",
                    rare: "rare",
                    description: "+3 уклонения на 2 хода",
                    icon: "assassin-shadow-veil.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { dodge: 3, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { dodge: 1, duration: 0.2 } },
                },
                {
                    id: "assassin-Critical-strike",
                    name: "Критический удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 3 урона",
                    icon: "assassin-critical-strike.png",
                    manaCost: 4,
                    count: 1,
                    bonus: { attack: 3 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 1 },
                },
                {
                    id: "assassin-Stealth",
                    name: "Скрытность",
                    type: "defense",
                    rare: "rare",
                    description: "+5 уклонения на 2 хода",
                    icon: "assassin-stealth.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { buff: { dodge: 5, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { dodge: 1, duration: 0.2 } },
                },
                {
                    id: "assassin-Agility",
                    name: "Ловкость",
                    type: "buff",
                    rare: "rare",
                    description: "+3 скорости на 2 хода",
                    icon: "assassin-agility.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { speed: 3, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { speed: 1, duration: 0.2 } },
                },
                {
                    id: "assassin-Shadow-strike",
                    name: "Теневой удар",
                    type: "attack",
                    rare: "rare",
                    description: "Наносит 2 урона",
                    icon: "assassin-shadow-strike.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { attack: 2 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { attack: 0.5 },
                },
                {
                    id: "assassin-Poison-trap",
                    name: "Ядовитая ловушка",
                    type: "control",
                    rare: "rare",
                    description: "Накладывает яд (2 урона за ход, 3 хода)",
                    icon: "assassin-poison-trap.png",
                    manaCost: 3,
                    count: 1,
                    bonus: { debuff: { poison: { value: 2, duration: 3 } } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { debuff: { poison: { value: 0.5, duration: 0.3 } } },
                },
                {
                    id: "assassin-Quick-strike",
                    name: "Быстрый удар",
                    type: "attack",
                    rare: "common",
                    description: "Наносит 2 урона, +1 использование",
                    icon: "assassin-quick-strike.png",
                    manaCost: 2,
                    count: 2,
                    bonus: { attack: 2 },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 3,
                    upgradeEffect: { attack: 0.5 },
                },
                {
                    id: "assassin-Shadow-accuracy",
                    name: "Теневая меткость",
                    type: "buff",
                    rare: "rare",
                    description: "+3 меткости на 2 хода",
                    icon: "assassin-shadow-accuracy.png",
                    manaCost: 2,
                    count: 1,
                    bonus: { buff: { hitChance: 3, duration: 2 } },
                    level: 1,
                    maxLevel: 10,
                    upgradeCost: 5,
                    upgradeEffect: { buff: { hitChance: 1, duration: 0.2 } },
                },
            ],
        };
        return { char, allCards };
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
        cardBonuses: {
            person: {
                attack: 0,
                critical: 0,
                hp: 0,
                mp: 0,
                hitChance: 0,
                dodge: 0,
                speed: 0,
                defence: 0,
                ignoreDefense: 0, // Добавлено для игнорирования защиты
                debuffImmune: false, // Добавлено для иммунитета к дебаффам
            },
            mob: { // Добавлены бонусы для моба
                attack: 0,
                critical: 0,
                hp: 0,
                mp: 0,
                hitChance: 0,
                dodge: 0,
                speed: 0,
                defence: 0,
                ignoreDefense: 0,
                debuffImmune: false,
            },
        } as { person: CardBonuses; mob: CardBonuses },
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
        isMobFrozen: false, // Добавлено для отслеживания заморозки моба
        isMobStunned: false, // Добавлено для отслеживания оглушения моба
        isPersonStunned: false, // Добавлено для отслеживания оглушения персонажа
    }),
    mounted() {
        this.initCards();
        this.baseStats.person.attack = this.char.character.stats.attack;
        this.baseStats.person.defence = this.char.character.stats.defence;
        this.baseStats.person.critical = 100;
        this.baseStats.person.hp = this.char.character.stats.hp;
        this.baseStats.person.mp = 40;
        this.baseStats.person.hitChance = 70;
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
            return base + (this.cardBonuses[target][stat] || 0);
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
            let baseDmg = this.getStat(target, "attack") + bonus;
            const ignoreDefense = this.cardBonuses[target].ignoreDefense || 0;
            if (ignoreDefense > 0) {
                const enemy = target === "person" ? "mob" : "person";
                const enemyDef = this.physicalDef(enemy);
                baseDmg += Math.floor(enemyDef * (ignoreDefense / 100));
            }
            return baseDmg;
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
            const classCards = this.char.character.species.toLowerCase(); // Получаем класс персонажа
            // @ts-ignore
            const availableCards = this.allCards[classCards] || []; // Берем карты соответствующего класса
            const shuffled = [...availableCards].sort(() => 0.5 - Math.random());
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
                ignoreDefense: 0,
                debuffImmune: false,
            };
            this.cardBonuses.mob = {
                attack: 0,
                critical: 0,
                hp: 0,
                mp: 0,
                hitChance: 0,
                dodge: 0,
                speed: 0,
                defence: 0,
                ignoreDefense: 0,
                debuffImmune: false,
            };
        },

        // Добавление эффекта
        addEffect(target: "person" | "mob", effect: Effect) {
            const isImmune = this.cardBonuses[target].debuffImmune;
            // @ts-ignore
            if (isImmune && [EFFECT_TYPES.BLEED, EFFECT_TYPES.POISON, EFFECT_TYPES.BURN, EFFECT_TYPES.FREEZE, EFFECT_TYPES.STUN].includes(effect.type)) {
                this.addToLog(`${target === "person" ? "Персонаж" : "Моб"} заблокировал эффект ${effect.type} благодаря иммунитету!`);
                this.showActionText(target, "Заблокировано!", "heal");
                return;
            }
            this.activeEffects[target].push({ ...effect });
        },

        // Применение бонусов карт
        applyCardBonuses() {
            this.resetCardBonuses();

            this.activeCombos.forEach(combo => {
                switch (combo) {
                    case this.COMBO_TYPES.CRITICAL:
                        this.cardBonuses.person.critical += 5;
                        this.addToLog("Активирована комбинация: Критический урон +5%!");
                        break;
                    case this.COMBO_TYPES.HIT_CHANCE:
                        this.cardBonuses.person.hitChance += 5;
                        this.addToLog("Активирована комбинация: Шанс попадания +5%!");
                        break;
                    case this.COMBO_TYPES.ATTACK:
                        this.cardBonuses.person.attack += 1;
                        this.addToLog("Активирована комбинация: Атака +1!");
                        break;
                }
            });

            this.choices.forEach((choice) => {
                if (!choice) return;

                // Лечение
                if (choice.bonus.hp) {
                    const healBlock = this.activeEffects.person.some(e => e.type === EFFECT_TYPES.HEAL_BLOCK);
                    if (healBlock) {
                        this.addToLog("Исцеление заблокировано!");
                        this.showActionText("person", "Исцеление заблокировано!", "dmg");
                        return;
                    }
                    const hpValue = typeof choice.bonus.hp === "number" ? choice.bonus.hp : 0;
                    if (choice.duration) {
                        this.addEffect("person", {
                            type: EFFECT_TYPES.REGEN,
                            duration: choice.duration,
                            val: hpValue,
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                    } else {
                        this.baseStats.person.currentHp = Math.min(
                            this.baseStats.person.currentHp + hpValue,
                            this.maxHp("person"),
                        );
                        this.addToLog(`Персонаж восстановил ${hpValue} HP!`);
                        this.showActionText("person", `+${hpValue} HP`, "heal");
                    }
                }

                // Мана
                if (choice.bonus.mp) {
                    const mpValue = typeof choice.bonus.mp === "number" ? choice.bonus.mp : 0;
                    if (choice.duration) {
                        this.addEffect("person", {
                            type: EFFECT_TYPES.BUFF,
                            duration: choice.duration,
                            val: mpValue,
                            stat: "mp",
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                    } else {
                        this.baseStats.person.currentMp = Math.min(
                            this.baseStats.person.currentMp + mpValue,
                            this.maxMp("person"),
                        );
                        this.addToLog(`Персонаж восстановил ${mpValue} MP!`);
                        this.showActionText("person", `+${mpValue} MP`, "mana-restore");
                    }
                }

                // Эффекты с длительностью (баффы и дебаффы)
                if (choice.bonus.buff) {
                    const buff = choice.bonus.buff as { [key: string]: number | boolean };
                    const duration = (buff.duration as number) || 1;
                    for (const [stat, value] of Object.entries(buff)) {
                        if (stat === "duration") continue;
                        if (stat === "debuffImmune" && value) {
                            this.cardBonuses.person.debuffImmune = true;
                            this.addEffect("person", {
                                type: EFFECT_TYPES.IMMUNE,
                                duration: duration,
                                val: 1,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                        } else if (stat === "ignoreDefense") {
                            this.cardBonuses.person.ignoreDefense = value as number;
                            this.addEffect("person", {
                                type: EFFECT_TYPES.BUFF,
                                duration: duration,
                                val: value as number,
                                stat: "ignoreDefense",
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                        } else if (stat === "hitChance" && value === true) {
                            this.cardBonuses.person.hitChance = 100;
                            this.addEffect("person", {
                                type: EFFECT_TYPES.BUFF,
                                duration: duration,
                                val: 100,
                                stat: "hitChance",
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                        } else if (["attack", "defence", "dodge", "speed", "critical", "hitChance"].includes(stat)) {
                            // @ts-ignore
                            this.cardBonuses.person[stat as keyof CardBonuses] += value as number;
                            this.addEffect("person", {
                                type: EFFECT_TYPES.BUFF,
                                duration: duration,
                                val: value as number,
                                stat: stat,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                        }
                    }
                }

                // Дебаффы
                if (choice.bonus.debuff) {
                    const debuff = choice.bonus.debuff as { [key: string]: any };
                    const duration = (debuff.duration as number) || 1;
                    for (const [type, effect] of Object.entries(debuff)) {
                        if (type === "bleed") {
                            const bleed = effect as { value: number; duration: number };
                            this.addEffect("mob", {
                                type: EFFECT_TYPES.BLEED,
                                duration: bleed.duration || duration,
                                val: bleed.value,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                            this.addToLog(`У моба началось кровотечение (${bleed.value} урона за ход)`);
                        } else if (type === "poison") {
                            const poison = effect as { value: number; duration: number };
                            this.addEffect("mob", {
                                type: EFFECT_TYPES.POISON,
                                duration: poison.duration || duration,
                                val: poison.value,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                            this.addToLog(`Моб отравлен (${poison.value} урона за ход)`);
                        } else if (type === "burn") {
                            const burn = effect as { value: number; duration: number };
                            this.addEffect("mob", {
                                type: EFFECT_TYPES.BURN,
                                duration: burn.duration || duration,
                                val: burn.value,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                            this.addToLog(`Моб горит (${burn.value} урона за ход)`);
                        } else if (type === "freeze") {
                            this.addEffect("mob", {
                                type: EFFECT_TYPES.FREEZE,
                                duration: (effect as { duration: number }).duration || duration,
                                val: 0,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                            this.isMobFrozen = true;
                            this.addToLog("Моб заморожен!");
                        } else if (type === "stun") {
                            this.addEffect("mob", {
                                type: EFFECT_TYPES.STUN,
                                duration: duration,
                                val: 0,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                            this.isMobStunned = true;
                            this.addToLog("Моб оглушен!");
                        } else if (type === "healBlock") {
                            this.addEffect("person", {
                                type: EFFECT_TYPES.HEAL_BLOCK,
                                duration: duration,
                                val: 0,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                            this.addToLog("Исцеление персонажа заблокировано!");
                        } else if (type === "speed" || type === "hitChance" || type === "ignoreDefense") {
                            // @ts-ignore
                            this.cardBonuses.mob[type as keyof CardBonuses] += effect as number;
                            this.addEffect("mob", {
                                type: EFFECT_TYPES.BUFF,
                                duration: duration,
                                val: effect as number,
                                stat: type,
                                sourceCard: choice.name,
                                icon: choice.icon,
                            });
                        }
                    }
                }

                // Прямые бонусы
                for (const [stat, value] of Object.entries(choice.bonus)) {
                    if (["hp", "mp", "buff", "debuff"].includes(stat)) continue;
                    if (stat in this.cardBonuses.person) {
                        // @ts-ignore
                        this.cardBonuses.person[stat as keyof CardBonuses] += value as number;
                    }
                }
            });
        },

        // Обработка эффектов
        processEffects() {
            const isPersonImmune = this.cardBonuses.person.debuffImmune;
            const isMobImmune = this.cardBonuses.mob.debuffImmune;

            // Эффекты моба
            this.activeEffects.mob.forEach((effect) => {
                if (effect.type === EFFECT_TYPES.BLEED) {
                    this.baseStats.mob.currentHp = Math.max(
                        0,
                        this.baseStats.mob.currentHp - effect.val,
                    );
                    this.addToLog(`Кровотечение наносит ${effect.val} урона мобу`);
                    this.showActionText("mob", `-${effect.val} (кровотечение)`, "dmg");
                } else if (effect.type === EFFECT_TYPES.POISON && !isMobImmune) {
                    this.baseStats.mob.currentHp = Math.max(
                        0,
                        this.baseStats.mob.currentHp - effect.val,
                    );
                    this.addToLog(`Яд наносит ${effect.val} урона мобу`);
                    this.showActionText("mob", `-${effect.val} (яд)`, "dmg");
                } else if (effect.type === EFFECT_TYPES.BURN && !isMobImmune) {
                    this.baseStats.mob.currentHp = Math.max(
                        0,
                        this.baseStats.mob.currentHp - effect.val,
                    );
                    this.addToLog(`Горение наносит ${effect.val} урона мобу`);
                    this.showActionText("mob", `-${effect.val} (горение)`, "dmg");
                }
            });

            // Эффекты персонажа
            this.activeEffects.person.forEach((effect) => {
                if (effect.type === EFFECT_TYPES.BLEED && !isPersonImmune) {
                    this.baseStats.person.currentHp = Math.max(
                        0,
                        this.baseStats.person.currentHp - effect.val,
                    );
                    this.addToLog(`Кровотечение наносит ${effect.val} урона персонажу`);
                    this.showActionText("person", `-${effect.val} (кровотечение)`, "dmg");
                } else if (effect.type === EFFECT_TYPES.POISON && !isPersonImmune) {
                    this.baseStats.person.currentHp = Math.max(
                        0,
                        this.baseStats.person.currentHp - effect.val,
                    );
                    this.addToLog(`Яд наносит ${effect.val} урона персонажу`);
                    this.showActionText("person", `-${effect.val} (яд)`, "dmg");
                } else if (effect.type === EFFECT_TYPES.BURN && !isPersonImmune) {
                    this.baseStats.person.currentHp = Math.max(
                        0,
                        this.baseStats.person.currentHp - effect.val,
                    );
                    this.addToLog(`Горение наносит ${effect.val} урона персонажу`);
                    this.showActionText("person", `-${effect.val} (горение)`, "dmg");
                } else if (effect.type === EFFECT_TYPES.REGEN) {
                    const healBlock = this.activeEffects.person.some(e => e.type === EFFECT_TYPES.HEAL_BLOCK);
                    if (healBlock) {
                        this.addToLog("Регенерация заблокирована!");
                        this.showActionText("person", "Регенерация заблокирована!", "dmg");
                        return;
                    }
                    this.baseStats.person.currentHp = Math.min(
                        this.baseStats.person.currentHp + effect.val,
                        this.maxHp("person"),
                    );
                    this.addToLog(`Регенерация восстанавливает ${effect.val} HP`);
                    this.showActionText("person", `+${effect.val} HP (реген)`, "heal");
                } else if (effect.type === EFFECT_TYPES.BUFF && effect.stat === "mp") {
                    this.baseStats.person.currentMp = Math.min(
                        this.baseStats.person.currentMp + effect.val,
                        this.maxMp("person"),
                    );
                    this.addToLog(`Восстановление маны: +${effect.val} MP`);
                    this.showActionText("person", `+${effect.val} MP`, "mana-restore");
                }
            });

            // Кровотечение от моба каждые 2 хода
            if (this.turnCount % 2 === 0 && this.baseStats.mob.currentHp > 0) {
                if (!isPersonImmune) {
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
                if (effect.type === EFFECT_TYPES.FREEZE && effect.duration <= 0) {
                    this.isMobFrozen = false;
                }
                if (effect.type === EFFECT_TYPES.STUN && effect.duration <= 0) {
                    this.isMobStunned = false;
                }
                return effect.duration > 0;
            });

            this.activeEffects.person = this.activeEffects.person.filter((effect) => {
                effect.duration -= 1;
                if (effect.type === EFFECT_TYPES.STUN && effect.duration <= 0) {
                    this.isPersonStunned = false;
                }
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

        // Вспомогательная функция для проверки критического удара
        isCriticalHit(target: "person" | "mob"): boolean {
            const criticalChance = this.criticalDmg(target);
            const roll = Math.random() * 100;
            return roll <= criticalChance;
        },

        // Атака персонажа
        async characterAttack() {
            if (this.isPersonStunned) {
                this.addToLog("Персонаж оглушен и пропускает ход!");
                this.showActionText("person", "Оглушен!", "dmg");
                return;
            }

            const hitRoll = Math.random() * 100;
            if (hitRoll > this.hitChance("person") - this.dodge("mob")) {
                this.addToLog("Персонаж промахнулся!");
                this.showActionText("person", "Промах!", "miss");
                return;
            }

            const isCritical = this.isCriticalHit("person");
            let damage = Math.max(1, this.physicalDmg("person") - this.physicalDef("mob"));
            const criticalMultiplier = 2;
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
                if (!choice) return;
                if (choice.bonus.debuff) {
                    const debuff = choice.bonus.debuff as { [key: string]: any };
                    if (debuff.burn) {
                        const burn = debuff.burn as { value: number; duration: number };
                        this.addEffect("mob", {
                            type: EFFECT_TYPES.BURN,
                            duration: burn.duration,
                            val: burn.value,
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                        this.addToLog(`Моб горит (${burn.value} урона за ход)`);
                    }
                    if (debuff.freeze) {
                        this.addEffect("mob", {
                            type: EFFECT_TYPES.FREEZE,
                            duration: (debuff.freeze as { duration: number }).duration,
                            val: 0,
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                        this.isMobFrozen = true;
                        this.addToLog("Моб заморожен!");
                    }
                    if (debuff.stun) {
                        this.addEffect("mob", {
                            type: EFFECT_TYPES.STUN,
                            duration: (debuff.stun as { duration: number }).duration || 1,
                            val: 0,
                            sourceCard: choice.name,
                            icon: choice.icon,
                        });
                        this.isMobStunned = true;
                        this.addToLog("Моб оглушен!");
                    }
                }
                if (choice.bonus.aoe) {
                    this.addToLog("Атака по площади! (AOE эффект пока не реализован для мобов)");
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
            if (this.isMobFrozen || this.isMobStunned) {
                this.addToLog(`Моб ${this.isMobFrozen ? "заморожен" : "оглушен"} и пропускает ход!`);
                this.showActionText("mob", `${this.isMobFrozen ? "Заморожен!" : "Оглушен!"}`, "dmg");
                return;
            }

            const hitRoll = Math.random() * 100;
            if (hitRoll > this.hitChance("mob") - this.dodge("person")) {
                this.addToLog("Моб промахнулся!");
                this.showActionText("mob", "Промах!", "miss");
                return;
            }

            const isImmune = this.cardBonuses.person.debuffImmune;
            if (isImmune) {
                this.addToLog("Моб атакует, но персонаж невосприимчив к урону!");
                this.showActionText("person", "Заблокировано!", "heal");
                return;
            }

            const isCritical = this.isCriticalHit("mob");
            let damage = Math.max(1, this.physicalDmg("mob") - this.physicalDef("person"));
            const criticalMultiplier = 2;
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

            this.decreaseEffectDurations();

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
            this.battleLog.unshift(message);
        },

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
                        <nuxt-img class="buffs__image" :src="`/images/components/cards/${char.character.species}/${effect.icon}`" alt="Эффект" />
                        <span class="buffs__counter">{{ effect.duration }}</span>
                    </div>
                    HP: {{ baseStats.person.currentHp }}/{{ maxHp("person") }}
                    MP: {{ baseStats.person.currentMp }}/{{ maxMp("person") }}
                </div>
                <div class="buffs__mob">
                    <div class="buffs__buff" v-for="(effect, index) in activeEffects.mob" :key="'mob-effect-' + index">
                        <nuxt-img class="buffs__image" :src="`/images/components/cards/${char.character.species}/${effect.icon}`" alt="Эффект" />
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
                                    <nuxt-img :src="`/images/components/cards/${char.character.species}/${choice.icon}`" :alt="choice.name"
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
                        <nuxt-img class="card-game__image" :src="`/images/components/cards/${char.character.species}/${card.icon}`" alt="Карта" />
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