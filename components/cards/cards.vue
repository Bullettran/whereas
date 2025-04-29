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
            icon: "ranger-Sniper-shot.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 3, hitChance: true },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "ranger-Hunter's-mark",
            name: "Метка охотника",
            type: "buff",
            rare: "rare",
            description: "Увеличивает мекость на 2 хода",
            icon: "ranger-Hunter's-mark.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, bleed: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { bleed: { value: 1 } }, // +1 кровотечение за уровень
        },
        {
            id: "ranger-Rapid-fire",
            name: "Быстрая стрельба",
            type: "attack",
            rare: "rare",
            description: "Наносит 5 урона",
            icon: "ranger-Rapid-fire.png",
            manaCost: 3,
            count: 1,
            bonus: { poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "ranger-Hunting-trap",
            name: "Охотничья ловушка",
            type: "control",
            rare: "rare",
            description: "Замедляет врага (-5 скорости на 2 хода)",
            icon: "ranger-Hunting-trap.png",
            manaCost: 1,
            count: 1,
            bonus: { spd: -5, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { spd: -1 }, // -1 скорость за уровень
        },
        {
            id: "ranger-Explosive-shot",
            name: "Взрывной выстрел",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона уменьшает атаку на 20% на 1 ход",
            icon: "ranger-Explosive-shot.png",
            manaCost: 2,
            count: 1,
            bonus: { dodge: 5, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { dodge: 1 }, // +1 уклонение за уровень
        },
        {
            id: "ranger-Aimed-shot",
            name: "Меткий выстрел",
            type: "attack",
            rare: "common",
            description: "Наносит 2 урона также увеличивает меткость на 10 на 2 хода",
            icon: "ranger-Aimed-shot.png",
            manaCost: 2,
            count: 2,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 3,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "ranger-Healing-salve",
            name: "Целебный бальзам",
            type: "heal",
            rare: "common",
            description: "Восстанавливает 3 HP.",
            icon: "ranger-Healing-salve.png",
            manaCost: 2,
            count: 1,
            bonus: { hp: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 3,
            upgradeEffect: { hp: 1 }, // +1 HP за уровень
        },
        {
            id: "ranger-Camouflage",
            name: "Камуфляж",
            type: "defense",
            rare: "rare",
            description: "30% уклонения на 2 хода",
            icon: "ranger-Camouflage.png",
            manaCost: 2,
            count: 1,
            bonus: { dodge: 3, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { dodge: 1 }, // +1 уклонение за уровень
        },
        {
            id: "ranger-Hunter's-sense",
            name: "Чувство охотника",
            type: "buff",
            rare: "epic",
            description: "Повышает шанс крита на 100% на 1 ход",
            icon: "ranger-Hunter's-sense.png",
            manaCost: 4,
            count: 1,
            bonus: { str: 5, criticalChance: 10 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 7,
            upgradeEffect: { str: 1, criticalChance: 2 }, // +1 урон, +2% крит за уровень
        },
    ],
    wrecker: [
        {
            id: "wrecker-Smash",
            name: "Сокрушение",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона, накладывает дебафф -20% защиты на 2 хода",
            icon: "wrecker-Smash.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 3, ignoreDefense: 50 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "wrecker-Diamond-shield",
            name: "Алмазный шит",
            type: "defense",
            rare: "rare",
            description: "+2 защиты",
            icon: "wrecker-Diamond-shield.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-Shock-wave",
            name: "Ударная волна",
            type: "control",
            rare: "rare",
            description: "Оглушает врага на 1 ход и накладывает дебафф -20% защиты на 2 хода",
            icon: "wrecker-Shock-wave.png",
            manaCost: 3,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-Surge-of-strength",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "+ 4 hp",
            icon: "wrecker-Surge-of-strength.png",
            manaCost: 2,
            count: 4,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-Crystal-infusion",
            name: "Кристалическая инфузия",
            type: "atack",
            rare: "rare",
            description: "баф атаки на 4 и невосприемчивость к дебафам на 3 хода",
            icon: "wrecker-Crystal-infusion.png",
            manaCost: 5,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-Farcical-blow",
            name: "Фарсированый удар",
            type: "atack",
            rare: "rare",
            description: "+ 3 к урону",
            icon: "wrecker-Farcical-blow.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-Crystallization",
            name: "Кристализация",
            type: "defense",
            rare: "rare",
            description: "Увеличивает защиту до придела на 1 ход",
            icon: "wrecker-Crystallization.png",
            manaCost: 3,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-Jeweler's-precision",
            name: "Точность ювелира",
            type: "buff",
            rare: "rare",
            description: "2 хода не промахиваеться",
            icon: "wrecker-Jeweler's-precision.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-Powerful-blow",
            name: "Мощный удар",
            type: "atack",
            rare: "rare",
            description: "+2 к урона +1  на 1 ход",
            icon: "wrecker-Powerful-blow.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        // Остальные 8 карт:
        // 1. "Ярость" (buff, +3 силы на 2 хода, upgrade: +1 сила)
        // 2. "Оглушающий удар" (control, оглушает на 1 ход, upgrade: +1 длительность)
        // 3. "Кровавый удар" (attack, +2 урона, кровотечение 2, upgrade: +1 кровотечение)
        // 4. "Несокрушимость" (defense, +5 защиты на 2 хода, upgrade: +1 защита)
        // 5. "Мощный удар" (attack, +3 урона, upgrade: +1 урон)
        // 6. "Живучесть" (heal, +3 HP, upgrade: +1 HP)
        // 7. "Боевой клич" (buff, +2 силы всем атакам на 1 ход, upgrade: +1 сила)
        // 8. "Тяжёлая броня" (defense, +3 защиты на 2 хода, upgrade: +1 защита)
    ],
    arcanist: [
        {
            id: "arcanist-Fireball",
            name: "Огненный шар",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 магического урона",
            icon: "arcanist-Fireball.png",
            manaCost: 5,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-Frost-arrow",
            name: "Ледяная стрела",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона",
            icon: "arcanist-Frost-arrow.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-Magical-flash",
            name: "Магическая вспышка",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урона",
            icon: "arcanist-Magical-flash.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-Frost-barrier",
            name: "Ледяной барьер",
            type: "defense",
            rare: "rare",
            description: "Получает 4 брони и замораживает цели на 1 ход при защите",
            icon: "arcanist-Frost-barrier.png",
            manaCost: 4,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-Magic-trick",
            name: "Магическая уловка",
            type: "utility",
            rare: "rare",
            description: "Увеличивает ману на 5 на 3 хода",
            icon: "arcanist-Magic-trick.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-Surge-of-power",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "востанавливает 4 хп и 4 маны",
            icon: "arcanist-Surge-of-power.png",
            manaCost: 2,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-Rings-of-cold",
            name: "Кольца холода",
            type: "control",
            rare: "rare",
            description: "Обездвиживает на 2 хода",
            icon: "arcanist-Rings-of-cold.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-True-trinity",
            name: "Истиное тринити",
            type: "attack",
            rare: "rare",
            description: "накладывает поджигание на 3 хода заморозку на 1 и магический удар на 5 урона",
            icon: "arcanist-True-trinity.png",
            manaCost: 7,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-Hidden-knowledge",
            name: "Скрытые знания",
            type: "buff",
            rare: "rare",
            description: "увеличивает урон на 5 на хода",
            icon: "arcanist-Hidden-knowledge.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        // Остальные 8 карт:
        // 1. "Магический щит" (defense, +3 защиты на 2 хода, upgrade: +1 защита)
        // 2. "Молния" (attack, +3 урона, upgrade: +1 урон)
        // 3. "Магический взрыв" (attack, +2 урона всем врагам, upgrade: +1 урон)
        // 4. "Восстановление маны" (buff, +5 маны, upgrade: +1 мана)
        // 5. "Ледяной барьер" (defense, +2 защиты, upgrade: +1 защита)
        // 6. "Огненная стрела" (attack, +2 урона, upgrade: +1 урон)
        // 7. "Магическая аура" (buff, +2 интеллекта на 2 хода, upgrade: +1 интеллект)
        // 8. "Заморозка" (control, замораживает на 1 ход, upgrade: +1 длительность)
    ],
    monk: [
        {
            id: "monk-Meditation",
            name: "Медитация",
            type: "heal",
            rare: "rare",
            description: "Усиливает зашиту и атаку на 3 хода",
            icon: "monk-Meditation.png",
            manaCost: 2,
            count: 1,
            bonus: { hp: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { hp: 1 }, // +1 HP за уровень
        },
        {
            id: "monk-spiritual-strike",
            name: "Духовный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона крит +20%",
            icon: "monk-spiritual-strike.png",
            manaCost: 5,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-Tiger-strike",
            name: "Удар тигра",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона также увеливает атаку на 2 на 2 хода",
            icon: "monk-Tiger-strike.png",
            manaCost: 2,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-Dragon-strike",
            name: "Удар дракона",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона и пподжигает врага на 2 хода",
            icon: "monk-Dragon-strike.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-Stone-armor",
            name: "Каменный доспех",
            type: "defense",
            rare: "rare",
            description: "Зашищает от атаки на 1 ход",
            icon: "monk-Stone-armor.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-Balance",
            name: "Равновесие",
            type: "heal",
            rare: "rare",
            description: "Исцеляет на 1 втечение 4 ходов",
            icon: "monk-Balance.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-Path-of-goodness",
            name: "Путь добра",
            type: "heal",
            rare: "rare",
            description: "Исцеляет 100% хп но больше нельзя использывать лечение в течении 7 ходов",
            icon: "monk-Path-of-goodness.png",
            manaCost: 4,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-Path-of-hate",
            name: "Путь ненависти",
            type: "buff",
            rare: "rare",
            description: "Усиливает урон на 4 на 7 ходов но при этом нельзя лечиться",
            icon: "spiritual-strike.png",
            manaCost: 2,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-Strike-of-the-rising-sun",
            name: "Удар восходящего солнца",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон увеличевает ману на 2 на 2 хода",
            icon: "monk-Strike-of-the-rising-sun.png",
            manaCost: 1,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        // Остальные 8 карт:
        // 1. "Медитация" (buff, +3 маны, upgrade: +1 мана)
        // 2. "Очищение" (heal, снимает 1 дебафф, upgrade: +1 снятие дебаффа)
        // 3. "Светлый щит" (defense, +3 защиты на 2 хода, upgrade: +1 защита)
        // 4. "Равновесие" (heal, +2 HP и маны, upgrade: +1 HP/мана)
        // 5. "Духовный барьер" (defense, +2 защиты, upgrade: +1 защита)
        // 6. "Удар чи" (attack, +2 урона, +1 HP, upgrade: +1 урон)
        // 7. "Внутренний покой" (buff, +2 выносливости на 2 хода, upgrade: +1 выносливость)
        // 8. "Светлый удар" (attack, +3 урона, upgrade: +1 урон)
    ],
    inferno: [
        {
            id: "inferno-Hell-explosion",
            name: "Адский взрыв",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона",
            icon: "inferno-Hell-explosion.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-Flame-shield",
            name: "Огненный щит",
            type: "defense",
            rare: "rare",
            description: "+3 защиты на 2 хода также наклыдывет",
            icon: "inferno-Flame-shield.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 3, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "inferno-Wrath-of-Inferno",
            name: "Гнев инферно",
            type: "buff",
            rare: "rare",
            description: "увеличевает атаку на 3 на 6 ходов",
            icon: "inferno-Wrath-of-Inferno.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-Eternal-flame",
            name: "Вечное пламя",
            type: "attack",
            rare: "rare",
            description: "Вешает подгорание на 5 ходов по 2 урона",
            icon: "inferno-Eternal-flame.png",
            manaCost: 5,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-Live-bomb",
            name: "Живая бомба",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона увеличевает урон на 2 на 1 ход",
            icon: "inferno-Live-bomb.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-Holy-flame",
            name: "Святое пламя",
            type: "heal",
            rare: "rare",
            description: "Исцеляет на 5",
            icon: "inferno-Holy-flames.png",
            manaCost: 5,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-Small-flame",
            name: "Малое пламя",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон также наклыдывет поджигания 2 хода по 2 урона",
            icon: "inferno-Small-flame.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-Flame-control",
            name: "Контроль пламени",
            type: "control",
            rare: "rare",
            description: "Оглушает на 1 ход",
            icon: "inferno-Flame-control.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-Blade-of-flame",
            name: "Клинок пламени",
            type: "buff",
            rare: "rare",
            description: "Увеличевает урон на 2 на 2 хода",
            icon: "inferno-Blade-of-flame.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        // Остальные 8 карт:
        // 1. "Пламя" (attack, +2 урона, горение 2, upgrade: +1 горение)
        // 2. "Огненный вихрь" (attack, +2 урона всем врагам, upgrade: +1 урон)
        // 3. "Жар" (attack, +3 урона, upgrade: +1 урон)
        // 4. "Вспышка" (buff, +2 маны, upgrade: +1 мана)
        // 5. "Огненная броня" (defense, +2 защиты, upgrade: +1 защита)
        // 6. "Пылающий удар" (attack, +2 урона, горение 1, upgrade: +1 урон)
        // 7. "Огненная аура" (buff, +2 интеллекта на 2 хода, upgrade: +1 интеллект)
        // 8. "Адское пламя" (attack, +4 урона, upgrade: +1 урон)
    ],
    assassin: [
        {
            id: "assassin-Fatal-strike",
            name: "Смертельный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урона, увеличивает шанс крита на 10% на 3 хода",
            icon: "assassin-Fatal-strike.png",
            manaCost: 5,
            count: 1,
            bonus: { str: 3, criticalChance: 10 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1, criticalChance: 2 }, // +1 урон, +2% крит за уровень
        },
        {
            id: "assassin-Poison-strike",
            name: "Ядовитый удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, накладывает яд (2 урона за ход, 2 хода)",
            icon: "assassin-Poison-strike.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-First-aid",
            name: "Первая помошь",
            type: "defense",
            rare: "rare",
            description: "хилит на 4 в течение 2 ходов",
            icon: "assassin-First-aid.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-Little-tricks",
            name: "Маленькие хитрости",
            type: "buff",
            rare: "rare",
            description: "увеличивает атаку на 3 на 2 хода",
            icon: "assassin-Little-tricks.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-Blind",
            name: "Ослепление",
            type: "utillity",
            rare: "rare",
            description: "Дебафф на врага 30% промахов на 2 хода",
            icon: "assassin-Blind.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-Insidious-strikee",
            name: "Коварный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон, бафф урона на 1 ход + 1",
            icon: "assassin-Insidious-strikee.png",
            manaCost: 2,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-Blow-to-the-heart",
            name: "Удар в сердце",
            type: "controll",
            rare: "rare",
            description: "Оглушает на 1 ход",
            icon: "assassin-Blow-to-the-heart.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-Deadly-technique",
            name: "Смертельный прием",
            type: "attack",
            rare: "rare",
            description: "наносит 5 урона",
            icon: "poison-strike.png",
            manaCost: 7,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-Sprint",
            name: "Спринт",
            type: "attack",
            rare: "rare",
            description: "Увеличевает скорость на 5",
            icon: "assassin-Sprint.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        // Остальные 8 карт:
        // 1. "Теневая завеса" (defense, +3 уклонения на 2 хода, upgrade: +1 уклонение)
        // 2. "Критический удар" (attack, +3 урона, upgrade: +1 урон)
        // 3. "Скрытность" (defense, +5 уклонения на 2 хода, upgrade: +1 уклонение)
        // 4. "Ловкость" (buff, +3 скорости на 2 хода, upgrade: +1 скорость)
        // 5. "Теневой удар" (attack, +2 урона, upgrade: +1 урон)
        // 6. "Ядовитая ловушка" (control, яд 2, upgrade: +1 яд)
        // 7. "Быстрый удар" (attack, +2 урона, +1 использование, upgrade: +1 урон)
        // 8. "Теневая меткость" (buff, +3 меткости на 2 хода, upgrade: +1 меткость)
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
            return this.person.character.upgradePoints || 0;
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