<script lang="ts">
import { defineComponent } from "vue";

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

export default {
    name: "Index",
    // setup() {
    //     let char = usePersonState();
    //     return {
    //         char
    //     }
    // },
    // data() {
    //     return {
    //         playerHand: [],
    //         battleLog: [],
    //         isAnimating: false,
    //         turnCount: 1,
    //         baseStats: {
    //             person: {
    //                 attack: 2,
    //                 critical: 2,
    //                 hp: 10,
    //                 mp: 10,
    //                 hitChance: 50,
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
    //                 defence: 5,
    //                 currentHp: 15,
    //                 currentMp: 1,
    //             },
    //         },
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
    //             },
    //         },
    //         playerStatuses: [],
    //         mobStatuses: [],
    //         messages: {
    //             person: { type: "", message: "" },
    //             mob: { type: "", message: "" },
    //             turnKey: 0,
    //         },
    //         showDice: false,
    //         playedCardsThisTurn: [],
    //         gameFlags: {
    //             nextCritical: false,
    //             allHits: false,
    //             lethalityStacks: 0,
    //             burnStacks: 0,
    //             doubleShotChance: 0,
    //             spiritualStrikeBonus: 0,
    //             nextAttackBonus: 0,
    //             invulnerable: false,
    //             noAttack: false,
    //             redirectAttack: false,
    //             blockAttacks: 0,
    //             healOnDamage: 0,
    //             transformActive: false,
    //             transformAttack: 0,
    //             spellDamageBonus: 0,
    //             spellCostReduction: 0,
    //             debuffImmunity: false,
    //             missChance: 0,
    //             damageReduction: 0,
    //             blockHealing: false,
    //             autoAttackBurnChance: 0,
    //             autoAttackBurnStacks: 0,
    //         },
    //     };
    // },
    // computed: {
    //     allCards() {
    //         return cardsByClass["arcanist"] || [];
    //     },
    //     personStats() {
    //         let stats = { ...this.baseStats.person };
    //         this.playerStatuses.forEach(status => {
    //             if (status.type === "statModifier") {
    //                 stats[status.stat] += status.value;
    //             }
    //         });
    //         return {
    //             ...stats,
    //             physicalDmg: this.physicalDmg("person"),
    //             physicalDef: this.physicalDef("person"),
    //         };
    //     },
    //     mobStats() {
    //         let stats = { ...this.baseStats.mob };
    //         this.mobStatuses.forEach(status => {
    //             if (status.type === "statModifier") {
    //                 stats[status.stat] += status.value;
    //             }
    //         });
    //         return {
    //             ...stats,
    //             physicalDmg: this.physicalDmg("mob"),
    //             physicalDef: this.physicalDef("mob"),
    //         };
    //     },
    //     isAttackDisabled() {
    //         return this.isAnimating;
    //     },
    // },
    // mounted() {
    //     this.initGame();
    // },
    // methods: {
    //     initGame() {
    //         this.initCards();
    //         this.baseStats.person.attack = this.char.character.stats.attack;
    //         this.baseStats.person.defence = this.char.character.stats.defence;
    //         this.baseStats.person.critical = this.char.character.stats.critical;
    //         this.baseStats.person.hp = this.char.character.stats.hp;
    //         this.baseStats.person.mp = this.char.character.stats.mp;
    //         this.baseStats.person.hitChance = this.char.character.stats.hitChance;
    //         this.baseStats.person.dodge = this.char.character.stats.dodge;
    //         this.baseStats.person.speed = this.char.character.stats.speed;
    //         this.baseStats.person.currentHp = this.maxHp("person");
    //         this.baseStats.person.currentMp = this.maxMp("person");
    //     },
    //     initCards() {
    //         this.playerHand = this.getRandomCards(5);
    //         this.playedCardsThisTurn = [];
    //         this.baseStats.person.currentMp = this.maxMp("person");
    //     },
    //     getRandomCards(count) {
    //         const shuffled = [...this.allCards].sort(() => 0.5 - Math.random());
    //         return shuffled.slice(0, count);
    //     },
    //     getStat(target, stat) {
    //         let base = this.baseStats[target][stat];
    //         const statuses = target === "person" ? this.playerStatuses : this.mobStatuses;
    //         statuses.forEach(status => {
    //             if (status.type === "statModifier" && status.stat === stat) {
    //                 base += status.value;
    //             }
    //         });
    //         return base;
    //     },
    //     maxHp(target, bonus = 0) {
    //         return this.getStat(target, "hp") + bonus;
    //     },
    //     maxMp(target, bonus = 0) {
    //         return this.getStat(target, "mp") + bonus;
    //     },
    //     physicalDmg(target, bonus = 0) {
    //         return this.getStat(target, "attack") + bonus;
    //     },
    //     physicalDef(target, bonus = 0) {
    //         return this.getStat(target, "defence") + bonus;
    //     },
    //     speed(target, bonus = 0) {
    //         return this.getStat(target, "speed") + bonus;
    //     },
    //     dodge(target, bonus = 0) {
    //         return this.getStat(target, "dodge") + bonus;
    //     },
    //     criticalDmg(target, bonus = 0) {
    //         return this.getStat(target, "critical") + bonus;
    //     },
    //     hitChance(target, bonus = 0) {
    //         return this.getStat(target, "hitChance") + bonus;
    //     },
    //     playCard(cardIndex) {
    //         const card = this.playerHand[cardIndex];
    //         let manaCost = card.manaCost;
    //         if (card.type === "attack" && this.gameFlags.spellCostReduction > 0) {
    //             manaCost = Math.max(0, manaCost - this.gameFlags.spellCostReduction);
    //         }
    //         if (this.baseStats.person.currentMp >= manaCost) {
    //             if (card.type === "attack" && this.gameFlags.noAttack) {
    //                 this.addToLog("Нельзя атаковать из-за эффекта!");
    //                 return;
    //             }
    //             if (card.type === "heal" && this.gameFlags.blockHealing) {
    //                 this.addToLog("Исцеление заблокировано!");
    //                 return;
    //             }
    //             this.baseStats.person.currentMp -= manaCost;
    //             this.applyCardEffects(card);
    //             this.playerHand.splice(cardIndex, 1);
    //             if (this.gameFlags.doubleShotChance > 0 && Math.random() * 100 < this.gameFlags.doubleShotChance) {
    //                 this.addToLog("Сработал дополнительный выстрел!");
    //                 this.applyCardEffects(card);
    //             }
    //         } else {
    //             this.addToLog("Недостаточно маны!");
    //         }
    //     },
    //     applyCardEffects(card) {
    //         this.playedCardsThisTurn.push(card.id);
    //         let multiplier = 1;
    //         if ("combo" in card.bonus) {
    //             const combo = card.bonus.combo;
    //             if (this.checkCondition(combo.condition)) {
    //                 multiplier = combo.multiplier;
    //             }
    //         }
    //         if ("lethalityBonus" in card.bonus && this.gameFlags.lethalityStacks > 0) {
    //             multiplier *= card.bonus.lethalityBonus.multiplier;
    //         }
    //         let totalDamage = 0;
    //         let attackCount = 1;
    //         let ignoreDefense = 0;
    //         for (const [key, value] of Object.entries(card.bonus)) {
    //             if (key === "attack") {
    //                 totalDamage += (value * multiplier) + (card.id === "monk-spiritual-strike" ? this.gameFlags.spiritualStrikeBonus : 0);
    //             } else if (key === "count") {
    //                 attackCount = value;
    //             } else if (key === "ignoreDefense") {
    //                 ignoreDefense = value;
    //             } else if (key === "heal") {
    //                 this.healPlayer(value * multiplier);
    //             } else if (["attack", "critical", "hp", "mp", "hitChance", "dodge", "speed", "defence"].includes(key)) {
    //                 const statModifier = value;
    //                 const modifiedValue = statModifier.value * multiplier;
    //                 const target = modifiedValue > 0 ? "self" : "enemy";
    //                 this.applyStatModifier(key, modifiedValue, statModifier.duration || 1, target, card.id);
    //             } else if (key === "burn") {
    //                 const burn = value;
    //                 this.applyStatus("enemy", {
    //                     type: "burn",
    //                     value: burn.value * multiplier,
    //                     duration: burn.duration || 3,
    //                     stacks: burn.stacks || 1,
    //                 });
    //             } else if (key === "freeze") {
    //                 const freeze = value;
    //                 this.applyStatus("enemy", { type: "freeze", duration: freeze.duration || 1 });
    //             } else if (key === "stun") {
    //                 const stun = value;
    //                 if (!stun.condition || this.checkCondition(stun.condition)) {
    //                     this.applyStatus("enemy", {
    //                         type: "stun",
    //                         duration: stun.duration * (card.bonus.lethalityBonus && this.gameFlags.lethalityStacks > 0 ? card.bonus.lethalityBonus.multiplier : 1),
    //                     });
    //                 }
    //             } else if (key === "lethality") {
    //                 this.gameFlags.lethalityStacks += value.stacks;
    //             } else if (key === "poison") {
    //                 const poison = value;
    //                 this.applyStatus("enemy", {
    //                     type: "poison",
    //                     value: poison.value * multiplier,
    //                     duration: poison.duration || 2,
    //                 });
    //             } else if (key === "mana") {
    //                 this.baseStats.person.currentMp = Math.min(this.baseStats.person.currentMp + (value * multiplier), this.maxMp("person"));
    //                 this.addToLog(`Восстановлено ${value * multiplier} маны`);
    //             } else if (key === "doubleShot") {
    //                 this.gameFlags.doubleShotChance = value.chance;
    //             } else if (key === "criticalChance") {
    //                 this.applyStatModifier("critical", value.value * multiplier, value.condition === "untilMiss" ? Infinity : 1, "self", card.id);
    //             } else if (key === "nextSpiritualStrike") {
    //                 this.gameFlags.spiritualStrikeBonus += value.bonus;
    //             } else if (key === "nextAttack") {
    //                 this.gameFlags.nextAttackBonus += value.bonus;
    //             } else if (key === "counterAttack") {
    //                 this.applyStatus("self", {
    //                     type: "counterAttack",
    //                     value: value * multiplier,
    //                     duration: card.bonus.duration || 1,
    //                 });
    //             } else if (key === "debuff") {
    //                 const debuff = value;
    //                 debuff.stats.forEach(stat => {
    //                     if (stat === "all") {
    //                         ["attack", "critical", "hitChance", "dodge", "speed", "defence"].forEach(s => {
    //                             this.applyStatModifier(s, debuff.value * multiplier, debuff.duration, "enemy", card.id);
    //                         });
    //                     } else {
    //                         this.applyStatModifier(stat, debuff.value * multiplier, debuff.duration, "enemy", card.id);
    //                     }
    //                 });
    //             } else if (key === "invulnerability") {
    //                 this.gameFlags.invulnerable = true;
    //                 this.applyStatus("self", { type: "invulnerable", duration: value.duration });
    //             } else if (key === "noAttack") {
    //                 this.gameFlags.noAttack = true;
    //                 this.applyStatus("self", { type: "noAttack", duration: value.duration });
    //             } else if (key === "redirectAttack") {
    //                 this.gameFlags.redirectAttack = true;
    //                 this.applyStatus("self", { type: "redirectAttack", duration: value.duration });
    //             } else if (key === "block") {
    //                 this.gameFlags.blockAttacks = value.attacks;
    //                 this.applyStatus("self", { type: "block", value: value.attacks, duration: 1 });
    //             } else if (key === "healOnDamage") {
    //                 this.gameFlags.healOnDamage = value.value * multiplier;
    //                 this.applyStatus("self", {
    //                     type: "healOnDamage",
    //                     value: value.value * multiplier,
    //                     duration: value.duration,
    //                 });
    //             } else if (key === "transform") {
    //                 const transform = value;
    //                 if (this.checkCondition(transform.condition)) {
    //                     this.gameFlags.transformActive = true;
    //                     this.gameFlags.transformAttack = transform.attack * multiplier;
    //                     this.applyStatus("self", {
    //                         type: "transform",
    //                         value: transform.attack * multiplier,
    //                         duration: transform.duration === "permanent" ? Infinity : transform.duration,
    //                     });
    //                 }
    //             } else if (key === "multiStrike") {
    //                 const multiStrike = value;
    //                 if (Math.random() * 100 < multiStrike.chance * multiplier) {
    //                     for (let i = 0; i < multiStrike.strikes; i++) {
    //                         this.doAttack(card.bonus.attack || 1, ignoreDefense);
    //                     }
    //                 }
    //             } else if (key === "spellDamage") {
    //                 this.gameFlags.spellDamageBonus = value * multiplier;
    //                 this.applyStatus("self", {
    //                     type: "spellDamage",
    //                     value: value * multiplier,
    //                     duration: card.bonus.duration || 1,
    //                 });
    //             } else if (key === "spellCostReduction") {
    //                 this.gameFlags.spellCostReduction = value * multiplier;
    //                 this.applyStatus("self", {
    //                     type: "spellCostReduction",
    //                     value: value * multiplier,
    //                     duration: card.bonus.duration || 1,
    //                 });
    //             } else if (key === "debuffImmunity") {
    //                 this.gameFlags.debuffImmunity = true;
    //                 this.applyStatus("self", { type: "debuffImmunity", duration: value.duration });
    //             } else if (key === "missChance") {
    //                 this.applyStatus("enemy", {
    //                     type: "missChance",
    //                     value: value.value * multiplier,
    //                     duration: value.duration,
    //                 });
    //             } else if (key === "damageReduction") {
    //                 this.gameFlags.damageReduction = value.value * multiplier;
    //                 this.applyStatus("self", {
    //                     type: "damageReduction",
    //                     value: value.value * multiplier,
    //                     duration: value.duration,
    //                 });
    //             } else if (key === "blockHealing") {
    //                 this.gameFlags.blockHealing = true;
    //                 this.applyStatus("self", { type: "blockHealing", duration: value === true ? Infinity : 1 });
    //             } else if (key === "autoAttackBurn") {
    //                 this.gameFlags.autoAttackBurnChance = value.chance * multiplier;
    //                 this.gameFlags.autoAttackBurnStacks = value.stacks || 1;
    //                 this.applyStatus("self", {
    //                     type: "autoAttackBurn",
    //                     value: value.chance * multiplier,
    //                     duration: value.duration,
    //                 });
    //             } else if (key === "conditionalDamage") {
    //                 const condDamage = value;
    //                 if (this.checkCondition(condDamage.condition)) {
    //                     totalDamage += condDamage.value * multiplier;
    //                 }
    //             } else if (key === "conditionalAttack") {
    //                 const condAttack = value;
    //                 if (this.checkCondition(condAttack.condition)) {
    //                     totalDamage += condAttack.value * multiplier;
    //                 }
    //             } else if (key === "extraAttack") {
    //                 const extraAttack = value;
    //                 if (Math.random() * 100 < extraAttack.chance * multiplier) {
    //                     totalDamage += extraAttack.value * multiplier;
    //                 }
    //             } else if (key === "burnStacks") {
    //                 this.applyStatus("self", {
    //                     type: "burnStacks",
    //                     value: value.value * multiplier,
    //                     duration: value.duration,
    //                 });
    //             } else if (key === "copyCard") {
    //                 const copy = value;
    //                 const eligibleCards = this.playerHand.filter(c => !copy.exclude || c.rare !== copy.exclude);
    //                 if (eligibleCards.length > 0) {
    //                     const randomCard = eligibleCards[Math.floor(Math.random() * eligibleCards.length)];
    //                     this.applyCardEffects(randomCard);
    //                     this.addToLog(`Скопирована карта: ${randomCard.name}`);
    //                 }
    //             }
    //         }
    //         if (attackCount > 1) {
    //             let allHit = true;
    //             for (let i = 0; i < attackCount; i++) {
    //                 const perAttackDamage = (card.bonus.attack || 1) * multiplier + (this.gameFlags.nextAttackBonus || 0);
    //                 const hit = this.doAttack(perAttackDamage, ignoreDefense);
    //                 if (!hit) {
    //                     allHit = false;
    //                 }
    //                 this.gameFlags.nextAttackBonus = 0;
    //             }
    //             if (allHit && "criticalNext" in card.bonus) {
    //                 this.gameFlags.nextCritical = true;
    //             }
    //         } else if (totalDamage > 0) {
    //             totalDamage += this.gameFlags.nextAttackBonus || 0;
    //             if (card.type === "attack" && this.gameFlags.spellDamageBonus > 0) {
    //                 totalDamage += this.gameFlags.spellDamageBonus;
    //             }
    //             this.doAttack(totalDamage, ignoreDefense);
    //             this.gameFlags.nextAttackBonus = 0;
    //             if (this.gameFlags.autoAttackBurnChance > 0 && Math.random() * 100 < this.gameFlags.autoAttackBurnChance) {
    //                 this.applyStatus("enemy", {
    //                     type: "burn",
    //                     value: 1,
    //                     duration: 2,
    //                     stacks: this.gameFlags.autoAttackBurnStacks,
    //                 });
    //             }
    //         }
    //         if ("attackPerBurnStack" in card.bonus) {
    //             const burnStacks = this.mobStatuses.filter(s => s.type === "burn").reduce((sum, s) => sum + (s.stacks || 1), 0);
    //             const totalDamage = card.bonus.attackPerBurnStack * burnStacks * multiplier;
    //             this.doAttack(totalDamage, ignoreDefense);
    //         }
    //         if ("healPerBurnStack" in card.bonus) {
    //             const burnStacks = this.mobStatuses.filter(s => s.type === "burn").reduce((sum, s) => sum + (s.stacks || 1), 0);
    //             const totalHeal = card.bonus.healPerBurnStack * burnStacks * multiplier;
    //             this.healPlayer(totalHeal);
    //         }
    //         if ("stun" in card.bonus && card.id === "inferno-flame-control") {
    //             const burnStacks = this.mobStatuses.filter(s => s.type === "burn").reduce((sum, s) => sum + (s.stacks || 1), 0);
    //             const stunDuration = Math.floor(burnStacks / 5);
    //             if (stunDuration > 0) {
    //                 this.applyStatus("enemy", { type: "stun", duration: stunDuration });
    //             }
    //         }
    //     },
    //     doAttack(damage, ignoreDefense = 0) {
    //         const hitRoll = Math.random() * 100;
    //         let hitChance = this.getStat("person", "hitChance");
    //         const dodge = this.getStat("mob", "dodge");
    //         const missChance = this.mobStatuses.find(s => s.type === "missChance")?.value || 0;
    //         if (hitRoll > hitChance - dodge || Math.random() * 100 < missChance) {
    //             this.addToLog("Промах!");
    //             this.playerStatuses = this.playerStatuses.filter(s => s.type !== "statModifier" || s.duration !== Infinity);
    //             return false;
    //         }
    //         let effectiveDefense = this.getStat("mob", "defence");
    //         effectiveDefense = Math.max(0, effectiveDefense - ignoreDefense);
    //         let actualDamage = Math.max(1, damage - effectiveDefense);
    //         if (this.gameFlags.nextCritical || Math.random() * 100 < this.getStat("person", "critical")) {
    //             actualDamage *= 2;
    //             this.gameFlags.nextCritical = false;
    //             this.addToLog("Критический удар!");
    //         }
    //         this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - actualDamage);
    //         this.addToLog(`Нанесено ${actualDamage} урона врагу`);
    //         return true;
    //     },
    //     healPlayer(amount) {
    //         this.baseStats.person.currentHp = Math.min(this.baseStats.person.currentHp + amount, this.maxHp("person"));
    //         this.addToLog(`Восстановлено ${amount} HP`);
    //     },
    //     applyStatModifier(stat, value, duration, target, source) {
    //         if (target === "enemy" && this.gameFlags.debuffImmunity) return;
    //         const status = { type: "statModifier", stat, value, duration, source };
    //         if (target === "self") {
    //             this.playerStatuses.push(status);
    //         } else {
    //             this.mobStatuses.push(status);
    //         }
    //     },
    //     applyStatus(target, status) {
    //         if (target === "enemy" && this.gameFlags.debuffImmunity) return;
    //         if (target === "self") {
    //             this.playerStatuses.push(status);
    //         } else {
    //             this.mobStatuses.push(status);
    //         }
    //     },
    //     checkCondition(condition) {
    //         if (condition === "twoTraps") {
    //             return this.mobStatuses.filter(s => s.source === "ranger-hunting-trap").length >= 2;
    //         } else if (condition === "allHits") {
    //             return this.gameFlags.allHits;
    //         } else if (condition === "twoSmallFlames") {
    //             return this.playedCardsThisTurn.filter(id => id === "inferno-small-flame").length >= 2;
    //         } else if (condition === "10burnStacks") {
    //             return this.mobStatuses.filter(s => s.type === "burn").reduce((sum, s) => sum + (s.stacks || 1), 0) >= 10;
    //         } else if (condition === "enemyHP") {
    //             const hpPercent = (this.baseStats.mob.currentHp / this.maxHp("mob")) * 100;
    //             return hpPercent < 50 ? -1 : 1;
    //         } else if (condition === "manaAbove50") {
    //             return (this.baseStats.person.currentMp / this.maxMp("person")) * 100 > 50;
    //         }
    //         return false;
    //     },
    //     endTurn() {
    //         this.isAnimating = true;
    //         this.processEffects();
    //         if (!this.mobStatuses.some(s => s.type === "stun" || s.type === "freeze")) {
    //             this.mobAttack();
    //         }
    //         if (this.gameFlags.transformActive) {
    //             this.doAttack(this.gameFlags.transformAttack, 0);
    //         }
    //         this.decreaseEffectDurations();
    //         this.showDice = true;
    //         setTimeout(() => {
    //             this.showDice = false;
    //             this.initCards();
    //             this.resetMessages();
    //             this.isAnimating = false;
    //         }, 1500);
    //     },
    //     processEffects() {
    //         this.playerStatuses.forEach(status => {
    //             if (status.type === "burn" || status.type === "poison") {
    //                 this.baseStats.person.currentHp = Math.max(0, this.baseStats.person.currentHp - status.value);
    //                 this.addToLog(`${status.type === "burn" ? "Поджог" : "Яд"} наносит ${status.value} урона персонажу`);
    //             }
    //         });
    //         this.mobStatuses.forEach(status => {
    //             if (status.type === "burn" || status.type === "poison") {
    //                 this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - status.value);
    //                 this.addToLog(`${status.type === "burn" ? "Поджог" : "Яд"} наносит ${status.value} урона мобу`);
    //             }
    //         });
    //     },
    //     decreaseEffectDurations() {
    //         this.playerStatuses = this.playerStatuses.filter(status => {
    //             status.duration -= 1;
    //             if (status.duration <= 0) {
    //                 if (status.type === "invulnerable") this.gameFlags.invulnerable = false;
    //                 if (status.type === "noAttack") this.gameFlags.noAttack = false;
    //                 if (status.type === "redirectAttack") this.gameFlags.redirectAttack = false;
    //                 if (status.type === "block") this.gameFlags.blockAttacks = 0;
    //                 if (status.type === "healOnDamage") this.gameFlags.healOnDamage = 0;
    //                 if (status.type === "transform") {
    //                     this.gameFlags.transformActive = false;
    //                     this.gameFlags.transformAttack = 0;
    //                 }
    //                 if (status.type === "spellDamage") this.gameFlags.spellDamageBonus = 0;
    //                 if (status.type === "spellCostReduction") this.gameFlags.spellCostReduction = 0;
    //                 if (status.type === "debuffImmunity") this.gameFlags.debuffImmunity = false;
    //                 if (status.type === "missChance") this.gameFlags.missChance = 0;
    //                 if (status.type === "damageReduction") this.gameFlags.damageReduction = 0;
    //                 if (status.type === "blockHealing") this.gameFlags.blockHealing = false;
    //                 if (status.type === "autoAttackBurn") {
    //                     this.gameFlags.autoAttackBurnChance = 0;
    //                     this.gameFlags.autoAttackBurnStacks = 0;
    //                 }
    //                 return false;
    //             }
    //             return true;
    //         });
    //         this.mobStatuses = this.mobStatuses.filter(status => {
    //             status.duration -= 1;
    //             return status.duration > 0;
    //         });
    //     },
    //     mobAttack() {
    //         const hitRoll = Math.random() * 100;
    //         const hitChance = this.getStat("mob", "hitChance");
    //         const dodge = this.getStat("person", "dodge");
    //         const missChance = this.playerStatuses.find(s => s.type === "missChance")?.value || 0;
    //
    //         if (hitRoll > hitChance - dodge || Math.random() * 100 < missChance) {
    //             this.addToLog("Моб промахнулся!");
    //             this.showActionText("mob", "Промах!", "miss");
    //             return;
    //         }
    //
    //         let damage = Math.max(1, this.physicalDmg("mob") - this.physicalDef("person"));
    //         const isCritical = Math.random() * 100 < this.getStat("mob", "critical");
    //         const criticalMultiplier = 2;
    //
    //         if (isCritical) {
    //             damage *= criticalMultiplier;
    //         }
    //
    //         if (this.gameFlags.blockAttacks > 0) {
    //             this.gameFlags.blockAttacks -= 1;
    //             this.addToLog("Атака моба заблокирована!");
    //             this.showActionText("person", "Заблокировано!", "block");
    //             return;
    //         }
    //
    //         if (this.gameFlags.redirectAttack) {
    //             this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - damage);
    //             this.addToLog(`Урон перенаправлен! Моб получает ${damage} урона!`);
    //             this.showActionText("mob", `-${damage}`, isCritical ? "dmg-critical" : "dmg");
    //             if (this.baseStats.mob.currentHp <= 0) {
    //                 this.addToLog("Моб побежден!");
    //                 this.showActionText("mob", "Побежден!", "death");
    //             }
    //             return;
    //         }
    //
    //         if (this.gameFlags.invulnerable) {
    //             this.addToLog("Персонаж неуязвим и не получает урон!");
    //             this.showActionText("person", "Неуязвим!", "invulnerable");
    //             return;
    //         }
    //
    //         if (this.gameFlags.damageReduction > 0) {
    //             damage = Math.max(1, damage - this.gameFlags.damageReduction);
    //             this.addToLog(`Урон уменьшен на ${this.gameFlags.damageReduction}!`);
    //         }
    //
    //         this.baseStats.person.currentHp = Math.max(0, this.baseStats.person.currentHp - damage);
    //
    //         if (isCritical) {
    //             this.addToLog(`Критический удар! Моб наносит ${damage} урона!`);
    //             this.showActionText("person", `-${damage} (КРИТ!)`, "dmg-critical");
    //         } else {
    //             this.addToLog(`Моб атакует и наносит ${damage} урона!`);
    //             this.showActionText("person", `-${damage}`, "dmg");
    //         }
    //
    //         if (this.gameFlags.healOnDamage > 0) {
    //             const healAmount = this.gameFlags.healOnDamage;
    //             this.healPlayer(healAmount);
    //             this.addToLog(`Персонаж восстанавливает ${healAmount} HP при получении урона!`);
    //         }
    //
    //         const counterAttack = this.playerStatuses.find(s => s.type === "counterAttack");
    //         if (counterAttack) {
    //             const counterDamage = counterAttack.value;
    //             this.baseStats.mob.currentHp = Math.max(0, this.baseStats.mob.currentHp - counterDamage);
    //             this.addToLog(`Контратака! Нанесено ${counterDamage} урона мобу!`);
    //             this.showActionText("mob", `-${counterDamage}`, "dmg");
    //         }
    //
    //         if (this.baseStats.person.currentHp <= 0) {
    //             this.addToLog("Персонаж побежден!");
    //             this.showActionText("person", "Побежден!", "death");
    //         }
    //
    //         if (this.baseStats.mob.currentHp <= 0) {
    //             this.addToLog("Моб побежден!");
    //             this.showActionText("mob", "Побежден!", "death");
    //         }
    //     },
    //     showActionText(target, message, type = "") {
    //         this.messages[target] = { message, type };
    //     },
    //     resetMessages() {
    //         this.messages.person = { type: "", message: "" };
    //         this.messages.mob = { type: "", message: "" };
    //         this.messages.turnKey++;
    //     },
    //     addToLog(message) {
    //         this.battleLog.unshift(message);
    //     },
    // },
};
</script>

