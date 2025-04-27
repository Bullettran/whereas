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
            description: "Наносит, +100% шанс попадания на 1 ход",
            icon: "ranger-sniper-shot.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 3, hitChance: true },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "ranger-hunters-mark",
            name: "Метка охотника",
            type: "buff",
            rare: "rare",
            description: "С вероятностью 30% делает еще 1 выстрел",
            icon: "ranger-hunters-mark.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, bleed: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { bleed: { value: 1 } }, // +1 кровотечение за уровень
        },
        {
            id: "ranger-rapid-fire",
            name: "Быстрая стрельба",
            type: "attack",
            rare: "rare",
            description: "Стреляет 3 раза если все 3 выстрела достигают цели следующая атака с 100% нанесет крит. удар",
            icon: "ranger-rapid-fire.png",
            manaCost: 3,
            count: 1,
            bonus: { poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "ranger-hunting-trap",
            name: "Охотничья ловушка",
            type: "control",
            rare: "rare",
            description: "Замедляет врага (-5 скорости на 2 хода) если испольывать 2 ловушки тогда оглушает на 1 ход",
            icon: "ranger-hunting-trap.png",
            manaCost: 1,
            count: 1,
            bonus: { spd: -5, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { spd: -1 }, // -1 скорость за уровень
        },
        {
            id: "ranger-explosive-shot",
            name: "Взрывной выстрел",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона уменьшает характеристики на 20% на 1 ход",
            icon: "ranger-explosive-shot.png",
            manaCost: 2,
            count: 1,
            bonus: { dodge: 5, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { dodge: 1 }, // +1 уклонение за уровень
        },
        {
            id: "ranger-aimed-shot",
            name: "Меткий выстрел",
            type: "attack",
            rare: "common",
            description: "Наносит 2 урона с вероятностью 30% наносит еще 1 урон",
            icon: "ranger-aimed-shot.png",
            manaCost: 2,
            count: 2,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 3,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
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
            bonus: { hp: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 3,
            upgradeEffect: { hp: 1 }, // +1 HP за уровень
        },
        {
            id: "ranger-camouflage",
            name: "Камуфляж",
            type: "defense",
            rare: "rare",
            description: "30% уклонения на 2 хода",
            icon: "ranger-camouflage.png",
            manaCost: 2,
            count: 1,
            bonus: { dodge: 3, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { dodge: 1 }, // +1 уклонение за уровень
        },
        {
            id: "ranger-hunters-sense",
            name: "Чувство охотника",
            type: "buff",
            rare: "epic",
            description: "Повышает шанс крита на 100% до первого промаха",
            icon: "ranger-hunters-sense.png",
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
            id: "wrecker-smash",
            name: "Сокрушение",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона, игнорирует 50% защиты.",
            icon: "wrecker-smash.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 3, ignoreDefense: 50 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "wrecker-diamond-shield",
            name: "Алмазный шит",
            type: "defense",
            rare: "rare",
            description: "+2 защиты, наносит 1 урон при зашите.",
            icon: "wrecker-diamond-shield.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shock-wave",
            name: "Ударная волна",
            type: "control",
            rare: "rare",
            description: "Оглушает врага на 1 ход и накладывает дебафф -20% характеристик на 2 хода",
            icon: "wrecker-shock-wave.png",
            manaCost: 3,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-surge-of-strength",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "+ 4 hp и 2 mana",
            icon: "wrecker-surge-of-strength.png",
            manaCost: 2,
            count: 4,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-crystal-infusion",
            name: "Кристалическая инфузия",
            type: "attack",
            rare: "rare",
            description: "баф атаки на 4 и невосприемчивость к дебафам на 3 хода",
            icon: "wrecker-crystal-infusion.png",
            manaCost: 5,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-farcical-blow",
            name: "Фарсированый удар",
            type: "atack",
            rare: "rare",
            description: "+ 3 к урону +-1 урон в зависимости от количества хп врага +-50%",
            icon: "wrecker-farcical-blow.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-crystallization",
            name: "Кристализация",
            type: "defense",
            rare: "rare",
            description: "на 2 хода не уязвим но также не может наносить урон",
            icon: "wrecker-crystallization.png",
            manaCost: 3,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-jewelers-precision",
            name: "Точность ювелира",
            type: "buff",
            rare: "rare",
            description: "2 хода не промахиваеться",
            icon: "wrecker-jewelers-precision.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-powerful-blow",
            name: "Мощный удар",
            type: "atack",
            rare: "rare",
            description: "+2 к урона +1 к урона за каждую карточку",
            icon: "wrecker-powerful-blow.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
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
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-frost-arrow",
            name: "Ледяная стрела",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, замораживает на 1 ход.",
            icon: "arcanist-frost-arrow.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-magical-flash",
            name: "Магическая вспышка",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урона также имеет +2 урона если при использывании мыгы остается больше 50%",
            icon: "arcanist-magical-flash.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-frost-barrier",
            name: "Ледяной барьер",
            type: "defense",
            rare: "rare",
            description: "Получает 4 брони и замораживает цели на 1 ход при защите",
            icon: "arcanist-frost-barrier.png",
            manaCost: 4,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-magic-trick",
            name: "Магическая уловка",
            type: "utility",
            rare: "rare",
            description: "Перенапрвляет атаку во врага",
            icon: "arcanist-magic-trick.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-surge-of-power",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "востанавливает 4 хп и 4 маны",
            icon: "arcanist-surge-of-power.png",
            manaCost: 2,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-rings-of-cold",
            name: "Кольца холода",
            type: "control",
            rare: "rare",
            description: "Обездвиживает на 2 хода",
            icon: "arcanist-rings-of-cold.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-true-trinity",
            name: "Истиное тринити",
            type: "attack",
            rare: "rare",
            description: "накладывает поджигание на 3 хода заморозку на 2 и магический удар на 5 урона",
            icon: "arcanist-true-trinity.png",
            manaCost: 7,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-hidden-knowledge",
            name: "Скрытые знания",
            type: "buff",
            rare: "rare",
            description: "увеличивает урон и уменьшений стоимости заклинаний на 1 на 2 хода",
            icon: "arcanist-hidden-knowledge.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
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
            id: "monk-tiger-strike",
            name: "Удар тигра",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона также усиливет следующий Духовный удар на 1",
            icon: "monk-tiger-strike.png",
            manaCost: 2,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-dragon-strike",
            name: "Удар дракона",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона и пподжигает врага на 2 хода также усиливет следующий Духовный удар на 1",
            icon: "monk-dragon-strike.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-stone-armor",
            name: "Каменный доспех",
            type: "defense",
            rare: "rare",
            description: "Зашищает от 1 атаки",
            icon: "monk-stone-armor.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "monk-balance",
            name: "Равновесие",
            type: "heal",
            rare: "rare",
            description: "Исцеляет на 1 после получения урона  втечение 2 ходов",
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
            id: "monk-path-of-goodness",
            name: "Путь добра",
            type: "heal",
            rare: "rare",
            description: "Исцеляет 100% хп но больше нельзя использывать лечение",
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
            id: "monk-path-of-hate",
            name: "Путь ненависти",
            type: "buff",
            rare: "rare",
            description: "Усиливает урон на 4 до конца игры но больше нельзя использывать лечение",
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
            id: "monk-strike-of-the-rising-sun",
            name: "Удар восходящего солнца",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон а также усиливает следующее атакующие заклинание на 1",
            icon: "monk-strike-of-the-rising-sun.png",
            manaCost: 1,
            count: 1,
            bonus: { str: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
    ],
    inferno: [
        {
            id: "inferno-hell-explosion",
            name: "Адски взрыв",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона и накладывает 3 стака подгорания",
            icon: "inferno-hell-explosion.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-flame-shield",
            name: "Огненный щит",
            type: "defense",
            rare: "rare",
            description: "+3 защиты на 2 хода также наклыдывет 1 стак подгорания",
            icon: "inferno-flame-shield.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 3, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "inferno-wrath-of-Inferno",
            name: "Гнев инферно",
            type: "buff",
            rare: "rare",
            description: "Увеличивает количество стаков подгорания на 2",
            icon: "inferno-wrath-of-Inferno.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-eternal-flame",
            name: "Вечное пламя",
            type: "attack",
            rare: "rare",
            description: "Можно использывать при 10 стаках подгорания что бы превратится в Вечное пламя(наносит 2 урона кажый ход до конца игры)",
            icon: "inferno-eternal-flame.png",
            manaCost: 5,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-live-bomb",
            name: "Живая бомба",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон за каждый стак подгорания",
            icon: "inferno-live-bomb.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-holy-flame",
            name: "Святое пламя",
            type: "heal",
            rare: "rare",
            description: "Исцеляет на 1хп за каждый стак подгорания",
            icon: "inferno-holy-flame.png",
            manaCost: 5,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-small-flame",
            name: "Малое пламя",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон также наклыдывет 1 стак подгорания, при использывании  одновременно 2(Малое пламя) эффект усиливется в 3",
            icon: "inferno-small-flame.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-flame-control",
            name: "Контроль пламени",
            type: "control",
            rare: "rare",
            description: "Оглушает на 1 ход за каждые 5 стаков подгорания",
            icon: "inferno-flame-control.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "inferno-blade-of-flame",
            name: "Клинок пламени",
            type: "buff",
            rare: "rare",
            description: "Автоатака с вероятностью 50% накладыввает 1 стак подгорания",
            icon: "inferno-blade-of-flame.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
    ],
    assassin: [
        {
            id: "assassin-fatal-strike",
            name: "Смертельный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона, вешает эффект смертоносности(для улучшения скилов) 3 заряда",
            icon: "assassin-fatal-strike.png",
            manaCost: 5,
            count: 1,
            bonus: { str: 3, criticalChance: 10 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1, criticalChance: 2 }, // +1 урон, +2% крит за уровень
        },
        {
            id: "assassin-poison-strike",
            name: "Ядовитый удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, накладывает яд (2 урона за ход, 2 хода) если во время удара на противнике есть эффект смертоносности усиливается в 2 раза",
            icon: "assassin-poison-strike.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
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
            description: "Снижает получаемый урон на 50% 2 хода",
            icon: "assassin-trick.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-little-tricks",
            name: "Маленькие хитрости",
            type: "buff",
            rare: "rare",
            description: "Копирует любую карточку на этом ходу(кроме ультимейта)",
            icon: "assassin-little-tricks.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-blind",
            name: "Ослепление",
            type: "utillity",
            rare: "rare",
            description: "Дебафф на врага 30% промахов на 2 хода",
            icon: "assassin-blind.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-insidious-strikee",
            name: "Коварный удар",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон, дает 1 заряд смертоносности",
            icon: "assassin-insidious-strikee.png",
            manaCost: 2,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-blow-to-the-heart",
            name: "Удар в сердце",
            type: "controll",
            rare: "rare",
            description: "Оглушает на 1 ход если во время удара на противнике есть эффект смертоносности усиливается в 2 раза",
            icon: "assassin-blow-to-the-heart.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, poison: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { poison: { value: 1 } }, // +1 яд за уровень
        },
        {
            id: "assassin-deadly-technique",
            name: "Смертельный прием",
            type: "controll",
            rare: "rare",
            description: "Усиливает эффект смертоносности в 2 раза на 2 хода",
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
            id: "assassin-serial-killer",
            name: "Серийный убийца",
            type: "attack",
            rare: "rare",
            description: "Наносит 1 урон шанс нанесения 2 удара 40% если во время удара на противнике есть эффект смертоносности усиливается в 2 раза",
            icon: "assassin-serial-killer.png",
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
}

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