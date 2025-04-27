// import { defineStore } from "pinia";
//
// const cardsByClass = {
//     ranger: [
//         {
//             id: "ranger-sniper-shot",
//             name: "Снайперский выстрел",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 1 урон, повышает шанс попадания на 100% на 1 ход.",
//             icon: "/images/ranger-sniper-shot.png",
//             manaCost: 1,
//             count: 1,
//             bonus: {
//                 attack: 1,
//                 hitChance: { value: 100, duration: 1 },
//             },
//             level: 1,
//             maxLevel: 10,
//             upgradeCost: 4,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "ranger-hunters-mark",
//             name: "Метка охотника",
//             type: "buff",
//             rare: "rare",
//             description: "С шансом 30% позволяет сделать дополнительный выстрел в течение 1 хода.",
//             icon: "/images/ranger-hunters-mark.png",
//             manaCost: 2,
//             count: 1,
//             bonus: {
//                 doubleShot: { chance: 30, duration: 1 },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { doubleShot: { chance: 5 } },
//         },
//         {
//             id: "ranger-rapid-fire",
//             name: "Быстрая стрельба",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 3 удара по 1 урону. Если все попадают, следующая атака с 100% шансом критического удара.",
//             icon: "/images/ranger-rapid-fire.png",
//             manaCost: 3,
//             count: 1,
//             bonus: {
//                 attack: 1,
//                 count: 3,
//                 criticalNext: { chance: 100, condition: "allHits" },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "ranger-hunting-trap",
//             name: "Охотничья ловушка",
//             type: "control",
//             rare: "rare",
//             description: "Снижает скорость врага на 5 на 2 хода. Две ловушки оглушают на 1 ход.",
//             icon: "/images/ranger-hunting-trap.png",
//             manaCost: 1,
//             count: 1,
//             bonus: {
//                 speed: { value: -5, duration: 2 },
//                 stun: { duration: 1, condition: "twoTraps" },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 4,
//             upgradeEffect: { speed: { value: -1 } },
//         },
//         {
//             id: "ranger-explosive-shot",
//             name: "Взрывной выстрел",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 2 урона, снижает все характеристики врага на 20% на 1 ход.",
//             icon: "/images/ranger-explosive-shot.png",
//             manaCost: 2,
//             count: 1,
//             bonus: {
//                 attack: 2,
//                 debuff: { value: -20, duration: 1, stats: ["all"] },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "ranger-aimed-shot",
//             name: "Меткий выстрел",
//             type: "attack",
//             rare: "common",
//             description: "Наносит 2 урона, с шансом 30% наносит дополнительный 1 урон.",
//             icon: "/images/ranger-aimed-shot.png",
//             manaCost: 2,
//             count: 2,
//             bonus: {
//                 attack: 2,
//                 extraAttack: { value: 1, chance: 30 },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 3,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "ranger-healing-salve",
//             name: "Целебный бальзам",
//             type: "heal",
//             rare: "common",
//             description: "Восстанавливает 3 HP.",
//             icon: "/images/ranger-healing-salve.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { heal: 3 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 3,
//             upgradeEffect: { heal: 1 },
//         },
//         {
//             id: "ranger-camouflage",
//             name: "Камуфляж",
//             type: "defense",
//             rare: "rare",
//             description: "Увеличивает уклонение на 30% на 2 хода.",
//             icon: "/images/ranger-camouflage.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { dodge: { value: 30, duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { dodge: { value: 5 } },
//         },
//         {
//             id: "ranger-hunters-sense",
//             name: "Чувство охотника",
//             type: "buff",
//             rare: "epic",
//             description: "Повышает шанс критического удара на 70% до первого промаха.",
//             icon: "/images/ranger-hunters-sense.png",
//             manaCost: 4,
//             count: 1,
//             bonus: { criticalChance: { value: 70, condition: "untilMiss" } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 7,
//             upgradeEffect: { criticalChance: { value: 10 } },
//         },
//     ],
//     wrecker: [
//         {
//             id: "wrecker-smash",
//             name: "Сокрушение",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 3 урона, игнорирует 50 защиты врага.",
//             icon: "/images/wrecker-smash.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { attack: 3, ignoreDefense: 50 },
//             level: 1,
//             maxLevel: 10,
//             upgradeCost: 3,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "wrecker-diamond-shield",
//             name: "Алмазный щит",
//             type: "defense",
//             rare: "rare",
//             description: "Добавляет 2 защиты, наносит 1 урон атакующему при блоке на 2 хода.",
//             icon: "/images/wrecker-diamond-shield.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { defense: 2, counterAttack: 1, duration: 2 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { defense: 1 },
//         },
//         {
//             id: "wrecker-shock-wave",
//             name: "Ударная волна",
//             type: "control",
//             rare: "rare",
//             description: "Оглушает врага на 1 ход и снижает характеристики на 20% на 2 хода.",
//             icon: "/images/wrecker-shock-wave.png",
//             manaCost: 3,
//             count: 1,
//             bonus: {
//                 stun: { duration: 1 },
//                 debuff: { value: -20, duration: 2, stats: ["all"] },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { debuff: { value: -5 } },
//         },
//         {
//             id: "wrecker-surge-of-strength",
//             name: "Прилив сил",
//             type: "heal",
//             rare: "rare",
//             description: "Восстанавливает 4 HP и 2 маны.",
//             icon: "/images/wrecker-surge-of-strength.png",
//             manaCost: 2,
//             count: 4,
//             bonus: { heal: 4, mana: 2 },
//             level: 1,
//             maxLevel: 10,
//             upgradeCost: 3,
//             upgradeEffect: { heal: 1, mana: 1 },
//         },
//         {
//             id: "wrecker-crystal-infusion",
//             name: "Кристальная инфузия",
//             type: "buff",
//             rare: "rare",
//             description: "Увеличивает атаку на 4 и даёт невосприимчивость к дебаффам на 3 хода.",
//             icon: "/images/wrecker-crystal-infusion.png",
//             manaCost: 5,
//             count: 1,
//             bonus: { attack: 4, debuffImmunity: { duration: 3 } },
//             level: 1,
//             maxLevel: 10,
//             upgradeCost: 4,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "wrecker-farcical-blow",
//             name: "Фарсированный удар",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 3 урона ±1 урон в зависимости от HP врага (±50% урона при низком/высоком HP).",
//             icon: "/images/wrecker-farcical-blow.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { attack: 3, conditionalDamage: { value: 1, condition: "enemyHP" } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "wrecker-crystallization",
//             name: "Кристаллизация",
//             type: "defense",
//             rare: "rare",
//             description: "Делает неуязвимым на 2 хода, но блокирует нанесение урона.",
//             icon: "/images/wrecker-crystallization.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { invulnerability: { duration: 2 }, noAttack: { duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { invulnerability: { duration: 1 } },
//         },
//         {
//             id: "wrecker-jewelers-precision",
//             name: "Точность ювелира",
//             type: "buff",
//             rare: "rare",
//             description: "Гарантирует попадание атак на 2 хода.",
//             icon: "/images/wrecker-jewelers-precision.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { hitChance: { value: 100, duration: 2 } },
//             level: 1,
//             maxLevel: 4,
//             upgradeCost: 5,
//             upgradeEffect: { hitChance: { duration: 1 } },
//         },
//         {
//             id: "wrecker-powerful-blow",
//             name: "Мощный удар",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 2 урона +1 урон за каждую сыгранную карту в этом ходу.",
//             icon: "/images/wrecker-powerful-blow.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { attack: 2, bonusPerCard: 1 },
//             level: 1,
//             maxLevel: 8,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//     ],
//     arcanist: [
//         {
//             id: "arcanist-fireball",
//             name: "Огненный шар",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 3 магического урона.",
//             icon: "/images/arcanist-fireball.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { attack: 3 },
//             level: 1,
//             maxLevel: 20,
//             upgradeCost: 2,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "arcanist-frost-arrow",
//             name: "Ледяная стрела",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 2 урона и замораживает врага на 1 ход.",
//             icon: "/images/arcanist-frost-arrow.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { attack: 2, freeze: { duration: 1 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "arcanist-magical-flash",
//             name: "Магическая вспышка",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 1 урон, +2 урона, если маны больше 50%.",
//             icon: "/images/arcanist-magical-flash.png",
//             manaCost: 1,
//             count: 1,
//             bonus: { attack: 1, conditionalAttack: { value: 2, condition: "manaAbove50" }, isMagic: true },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 4,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "arcanist-frost-barrier",
//             name: "Ледяной барьер",
//             type: "defense",
//             rare: "rare",
//             description: "Добавляет 4 брони и замораживает атакующих на 1 ход.",
//             icon: "/images/arcanist-frost-barrier.png",
//             manaCost: 4,
//             count: 1,
//             bonus: { defence: 4, freeze: { duration: 1, onDefend: true } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { defence: 1 },
//         },
//         {
//             id: "arcanist-magic-trick",
//             name: "Магическая уловка",
//             type: "utility",
//             rare: "rare",
//             description: "Перенаправляет следующую атаку врага обратно в него.",
//             icon: "/images/arcanist-magic-trick.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { redirectAttack: { duration: 1 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { redirectAttack: { duration: 1 } },
//         },
//         {
//             id: "arcanist-surge-of-power",
//             name: "Прилив сил",
//             type: "heal",
//             rare: "rare",
//             description: "Восстанавливает 4 HP и 4 маны.",
//             icon: "/images/arcanist-surge-of-power.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { heal: 4, mana: 4 },
//             level: 1,
//             maxLevel: 20,
//             upgradeCost: 5,
//             upgradeEffect: { heal: 1, mana: 1 },
//         },
//         {
//             id: "arcanist-rings-of-cold",
//             name: "Кольца холода",
//             type: "control",
//             rare: "rare",
//             description: "Обездвиживает врага на 2 хода.",
//             icon: "/images/arcanist-rings-of-cold.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { freeze: { duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { freeze: { duration: 1 } },
//         },
//         {
//             id: "arcanist-true-trinity",
//             name: "Истинное триединство",
//             type: "attack",
//             rare: "epic",
//             description: "Наносит 5 урона, накладывает поджог (3 хода) и заморозку (2 хода).",
//             icon: "/images/arcanist-true-trinity.png",
//             manaCost: 7,
//             count: 1,
//             bonus: {
//                 attack: 5,
//                 burn: { value: 2, duration: 3 },
//                 freeze: { duration: 2 },
//             },
//             level: 1,
//             maxLevel: 10,
//             upgradeCost: 8,
//             upgradeEffect: { attack: 1, burn: { value: 1 } },
//         },
//         {
//             id: "arcanist-hidden-knowledge",
//             name: "Скрытые знания",
//             type: "buff",
//             rare: "rare",
//             description: "Увеличивает урон заклинаний на 1 и снижает их стоимость на 1 на 2 хода.",
//             icon: "/images/arcanist-hidden-knowledge.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { spellDamage: 1, spellCostReduction: 1, duration: 2 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { spellDamage: 1 },
//         },
//     ],
//     monk: [
//         {
//             id: "monk-meditation",
//             name: "Медитация",
//             type: "heal",
//             rare: "rare",
//             description: "Восстанавливает 3 HP.",
//             icon: "/images/monk-meditation.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { heal: 3 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 4,
//             upgradeEffect: { heal: 1 },
//         },
//         {
//             id: "monk-spiritual-strike",
//             name: "Духовный удар",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 2 урона, +20% шанс критического удара.",
//             icon: "/images/monk-spiritual-strike.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { attack: 2, criticalChance: 20 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "monk-tiger-strike",
//             name: "Удар тигра",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 2 урона, увеличивает урон следующего Духовного удара на 1.",
//             icon: "/images/monk-tiger-strike.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { attack: 2, nextSpiritualStrike: { bonus: 1 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "monk-dragon-strike",
//             name: "Удар дракона",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 2 урона, поджигает врага (2 урона, 2 хода), усиливает следующий Духовный удар на 1.",
//             icon: "/images/monk-dragon-strike.png",
//             manaCost: 3,
//             count: 1,
//             bonus: {
//                 attack: 2,
//                 burn: { value: 2, duration: 2 },
//                 nextSpiritualStrike: { bonus: 1 },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "monk-stone-armor",
//             name: "Каменный доспех",
//             type: "defense",
//             rare: "rare",
//             description: "Полностью блокирует 1 атаку.",
//             icon: "/images/monk-stone-armor.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { block: { attacks: 1 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { block: { attacks: 1 } },
//         },
//         {
//             id: "monk-balance",
//             name: "Равновесие",
//             type: "heal",
//             rare: "rare",
//             description: "Восстанавливает 1 HP после получения урона в течение 2 ходов.",
//             icon: "/images/monk-balance.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { healOnDamage: { value: 1, duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { healOnDamage: { value: 1 } },
//         },
//         {
//             id: "monk-path-of-goodness",
//             name: "Путь добра",
//             type: "heal",
//             rare: "epic",
//             description: "Восстанавливает 80 HP, но блокирует использование других исцеляющих карт.",
//             icon: "/images/monk-path-of-goodness.png",
//             manaCost: 4,
//             count: 1,
//             bonus: { heal: 80, blockHealing: true },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 7,
//             upgradeEffect: { heal: 10 },
//         },
//         {
//             id: "monk-path-of-hate",
//             name: "Путь ненависти",
//             type: "buff",
//             rare: "epic",
//             description: "Увеличивает урон на 4 до конца боя, но блокирует исцеляющие карты.",
//             icon: "/images/monk-path-of-hate.png",
//             manaCost: 4,
//             count: 1,
//             bonus: { attack: 4, blockHealing: true, duration: "permanent" },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 7,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "monk-strike-of-the-rising-sun",
//             name: "Удар восходящего солнца",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 1 урон, увеличивает урон следующей атаки на 1.",
//             icon: "/images/monk-strike-of-the-rising-sun.png",
//             manaCost: 1,
//             count: 1,
//             bonus: { attack: 1, nextAttack: { bonus: 1 } },
//             level: 1,
//             maxLevel: 20,
//             upgradeCost: 4,
//             upgradeEffect: { attack: 1 },
//         },
//     ],
//     inferno: [
//         {
//             id: "inferno-hell-explosion",
//             name: "Адский взрыв",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 3 урона и накладывает 3 стака поджога (1 урон/ход).",
//             icon: "/images/inferno-hell-explosion.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { attack: 3, burn: { value: 1, stacks: 3 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "inferno-flame-shield",
//             name: "Огненный щит",
//             type: "defense",
//             rare: "rare",
//             description: "Добавляет 3 защиты на 2 хода, накладывает 1 стак поджога атакующему.",
//             icon: "/images/inferno-flame-shield.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { defense: 3, burn: { value: 1, stacks: 1, onDefend: true }, duration: 2 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { defense: 1 },
//         },
//         {
//             id: "inferno-wrath-of-Inferno",
//             name: "Гнев инферно",
//             type: "buff",
//             rare: "rare",
//             description: "Увеличивает количество стаков поджога на 2 для всех атак на 2 хода.",
//             icon: "/images/inferno-wrath-of-Inferno.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { burnStacks: { value: 2, duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { burnStacks: { value: 1 } },
//         },
//         {
//             id: "inferno-eternal-flame",
//             name: "Вечное пламя",
//             type: "attack",
//             rare: "epic",
//             description: "При 10 стаках поджога превращает игрока в Вечное пламя (2 урона/ход до конца боя).",
//             icon: "/images/inferno-eternal-flame.png",
//             manaCost: 5,
//             count: 1,
//             bonus: { transform: { attack: 2, condition: "10burnStacks", duration: "permanent" } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 7,
//             upgradeEffect: { transform: { attack: 1 } },
//         },
//         {
//             id: "inferno-live-bomb",
//             name: "Живая бомба",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 1 урон за каждый стак поджога на враге.",
//             icon: "/images/inferno-live-bomb.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { attackPerBurnStack: 1 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attackPerBurnStack: 1 },
//         },
//         {
//             id: "inferno-holy-flame",
//             name: "Святое пламя",
//             type: "heal",
//             rare: "rare",
//             description: "Восстанавливает 1 HP за каждый стак поджога на враге.",
//             icon: "/images/inferno-holy-flame.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { healPerBurnStack: 1 },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { healPerBurnStack: 1 },
//         },
//         {
//             id: "inferno-small-flame",
//             name: "Малое пламя",
//             type: "attack",
//             rare: "common",
//             description: "Наносит 1 урон и 1 стак поджога. Два Малых пламени усиливают эффект в 3 раза.",
//             icon: "/images/inferno-small-flame.png",
//             manaCost: 1,
//             count: 1,
//             bonus: {
//                 attack: 1,
//                 burn: { value: 1, stacks: 1 },
//                 combo: { multiplier: 3, condition: "twoSmallFlames" },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 3,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "inferno-flame-control",
//             name: "Контроль пламени",
//             type: "control",
//             rare: "rare",
//             description: "Оглушает врага на 1 ход за каждые 5 стаков поджога.",
//             icon: "/images/inferno-flame-control.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { stun: { durationPer5BurnStacks: 1 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { stun: { durationPer5BurnStacks: 1 } },
//         },
//         {
//             id: "inferno-blade-of-flame",
//             name: "Клинок пламени",
//             type: "buff",
//             rare: "rare",
//             description: "Автоатаки с шансом 50% накладывают 1 стак поджога на 2 хода.",
//             icon: "/images/inferno-blade-of-flame.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { autoAttackBurn: { chance: 50, stacks: 1, duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { autoAttackBurn: { chance: 10 } },
//         },
//     ],
//     assassin: [
//         {
//             id: "assassin-fatal-strike",
//             name: "Смертельный удар",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 3 урона, добавляет 3 заряда смертоносности для усиления других карт.",
//             icon: "/images/assassin-fatal-strike.png",
//             manaCost: 4,
//             count: 1,
//             bonus: { attack: 3, lethality: { stacks: 3 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "assassin-poison-strike",
//             name: "Ядовитый удар",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 2 урона, накладывает яд (2 урона/ход, 2 хода). Удваивается при наличии смертоносности.",
//             icon: "/images/assassin-poison-strike.png",
//             manaCost: 3,
//             count: 1,
//             bonus: {
//                 attack: 2,
//                 poison: { value: 2, duration: 2 },
//                 lethalityBonus: { multiplier: 2 },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { poison: { value: 1 } },
//         },
//         {
//             id: "assassin-trick",
//             name: "Уловка",
//             type: "defense",
//             rare: "rare",
//             description: "Снижает получаемый урон на 50% на 2 хода.",
//             icon: "/images/assassin-trick.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { damageReduction: { value: 50, duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { damageReduction: { value: 10 } },
//         },
//         {
//             id: "assassin-little-tricks",
//             name: "Маленькие хитрости",
//             type: "buff",
//             rare: "rare",
//             description: "Копирует любую карту (кроме ультимейта) на этом ходу.",
//             icon: "/images/assassin-little-tricks.png",
//             manaCost: 3,
//             count: 1,
//             bonus: { copyCard: { exclude: "ultimate" } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { copyCard: { duration: 1 } },
//         },
//         {
//             id: "assassin-blind",
//             name: "Ослепление",
//             type: "utility",
//             rare: "rare",
//             description: "Накладывает на врага 30% шанс промаха на 2 хода.",
//             icon: "/images/assassin-blind.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { missChance: { value: 30, duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { missChance: { value: 5 } },
//         },
//         {
//             id: "assassin-insidious-strike",
//             name: "Коварный удар",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 1 урон, добавляет 1 заряд смертоносности.",
//             icon: "/images/assassin-insidious-strike.png",
//             manaCost: 2,
//             count: 1,
//             bonus: { attack: 1, lethality: { stacks: 1 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 4,
//             upgradeEffect: { attack: 1 },
//         },
//         {
//             id: "assassin-blow-to-the-heart",
//             name: "Удар в сердце",
//             type: "control",
//             rare: "rare",
//             description: "Оглушает на 1 ход, удваивает длительность при наличии смертоносности.",
//             icon: "/images/assassin-blow-to-the-heart.png",
//             manaCost: 3,
//             count: 1,
//             bonus: {
//                 stun: { duration: 1 },
//                 lethalityBonus: { multiplier: 2, stat: "stunDuration" },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { stun: { duration: 1 } },
//         },
//         {
//             id: "assassin-deadly-technique",
//             name: "Смертельный приём",
//             type: "buff",
//             rare: "epic",
//             description: "Удваивает эффект смертоносности на 2 хода.",
//             icon: "/images/assassin-deadly-technique.png",
//             manaCost: 6,
//             count: 1,
//             bonus: { lethalityMultiplier: { value: 2, duration: 2 } },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 7,
//             upgradeEffect: { lethalityMultiplier: { duration: 1 } },
//         },
//         {
//             id: "assassin-serial-killer",
//             name: "Серийный убийца",
//             type: "attack",
//             rare: "rare",
//             description: "Наносит 1 урон, с шансом 40% наносит 2 удара. Удваивается при наличии смертоносности.",
//             icon: "/images/assassin-serial-killer.png",
//             manaCost: 3,
//             count: 1,
//             bonus: {
//                 attack: 1,
//                 multiStrike: { chance: 40, strikes: 2 },
//                 lethalityBonus: { multiplier: 2 },
//             },
//             level: 1,
//             maxLevel: 3,
//             upgradeCost: 5,
//             upgradeEffect: { attack: 1 },
//         },
//     ],
// };
// const mobs = [
//     {
//         name: "Goblin",
//         stats: {
//             attack: 1,
//             critical: 5,
//             hp: 15,
//             maxHp: 15,
//             mp: 1,
//             maxMp: 1,
//             hitChance: 50,
//             dodge: 20,
//             speed: 1,
//             defence: 5,
//         },
//         debuffs: [],
//         actions: [
//             {
//                 type: "attack",
//                 description: "Гоблин атакует, нанося урон.",
//                 effect: (game) => {
//                     const hitChance = game.getMobCurrentStat("hitChance");
//                     if (Math.random() * 100 < hitChance) {
//                         let damage = game.getMobCurrentStat("attack");
//                         if (Math.random() * 100 < game.getMobCurrentStat("critical")) {
//                             damage *= 2;
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `Критический удар! -${damage} HP`;
//                         } else {
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `-${damage} HP`;
//                         }
//                         const actualDamage = Math.max(1, damage - game.getPlayerCurrentStat("defence"));
//                         game.player.stats.hp = Math.max(0, game.player.stats.hp - actualDamage);
//                         game.log.unshift(`Гоблин наносит ${actualDamage} урона игроку`);
//                     } else {
//                         game.log.unshift("Гоблин промахнулся");
//                         game.playerStatusText = "Промах";
//                     }
//                 },
//             },
//             {
//                 type: "buff",
//                 description: "Гоблин увеличивает свою атаку на 1 на 2 хода.",
//                 effect: (game) => {
//                     game.mob.debuffs.push({ type: "attack", value: 1, duration: 2 });
//                     game.log.unshift("Гоблин увеличивает атаку на 1 на 2 хода");
//                 },
//             },
//             {
//                 type: "debuff",
//                 description: "Гоблин снижает меткость игрока на 10% на 2 хода.",
//                 effect: (game) => {
//                     game.player.buffs.push({ type: "hitChance", value: -10, duration: 2 });
//                     game.log.unshift("Гоблин снижает меткость игрока на 10% на 2 хода");
//                 },
//             },
//         ],
//     },
//     {
//         name: "Orc",
//         stats: {
//             attack: 2,
//             critical: 10,
//             hp: 20,
//             maxHp: 20,
//             mp: 1,
//             maxMp: 1,
//             hitChance: 60,
//             dodge: 15,
//             speed: 3,
//             defence: 4,
//         },
//         debuffs: [],
//         actions: [
//             {
//                 type: "attack",
//                 description: "Орк атакует, нанося урон.",
//                 effect: (game) => {
//                     const hitChance = game.getMobCurrentStat("hitChance");
//                     if (Math.random() * 100 < hitChance) {
//                         let damage = game.getMobCurrentStat("attack");
//                         if (Math.random() * 100 < game.getMobCurrentStat("critical")) {
//                             damage *= 2;
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `Критический удар! -${damage} HP`;
//                         } else {
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `-${damage} HP`;
//                         }
//                         const actualDamage = Math.max(1, damage - game.getPlayerCurrentStat("defence"));
//                         game.player.stats.hp = Math.max(0, game.player.stats.hp - actualDamage);
//                         game.log.unshift(`Орк наносит ${actualDamage} урона игроку`);
//                     } else {
//                         game.log.unshift("Орк промахнулся");
//                         game.playerStatusText = "Промах";
//                     }
//                 },
//             },
//             {
//                 type: "control",
//                 description: "Орк оглушает игрока на 1 ход.",
//                 effect: (game) => {
//                     game.player.buffs.push({ type: "stun", value: 0, duration: 1 });
//                     game.log.unshift("Орк оглушает игрока на 1 ход");
//                 },
//             },
//             {
//                 type: "heal",
//                 description: "Орк восстанавливает 5 HP.",
//                 effect: (game) => {
//                     game.mob.stats.hp = Math.min(game.mob.stats.maxHp, game.mob.stats.hp + 5);
//                     game.log.unshift("Орк восстанавливает 5 HP");
//                     game.mobStatusText = "+5 HP";
//                 },
//             },
//         ],
//     },
//     {
//         name: "Skeleton",
//         stats: {
//             attack: 1,
//             critical: 8,
//             hp: 12,
//             maxHp: 12,
//             mp: 1,
//             maxMp: 1,
//             hitChance: 55,
//             dodge: 25,
//             speed: 2,
//             defence: 3,
//         },
//         debuffs: [],
//         actions: [
//             {
//                 type: "attack",
//                 description: "Скелет атакует, нанося урон.",
//                 effect: (game) => {
//                     const hitChance = game.getMobCurrentStat("hitChance");
//                     if (Math.random() * 100 < hitChance) {
//                         let damage = game.getMobCurrentStat("attack");
//                         if (Math.random() * 100 < game.getMobCurrentStat("critical")) {
//                             damage *= 2;
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `Критический удар! -${damage} HP`;
//                         } else {
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `-${damage} HP`;
//                         }
//                         const actualDamage = Math.max(1, damage - game.getPlayerCurrentStat("defence"));
//                         game.player.stats.hp = Math.max(0, game.player.stats.hp - actualDamage);
//                         game.log.unshift(`Скелет наносит ${actualDamage} урона игроку`);
//                     } else {
//                         game.log.unshift("Скелет промахнулся");
//                         game.playerStatusText = "Промах";
//                     }
//                 },
//             },
//             {
//                 type: "debuff",
//                 description: "Скелет накладывает кровотечение (2 урона за ход, 2 хода).",
//                 effect: (game) => {
//                     game.player.buffs.push({ type: "bleed", value: -2, duration: 2 });
//                     game.log.unshift("Скелет накладывает кровотечение на игрока");
//                 },
//             },
//             {
//                 type: "buff",
//                 description: "Скелет увеличивает свою скорость на 2 на 2 хода.",
//                 effect: (game) => {
//                     game.mob.debuffs.push({ type: "speed", value: 2, duration: 2 });
//                     game.log.unshift("Скелет увеличивает скорость на 2 на 2 хода");
//                 },
//             },
//         ],
//     },
//     {
//         name: "Troll",
//         stats: {
//             attack: 3,
//             critical: 5,
//             hp: 25,
//             maxHp: 25,
//             mp: 1,
//             maxMp: 1,
//             hitChance: 45,
//             dodge: 10,
//             speed: 1,
//             defence: 6,
//         },
//         debuffs: [],
//         actions: [
//             {
//                 type: "attack",
//                 description: "Тролль атакует, нанося урон.",
//                 effect: (game) => {
//                     const hitChance = game.getMobCurrentStat("hitChance");
//                     if (Math.random() * 100 < hitChance) {
//                         let damage = game.getMobCurrentStat("attack");
//                         if (Math.random() * 100 < game.getMobCurrentStat("critical")) {
//                             damage *= 2;
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `Критический удар! -${damage} HP`;
//                         } else {
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `-${damage} HP`;
//                         }
//                         const actualDamage = Math.max(1, damage - game.getPlayerCurrentStat("defence"));
//                         game.player.stats.hp = Math.max(0, game.player.stats.hp - actualDamage);
//                         game.log.unshift(`Тролль наносит ${actualDamage} урона игроку`);
//                     } else {
//                         game.log.unshift("Тролль промахнулся");
//                         game.playerStatusText = "Промах";
//                     }
//                 },
//             },
//             {
//                 type: "heal",
//                 description: "Тролль регенерирует 3 HP.",
//                 effect: (game) => {
//                     game.mob.stats.hp = Math.min(game.mob.stats.maxHp, game.mob.stats.hp + 3);
//                     game.log.unshift("Тролль регенерирует 3 HP");
//                     game.mobStatusText = "+3 HP";
//                 },
//             },
//             {
//                 type: "debuff",
//                 description: "Тролль снижает меткость игрока на 15% на 2 хода.",
//                 effect: (game) => {
//                     game.player.buffs.push({ type: "hitChance", value: -15, duration: 2 });
//                     game.log.unshift("Тролль снижает меткость игрока на 15% на 2 хода");
//                 },
//             },
//         ],
//     },
//     {
//         name: "Wraith",
//         stats: {
//             attack: 2,
//             critical: 15,
//             hp: 18,
//             maxHp: 18,
//             mp: 1,
//             maxMp: 1,
//             hitChance: 65,
//             dodge: 30,
//             speed: 4,
//             defence: 2,
//         },
//         debuffs: [],
//         actions: [
//             {
//                 type: "attack",
//                 description: "Призрак атакует, нанося урон.",
//                 effect: (game) => {
//                     const hitChance = game.getMobCurrentStat("hitChance");
//                     if (Math.random() * 100 < hitChance) {
//                         let damage = game.getMobCurrentStat("attack");
//                         if (Math.random() * 100 < game.getMobCurrentStat("critical")) {
//                             damage *= 2;
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `Критический удар! -${damage} HP`;
//                         } else {
//                             game.playerAnimation = "game__person--hurt";
//                             game.playerStatusText = `-${damage} HP`;
//                         }
//                         const actualDamage = Math.max(1, damage - game.getPlayerCurrentStat("defence"));
//                         game.player.stats.hp = Math.max(0, game.player.stats.hp - actualDamage);
//                         game.log.unshift(`Призрак наносит ${actualDamage} урона игроку`);
//                     } else {
//                         game.log.unshift("Призрак промахнулся");
//                         game.playerStatusText = "Промах";
//                     }
//                 },
//             },
//             {
//                 type: "debuff",
//                 description: "Призрак накладывает проклятие, снижая критический шанс игрока на 10% на 3 хода.",
//                 effect: (game) => {
//                     game.player.buffs.push({ type: "critical", value: -10, duration: 3 });
//                     game.log.unshift("Призрак снижает критический шанс игрока на 10% на 3 хода");
//                 },
//             },
//             {
//                 type: "buff",
//                 description: "Призрак увеличивает свой критический шанс на 10% на 2 хода.",
//                 effect: (game) => {
//                     game.mob.debuffs.push({ type: "critical", value: 10, duration: 2 });
//                     game.log.unshift("Призрак увеличивает критический шанс на 10% на 2 хода");
//                 },
//             },
//         ],
//     },
// ];
//
// interface Stats {
//     attack: number;
//     critical: number;
//     hp: number;
//     maxHp: number;
//     mp: number;
//     maxMp: number;
//     hitChance: number;
//     dodge: number;
//     speed: number;
//     defence: number;
// }
//
// interface Buff {
//     type: string;
//     value: number;
//     duration: number;
//     chance?: number;
//     condition?: string;
// }
//
// interface Card {
//     id: string;
//     name: string;
//     type: string;
//     rare: string;
//     description: string;
//     icon: string;
//     manaCost: number;
//     count: number;
//     bonus: any;
//     level: number;
//     maxLevel: number;
//     upgradeCost: number;
//     upgradeEffect: any;
// }
//
// interface MobAction {
//     type: "attack" | "buff" | "debuff" | "heal" | "control";
//     description: string;
//     effect: (game: any) => void;
// }
//
// interface Mob {
//     name: string;
//     stats: Stats;
//     actions: MobAction[];
//     debuffs: Buff[];
// }
//
// export const useGameStore = defineStore("game", {
//     state: () => ({
//         player: {
//             stats: {
//                 attack: 2,
//                 critical: 2,
//                 hp: 10,
//                 maxHp: 10,
//                 mp: 10,
//                 maxMp: 10,
//                 hitChance: 50,
//                 dodge: 20,
//                 speed: 2,
//                 defence: 3,
//             },
//             buffs: [] as Buff[],
//             class: null as string | null,
//             gold: 0,
//             resources: 0,
//             lethalityStacks: 0,
//             burnStacks: 0,
//             playedCardsThisTurn: 0,
//             spiritualStrikeBonus: 0,
//             nextAttackBonus: 0,
//             blockHealing: false,
//             smallFlameCount: 0,
//         },
//         mob: null as Mob | null,
//         deck: [] as Card[],
//         hand: [] as Card[],
//         discard: [] as Card[],
//         turn: "player" as "player" | "mob",
//         log: [] as string[],
//         gameOver: false,
//         winner: null as "player" | "mob" | null,
//         playerAnimation: "",
//         mobAnimation: "",
//         playerStatusText: "",
//         mobStatusText: "",
//         trapCount: 0,
//         allHits: false,
//         missed: false,
//     }),
//
//     actions: {
//         // Установка класса
//         setClass(className: string) {
//             this.player.class = className;
//         },
//
//         // Инициализация игры
//         startGame() {
//             if (!this.player.class) return;
//             this.player.stats.hp = this.player.stats.maxHp;
//             this.player.stats.mp = this.player.stats.maxMp;
//             this.player.buffs = [];
//             this.deck = [];
//             this.hand = [];
//             this.discard = [];
//             this.log = [];
//             this.gameOver = false;
//             this.winner = null;
//             this.trapCount = 0;
//             this.allHits = false;
//             this.missed = false;
//             this.player.lethalityStacks = 0;
//             this.player.burnStacks = 0;
//             this.player.playedCardsThisTurn = 0;
//             this.player.spiritualStrikeBonus = 0;
//             this.player.nextAttackBonus = 0;
//             this.player.blockHealing = false;
//             this.player.smallFlameCount = 0;
//
//             // Выбор случайного моба
//             this.mob = JSON.parse(JSON.stringify(mobs[Math.floor(Math.random() * mobs.length)]));
//             this.mob.debuffs = [];
//
//             // Формирование колоды
//             const classCards = cardsByClass[this.player.class];
//             classCards.forEach((card: Card) => {
//                 for (let i = 0; i < card.count; i++) {
//                     this.deck.push({ ...card });
//                 }
//             });
//             this.shuffleDeck();
//
//             // Вытягивание 5 карт
//             for (let i = 0; i < 5; i++) {
//                 this.drawCard();
//             }
//         },
//
//         // Перемешивание колоды
//         shuffleDeck() {
//             for (let i = this.deck.length - 1; i > 0; i--) {
//                 const j = Math.floor(Math.random() * (i + 1));
//                 [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
//             }
//         },
//
//         // Вытягивание карты
//         drawCard() {
//             if (this.deck.length === 0) {
//                 this.deck = [...this.discard];
//                 this.discard = [];
//                 this.shuffleDeck();
//             }
//             if (this.deck.length > 0) {
//                 this.hand.push(this.deck.pop()!);
//                 this.log.unshift("Игрок вытянул карту");
//             }
//         },
//
//         // Получение текущей характеристики с учетом баффов
//         getPlayerCurrentStat(stat: keyof Stats) {
//             let value = this.player.stats[stat];
//             this.player.buffs.forEach(buff => {
//                 if (buff.type === stat) {
//                     value += buff.value;
//                 }
//             });
//             if (stat === "hitChance") return Math.min(90, Math.max(5, value));
//             if (stat === "critical") return Math.min(80, Math.max(0, value));
//             if (stat === "dodge") return Math.min(50, Math.max(0, value));
//             return Math.max(0, value);
//         },
//
//         getMobCurrentStat(stat: keyof Stats) {
//             let value = this.mob!.stats[stat];
//             this.mob!.debuffs.forEach(debuff => {
//                 if (debuff.type === stat) {
//                     value += debuff.value;
//                 }
//             });
//             if (stat === "hitChance") return Math.min(90, Math.max(5, value));
//             if (stat === "critical") return Math.min(80, Math.max(0, value));
//             if (stat === "dodge") return Math.min(50, Math.max(0, value));
//             return Math.max(0, value);
//         },
//
//         // Применение карты
//         playCard(cardIndex: number) {
//             if (this.gameOver || this.turn !== "player") return;
//             const card = this.hand[cardIndex];
//             if (!card || this.player.stats.mp < card.manaCost) return;
//
//             this.player.stats.mp -= card.manaCost;
//             this.player.playedCardsThisTurn++;
//             this.log.unshift(`Игрок использовал "${card.name}"`);
//             this.applyCardEffect(card);
//             this.hand.splice(cardIndex, 1);
//             this.discard.push(card);
//
//             // Проверка смерти моба
//             if (this.mob!.stats.hp <= 0) {
//                 this.gameOver = true;
//                 this.winner = "player";
//                 this.mobAnimation = "game__mob--death";
//                 this.mobStatusText = "Смерть";
//                 this.player.gold += 50;
//                 this.player.resources += 20;
//                 this.log.unshift("Игрок победил!");
//             }
//         },
//
//         // Применение эффекта карты
//         applyCardEffect(card: Card) {
//             const bonus = card.bonus;
//             const lethalityMultiplier = this.player.buffs.find(b => b.type === "lethalityMultiplier")?.value || 1;
//             const hasLethality = this.player.lethalityStacks > 0;
//             const spellDamageBonus = this.player.buffs.find(b => b.type === "spellDamage")?.value || 0;
//
//             // Обработка атаки
//             if (card.type === "attack") {
//                 let hitChance = this.getPlayerCurrentStat("hitChance");
//                 if (bonus.hitChance) {
//                     hitChance = 100;
//                     this.player.buffs.push({
//                         type: "hitChance",
//                         value: bonus.hitChance.value,
//                         duration: bonus.hitChance.duration,
//                     });
//                 }
//
//                 let criticalChance = this.getPlayerCurrentStat("critical");
//                 if (bonus.criticalChance) {
//                     criticalChance += bonus.criticalChance;
//                 }
//                 if (bonus.criticalNext && this.allHits) {
//                     criticalChance = bonus.criticalNext.chance;
//                 }
//
//                 let hits = bonus.count || (bonus.multiStrike && Math.random() * 100 < bonus.multiStrike.chance * (hasLethality ? bonus.lethalityBonus.multiplier : 1) ? bonus.multiStrike.strikes : 1);
//                 let successfulHits = 0;
//                 let damage = (bonus.attack || 0) + (bonus.isMagic ? spellDamageBonus : 0);
//
//                 // Уникальные модификаторы урона
//                 if (bonus.conditionalAttack && this.player.stats.mp > this.player.stats.maxMp * 0.5) {
//                     damage += bonus.conditionalAttack.value;
//                 }
//                 if (bonus.conditionalDamage) {
//                     const hpRatio = this.mob!.stats.hp / this.mob!.stats.maxHp;
//                     damage += hpRatio < 0.5 ? -bonus.conditionalDamage.value : bonus.conditionalDamage.value;
//                 }
//                 if (bonus.bonusPerCard) {
//                     damage += this.player.playedCardsThisTurn * bonus.bonusPerCard;
//                 }
//                 if (bonus.attackPerBurnStack) {
//                     damage = this.player.burnStacks * bonus.attackPerBurnStack;
//                 }
//                 if (card.id === "monk-spiritual-strike") {
//                     damage += this.player.spiritualStrikeBonus;
//                     this.player.spiritualStrikeBonus = 0;
//                 }
//                 if (this.player.nextAttackBonus > 0) {
//                     damage += this.player.nextAttackBonus;
//                     this.player.nextAttackBonus = 0;
//                 }
//
//                 // Комбо Малого пламени
//                 if (card.id === "inferno-small-flame") {
//                     this.player.smallFlameCount++;
//                     if (this.player.smallFlameCount >= 2) {
//                         damage *= bonus.combo.multiplier;
//                         this.player.burnStacks += bonus.burn.stacks * bonus.combo.multiplier;
//                         this.player.smallFlameCount = 0;
//                     }
//                 }
//
//                 for (let i = 0; i < hits; i++) {
//                     if (Math.random() * 100 < hitChance) {
//                         successfulHits++;
//                         let finalDamage = damage;
//                         if (bonus.ignoreDefense) {
//                             finalDamage = damage;
//                         } else {
//                             finalDamage = Math.max(1, damage - this.getMobCurrentStat("defence"));
//                         }
//                         if (bonus.extraAttack && Math.random() * 100 < bonus.extraAttack.chance) {
//                             finalDamage += bonus.extraAttack.value;
//                         }
//                         if (Math.random() * 100 < criticalChance) {
//                             finalDamage *= 2;
//                             this.playerAnimation = "game__person--special";
//                             this.mobAnimation = "game__mob--hurt";
//                             this.mobStatusText = `Критический удар! -${finalDamage} HP`;
//                         } else {
//                             this.playerAnimation = "game__person--attack2";
//                             this.mobAnimation = "game__mob--hurt";
//                             this.mobStatusText = `-${finalDamage} HP`;
//                         }
//                         this.mob!.stats.hp = Math.max(0, this.mob!.stats.hp - finalDamage);
//                         this.log.unshift(`Игрок наносит ${finalDamage} урона мобу`);
//                     } else {
//                         this.playerAnimation = "game__person--attack1";
//                         this.mobStatusText = "Промах";
//                         this.log.unshift("Игрок промахнулся");
//                         this.missed = true;
//                     }
//                 }
//
//                 this.allHits = successfulHits === hits;
//             }
//
//             // Лечение
//             if (bonus.heal && !this.player.blockHealing) {
//                 const heal = bonus.heal;
//                 this.player.stats.hp = Math.min(this.player.stats.maxHp, this.player.stats.hp + heal);
//                 this.log.unshift(`Игрок восстанавливает ${heal} HP`);
//                 this.playerStatusText = `+${heal} HP`;
//             }
//             if (bonus.healPerBurnStack) {
//                 const heal = this.player.burnStacks * bonus.healPerBurnStack;
//                 this.player.stats.hp = Math.min(this.player.stats.maxHp, this.player.stats.hp + heal);
//                 this.log.unshift(`Игрок восстанавливает ${heal} HP`);
//                 this.playerStatusText = `+${heal} HP`;
//             }
//
//             // Мана
//             if (bonus.mana) {
//                 this.player.stats.mp = Math.min(this.player.stats.maxMp, this.player.stats.mp + bonus.mana);
//                 this.log.unshift(`Игрок восстанавливает ${bonus.mana} маны`);
//             }
//
//             // Баффы
//             if (bonus.dodge) {
//                 this.player.buffs.push({ type: "dodge", value: bonus.dodge.value, duration: bonus.dodge.duration });
//                 this.log.unshift(`Игрок увеличивает уклонение на ${bonus.dodge.value}% на ${bonus.dodge.duration} хода`);
//             }
//             if (bonus.criticalChance) {
//                 this.player.buffs.push({
//                     type: "critical",
//                     value: bonus.criticalChance.value,
//                     duration: bonus.criticalChance.condition === "untilMiss" && !this.missed ? Infinity : 1,
//                 });
//                 this.log.unshift(`Игрок увеличивает критический шанс на ${bonus.criticalChance.value}%`);
//             }
//             if (bonus.doubleShot) {
//                 if (Math.random() * 100 < bonus.doubleShot.chance) {
//                     this.player.buffs.push({ type: "extraAttack", value: 1, duration: bonus.doubleShot.duration });
//                     this.log.unshift("Дополнительный выстрел активирован!");
//                 }
//             }
//             if (bonus.attack) {
//                 this.player.buffs.push({ type: "attack", value: bonus.attack, duration: bonus.duration || 1 });
//                 this.log.unshift(`Игрок увеличивает атаку на ${bonus.attack}`);
//             }
//             if (bonus.debuffImmunity) {
//                 this.player.buffs.push({ type: "debuffImmunity", value: 0, duration: bonus.debuffImmunity.duration });
//                 this.log.unshift(`Игрок получает невосприимчивость к дебаффам на ${bonus.debuffImmunity.duration} хода`);
//             }
//             if (bonus.spellDamage) {
//                 this.player.buffs.push({ type: "spellDamage", value: bonus.spellDamage, duration: bonus.duration });
//                 this.log.unshift(`Урон заклинаний увеличен на ${bonus.spellDamage} на ${bonus.duration} хода`);
//             }
//             if (bonus.burnStacks) {
//                 this.player.buffs.push({
//                     type: "burnStacks",
//                     value: bonus.burnStacks.value,
//                     duration: bonus.burnStacks.duration,
//                 });
//                 this.log.unshift(`Стаки поджога увеличены на ${bonus.burnStacks.value} на ${bonus.burnStacks.duration} хода`);
//             }
//             if (bonus.lethalityMultiplier) {
//                 this.player.buffs.push({
//                     type: "lethalityMultiplier",
//                     value: bonus.lethalityMultiplier.value,
//                     duration: bonus.lethalityMultiplier.duration,
//                 });
//                 this.log.unshift(`Эффект смертоносности удвоен на ${bonus.lethalityMultiplier.duration} хода`);
//             }
//             if (bonus.autoAttackBurn) {
//                 this.player.buffs.push({
//                     type: "autoAttackBurn",
//                     value: bonus.autoAttackBurn.stacks,
//                     duration: bonus.autoAttackBurn.duration,
//                     chance: bonus.autoAttackBurn.chance,
//                 });
//                 this.log.unshift(`Автоатаки могут наложить поджог с шансом ${bonus.autoAttackBurn.chance}%`);
//             }
//
//             // Дебаффы и контроль
//             if (bonus.speed || bonus.stun) {
//                 this.trapCount++;
//                 if (bonus.speed) {
//                     this.mob!.debuffs.push({ type: "speed", value: bonus.speed.value, duration: bonus.speed.duration });
//                     this.log.unshift(`Скорость моба снижена на ${-bonus.speed.value} на ${bonus.speed.duration} хода`);
//                 }
//                 if (this.trapCount >= 2 && bonus.stun) {
//                     this.mob!.debuffs.push({ type: "stun", value: 0, duration: bonus.stun.duration });
//                     this.log.unshift("Моб оглушен на 1 ход");
//                     this.trapCount = 0;
//                 }
//             }
//             if (bonus.debuff) {
//                 bonus.debuff.stats.forEach((stat: string) => {
//                     if (stat === "all") {
//                         ["attack", "critical", "hitChance", "dodge", "speed", "defence"].forEach(s => {
//                             this.mob!.debuffs.push({
//                                 type: s,
//                                 value: bonus.debuff.value,
//                                 duration: bonus.debuff.duration,
//                             });
//                         });
//                     } else {
//                         this.mob!.debuffs.push({
//                             type: stat,
//                             value: bonus.debuff.value,
//                             duration: bonus.debuff.duration,
//                         });
//                     }
//                 });
//                 this.log.unshift(`Характеристики моба снижены на ${-bonus.debuff.value}% на ${bonus.debuff.duration} хода`);
//             }
//             if (bonus.freeze) {
//                 this.mob!.debuffs.push({ type: "stun", value: 0, duration: bonus.freeze.duration });
//                 this.log.unshift(`Моб заморожен на ${bonus.freeze.duration} хода`);
//             }
//             if (bonus.burn) {
//                 const stacks = (bonus.burn.stacks || 1) + (this.player.buffs.find(b => b.type === "burnStacks")?.value || 0);
//                 this.player.burnStacks += stacks;
//                 this.mob!.debuffs.push({ type: "burn", value: bonus.burn.value, duration: bonus.burn.duration });
//                 this.log.unshift(`Моб подожжен на ${stacks} стаков`);
//             }
//             if (bonus.poison) {
//                 const value = hasLethality ? bonus.poison.value * (bonus.lethalityBonus.multiplier * lethalityMultiplier) : bonus.poison.value;
//                 this.mob!.debuffs.push({ type: "poison", value, duration: bonus.poison.duration });
//                 this.log.unshift(`Моб отравлен на ${value} урона/ход`);
//             }
//             if (bonus.stun) {
//                 const duration = hasLethality ? bonus.stun.duration * (bonus.lethalityBonus.multiplier * lethalityMultiplier) : bonus.stun.duration;
//                 this.mob!.debuffs.push({ type: "stun", value: 0, duration });
//                 this.log.unshift(`Моб оглушен на ${duration} хода`);
//             }
//             if (bonus.stun && bonus.durationPer5BurnStacks) {
//                 const duration = Math.floor(this.player.burnStacks / 5) * bonus.stun.durationPer5BurnStacks;
//                 if (duration > 0) {
//                     this.mob!.debuffs.push({ type: "stun", value: 0, duration });
//                     this.log.unshift(`Моб оглушен на ${duration} хода из-за поджога`);
//                 }
//             }
//             if (bonus.missChance) {
//                 this.mob!.debuffs.push({
//                     type: "hitChance",
//                     value: -bonus.missChance.value,
//                     duration: bonus.missChance.duration,
//                 });
//                 this.log.unshift(`Шанс попадания моба снижен на ${bonus.missChance.value}% на ${bonus.missChance.duration} хода`);
//             }
//
//             // Специфические эффекты
//             if (bonus.lethality) {
//                 this.player.lethalityStacks += bonus.lethality.stacks * lethalityMultiplier;
//                 this.log.unshift(`Добавлено ${bonus.lethality.stacks} зарядов смертоносности`);
//             }
//             if (bonus.nextSpiritualStrike) {
//                 this.player.spiritualStrikeBonus += bonus.nextSpiritualStrike.bonus;
//                 this.log.unshift(`Следующий Духовный удар усилен на ${bonus.nextSpiritualStrike.bonus}`);
//             }
//             if (bonus.nextAttack) {
//                 this.player.nextAttackBonus += bonus.nextAttack.bonus;
//                 this.log.unshift(`Следующая атака усилена на ${bonus.nextAttack.bonus}`);
//             }
//             if (bonus.block) {
//                 this.player.buffs.push({ type: "block", value: bonus.block.attacks, duration: 1 });
//                 this.log.unshift(`Игрок блокирует ${bonus.block.attacks} атаки`);
//             }
//             if (bonus.healOnDamage) {
//                 this.player.buffs.push({
//                     type: "healOnDamage",
//                     value: bonus.healOnDamage.value,
//                     duration: bonus.healOnDamage.duration,
//                 });
//                 this.log.unshift(`Игрок восстанавливает ${bonus.healOnDamage.value} HP при получении урона на ${bonus.healOnDamage.duration} хода`);
//             }
//             if (bonus.blockHealing) {
//                 this.player.blockHealing = true;
//                 this.log.unshift("Исцеляющие карты заблокированы");
//             }
//             if (bonus.redirectAttack) {
//                 this.player.buffs.push({ type: "redirectAttack", value: 0, duration: bonus.redirectAttack.duration });
//                 this.log.unshift(`Следующая атака моба будет перенаправлена`);
//             }
//             if (bonus.invulnerability) {
//                 this.player.buffs.push({ type: "invulnerability", value: 0, duration: bonus.invulnerability.duration });
//                 this.player.buffs.push({ type: "noAttack", value: 0, duration: bonus.noAttack.duration });
//                 this.log.unshift(`Игрок неуязвим на ${bonus.invulnerability.duration} хода, но не может атаковать`);
//             }
//             if (bonus.transform && this.player.burnStacks >= 10) {
//                 this.player.buffs.push({ type: "transform", value: bonus.transform.attack, duration: Infinity });
//                 this.log.unshift(`Игрок превратился в Вечное пламя, нанося ${bonus.transform.attack} урона/ход`);
//             }
//             if (bonus.copyCard) {
//                 const nonUltimateCards = this.deck.filter(c => c.rare !== "epic").concat(this.hand.filter(c => c.rare !== "epic"));
//                 if (nonUltimateCards.length > 0) {
//                     const randomCard = nonUltimateCards[Math.floor(Math.random() * nonUltimateCards.length)];
//                     this.hand.push({ ...randomCard });
//                     this.log.unshift(`Скопирована карта "${randomCard.name}"`);
//                 }
//             }
//         },
//
//         // Завершение хода игрока
//         async endTurn() {
//             if (this.gameOver || this.turn !== "player") return;
//             this.turn = "mob";
//
//             // Применение эффектов поджога, яда и т.д.
//             this.mob!.debuffs.forEach(debuff => {
//                 if (debuff.type === "burn" || debuff.type === "poison") {
//                     this.mob!.stats.hp = Math.max(0, this.mob!.stats.hp - debuff.value);
//                     this.log.unshift(`Моб получает ${debuff.value} урона от ${debuff.type === "burn" ? "поджога" : "яда"}`);
//                     this.mobStatusText = `-${debuff.value} HP`;
//                 }
//             });
//
//             // Применение трансформации
//             const transformBuff = this.player.buffs.find(b => b.type === "transform");
//             if (transformBuff) {
//                 this.mob!.stats.hp = Math.max(0, this.mob!.stats.hp - transformBuff.value);
//                 this.log.unshift(`Моб получает ${transformBuff.value} урона от Вечного пламени`);
//                 this.mobStatusText = `-${transformBuff.value} HP`;
//             }
//
//             // Проверка смерти моба
//             if (this.mob!.stats.hp <= 0) {
//                 this.gameOver = true;
//                 this.winner = "player";
//                 this.mobAnimation = "game__mob--death";
//                 this.mobStatusText = "Смерть";
//                 this.player.gold += 50;
//                 this.player.resources += 20;
//                 this.log.unshift("Игрок победил!");
//                 return;
//             }
//
//             // Обновление баффов игрока
//             this.player.buffs = this.player.buffs.map(buff => ({
//                 ...buff,
//                 duration: buff.duration - 1,
//             })).filter(buff => buff.duration > 0);
//
//             // Ход моба
//             if (this.mob!.stats.hp > 0) {
//                 const isStunned = this.mob!.debuffs.some(debuff => debuff.type === "stun");
//                 if (!isStunned) {
//                     const action = this.mob!.actions[Math.floor(Math.random() * this.mob!.actions.length)];
//                     let damage = this.getMobCurrentStat("attack");
//                     const redirect = this.player.buffs.some(b => b.type === "redirectAttack");
//                     const invulnerable = this.player.buffs.some(b => b.type === "invulnerability");
//                     const block = this.player.buffs.find(b => b.type === "block");
//                     const damageReduction = this.player.buffs.find(b => b.type === "damageReduction");
//
//                     if (action.type === "attack" && !redirect && !invulnerable && !block) {
//                         const hitChance = this.getMobCurrentStat("hitChance");
//                         if (Math.random() * 100 < hitChance) {
//                             if (Math.random() * 100 < this.getMobCurrentStat("critical")) {
//                                 damage *= 2;
//                                 this.playerAnimation = "game__person--hurt";
//                                 this.playerStatusText = `Критический удар! -${damage} HP`;
//                             } else {
//                                 this.playerAnimation = "game__person--hurt";
//                                 this.playerStatusText = `-${damage} HP`;
//                             }
//                             let actualDamage = Math.max(1, damage - this.getPlayerCurrentStat("defence"));
//                             if (damageReduction) {
//                                 actualDamage = Math.floor(actualDamage * (1 - damageReduction.value / 100));
//                             }
//                             this.player.stats.hp = Math.max(0, this.player.stats.hp - actualDamage);
//                             this.log.unshift(`${this.mob!.name} наносит ${actualDamage} урона игроку`);
//
//                             // Контрудар и поджог при защите
//                             const counterAttack = this.player.buffs.find(b => b.type === "counterAttack");
//                             if (counterAttack) {
//                                 this.mob!.stats.hp = Math.max(0, this.mob!.stats.hp - counterAttack.value);
//                                 this.log.unshift(`Игрок наносит ${counterAttack.value} урона в ответ`);
//                             }
//                             const freezeOnDefend = this.player.buffs.find(b => b.type === "freeze" && b.onDefend);
//                             if (freezeOnDefend) {
//                                 this.mob!.debuffs.push({ type: "stun", value: 0, duration: freezeOnDefend.duration });
//                                 this.log.unshift("Моб заморожен на 1 ход");
//                             }
//                             const burnOnDefend = this.player.buffs.find(b => b.type === "burn" && b.onDefend);
//                             if (burnOnDefend) {
//                                 this.player.burnStacks += burnOnDefend.value;
//                                 this.mob!.debuffs.push({ type: "burn", value: burnOnDefend.value, duration: 1 });
//                                 this.log.unshift("Моб подожжен на 1 стак");
//                             }
//                         } else {
//                             this.log.unshift(`${this.mob!.name} промахнулся`);
//                             this.playerStatusText = "Промах";
//                         }
//                     } else if (action.type === "attack" && redirect) {
//                         this.mob!.stats.hp = Math.max(0, this.mob!.stats.hp - damage);
//                         this.log.unshift(`Атака ${this.mob!.name} перенаправлена, ${damage} урона себе`);
//                         this.mobAnimation = "game__mob--hurt";
//                         this.mobStatusText = `-${damage} HP`;
//                     } else if (action.type === "attack" && block) {
//                         block.value--;
//                         if (block.value <= 0) {
//                             this.player.buffs = this.player.buffs.filter(b => b !== block);
//                         }
//                         this.log.unshift("Атака заблокирована!");
//                         this.playerStatusText = "Блок";
//                     } else if (action.type === "attack" && invulnerable) {
//                         this.log.unshift("Игрок неуязвим!");
//                         this.playerStatusText = "Неуязвим";
//                     } else {
//                         const debuffImmunity = this.player.buffs.some(b => b.type === "debuffImmunity");
//                         if (!debuffImmunity || action.type !== "debuff") {
//                             action.effect(this);
//                         }
//                     }
//                     this.mobAnimation = action.type === "attack" ? "game__mob--attack" : "";
//                 } else {
//                     this.log.unshift("Моб оглушен и пропускает ход");
//                 }
//             }
//
//             // Обновление дебаффов моба
//             this.mob!.debuffs = this.mob!.debuffs.map(debuff => ({
//                 ...debuff,
//                 duration: debuff.duration - 1,
//             })).filter(debuff => debuff.duration > 0);
//
//             // Проверка смерти игрока
//             if (this.player.stats.hp <= 0) {
//                 this.gameOver = true;
//                 this.winner = "mob";
//                 this.playerAnimation = "game__person--death";
//                 this.playerStatusText = "Смерть";
//                 this.log.unshift("Игрок проиграл!");
//                 return;
//             }
//
//             // Восстановление маны и вытягивание карты
//             this.player.stats.mp = this.player.stats.maxMp;
//             this.player.playedCardsThisTurn = 0;
//             this.drawCard();
//             this.turn = "player";
//
//             // Очистка анимаций
//             setTimeout(() => {
//                 this.playerAnimation = "";
//                 this.mobAnimation = "";
//                 this.playerStatusText = "";
//                 this.mobStatusText = "";
//             }, 1000);
//         },
//
//         // Обработка поражения
//         handleLoss() {
//             // Заглушка для наказания
//             console.log("Игрок проиграл, применено наказание");
//         },
//     },
// });