<template>
<!--    <div class="game-container flex flex-col h-screen bg-gray-900 text-white">-->
<!--        &lt;!&ndash; Верхняя панель: характеристики игрока и моба &ndash;&gt;-->
<!--        <div class="stats-panel flex justify-between p-4 bg-gray-800 border-b border-gray-700">-->
<!--            &lt;!&ndash; Характеристики игрока &ndash;&gt;-->
<!--            <div class="player-stats w-1/2">-->
<!--                <h2 class="text-lg font-bold mb-2">Игрок</h2>-->
<!--                <div class="grid grid-cols-2 gap-2 text-sm">-->
<!--                    <div>Здоровье: {{ personStats.currentHp }} / {{ maxHp("person") }}</div>-->
<!--                    <div>Мана: {{ personStats.currentMp }} / {{ maxMp("person") }}</div>-->
<!--                    <div>Атака: {{ personStats.attack }}</div>-->
<!--                    <div>Защита: {{ personStats.defence }}</div>-->
<!--                    <div>Критический удар: {{ personStats.critical }}%</div>-->
<!--                    <div>Шанс попадания: {{ personStats.hitChance }}%</div>-->
<!--                    <div>Уклонение: {{ personStats.dodge }}%</div>-->
<!--                    <div>Скорость: {{ personStats.speed }}</div>-->
<!--                </div>-->
<!--                <div v-if="messages.person.message" :key="messages.turnKey"-->
<!--                     :class="['action-text absolute mt-2', {-->
<!--                        'text-red-500': messages.person.type.includes('dmg'),-->
<!--                        'text-yellow-500': messages.person.type === 'dmg-critical',-->
<!--                        'text-green-500': messages.person.type === 'heal' || messages.person.type === 'invulnerable',-->
<!--                        'text-blue-500': messages.person.type === 'block',-->
<!--                        'text-gray-500': messages.person.type === 'miss',-->
<!--                        'text-purple-500': messages.person.type === 'death'-->
<!--                    }]"-->
<!--                     v-html="messages.person.message"></div>-->
<!--            </div>-->
<!--            &lt;!&ndash; Характеристики моба &ndash;&gt;-->
<!--            <div class="mob-stats w-1/2 text-right">-->
<!--                <h2 class="text-lg font-bold mb-2">Моб</h2>-->
<!--                <div class="grid grid-cols-2 gap-2 text-sm">-->
<!--                    <div>Здоровье: {{ mobStats.currentHp }} / {{ maxHp("mob") }}</div>-->
<!--                    <div>Мана: {{ mobStats.currentMp }} / {{ maxMp("mob") }}</div>-->
<!--                    <div>Атака: {{ mobStats.attack }}</div>-->
<!--                    <div>Защита: {{ mobStats.defence }}</div>-->
<!--                    <div>Критический удар: {{ mobStats.critical }}%</div>-->
<!--                    <div>Шанс попадания: {{ mobStats.hitChance }}%</div>-->
<!--                    <div>Уклонение: {{ mobStats.dodge }}%</div>-->
<!--                    <div>Скорость: {{ mobStats.speed }}</div>-->
<!--                </div>-->
<!--                <div v-if="messages.mob.message" :key="messages.turnKey"-->
<!--                     :class="['action-text absolute mt-2 right-4', {-->
<!--                        'text-red-500': messages.mob.type.includes('dmg'),-->
<!--                        'text-yellow-500': messages.mob.type === 'dmg-critical',-->
<!--                        'text-green-500': messages.mob.type === 'heal',-->
<!--                        'text-gray-500': messages.mob.type === 'miss',-->
<!--                        'text-purple-500': messages.mob.type === 'death'-->
<!--                    }]"-->
<!--                     v-html="messages.mob.message"></div>-->
<!--            </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Основная игровая зона &ndash;&gt;-->
<!--        <div class="game-area flex flex-1 overflow-hidden">-->
<!--            &lt;!&ndash; Лог боя &ndash;&gt;-->
<!--            <div class="battle-log w-1/4 p-4 bg-gray-700 overflow-y-auto flex flex-col-reverse">-->
<!--                <div v-for="(log, index) in battleLog" :key="index" class="text-sm mb-1">-->
<!--                    {{ log }}-->
<!--                </div>-->
<!--            </div>-->
<!--            &lt;!&ndash; Зона карт &ndash;&gt;-->
<!--            <div class="card-area w-3/4 p-4 flex flex-col justify-between">-->
<!--                &lt;!&ndash; Рука игрока &ndash;&gt;-->
<!--                <div class="player-hand flex flex-wrap gap-4">-->
<!--                    <div v-for="(card, index) in playerHand" :key="card.id"-->
<!--                         class="card bg-gray-800 p-4 rounded-lg w-48 shadow-lg hover:shadow-xl transition-shadow"-->
<!--                         :class="{ 'opacity-50': baseStats.person.currentMp < card.manaCost || isAttackDisabled }">-->
<!--                        <img :src="card.icon" alt="Card Icon" class="w-16 h-16 mb-2 mx-auto">-->
<!--                        <h3 class="text-md font-semibold">{{ card.name }}</h3>-->
<!--                        <p class="text-xs text-gray-400">{{ card.description }}</p>-->
<!--                        <p class="text-sm mt-2">Мана: {{ card.manaCost }}</p>-->
<!--                        <button-->
<!--                            @click="playCard(index)"-->
<!--                            class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"-->
<!--                            :disabled="baseStats.person.currentMp < card.manaCost || isAttackDisabled"-->
<!--                        >-->
<!--                            Разыграть-->
<!--                        </button>-->
<!--                    </div>-->
<!--                </div>-->
<!--                &lt;!&ndash; Кнопка завершения хода &ndash;&gt;-->
<!--                <div class="end-turn mt-4 flex justify-end">-->
<!--                    <button-->
<!--                        @click="endTurn"-->
<!--                        class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"-->
<!--                        :disabled="isAttackDisabled"-->
<!--                    >-->
<!--                        Завершить ход-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Компонент кубика (анимация) &ndash;&gt;-->
<!--        <div v-if="showDice" class="dice-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">-->
<!--            <Dice />-->
<!--        </div>-->
<!--    </div>-->
</template>

<style scoped>

</style>