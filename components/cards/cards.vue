<script lang="ts">
import { defineComponent } from "vue";
import { usePersonState } from "~/stores/person";

// Карты для всех классов
const cardsByClass = {
    ranger: [
        {
            id: "ranger-sniper-shot",
            name: "Снайперский выстрел",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон, повышает шанс попадания на 100% на 1 ход.",
            icon: "ranger-sniper-shot.png",
            manaCost: 1,
            count: 1,
            bonus: {
                attack: 1,
                hitChance: { value: 100, duration: 1 }
            },
            level: 1,
            maxLevel: 10,
            upgradeCost: 4,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "ranger-hunters-mark",
            name: "Метка охотника",
            type: "buff",
            rare: "rare",
            description: "С шансом 30% позволяет сделать дополнительный выстрел в течение 1 хода.",
            icon: "ranger-hunters-mark.png",
            manaCost: 2,
            count: 1,
            bonus: {
                doubleShot: { chance: 30, duration: 1 }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { doubleShot: { chance: 5 } }, // +5% шанс за уровень
        },
        {
            id: "ranger-rapid-fire",
            name: "Быстрая стрельба",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 удара по 1 урону. Если все попадают, следующая атака с 100% шансом критического удара.",
            icon: "ranger-rapid-fire.png",
            manaCost: 3,
            count: 1,
            bonus: {
                attack: 1,
                count: 3,
                criticalNext: { chance: 100, condition: "allHits" }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за удар за уровень
        },
        {
            id: "ranger-hunting-trap",
            name: "Охотничья ловушка",
            type: "control",
            rare: "rare",
            description: "Снижает скорость врага на 5 на 2 хода. Две ловушки оглушают на 1 ход.",
            icon: "ranger-hunting-trap.png",
            manaCost: 1,
            count: 1,
            bonus: {
                speed: { value: -5, duration: 2 },
                stun: { duration: 1, condition: "twoTraps" }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 4,
            upgradeEffect: { speed: { value: -1 } }, // -1 скорость за уровень
        },
        {
            id: "ranger-explosive-shot",
            name: "Взрывной выстрел",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, снижает все характеристики врага на 20% на 1 ход.",
            icon: "ranger-explosive-shot.png",
            manaCost: 2,
            count: 1,
            bonus: {
                attack: 2,
                debuff: { value: -20, duration: 1, stats: ["all"] }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "ranger-aimed-shot",
            name: "Меткий выстрел",
            type: "attack",
            rare: "common",
            description: "Наносит 2 урона, с шансом 30% наносит дополнительный 1 урон.",
            icon: "ranger-aimed-shot.png",
            manaCost: 2,
            count: 2,
            bonus: {
                attack: 2,
                extraAttack: { value: 1, chance: 30 }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 3,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "ranger-healing-salve",
            name: "Целебный бальзам",
            type: "heal",
            rare: "common",
            description: "Восстанавливает 3 HP.",
            icon: "ranger-healing-salve.png",
            manaCost: 2,
            count: 1,
            bonus: { heal: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 3,
            upgradeEffect: { heal: 1 }, // +1 HP за уровень
        },
        {
            id: "ranger-camouflage",
            name: "Камуфляж",
            type: "defense",
            rare: "rare",
            description: "Увеличивает уклонение на 30% на 2 хода.",
            icon: "ranger-camouflage.png",
            manaCost: 2,
            count: 1,
            bonus: { dodge: { value: 30, duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { dodge: { value: 5 } }, // +5% уклонение за уровень
        },
        {
            id: "ranger-hunters-sense",
            name: "Чувство охотника",
            type: "buff",
            rare: "epic",
            description: "Повышает шанс критического удара на 70% до первого промаха.",
            icon: "ranger-hunters-sense.png",
            manaCost: 4,
            count: 1,
            bonus: { criticalChance: { value: 70, condition: "untilMiss" } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 7,
            upgradeEffect: { criticalChance: { value: 10 } }, // +10% крит за уровень
        },
    ],
    wrecker: [
        {
            id: "wrecker-smash",
            name: "Сокрушение",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона, игнорирует 50 защиты врага.",
            icon: "wrecker-smash.png",
            manaCost: 3,
            count: 1,
            bonus: { attack: 3, ignoreDefense: 50 },
            level: 1,
            maxLevel: 10,
            upgradeCost: 3,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "wrecker-diamond-shield",
            name: "Алмазный щит",
            type: "defense",
            rare: "rare",
            description: "Добавляет 2 защиты, наносит 1 урон атакующему при блоке на 2 хода.",
            icon: "wrecker-diamond-shield.png",
            manaCost: 2,
            count: 1,
            bonus: { defense: 2, counterAttack: 1, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { defense: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shock-wave",
            name: "Ударная волна",
            type: "control",
            rare: "rare",
            description: "Оглушает врага на 1 ход и снижает характеристики на 20% на 2 хода.",
            icon: "wrecker-shock-wave.png",
            manaCost: 3,
            count: 1,
            bonus: {
                stun: { duration: 1 },
                debuff: { value: -20, duration: 2, stats: ["all"] }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { debuff: { value: -5 } }, // -5% дебафф за уровень
        },
        {
            id: "wrecker-surge-of-strength",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "Восстанавливает 4 HP и 2 маны.",
            icon: "wrecker-surge-of-strength.png",
            manaCost: 2,
            count: 4,
            bonus: { heal: 4, mana: 2 },
            level: 1,
            maxLevel: 10,
            upgradeCost: 3,
            upgradeEffect: { heal: 1, mana: 1 }, // +1 HP и +1 мана за уровень
        },
        {
            id: "wrecker-crystal-infusion",
            name: "Кристальная инфузия",
            type: "buff",
            rare: "rare",
            description: "Увеличивает атаку на 4 и даёт невосприимчивость к дебаффам на 3 хода.",
            icon: "wrecker-crystal-infusion.png",
            manaCost: 5,
            count: 1,
            bonus: { attack: 4, debuffImmunity: { duration: 3 } },
            level: 1,
            maxLevel: 10,
            upgradeCost: 4,
            upgradeEffect: { attack: 1 }, // +1 атака за уровень
        },
        {
            id: "wrecker-farcical-blow",
            name: "Фарсированный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона ±1 урон в зависимости от HP врага (±50% урона при низком/высоком HP).",
            icon: "wrecker-farcical-blow.png",
            manaCost: 2,
            count: 1,
            bonus: { attack: 3, conditionalDamage: { value: 1, condition: "enemyHP" } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "wrecker-crystallization",
            name: "Кристаллизация",
            type: "defense",
            rare: "rare",
            description: "Делает неуязвимым на 2 хода, но блокирует нанесение урона.",
            icon: "wrecker-crystallization.png",
            manaCost: 3,
            count: 1,
            bonus: { invulnerability: { duration: 2 }, noAttack: { duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { invulnerability: { duration: 1 } }, // +1 ход неуязвимости за уровень
        },
        {
            id: "wrecker-jewelers-precision",
            name: "Точность ювелира",
            type: "buff",
            rare: "rare",
            description: "Гарантирует попадание атак на 2 хода.",
            icon: "wrecker-jewelers-precision.png",
            manaCost: 2,
            count: 1,
            bonus: { hitChance: { value: 100, duration: 2 } },
            level: 1,
            maxLevel: 4,
            upgradeCost: 5,
            upgradeEffect: { hitChance: { duration: 1 } }, // +1 ход за уровень
        },
        {
            id: "wrecker-powerful-blow",
            name: "Мощный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона +1 урон за каждую сыгранную карту в этом ходу.",
            icon: "wrecker-powerful-blow.png",
            manaCost: 2,
            count: 1,
            bonus: { attack: 2, bonusPerCard: 1 },
            level: 1,
            maxLevel: 8,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
    ],
    arcanist: [
        {
            id: "arcanist-fireball",
            name: "Огненный шар",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 магического урона.",
            icon: "arcanist-fireball.png",
            manaCost: 2,
            count: 1,
            bonus: { attack: 3 },
            level: 1,
            maxLevel: 20,
            upgradeCost: 2,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-frost-arrow",
            name: "Ледяная стрела",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона и замораживает врага на 1 ход.",
            icon: "arcanist-frost-arrow.png",
            manaCost: 3,
            count: 1,
            bonus: { attack: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-magical-flash",
            name: "Магическая вспышка",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон, +2 урона, если маны больше 50%.",
            icon: "arcanist-magical-flash.png",
            manaCost: 1,
            count: 1,
            bonus: { attack: 1, conditionalAttack: { value: 2, condition: "manaAbove50" }, isMagic: true },
            level: 1,
            maxLevel: 3,
            upgradeCost: 4,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-frost-barrier",
            name: "Ледяной барьер",
            type: "defense",
            rare: "rare",
            description: "Добавляет 4 брони и замораживает атакующих на 1 ход.",
            icon: "arcanist-frost-barrier.png",
            manaCost: 4,
            count: 1,
            bonus: { defence: 4, freeze: { duration: 1, onDefend: true } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { defence: 1 }, // +1 броня за уровень
        },
        {
            id: "arcanist-magic-trick",
            name: "Магическая уловка",
            type: "utility",
            rare: "rare",
            description: "Перенаправляет следующую атаку врага обратно в него.",
            icon: "arcanist-magic-trick.png",
            manaCost: 3,
            count: 1,
            bonus: { redirectAttack: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { redirectAttack: { duration: 1 } }, // +1 ход за уровень
        },
        {
            id: "arcanist-surge-of-power",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "Восстанавливает 4 HP и 4 маны.",
            icon: "arcanist-surge-of-power.png",
            manaCost: 2,
            count: 1,
            bonus: { heal: 4, mana: 4 },
            level: 1,
            maxLevel: 20,
            upgradeCost: 5,
            upgradeEffect: { heal: 1, mana: 1 }, // +1 HP и +1 мана за уровень
        },
        {
            id: "arcanist-rings-of-cold",
            name: "Кольца холода",
            type: "control",
            rare: "rare",
            description: "Обездвиживает врага на 2 хода.",
            icon: "arcanist-rings-of-cold.png",
            manaCost: 3,
            count: 1,
            bonus: { freeze: { duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { freeze: { duration: 1 } }, // +1 ход за уровень
        },
        {
            id: "arcanist-true-trinity",
            name: "Истинное триединство",
            type: "attack",
            rare: "epic",
            description: "Наносит 5 урона, накладывает поджог (3 хода) и заморозку (2 хода).",
            icon: "arcanist-true-trinity.png",
            manaCost: 7,
            count: 1,
            bonus: {
                attack: 5,
                burn: { value: 2, duration: 3 },
                freeze: { duration: 2 },
            },
            level: 1,
            maxLevel: 10,
            upgradeCost: 8,
            upgradeEffect: { attack: 1, burn: { value: 1 } }, // +1 урон и +1 поджог за уровень
        },
        {
            id: "arcanist-hidden-knowledge",
            name: "Скрытые знания",
            type: "buff",
            rare: "rare",
            description: "Увеличивает урон заклинаний на 1 и снижает их стоимость на 1 на 2 хода.",
            icon: "arcanist-hidden-knowledge.png",
            manaCost: 3,
            count: 1,
            bonus: { spellDamage: 1, spellCostReduction: 1, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { spellDamage: 1 }, // +1 урон за уровень
        },
    ],
    monk: [
        {
            id: "monk-meditation",
            name: "Медитация",
            type: "heal",
            rare: "rare",
            description: "Восстанавливает 3 HP.",
            icon: "monk-meditation.png",
            manaCost: 2,
            count: 1,
            bonus: { heal: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 4,
            upgradeEffect: { heal: 1 }, // +1 HP за уровень
        },
        {
            id: "monk-spiritual-strike",
            name: "Духовный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, +20% шанс критического удара.",
            icon: "monk-spiritual-strike.png",
            manaCost: 3,
            count: 1,
            bonus: { attack: 2, criticalChance: 20 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-tiger-strike",
            name: "Удар тигра",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, увеличивает урон следующего Духовного удара на 1.",
            icon: "monk-tiger-strike.png",
            manaCost: 2,
            count: 1,
            bonus: { attack: 2, nextSpiritualStrike: { bonus: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-dragon-strike",
            name: "Удар дракона",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, поджигает врага (2 урона, 2 хода), усиливает следующий Духовный удар на 1.",
            icon: "monk-dragon-strike.png",
            manaCost: 3,
            count: 1,
            bonus: {
                attack: 2,
                burn: { value: 2, duration: 2 },
                nextSpiritualStrike: { bonus: 1 }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-stone-armor",
            name: "Каменный доспех",
            type: "defense",
            rare: "rare",
            description: "Полностью блокирует 1 атаку.",
            icon: "monk-stone-armor.png",
            manaCost: 3,
            count: 1,
            bonus: { block: { attacks: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { block: { attacks: 1 } }, // +1 блок за уровень
        },
        {
            id: "monk-balance",
            name: "Равновесие",
            type: "heal",
            rare: "rare",
            description: "Восстанавливает 1 HP после получения урона в течение 2 ходов.",
            icon: "monk-balance.png",
            manaCost: 3,
            count: 1,
            bonus: { healOnDamage: { value: 1, duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { healOnDamage: { value: 1 } }, // +1 HP за уровень
        },
        {
            id: "monk-path-of-goodness",
            name: "Путь добра",
            type: "heal",
            rare: "epic",
            description: "Восстанавливает 80 HP, но блокирует использование других исцеляющих карт.",
            icon: "monk-path-of-goodness.png",
            manaCost: 4,
            count: 1,
            bonus: { heal: 80, blockHealing: true },
            level: 1,
            maxLevel: 3,
            upgradeCost: 7,
            upgradeEffect: { heal: 10 }, // +10% HP за уровень
        },
        {
            id: "monk-path-of-hate",
            name: "Путь ненависти",
            type: "buff",
            rare: "epic",
            description: "Увеличивает урон на 4 до конца боя, но блокирует исцеляющие карты.",
            icon: "monk-path-of-hate.png",
            manaCost: 4,
            count: 1,
            bonus: { attack: 4, blockHealing: true, duration: "permanent" },
            level: 1,
            maxLevel: 3,
            upgradeCost: 7,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-strike-of-the-rising-sun",
            name: "Удар восходящего солнца",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон, увеличивает урон следующей атаки на 1.",
            icon: "monk-strike-of-the-rising-sun.png",
            manaCost: 1,
            count: 1,
            bonus: { attack: 1, nextAttack: { bonus: 1 } },
            level: 1,
            maxLevel: 20,
            upgradeCost: 4,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
    ],
    inferno: [
        {
            id: "inferno-hell-explosion",
            name: "Адский взрыв",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона и накладывает 3 стака поджога (1 урон/ход).",
            icon: "inferno-hell-explosion.png",
            manaCost: 3,
            count: 1,
            bonus: { attack: 3, burn: { value: 1, stacks: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-flame-shield",
            name: "Огненный щит",
            type: "defense",
            rare: "rare",
            description: "Добавляет 3 защиты на 2 хода, накладывает 1 стак поджога атакующему.",
            icon: "inferno-flame-shield.png",
            manaCost: 2,
            count: 1,
            bonus: { defense: 3, burn: { value: 1, stacks: 1, onDefend: true }, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { defense: 1 }, // +1 защита за уровень
        },
        {
            id: "inferno-wrath-of-Inferno",
            name: "Гнев инферно",
            type: "buff",
            rare: "rare",
            description: "Увеличивает количество стаков поджога на 2 для всех атак на 2 хода.",
            icon: "inferno-wrath-of-Inferno.png",
            manaCost: 3,
            count: 1,
            bonus: { burnStacks: { value: 2, duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { burnStacks: { value: 1 } }, // +1 стак за уровень
        },
        {
            id: "inferno-eternal-flame",
            name: "Вечное пламя",
            type: "attack",
            rare: "epic",
            description: "При 10 стаках поджога превращает игрока в Вечное пламя (2 урона/ход до конца боя).",
            icon: "inferno-eternal-flame.png",
            manaCost: 5,
            count: 1,
            bonus: { transform: { attack: 2, condition: "10burnStacks", duration: "permanent" } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 7,
            upgradeEffect: { transform: { attack: 1 } }, // +1 урон за уровень
        },
        {
            id: "inferno-live-bomb",
            name: "Живая бомба",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон за каждый стак поджога на враге.",
            icon: "inferno-live-bomb.png",
            manaCost: 3,
            count: 1,
            bonus: { attackPerBurnStack: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attackPerBurnStack: 1 }, // +1 урон за стак за уровень
        },
        {
            id: "inferno-holy-flame",
            name: "Святое пламя",
            type: "heal",
            rare: "rare",
            description: "Восстанавливает 1 HP за каждый стак поджога на враге.",
            icon: "inferno-holy-flame.png",
            manaCost: 3,
            count: 1,
            bonus: { healPerBurnStack: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { healPerBurnStack: 1 }, // +1 HP за стак за уровень
        },
        {
            id: "inferno-small-flame",
            name: "Малое пламя",
            type: "attack",
            rare: "common",
            description: "Наносит 1 урон и 1 стак поджога. Два Малых пламени усиливают эффект в 3 раза.",
            icon: "inferno-small-flame.png",
            manaCost: 1,
            count: 1,
            bonus: {
                attack: 1,
                burn: { value: 1, stacks: 1 },
                combo: { multiplier: 3, condition: "twoSmallFlames" }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 3,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-flame-control",
            name: "Контроль пламени",
            type: "control",
            rare: "rare",
            description: "Оглушает врага на 1 ход за каждые 5 стаков поджога.",
            icon: "inferno-flame-control.png",
            manaCost: 2,
            count: 1,
            bonus: { stun: { durationPer5BurnStacks: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { stun: { durationPer5BurnStacks: 1 } }, // +1 ход за уровень
        },
        {
            id: "inferno-blade-of-flame",
            name: "Клинок пламени",
            type: "buff",
            rare: "rare",
            description: "Автоатаки с шансом 50% накладывают 1 стак поджога на 2 хода.",
            icon: "inferno-blade-of-flame.png",
            manaCost: 2,
            count: 1,
            bonus: { autoAttackBurn: { chance: 50, stacks: 1, duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { autoAttackBurn: { chance: 10 } }, // +10% шанс за уровень
        },
    ],
    assassin: [
        {
            id: "assassin-fatal-strike",
            name: "Смертельный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона, добавляет 3 заряда смертоносности для усиления других карт.",
            icon: "assassin-fatal-strike.png",
            manaCost: 4,
            count: 1,
            bonus: { attack: 3, lethality: { stacks: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "assassin-poison-strike",
            name: "Ядовитый удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, накладывает яд (2 урона/ход, 2 хода). Удваивается при наличии смертоносности.",
            icon: "assassin-poison-strike.png",
            manaCost: 3,
            count: 1,
            bonus: {
                attack: 2,
                poison: { value: 2, duration: 2 },
                lethalityBonus: { multiplier: 2 }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-trick",
            name: "Уловка",
            type: "defense",
            rare: "rare",
            description: "Снижает получаемый урон на 50% на 2 хода.",
            icon: "assassin-trick.png",
            manaCost: 3,
            count: 1,
            bonus: { damageReduction: { value: 50, duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { damageReduction: { value: 10 } }, // +10% снижение урона за уровень
        },
        {
            id: "assassin-little-tricks",
            name: "Маленькие хитрости",
            type: "buff",
            rare: "rare",
            description: "Копирует любую карту (кроме ультимейта) на этом ходу.",
            icon: "assassin-little-tricks.png",
            manaCost: 3,
            count: 1,
            bonus: { copyCard: { exclude: "ultimate" } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { copyCard: { duration: 1 } }, // +1 ход действия за уровень
        },
        {
            id: "assassin-blind",
            name: "Ослепление",
            type: "utility",
            rare: "rare",
            description: "Накладывает на врага 30% шанс промаха на 2 хода.",
            icon: "assassin-blind.png",
            manaCost: 2,
            count: 1,
            bonus: { missChance: { value: 30, duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { missChance: { value: 5 } }, // +5% шанс промаха за уровень
        },
        {
            id: "assassin-insidious-strike",
            name: "Коварный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон, добавляет 1 заряд смертоносности.",
            icon: "assassin-insidious-strike.png",
            manaCost: 2,
            count: 1,
            bonus: { attack: 1, lethality: { stacks: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 4,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
        {
            id: "assassin-blow-to-the-heart",
            name: "Удар в сердце",
            type: "control",
            rare: "rare",
            description: "Оглушает на 1 ход, удваивает длительность при наличии смертоносности.",
            icon: "assassin-blow-to-the-heart.png",
            manaCost: 3,
            count: 1,
            bonus: {
                stun: { duration: 1 },
                lethalityBonus: { multiplier: 2, stat: "stunDuration" }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { stun: { duration: 1 } }, // +1 ход за уровень
        },
        {
            id: "assassin-deadly-technique",
            name: "Смертельный приём",
            type: "buff",
            rare: "epic",
            description: "Удваивает эффект смертоносности на 2 хода.",
            icon: "assassin-deadly-technique.png",
            manaCost: 6,
            count: 1,
            bonus: { lethalityMultiplier: { value: 2, duration: 2 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 7,
            upgradeEffect: { lethalityMultiplier: { duration: 1 } }, // +1 ход за уровень
        },
        {
            id: "assassin-serial-killer",
            name: "Серийный убийца",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон, с шансом 40% наносит 2 удара. Удваивается при наличии смертоносности.",
            icon: "assassin-serial-killer.png",
            manaCost: 3,
            count: 1,
            bonus: {
                attack: 1,
                multiStrike: { chance: 40, strikes: 2 },
                lethalityBonus: { multiplier: 2 }
            },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { attack: 1 }, // +1 урон за уровень
        },
    ],
};

interface Card {
    id: string;
    name: string;
    type: "attack" | "defense" | "buff" | "heal" | "control";
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
            return this.person.character.upgradePoints || 10;
        },
        selectedCards(): { [key: string]: { level: number; count: number } } {
            // @ts-ignore
            return this.person.character.cards || {};
        },
    },
    methods: {
        canUpgradeCard(card: Card): boolean {
            const cardData = this.selectedCards[card.id] || { level: 1, count: 1 };
            return (
                this.upgradePoints >= card.upgradeCost &&
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
                    if (["str", "int", "def", "dodge", "acc", "spd"].includes(key)) {
                        card.bonus[key] = (card.bonus[key] || 0) + value;
                    } else if (key === "poison" || key === "bleed" || key === "burn") {
                        card.bonus[key] = {
                            // @ts-ignore
                            value: (card.bonus[key]?.value || 0) + value.value,
                            // @ts-ignore
                            duration: card.bonus[key]?.duration || value.duration,
                        };
                    } else if (key === "criticalChance") {
                        card.bonus[key] = (card.bonus[key] || 0) + value;
                    } else if (key === "hp" || key === "mp") {
                        card.bonus[key] = (card.bonus[key] || 0) + value;
                    }
                }

                // Обновляем описание карты
                card.description = this.generateCardDescription(card);

                // Сохраняем в Supabase
                const { error } = await this.$supabase
                    .from("characters")
                    .update({
                        cards: updatedCards,
                        upgradePoints: this.upgradePoints - card.upgradeCost,
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
                this.person.character.upgradePoints -= card.upgradeCost;
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
            if (card.bonus.str) description += `Наносит ${card.bonus.str} урона`;
            if (card.bonus.int) description += `Наносит ${card.bonus.int} магического урона`;
            if (card.bonus.def) description += `${description ? ", " : ""}+${card.bonus.def} защиты`;
            if (card.bonus.dodge) description += `${description ? ", " : ""}+${card.bonus.dodge} уклонения`;
            if (card.bonus.hp) description += `${description ? ", " : ""}Восстанавливает ${card.bonus.hp} HP`;
            if (card.bonus.mp) description += `${description ? ", " : ""}Восстанавливает ${card.bonus.mp} маны`;
            if (card.bonus.acc) description += `${description ? ", " : ""}+${card.bonus.acc} меткости`;
            if (card.bonus.spd) description += `${description ? ", " : ""}${card.bonus.spd} скорости`;
            if (card.bonus.poison) description += `${description ? ", " : ""}накладывает яд (${card.bonus.poison.value} урона за ход, ${card.bonus.poison.duration} хода)`;
            if (card.bonus.bleed) description += `${description ? ", " : ""}вызывает кровотечение (${card.bonus.bleed.value} урона за ход, ${card.bonus.bleed.duration} хода)`;
            if (card.bonus.burn) description += `${description ? ", " : ""}накладывает горение (${card.bonus.burn.value} урона за ход, ${card.bonus.burn.duration} хода)`;
            if (card.bonus.freeze) description += `${description ? ", " : ""}замораживает на ${card.bonus.freeze.duration} ход`;
            if (card.bonus.stun) description += `${description ? ", " : ""}оглушает на ${card.bonus.stun} ход`;
            if (card.bonus.criticalChance) description += `${description ? ", " : ""}+${card.bonus.criticalChance}% шанс критического удара`;
            if (card.bonus.ignoreDefense) description += `${description ? ", " : ""}игнорирует ${card.bonus.ignoreDefense}% защиты`;
            if (card.bonus.hitChance) description += `${description ? ", " : ""}+100% шанс попадания`;
            if (card.bonus.duration) description += ` на ${card.bonus.duration} хода`;
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
                    <span class="cards__level">Уровень: {{ selectedCards[card.id]?.level || 1 }}/{{ card.maxLevel
                        }}</span>
                </div>
            </div>
            <div class="cards__block" v-if="selectedCard" v-for="card in cards" :key="card.id">
                <div class="cards__descriptions" v-if="selectedCard.id === card.id">
                    <div class="cards__name">{{ card.name }}</div>
                    <div class="cards__description">{{ card.description }}</div>
                    <div class="cards__cost">Стоимость улучшения: {{ card.upgradeCost }}</div>
                    <div class="cards__type">{{ card.type }}</div>
                    <div class="cards__buttons">
                        <button :class="[!upgradePoints ? '' : 'button--disabled', 'cards__event button button--metal']"
                                :disabled="!upgradePoints"
                                type="button"
                                @click="onUpgrade(card)">Улучшить
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