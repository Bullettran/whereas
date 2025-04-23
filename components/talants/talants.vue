<script lang="ts">
import { defineComponent } from "vue";
import { usePersonState } from "~/stores/person";

// Таланты для всех классов
const talentsByClass = {
    ranger: {
        character: [
            {
                id: "agile-strike",
                name: "Ловкий удар",
                icon: "sharpshooter.png",
                description: "+5 к ловкости (agi).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { agi: 5 },
                type: "passive",
            },
            {
                id: "sharpshooter",
                name: "Меткий стрелок",
                icon: "sharpshooter.png",
                description: "+5 к меткости (acc).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { acc: 5 },
                type: "passive",
            },
            // todo(kharal)
            {
                id: "poison-mastery",
                name: "Мастерство ядов",
                icon: "sharpshooter.png",
                description: "Атаки имеют 20% шанс наложить яд (2 урона за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { poison: { chance: 20, value: 2, duration: 3 } },
                type: "active",
            },
            {
                id: "evasive-maneuver",
                name: "Уклончивый манёвр",
                icon: "evasive-maneuver.png",
                description: "+5 к уклонению (dodge).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { dodge: 5 },
                type: "passive",
            },
            {
                id: "critical-focus",
                name: "Критическая точность",
                icon: "critical-focus.png",
                description: "+10% к шансу критического удара при HP выше 75%.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { criticalChance: 10, condition: { hpAbove: 75 } },
                type: "active",
            },
            // todo(kharal)
            {
                id: "swift-recovery",
                name: "Быстрое восстановление",
                icon: "sharpshooter.png",
                description: "+10% к регенерации маны.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { manaRegen: 10 },
                type: "passive",
            },
            {
                id: "fatal-precision",
                name: "Смертельная точность",
                icon: "sharpshooter.png",
                description: "Критические удары наносят +20% урона.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { criticalMultiplierBonus: 20 },
                type: "passive",
            },
        ],
        slot: [
            {
                id: "master-archer",
                name: "Мастер-лучник",
                icon: "master-archer.png",
                description: "Карты атаки наносят +1 урон.",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { attackDamage: 1 },
                type: "passive",
            },
            {
                id: "poisoned-tip",
                name: "Ядовитый наконечник",
                icon: "poisoned-tip.png",
                description: "Карты атаки имеют 10% шанс наложить яд (1 урон за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { poison: { chance: 10, value: 1, duration: 3 } },
                type: "active",
            },
            {
                id: "extra-slot",
                name: "Дополнительный слот",
                icon: "quick-draw.png",
                description: "Увеличивает максимальное количество карт в бою до 4.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { maxSelectedCards: 4 },
                type: "passive",
            },
            {
                id: "bleeding-edge",
                name: "Кровоточащий край",
                icon: "bleeding-edge.png",
                description: "Карты атаки имеют 10% шанс наложить кровотечение (1 урон за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { bleed: { chance: 15, value: 1, duration: 3 } },
                type: "active",
            },
            {
                id: "steady-aim",
                name: "Твёрдая рука",
                icon: "steady-aim.png",
                description: "Карты атаки дают +3 меткости на 1 ход.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { attackAccuracyBonus: 3 },
                type: "active",
            },
            {
                id: "survivalist",
                name: "Выживальщик",
                icon: "survivalist.png",
                description: "Карты лечения восстанавливают +1 HP.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { healBonus: 1 },
                type: "passive",
            },
            {
                id: "quick-draw",
                name: "Быстрая перезарядка",
                icon: "quick-draw.png",
                description: "Снижает стоимость маны всех карт на 1 (минимум 0).",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { manaCostReduction: 1 },
                type: "passive",
            },
        ],
        cards: [
            {
                id: "sniper-shot",
                name: "Снайперский выстрел",
                icon: "sniper-shot.png",
                description: "Добавляет карту 'Снайперский выстрел' (+3 меткости, +100% шанс попадания).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: {
                    card: {
                        name: "Снайперский выстрел",
                        type: "Атака",
                        rare: "rare",
                        description: "+3 меткости, +100% шанс попадания на 1 ход",
                        count: 1,
                        icon: "sniper-shot.png",
                        bonus: { acc: 3, hitChance: true },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "explosive-arrow",
                name: "Взрывная стрела",
                icon: "explosive-arrow.png",
                description: "Добавляет карту 'Взрывная стрела' (+2 урона, эффект кровотечения).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: {
                    card: {
                        name: "Взрывная стрела",
                        type: "Атака",
                        rare: "rare",
                        description: "+2 урона, наносит кровотечение (2 урона за ход, 3 хода)",
                        count: 1,
                        icon: "explosive-arrow.png",
                        bonus: { str: 2, bleed: 2 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            // todo(kharal)
            {
                id: "rapid-fire",
                name: "Скорострельность",
                icon: "explosive-arrow.png",
                description: "Карты атаки получают +1 использование.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { attackCardCount: 1 },
                type: "passive",
            },
            {
                id: "poison-barrage",
                name: "Ядовитый шквал",
                icon: "poison-barrage.png",
                description: "Добавляет карту 'Ядовитый шквал' (накладывает яд 2 урона за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: {
                    card: {
                        name: "Ядовитый шквал",
                        type: "Атака",
                        rare: "rare",
                        description: "Накладывает яд (2 урона за ход, 3 хода)",
                        count: 1,
                        icon: "poison-barrage.png",
                        bonus: { poison: 2 },
                        manaCost: 3,
                        duration: 3,
                    },
                },
                type: "active",
            },
            {
                id: "hunting-trap",
                name: "Охотничья ловушка",
                icon: "hunting-trap.png",
                description: "Добавляет карту 'Охотничья ловушка' (замедляет врага, -5 скорости на 2 хода).",
                maxLevel: 1,
                requiredLevel: 5,
                effect: {
                    card: {
                        name: "Охотничья ловушка",
                        type: "Контроль",
                        rare: "rare",
                        description: "Замедляет врага (-5 скорости на 2 хода)",
                        count: 1,
                        icon: "hunting-trap.png",
                        bonus: { spd: -5 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "evasion-boost",
                name: "Усиление уклонения",
                icon: "evasion-boost.png",
                description: "Добавляет карту 'Усиление уклонения' (+5 уклонения на 2 хода).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: {
                    card: {
                        name: "Усиление уклонения",
                        type: "Защита",
                        rare: "rare",
                        description: "+5 уклонения на 2 хода",
                        count: 1,
                        icon: "evasion-boost.png",
                        bonus: { dodge: 5 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "legendary-archer",
                name: "Легендарный лучник",
                icon: "legendary-archer.png",
                description: "Добавляет карту 'Легендарный выстрел' (+5 урона, +10% шанс критического удара).",
                maxLevel: 1,
                requiredLevel: 7,
                effect: {
                    card: {
                        name: "Легендарный выстрел",
                        type: "Атака",
                        rare: "epic",
                        description: "+5 урона, +10% шанс критического удара",
                        count: 1,
                        icon: "legendary-archer.png",
                        bonus: { str: 5, criticalChance: 10 },
                        manaCost: 4,
                    },
                },
                type: "active",
            },
        ],
    },
    wrecker: {
        character: [
            {
                id: "iron-skin",
                name: "Железная кожа",
                icon: "iron-skin.png",
                description: "+5 к защите (def).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { def: 5 },
                type: "passive",
            },
            {
                id: "brute-strength",
                name: "Грубая сила",
                icon: "brute-strength.png",
                description: "+5 к силе (str).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { str: 5 },
                type: "passive",
            },
            {
                id: "stunning-blow",
                name: "Оглушающий удар",
                icon: "stunning-blow.png",
                description: "Атаки имеют 10% шанс оглушить врага на 1 ход.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { stun: { chance: 10, duration: 1 } },
                type: "active",
            },
            {
                id: "vital-fortitude",
                name: "Крепкое здоровье",
                icon: "vital-fortitude.png",
                description: "+5 к максимальному здоровью.",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { maxHp: 5 },
                type: "passive",
            },
            {
                id: "berserk-rage",
                name: "Ярость берсерка",
                icon: "berserk-rage.png",
                description: "+10% к урону при HP ниже 50%.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { damageBonus: 10, condition: { hpBelow: 50 } },
                type: "active",
            },
            {
                id: "enduring-might",
                name: "Стойкая мощь",
                icon: "enduring-might.png",
                description: "+3 к выносливости (vit).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { vit: 3 },
                type: "passive",
            },
            {
                id: "unbreakable",
                name: "Несокрушимый",
                icon: "unbreakable.png",
                description: "+5 к защите при HP ниже 25%.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { def: 5, condition: { hpBelow: 25 } },
                type: "active",
            },
        ],
        slot: [
            {
                id: "heavy-strike",
                name: "Тяжёлый удар",
                icon: "heavy-strike.png",
                description: "Карты атаки наносят +1 урон.",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { attackDamage: 1 },
                type: "passive",
            },
            {
                id: "stun-chance",
                name: "Шанс оглушения",
                icon: "stun-chance.png",
                description: "Карты атаки имеют 10% шанс оглушить врага на 1 ход.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { stun: { chance: 10, duration: 1 } },
                type: "active",
            },
            {
                id: "fortified-defense",
                name: "Укреплённая защита",
                icon: "fortified-defense.png",
                description: "Карты защиты дают +2 защиты на 1 ход.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { defenseBonus: 2 },
                type: "active",
            },
            {
                id: "mana-efficiency",
                name: "Экономия маны",
                icon: "mana-efficiency.png",
                description: "Снижает стоимость маны всех карт на 1 (минимум 0).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { manaCostReduction: 1 },
                type: "passive",
            },
            {
                id: "vital-recovery",
                name: "Восстановление сил",
                icon: "vital-recovery.png",
                description: "Карты атаки восстанавливают 1 HP.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { attackHeal: 1 },
                type: "active",
            },
            {
                id: "critical-boost",
                name: "Критический импульс",
                icon: "critical-boost.png",
                description: "Карты атаки имеют +5% шанс критического удара.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { criticalChance: 5 },
                type: "passive",
            },
            {
                id: "powerful-blow",
                name: "Мощный удар",
                icon: "powerful-blow.png",
                description: "Карты атаки наносят +2 урона.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { attackDamage: 2 },
                type: "passive",
            },
        ],
        cards: [
            {
                id: "smash",
                name: "Сокрушение",
                icon: "smash.png",
                description: "Добавляет карту 'Сокрушение' (+3 силы, игнорирует 50% защиты).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: {
                    card: {
                        name: "Сокрушение",
                        type: "Атака",
                        rare: "rare",
                        description: "+3 силы, игнорирует 50% защиты врага",
                        count: 1,
                        icon: "smash.png",
                        bonus: { str: 3, ignoreDefense: 50 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "shield-bash",
                name: "Удар щитом",
                icon: "shield-bash.png",
                description: "Добавляет карту 'Удар щитом' (+2 защиты, +1 урон).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: {
                    card: {
                        name: "Удар щитом",
                        type: "Защита",
                        rare: "rare",
                        description: "+2 защиты, наносит 1 урон",
                        count: 1,
                        icon: "shield-bash.png",
                        bonus: { def: 2, str: 1 },
                        manaCost: 2,
                    },
                },
                type: "active",
            },
            {
                id: "rage",
                name: "Ярость",
                icon: "rage.png",
                description: "Добавляет карту 'Ярость' (+3 силы на 2 хода).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: {
                    card: {
                        name: "Ярость",
                        type: "Бафф",
                        rare: "rare",
                        description: "+3 силы на 2 хода",
                        count: 1,
                        icon: "rage.png",
                        bonus: { str: 3 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "stun-strike",
                name: "Оглушающий удар",
                icon: "stun-strike.png",
                description: "Добавляет карту 'Оглушающий удар' (оглушает врага на 1 ход).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: {
                    card: {
                        name: "Оглушающий удар",
                        type: "Контроль",
                        rare: "rare",
                        description: "Оглушает врага на 1 ход",
                        count: 1,
                        icon: "stun-strike.png",
                        bonus: { stun: 1 },
                        manaCost: 3,
                        duration: 1,
                    },
                },
                type: "active",
            },
            {
                id: "blood-strike",
                name: "Кровавый удар",
                icon: "blood-strike.png",
                description: "Добавляет карту 'Кровавый удар' (+2 урона, эффект кровотечения).",
                maxLevel: 1,
                requiredLevel: 5,
                effect: {
                    card: {
                        name: "Кровавый удар",
                        type: "Атака",
                        rare: "rare",
                        description: "+2 урона, наносит кровотечение (2 урона за ход, 3 хода)",
                        count: 1,
                        icon: "blood-strike.png",
                        bonus: { str: 2, bleed: 2 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "unyielding",
                name: "Несокрушимость",
                icon: "unyielding.png",
                description: "Добавляет карту 'Несокрушимость' (+5 защиты на 2 хода).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: {
                    card: {
                        name: "Несокрушимость",
                        type: "Защита",
                        rare: "rare",
                        description: "+5 защиты на 2 хода",
                        count: 1,
                        icon: "unyielding.png",
                        bonus: { def: 5 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "extra-attack",
                name: "Дополнительная атака",
                icon: "extra-attack.png",
                description: "Карты атаки получают +1 использование.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { attackCardCount: 1 },
                type: "passive",
            },
        ],
    },
    arcanist: {
        character: [
            {
                id: "arcane-mastery",
                name: "Мастерство магии",
                icon: "arcane-mastery.png",
                description: "+5 к интеллекту (int).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { int: 5 },
                type: "passive",
            },
            {
                id: "mana-reserve",
                name: "Запас маны",
                icon: "mana-reserve.png",
                description: "+5 к максимальной мане.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { maxMp: 5 },
                type: "passive",
            },
            {
                id: "frost-bite",
                name: "Ледяной укус",
                icon: "frost-bite.png",
                description: "Атаки имеют 10% шанс заморозить врага на 1 ход.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { freeze: { chance: 10, duration: 1 } },
                type: "active",
            },
            {
                id: "arcane-endurance",
                name: "Магическая выносливость",
                icon: "arcane-endurance.png",
                description: "+3 к интеллекту.",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { int: 3 },
                type: "passive",
            },
            {
                id: "mana-surge",
                name: "Всплеск маны",
                icon: "mana-surge.png",
                description: "+10% к регенерации маны при мане ниже 50%.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { manaRegen: 10, condition: { mpBelow: 50 } },
                type: "active",
            },
            {
                id: "spell-resistance",
                name: "Сопротивление магии",
                icon: "spell-resistance.png",
                description: "+5 к сопротивлению магии.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { magicResist: 5 },
                type: "passive",
            },
            {
                id: "arcane-power",
                name: "Магическая мощь",
                icon: "arcane-power.png",
                description: "+5% к магическому урону.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { magicDamageBonus: 5 },
                type: "passive",
            },
        ],
        slot: [
            {
                id: "arcane-focus",
                name: "Магический фокус",
                icon: "arcane-focus.png",
                description: "Карты магии наносят +1 урон.",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { magicDamage: 1 },
                type: "passive",
            },
            {
                id: "mana-preservation",
                name: "Сохранение маны",
                icon: "mana-preservation.png",
                description: "Карты магии имеют 10% шанс не тратить ману.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { manaSaveChance: 10 },
                type: "active",
            },
            {
                id: "frost-shard",
                name: "Ледяной осколок",
                icon: "frost-shard.png",
                description: "Карты магии имеют 15% шанс заморозить врага на 1 ход.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { freeze: { chance: 15, duration: 1 } },
                type: "active",
            },
            {
                id: "mana-efficiency",
                name: "Экономия маны",
                icon: "mana-efficiency.png",
                description: "Снижает стоимость маны магических карт на 1 (минимум 0).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { manaCostReduction: 1 },
                type: "passive",
            },
            {
                id: "arcane-burst",
                name: "Магический взрыв",
                icon: "arcane-burst.png",
                description: "Карты магии наносят +1 урон при мане выше 75%.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { magicDamage: 1, condition: { mpAbove: 75 } },
                type: "active",
            },
            {
                id: "critical-spell",
                name: "Критическое заклинание",
                icon: "critical-spell.png",
                description: "Карты магии имеют +5% шанс критического удара.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { criticalChance: 5 },
                type: "passive",
            },
            {
                id: "mana-regeneration",
                name: "Регенерация маны",
                icon: "mana-regeneration.png",
                description: "Карты магии восстанавливают 1 ману.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { manaRegen: 1 },
                type: "active",
            },
        ],
        cards: [
            {
                id: "fireball",
                name: "Огненный шар",
                icon: "fireball.png",
                description: "Добавляет карту 'Огненный шар' (+3 магического урона).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: {
                    card: {
                        name: "Огненный шар",
                        type: "Магия",
                        rare: "rare",
                        description: "+3 магического урона",
                        count: 1,
                        icon: "fireball.png",
                        bonus: { int: 3 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "ice-arrow",
                name: "Ледяная стрела",
                icon: "ice-arrow.png",
                description: "Добавляет карту 'Ледяная стрела' (+2 урона, замораживает на 1 ход).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: {
                    card: {
                        name: "Ледяная стрела",
                        type: "Магия",
                        rare: "rare",
                        description: "+2 урона, замораживает врага на 1 ход",
                        count: 1,
                        icon: "ice-arrow.png",
                        bonus: { int: 2, freeze: 1 },
                        manaCost: 3,
                        duration: 1,
                    },
                },
                type: "active",
            },
            {
                id: "arcane-shield",
                name: "Магический щит",
                icon: "arcane-shield.png",
                description: "Добавляет карту 'Магический щит' (+3 защиты на 2 хода).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: {
                    card: {
                        name: "Магический щит",
                        type: "Защита",
                        rare: "rare",
                        description: "+3 защиты на 2 хода",
                        count: 1,
                        icon: "arcane-shield.png",
                        bonus: { def: 3 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "lightning-bolt",
                name: "Молния",
                icon: "lightning-bolt.png",
                description: "Добавляет карту 'Молния' (+3 магического урона).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: {
                    card: {
                        name: "Молния",
                        type: "Магия",
                        rare: "rare",
                        description: "+3 магического урона",
                        count: 1,
                        icon: "lightning-bolt.png",
                        bonus: { int: 3 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "arcane-explosion",
                name: "Магический взрыв",
                icon: "arcane-explosion.png",
                description: "Добавляет карту 'Магический взрыв' (+2 урона всем врагам).",
                maxLevel: 1,
                requiredLevel: 5,
                effect: {
                    card: {
                        name: "Магический взрыв",
                        type: "Магия",
                        rare: "rare",
                        description: "+2 урона всем врагам",
                        count: 1,
                        icon: "arcane-explosion.png",
                        bonus: { int: 2, aoe: true },
                        manaCost: 4,
                    },
                },
                type: "active",
            },
            {
                id: "mana-restore",
                name: "Восстановление маны",
                icon: "mana-restore.png",
                description: "Добавляет карту 'Восстановление маны' (+5 маны).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: {
                    card: {
                        name: "Восстановление маны",
                        type: "Бафф",
                        rare: "rare",
                        description: "Восстанавливает 5 маны",
                        count: 1,
                        icon: "mana-restore.png",
                        bonus: { mp: 5 },
                        manaCost: 1,
                    },
                },
                type: "active",
            },
            {
                id: "extra-spell",
                name: "Дополнительное заклинание",
                icon: "extra-spell.png",
                description: "Карты магии получают +1 использование.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { magicCardCount: 1 },
                type: "passive",
            },
        ],
    },
    monk: {
        character: [
            {
                id: "inner-peace",
                name: "Внутренний покой",
                icon: "inner-peace.png",
                description: "+3 к выносливости (vit).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { vit: 3 },
                type: "passive",
            },
            {
                id: "vital-resilience",
                name: "Живучая стойкость",
                icon: "vital-resilience.png",
                description: "+5 к максимальному здоровью.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { maxHp: 5 },
                type: "passive",
            },
            {
                id: "healing-strike",
                name: "Исцеляющий удар",
                icon: "healing-strike.png",
                description: "Атаки имеют 10% шанс восстановить 2 HP.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { heal: { chance: 10, value: 2 } },
                type: "active",
            },
            {
                id: "spiritual-defense",
                name: "Духовная защита",
                icon: "spiritual-defense.png",
                description: "+3 к защите (def).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { def: 3 },
                type: "passive",
            },
            {
                id: "zen-focus",
                name: "Дзен-фокус",
                icon: "zen-focus.png",
                description: "+10% к регенерации маны при HP выше 75%.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { manaRegen: 10, condition: { hpAbove: 75 } },
                type: "active",
            },
            {
                id: "evasive-spirit",
                name: "Уклончивый дух",
                icon: "evasive-spirit.png",
                description: "+5 к уклонению (dodge).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { dodge: 5 },
                type: "passive",
            },
            {
                id: "life-regeneration",
                name: "Регенерация жизни",
                icon: "life-regeneration.png",
                description: "+5% к регенерации здоровья.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { hpRegen: 5 },
                type: "passive",
            },
        ],
        slot: [
            {
                id: "chi-strike",
                name: "Удар чи",
                icon: "chi-strike.png",
                description: "Карты атаки восстанавливают 1 HP.",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { attackHeal: 1 },
                type: "active",
            },
            {
                id: "mana-preservation",
                name: "Сохранение маны",
                icon: "mana-preservation.png",
                description: "Карты имеют 10% шанс не тратить ману.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { manaSaveChance: 10 },
                type: "active",
            },
            {
                id: "spiritual-shield",
                name: "Духовный щит",
                icon: "spiritual-shield.png",
                description: "Карты защиты дают +2 защиты на 1 ход.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { defenseBonus: 2 },
                type: "active",
            },
            {
                id: "mana-efficiency",
                name: "Экономия маны",
                icon: "mana-efficiency.png",
                description: "Снижает стоимость маны всех карт на 1 (минимум 0).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { manaCostReduction: 1 },
                type: "passive",
            },
            {
                id: "critical-strike",
                name: "Критический удар",
                icon: "critical-strike.png",
                description: "Карты атаки имеют +5% шанс критического удара.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { criticalChance: 5 },
                type: "passive",
            },
            {
                id: "vital-strike",
                name: "Живучий удар",
                icon: "vital-strike.png",
                description: "Карты атаки наносят +1 урон.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { attackDamage: 1 },
                type: "passive",
            },
            {
                id: "healing-boost",
                name: "Усиление лечения",
                icon: "healing-boost.png",
                description: "Карты лечения восстанавливают +1 HP.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { healBonus: 1 },
                type: "passive",
            },
        ],
        cards: [
            {
                id: "healing-light",
                name: "Исцеляющий свет",
                icon: "healing-light.png",
                description: "Добавляет карту 'Исцеляющий свет' (+3 HP).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: {
                    card: {
                        name: "Исцеляющий свет",
                        type: "Лечение",
                        rare: "rare",
                        description: "Восстанавливает 3 HP",
                        count: 1,
                        icon: "healing-light.png",
                        bonus: { hp: 3 },
                        manaCost: 2,
                    },
                },
                type: "active",
            },
            {
                id: "spiritual-strike",
                name: "Духовный удар",
                icon: "spiritual-strike.png",
                description: "Добавляет карту 'Духовный удар' (+2 урона).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: {
                    card: {
                        name: "Духовный удар",
                        type: "Атака",
                        rare: "rare",
                        description: "+2 урона",
                        count: 1,
                        icon: "spiritual-strike.png",
                        bonus: { str: 2 },
                        manaCost: 2,
                    },
                },
                type: "active",
            },
            {
                id: "meditation",
                name: "Медитация",
                icon: "meditation.png",
                description: "Добавляет карту 'Медитация' (+3 маны).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: {
                    card: {
                        name: "Медитация",
                        type: "Бафф",
                        rare: "rare",
                        description: "Восстанавливает 3 маны",
                        count: 1,
                        icon: "meditation.png",
                        bonus: { mp: 3 },
                        manaCost: 1,
                    },
                },
                type: "active",
            },
            {
                id: "purification",
                name: "Очищение",
                icon: "purification.png",
                description: "Добавляет карту 'Очищение' (снимает 1 дебафф).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: {
                    card: {
                        name: "Очищение",
                        type: "Лечение",
                        rare: "rare",
                        description: "Снимает 1 дебафф",
                        count: 1,
                        icon: "purification.png",
                        bonus: { dispel: 1 },
                        manaCost: 2,
                    },
                },
                type: "active",
            },
            {
                id: "light-shield",
                name: "Светлый щит",
                icon: "light-shield.png",
                description: "Добавляет карту 'Светлый щит' (+3 защиты на 2 хода).",
                maxLevel: 1,
                requiredLevel: 5,
                effect: {
                    card: {
                        name: "Светлый щит",
                        type: "Защита",
                        rare: "rare",
                        description: "+3 защиты на 2 хода",
                        count: 1,
                        icon: "light-shield.png",
                        bonus: { def: 3 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "balance",
                name: "Равновесие",
                icon: "balance.png",
                description: "Добавляет карту 'Равновесие' (+2 HP и маны).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: {
                    card: {
                        name: "Равновесие",
                        type: "Лечение",
                        rare: "rare",
                        description: "Восстанавливает 2 HP и 2 маны",
                        count: 1,
                        icon: "balance.png",
                        bonus: { hp: 2, mp: 2 },
                        manaCost: 2,
                    },
                },
                type: "active",
            },
            {
                id: "extra-healing",
                name: "Дополнительное лечение",
                icon: "extra-healing.png",
                description: "Карты лечения получают +1 использование.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { healCardCount: 1 },
                type: "passive",
            },
        ],
    },
    inferno: {
        character: [
            {
                id: "blazing-heart",
                name: "Пылающее сердце",
                icon: "blazing-heart.png",
                description: "+5 к интеллекту (int).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { int: 5 },
                type: "passive",
            },
            {
                id: "fiery-reserve",
                name: "Огненный запас",
                icon: "fiery-reserve.png",
                description: "+5 к максимальной мане.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { maxMp: 5 },
                type: "passive",
            },
            {
                id: "burning-touch",
                name: "Пылающее касание",
                icon: "burning-touch.png",
                description: "Атаки имеют 10% шанс наложить горение (2 урона за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { burn: { chance: 10, value: 2, duration: 3 } },
                type: "active",
            },
            {
                id: "infernal-vigor",
                name: "Адская мощь",
                icon: "infernal-vigor.png",
                description: "+3 к интеллекту.",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { int: 3 },
                type: "passive",
            },
            {
                id: "flame-surge",
                name: "Всплеск пламени",
                icon: "flame-surge.png",
                description: "+10% к магическому урону при мане ниже 50%.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { magicDamageBonus: 10, condition: { mpBelow: 50 } },
                type: "active",
            },
            {
                id: "fire-resistance",
                name: "Огнестойкость",
                icon: "fire-resistance.png",
                description: "+5 к сопротивлению магии.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { magicResist: 5 },
                type: "passive",
            },
            {
                id: "hellfire",
                name: "Адское пламя",
                icon: "hellfire.png",
                description: "+5% к магическому урону.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { magicDamageBonus: 5 },
                type: "passive",
            },
        ],
        slot: [
            {
                id: "burning-strike",
                name: "Пылающий удар",
                icon: "burning-strike.png",
                description: "Карты атаки имеют 20% шанс наложить горение (1 урон за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { burn: { chance: 20, value: 1, duration: 3 } },
                type: "active",
            },
            {
                id: "mana-preservation",
                name: "Сохранение маны",
                icon: "mana-preservation.png",
                description: "Карты магии имеют 10% шанс не тратить ману.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { manaSaveChance: 10 },
                type: "active",
            },
            {
                id: "flame-burst",
                name: "Взрыв пламени",
                icon: "flame-burst.png",
                description: "Карты магии наносят +1 урон.",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { magicDamage: 1 },
                type: "passive",
            },
            {
                id: "mana-efficiency",
                name: "Экономия маны",
                icon: "mana-efficiency.png",
                description: "Снижает стоимость маны магических карт на 1 (минимум 0).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { manaCostReduction: 1 },
                type: "passive",
            },
            {
                id: "critical-flame",
                name: "Критическое пламя",
                icon: "critical-flame.png",
                description: "Карты магии имеют +5% шанс критического удара.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { criticalChance: 5 },
                type: "passive",
            },
            {
                id: "infernal-regeneration",
                name: "Адская регенерация",
                icon: "infernal-regeneration.png",
                description: "Карты магии восстанавливают 1 ману.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { manaRegen: 1 },
                type: "active",
            },
            {
                id: "flame-power",
                name: "Сила пламени",
                icon: "flame-power.png",
                description: "Карты магии наносят +2 урон.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { magicDamage: 2 },
                type: "passive",
            },
        ],
        cards: [
            {
                id: "inferno-blast",
                name: "Адский взрыв",
                icon: "inferno-blast.png",
                description: "Добавляет карту 'Адский взрыв' (+3 магического урона).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: {
                    card: {
                        name: "Адский взрыв",
                        type: "Магия",
                        rare: "rare",
                        description: "+3 магического урона",
                        count: 1,
                        icon: "inferno-blast.png",
                        bonus: { int: 3 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "flame-shield",
                name: "Огненный щит",
                icon: "flame-shield.png",
                description: "Добавляет карту 'Огненный щит' (+3 защиты на 2 хода).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: {
                    card: {
                        name: "Огненный щит",
                        type: "Защита",
                        rare: "rare",
                        description: "+3 защиты на 2 хода",
                        count: 1,
                        icon: "flame-shield.png",
                        bonus: { def: 3 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "blaze",
                name: "Пламя",
                icon: "blaze.png",
                description: "Добавляет карту 'Пламя' (+2 урона, эффект горения).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: {
                    card: {
                        name: "Пламя",
                        type: "Магия",
                        rare: "rare",
                        description: "+2 урона, наносит горение (2 урона за ход, 3 хода)",
                        count: 1,
                        icon: "blaze.png",
                        bonus: { int: 2, burn: 2 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "fire-whirl",
                name: "Огненный вихрь",
                icon: "fire-whirl.png",
                description: "Добавляет карту 'Огненный вихрь' (+2 урона всем врагам).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: {
                    card: {
                        name: "Огненный вихрь",
                        type: "Магия",
                        rare: "rare",
                        description: "+2 урона всем врагам",
                        count: 1,
                        icon: "fire-whirl.png",
                        bonus: { int: 2, aoe: true },
                        manaCost: 4,
                    },
                },
                type: "active",
            },
            {
                id: "heat-wave",
                name: "Жар",
                icon: "heat-wave.png",
                description: "Добавляет карту 'Жар' (+3 магического урона).",
                maxLevel: 1,
                requiredLevel: 5,
                effect: {
                    card: {
                        name: "Жар",
                        type: "Магия",
                        rare: "rare",
                        description: "+3 магического урона",
                        count: 1,
                        icon: "heat-wave.png",
                        bonus: { int: 3 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "spark",
                name: "Вспышка",
                icon: "spark.png",
                description: "Добавляет карту 'Вспышка' (+2 маны).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: {
                    card: {
                        name: "Вспышка",
                        type: "Бафф",
                        rare: "rare",
                        description: "Восстанавливает 2 маны",
                        count: 1,
                        icon: "spark.png",
                        bonus: { mp: 2 },
                        manaCost: 1,
                    },
                },
                type: "active",
            },
            {
                id: "extra-flame",
                name: "Дополнительное пламя",
                icon: "extra-flame.png",
                description: "Карты магии получают +1 использование.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { magicCardCount: 1 },
                type: "passive",
            },
        ],
    },
    assassin: {
        character: [
            {
                id: "shadow-strike",
                name: "Теневой удар",
                icon: "shadow-strike.png",
                description: "+5 к шансу критического удара.",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { criticalChance: 5 },
                type: "passive",
            },
            {
                id: "nimble-feet",
                name: "Лёгкие шаги",
                icon: "nimble-feet.png",
                description: "+5 к ловкости (agi).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { agi: 5 },
                type: "passive",
            },
            {
                id: "poisoned-blade",
                name: "Ядовитый клинок",
                icon: "poisoned-blade.png",
                description: "Атаки имеют 10% шанс наложить яд (2 урона за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { poison: { chance: 10, value: 2, duration: 3 } },
                type: "active",
            },
            {
                id: "evasive-shadow",
                name: "Теневое уклонение",
                icon: "evasive-shadow.png",
                description: "+5 к уклонению (dodge).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { dodge: 5 },
                type: "passive",
            },
            {
                id: "first-strike",
                name: "Первый удар",
                icon: "first-strike.png",
                description: "+10% к урону, если враг не атаковал в этом ходу.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { damageBonus: 10, condition: { enemyNotAttacked: true } },
                type: "active",
            },
            {
                id: "swift-movement",
                name: "Быстрое движение",
                icon: "swift-movement.png",
                description: "+3 к скорости (spd).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { spd: 3 },
                type: "passive",
            },
            {
                id: "deadly-accuracy",
                name: "Смертельная точность",
                icon: "deadly-accuracy.png",
                description: "+5 к меткости (acc).",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { acc: 5 },
                type: "passive",
            },
        ],
        slot: [
            {
                id: "backstab",
                name: "Удар в спину",
                icon: "backstab.png",
                description: "Карты атаки наносят +50% урона, если враг не атаковал в этом ходу.",
                maxLevel: 1,
                requiredLevel: 1,
                effect: { backstabBonus: 50 },
                type: "active",
            },
            {
                id: "swift-strike",
                name: "Быстрый удар",
                icon: "swift-strike.png",
                description: "Карты атаки наносят +1 урон.",
                maxLevel: 1,
                requiredLevel: 2,
                effect: { attackDamage: 1 },
                type: "passive",
            },
            {
                id: "poisoned-edge",
                name: "Ядовитый край",
                icon: "poisoned-edge.png",
                description: "Карты атаки имеют 10% шанс наложить яд (1 урон за ход, 3 хода).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: { poison: { chance: 10, value: 1, duration: 3 } },
                type: "active",
            },
            {
                id: "mana-efficiency",
                name: "Экономия маны",
                icon: "mana-efficiency.png",
                description: "Снижает стоимость маны всех карт на 1 (минимум 0).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: { manaCostReduction: 1 },
                type: "passive",
            },
            {
                id: "critical-edge",
                name: "Критический край",
                icon: "critical-edge.png",
                description: "Карты атаки имеют +5% шанс критического удара.",
                maxLevel: 1,
                requiredLevel: 5,
                effect: { criticalChance: 5 },
                type: "passive",
            },
            {
                id: "evasive-strike",
                name: "Уклончивый удар",
                icon: "evasive-strike.png",
                description: "Карты атаки дают +3 уклонения на 1 ход.",
                maxLevel: 1,
                requiredLevel: 6,
                effect: { attackDodgeBonus: 3 },
                type: "active",
            },
            {
                id: "extra-attack",
                name: "Дополнительная атака",
                icon: "extra-attack.png",
                description: "Карты атаки получают +1 использование.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { attackCardCount: 1 },
                type: "passive",
            },
        ],
        cards: [
            {
                id: "shadow-blade",
                name: "Теневой клинок",
                icon: "shadow-blade.png",
                description: "Добавляет карту 'Теневой клинок' (+3 силы, +10% шанс критического удара).",
                maxLevel: 1,
                requiredLevel: 1,
                effect: {
                    card: {
                        name: "Теневой клинок",
                        type: "Атака",
                        rare: "rare",
                        description: "+3 силы, +10% шанс критического удара",
                        count: 1,
                        icon: "shadow-blade.png",
                        bonus: { str: 3, criticalChance: 10 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "poison-strike",
                name: "Ядовитый удар",
                icon: "poison-strike.png",
                description: "Добавляет карту 'Ядовитый удар' (+2 урона, эффект яда).",
                maxLevel: 1,
                requiredLevel: 2,
                effect: {
                    card: {
                        name: "Ядовитый удар",
                        type: "Атака",
                        rare: "rare",
                        description: "+2 урона, наносит яд (2 урона за ход, 3 хода)",
                        count: 1,
                        icon: "poison-strike.png",
                        bonus: { str: 2, poison: 2 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "shadow-veil",
                name: "Теневая завеса",
                icon: "shadow-veil.png",
                description: "Добавляет карту 'Теневая завеса' (+3 уклонения на 2 хода).",
                maxLevel: 1,
                requiredLevel: 3,
                effect: {
                    card: {
                        name: "Теневая завеса",
                        type: "Защита",
                        rare: "rare",
                        description: "+3 уклонения на 2 хода",
                        count: 1,
                        icon: "shadow-veil.png",
                        bonus: { dodge: 3 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "critical-strike",
                name: "Критический удар",
                icon: "critical-strike.png",
                description: "Добавляет карту 'Критический удар' (+3 урона).",
                maxLevel: 1,
                requiredLevel: 4,
                effect: {
                    card: {
                        name: "Критический удар",
                        type: "Атака",
                        rare: "rare",
                        description: "+3 урона",
                        count: 1,
                        icon: "critical-strike.png",
                        bonus: { str: 3 },
                        manaCost: 3,
                    },
                },
                type: "active",
            },
            {
                id: "stealth",
                name: "Скрытность",
                icon: "stealth.png",
                description: "Добавляет карту 'Скрытность' (+5 уклонения на 2 хода).",
                maxLevel: 1,
                requiredLevel: 5,
                effect: {
                    card: {
                        name: "Скрытность",
                        type: "Защита",
                        rare: "rare",
                        description: "+5 уклонения на 2 хода",
                        count: 1,
                        icon: "stealth.png",
                        bonus: { dodge: 5 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "agility",
                name: "Ловкость",
                icon: "agility.png",
                description: "Добавляет карту 'Ловкость' (+3 скорости на 2 хода).",
                maxLevel: 1,
                requiredLevel: 6,
                effect: {
                    card: {
                        name: "Ловкость",
                        type: "Бафф",
                        rare: "rare",
                        description: "+3 скорости на 2 хода",
                        count: 1,
                        icon: "agility.png",
                        bonus: { spd: 3 },
                        manaCost: 2,
                        duration: 2,
                    },
                },
                type: "active",
            },
            {
                id: "extra-strike",
                name: "Дополнительный удар",
                icon: "extra-strike.png",
                description: "Карты атаки получают +1 использование.",
                maxLevel: 1,
                requiredLevel: 7,
                effect: { attackCardCount: 1 },
                type: "passive",
            },
        ],
    },
};

interface Talent {
    id: string;
    name: string;
    icon: string;
    description: string;
    maxLevel: number;
    requiredLevel: number;
    effect: any;
}

interface TalentTree {
    character: Talent[];
    slot: Talent[];
    cards: Talent[];
}

export default defineComponent({
    name: "Talants",
    setup() {
        const person = usePersonState();
        return { person };
    },
    data: () => ({
        selectedTalent: null as Talent | null,
        errorMessage: "",
        isLoading: false,
    }),
    computed: {
        talents(): TalentTree {
            return talentsByClass[this.person.character.species as keyof typeof talentsByClass] || talentsByClass.ranger;
        },
        talentPoints(): number {
            return this.person.character.talents?.points || 2;
        },
        selectedTalents(): { [key: string]: number } {
            return this.person.character.talents?.selected || {};
        },
        characterLevel(): number {
            return this.person.character.game_stats.level || 1;
        },
    },
    methods: {
        canSelectTalent(talent: Talent): boolean {
            const currentLevel = this.selectedTalents[talent.id] || 0;
            return (
                this.talentPoints > 0 &&
                currentLevel < talent.maxLevel &&
                this.characterLevel >= talent.requiredLevel
            );
        },
        async onSelect(talent: Talent) {
            this.selectedTalent = talent;
            this.errorMessage = "";

            if (!this.canSelectTalent(talent)) {
                this.errorMessage = "Недостаточно очков талантов или уровня!";
                return;
            }

            this.isLoading = true;
            // try {
            //     const { data: userData, error: authError } = await this.$supabase.auth.getUser();
            //     if (authError || !userData.user) {
            //         this.errorMessage = "Ошибка: пользователь не авторизован";
            //         this.isLoading = false;
            //         return;
            //     }
            //
            //     const userId = userData.user.id;
            //     const currentLevel = this.selectedTalents[talent.id] || 0;
            //     const updatedTalents = {
            //         selected: {
            //             ...this.selectedTalents,
            //             [talent.id]: currentLevel + 1,
            //         },
            //         points: this.talentPoints - 1,
            //     };
            //
            //     // Применяем эффект таланта
            //     if (talent.effect.card) {
            //         // Добавляем новую карту в колоду (нужно обновить в глобальном состоянии)
            //         this.person.addCard(talent.effect.card);
            //     } else {
            //         // Обновляем характеристики
            //         for (const [key, value] of Object.entries(talent.effect)) {
            //             if (["str", "agi", "int", "vit", "acc", "luc", "spd", "def"].includes(key)) {
            //                 this.person.setValChars(value as number, key);
            //             } else if (key === "maxHp") {
            //                 this.person.character.game_stats.maxHp = (this.person.character.game_stats.maxHp || 10) + value;
            //             } else if (key === "maxMp") {
            //                 this.person.character.game_stats.maxMp = (this.person.character.game_stats.maxMp || 10) + value;
            //             }
            //             // Другие эффекты (например, poison, criticalChance) должны обрабатываться в боевой системе
            //         }
            //     }
            //
            //     // Сохраняем в Supabase
            //     const { error } = await this.$supabase
            //         .from("characters")
            //         .update({
            //             talents: updatedTalents,
            //             characteristics: this.person.character.characteristics,
            //             game_stats: this.person.character.game_stats,
            //         })
            //         .eq("id", userId);
            //
            //     if (error) {
            //         this.errorMessage = `Ошибка сохранения таланта: ${error.message}`;
            //         console.error(error);
            //         this.isLoading = false;
            //         return;
            //     }
            //
            //     // Обновляем локальное состояние
            //     this.person.updateTalents(updatedTalents);
            //     this.selectedTalent = null;
            // } catch (err) {
            //     this.errorMessage = "Неизвестная ошибка. Попробуйте позже.";
            //     console.error(err);
            // } finally {
            //     this.isLoading = false;
            // }
        },
    },
});
</script>

<template>
    <div class="talants">
        <div v-if="errorMessage" class="talants__error">{{ errorMessage }}</div>
        <div v-if="isLoading" class="talants__loading">Загрузка...</div>
        <div class="talants__points">Очки талантов: {{ talentPoints }}</div>
        <div class="talants__trees">
            <!-- Дерево: Улучшение персонажа -->
            <div class="talants__cards">
                <h3 class="talants__title">Улучшение персонажа</h3>
                <div class="talants__wrap">
                    <div
                        v-for="talent in talents.character"
                        :key="talent.id"
                        class="talants__card"
                        :class="{ 'talants__card--disabled': !canSelectTalent(talent) }"
                        @click="onSelect(talent)"
                    >
                        <nuxt-img
                            class="talants__image"
                            :src="`/images/components/talants/${person.character.species}/${talent.icon}`"
                            :alt="talent.name"
                        />
                        <span class="talants__count">{{ selectedTalents[talent.id] || 0 }}/{{ talent.maxLevel }}</span>
                        <div class="talants__block">
                            <div class="talants__name">{{ talent.name }}</div>
                            <div class="talants__description">{{ talent.description }}</div>
                            <div class="talants__level">Требуемый уровень: {{ talent.requiredLevel }}</div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- Дерево: Улучшение слота -->
            <div class="talants__cards">
                <h3 class="talants__title">Улучшение слота</h3>
                <div class="talants__wrap">
                    <div
                        v-for="talent in talents.slot"
                        :key="talent.id"
                        class="talants__card"
                        :class="{ 'talants__card--disabled': !canSelectTalent(talent) }"
                        @click="onSelect(talent)"
                    >
                        <nuxt-img
                            class="talants__image"
                            :src="`/images/components/talants/${person.character.species}/${talent.icon}`"
                            :alt="talent.name"
                        />
                        <span class="talants__count">{{ selectedTalents[talent.id] || 0 }}/{{ talent.maxLevel }}</span>
                        <div class="talants__block">
                            <div class="talants__name">{{ talent.name }}</div>
                            <div class="talants__description">{{ talent.description }}</div>
                            <div class="talants__level">Требуемый уровень: {{ talent.requiredLevel }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Дерево: Улучшение карт -->
            <div class="talants__cards">
                <h3 class="talants__title">Улучшение карт</h3>
                <div class="talants__wrap">
                    <div
                        v-for="talent in talents.cards"
                        :key="talent.id"
                        class="talants__card"
                        :class="{ 'talants__card--disabled': !canSelectTalent(talent) }"
                        @click="onSelect(talent)"
                    >
                        <nuxt-img
                            class="talants__image"
                            :src="`/images/components/talants/${person.character.species}/${talent.icon}`"
                            :alt="talent.name"
                        />
                        <span class="talants__count">{{ selectedTalents[talent.id] || 0 }}/{{ talent.maxLevel }}</span>
                        <div class="talants__block">
                            <div class="talants__name">{{ talent.name }}</div>
                            <div class="talants__description">{{ talent.description }}</div>
                            <div class="talants__level">Требуемый уровень: {{ talent.requiredLevel }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "talants";
</style>