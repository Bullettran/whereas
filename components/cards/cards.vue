<script lang="ts">
import { defineComponent } from "vue";
import { usePersonState } from "~/stores/person";

// Карты для всех классов
const cardsByClass = {
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

interface Card {
    id: string;
    name: string;
    type: "attack" | "defense" | "buff" | "heal" | "control" | "utility";
    rare: "common" | "rare" | "epic";
    description: string;
    icon: string;
    manaCost: number;
    count: number;
    bonus: any;
    level: number;
    maxLevel: number;
    upgradeCost: number;
    upgradeEffect: any;
}

export default defineComponent({
    name: "Cards",
    setup() {
        const person = usePersonState();
        return { person };
    },
    data: () => ({
        selectedCard: null as Card | null,
        errorMessage: "",
        isLoading: false,
        activeCard: null as Card | null,
    }),
    computed: {
        cards(): Card[] {
            // @ts-ignore
            return cardsByClass[this.person.character.species as keyof typeof cardsByClass] || cardsByClass.ranger;
        },
        upgradePoints(): number {
            // @ts-ignore
            return this.person.character.upgradePoints || 0;
        },
        selectedCards(): { [key: string]: { level: number; count: number } } {
            // @ts-ignore
            return this.person.character.cards || {};
        },
    },
    methods: {
        getUpgradeCost(card: Card): number {
            const cardData = this.selectedCards[card.id] || { level: 1, count: 1 };
            const level = cardData.level;
            const baseCost = card.upgradeCost;
            const costIncrement = card.rare === "common" ? 1 : card.rare === "rare" ? 2 : 3;
            return baseCost + (level - 1) * costIncrement;
        },
        canUpgradeCard(card: Card): boolean {
            const cardData = this.selectedCards[card.id] || { level: 1, count: 1 };
            return (
                this.upgradePoints >= this.getUpgradeCost(card) &&
                cardData.level < card.maxLevel
            );
        },
        onSelectCard(card: Card) {
            this.selectedCard = card;
        },
        async onUpgrade(card: Card) {
            this.selectedCard = card;
            this.errorMessage = "";

            if (!this.canUpgradeCard(card)) {
                this.errorMessage = "Недостаточно очков улучшения или максимальный уровень!";
                return;
            }

            this.isLoading = true;
            try {
                const { data: userData, error: authError } = await this.$supabase.auth.getUser();
                if (authError || !userData.user) {
                    this.errorMessage = "Ошибка: пользователь не авторизован";
                    this.isLoading = false;
                    return;
                }

                const userId = userData.user.id;
                const cardData = this.selectedCards[card.id] || { level: 1, count: card.count };
                const updatedCard = {
                    ...cardData,
                    level: cardData.level + 1,
                };

                const updatedCards = {
                    ...this.selectedCards,
                    [card.id]: updatedCard,
                };

                // Применяем эффект улучшения
                for (const [key, value] of Object.entries(card.upgradeEffect)) {
                    if (key === "attack" || key === "hp") {
                        card.bonus[key] = (card.bonus[key] || 0) + value;
                    } else if (key === "buff" || key === "debuff") {
                        const target = card.bonus[key] || {};
                        // @ts-ignore
                        for (const [subKey, subValue] of Object.entries(value)) {
                            if (subKey === "poison" || subKey === "bleed" || subKey === "burn" || subKey === "freeze") {
                                target[subKey] = {
                                    // @ts-ignore
                                    value: (target[subKey]?.value || 0) + subValue.value,
                                    // @ts-ignore
                                    duration: (target[subKey]?.duration || 0) + (subValue.duration || 0),
                                };
                            } else if (subKey === "duration") {
                                target[subKey] = (target[subKey] || 0) + subValue;
                            } else {
                                target[subKey] = (target[subKey] !== undefined ? target[subKey] : (subValue === true ? true : 0)) + (typeof subValue === "number" ? subValue : 0);
                            }
                        }
                        card.bonus[key] = target;
                    }
                }

                // Обновляем описание карты
                card.description = this.generateCardDescription(card);

                // Сохраняем в Supabase
                const { error } = await this.$supabase
                    .from("characters")
                    .update({
                        cards: updatedCards,
                        upgradePoints: this.upgradePoints - this.getUpgradeCost(card),
                    })
                    .eq("id", userId);

                if (error) {
                    this.errorMessage = `Ошибка улучшения карты: ${error.message}`;
                    console.error(error);
                    this.isLoading = false;
                    return;
                }

                // @ts-ignore
                this.person.updateCards(updatedCards);
                // @ts-ignore
                this.person.character.upgradePoints -= this.getUpgradeCost(card);
                this.selectedCard = null;
            } catch (err) {
                this.errorMessage = "Неизвестная ошибка. Попробуйте позже.";
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },
        generateCardDescription(card: Card): string {
            let description = "";
            if (card.bonus.attack) description += `Наносит ${card.bonus.attack} урона`;
            if (card.bonus.hp) description += `${description ? ", " : ""}Восстанавливает ${card.bonus.hp} HP`;
            if (card.bonus.buff) {
                const buff = card.bonus.buff;
                if (buff.defence) description += `${description ? ", " : ""}+${buff.defence} защиты`;
                if (buff.attack) description += `${description ? ", " : ""}+${buff.attack} урона`;
                if (buff.dodge) description += `${description ? ", " : ""}+${buff.dodge} уклонения`;
                if (buff.mp) description += `${description ? ", " : ""}восстанавливает ${buff.mp} маны`;
                if (buff.hitChance) description += `${description ? ", " : ""}${typeof buff.hitChance === "number" ? `+${buff.hitChance} меткости` : "+100% шанс попадания"}`;
                if (buff.speed) description += `${description ? ", " : ""}${buff.speed > 0 ? "+" : ""}${buff.speed} скорости`;
                if (buff.critical) description += `${description ? ", " : ""}+${buff.critical}% шанс критического удара`;
                if (buff.ignoreDefense) description += `${description ? ", " : ""}игнорирует ${buff.ignoreDefense}% защиты`;
                if (buff.debuffImmune) description += `${description ? ", " : ""}невосприимчивость к дебаффам`;
                if (buff.immune) description += `${description ? ", " : ""}блокирует атаку`;
                if (buff.duration) description += ` на ${buff.duration} хода`;
            }
            if (card.bonus.debuff) {
                const debuff = card.bonus.debuff;
                if (debuff.poison) description += `${description ? ", " : ""}накладывает яд (${debuff.poison.value} урона за ход, ${debuff.poison.duration} хода)`;
                if (debuff.bleed) description += `${description ? ", " : ""}вызывает кровотечение (${debuff.bleed.value} урона за ход, ${debuff.bleed.duration} хода)`;
                if (debuff.burn) description += `${description ? ", " : ""}накладывает горение (${debuff.burn.value} урона за ход, ${debuff.burn.duration} хода)`;
                if (debuff.freeze) description += `${description ? ", " : ""}замораживает на ${debuff.freeze.duration} ход`;
                if (debuff.stun) description += `${description ? ", " : ""}оглушает на ${debuff.duration || 1} ход`;
                if (debuff.hitChance) description += `${description ? ", " : ""}шанс промаха ${-debuff.hitChance}%`;
                if (debuff.ignoreDefense) description += `${description ? ", " : ""}снижает защиту на ${debuff.ignoreDefense}%`;
                if (debuff.healBlock) description += `${description ? ", " : ""}блокирует исцеление`;
                if (debuff.speed) description += `${description ? ", " : ""}${debuff.speed} скорости`;
                if (debuff.duration && !debuff.stun && !debuff.healBlock && !debuff.poison && !debuff.bleed && !debuff.burn && !debuff.freeze) description += ` на ${debuff.duration} хода`;
            }
            if (card.bonus.aoe) description += `${description ? ", " : ""}всем врагам`;
            return description || card.description;
        },
    },
});
</script>

<template>
    <div class="cards">
        <div class="cards__container">
            <h2 class="cards__title">Карты</h2>
            <div v-if="errorMessage" class="cards__error">{{ errorMessage }}</div>
            <div v-if="isLoading" class="cards__loading">Загрузка...</div>
            <div class="cards__points">Очки улучшения: {{ upgradePoints }}</div>
            <div class="cards__grid">
                <div
                    v-for="card in cards"
                    :key="card.id"
                    class="cards__card"
                    :class="{
                        'cards__card--disabled': !canUpgradeCard(card),
                        'cards__card--attack': card.type === 'attack',
                        'cards__card--defense': card.type === 'defense',
                        'cards__card--buff': card.type === 'buff',
                        'cards__card--heal': card.type === 'heal',
                        'cards__card--control': card.type === 'control',
                        'cards__card--active': selectedCard?.id === card.id,
                    }"
                    @click="onSelectCard(card)"
                >
                    <nuxt-img
                        class="cards__image"
                        :src="`/images/components/cards/${person.character.species}/${card.icon}`"
                        :alt="card.name"
                    />
                    <span class="cards__level">Уровень: {{ selectedCards[card.id]?.level || 1 }}/{{ card.maxLevel }}</span>
                </div>
            </div>
            <div class="cards__block" v-if="selectedCard">
                <div class="cards__descriptions" v-for="card in cards" :key="card.id" v-if="
                  // @ts-ignore
                selectedCard.id === card.id">
                    <div class="cards__name">{{ card.name }}</div>
                    <div class="cards__description">{{ card.description }}</div>
                    <div class="cards__cost">Стоимость улучшения: {{ getUpgradeCost(card) }}</div>
                    <div class="cards__type">{{ card.type }}</div>
                    <div class="cards__buttons">
                        <button
                            :class="[!canUpgradeCard(card) ? 'button--disabled' : '', 'cards__event button button--metal']"
                            :disabled="!canUpgradeCard(card)"
                            type="button"
                            @click="onUpgrade(card)"
                        >
                            Улучшить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "cards";
</style>