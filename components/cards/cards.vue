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
            description: "Прибавляет 3 к атаке, +100% шанс попадания.",
            icon: "legendary-archer.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 3, hitChance: true },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "ranger-explosive-arrow",
            name: "Взрывная стрела",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, вызывает кровотечение (2 урона за ход, 3 хода).",
            icon: "legendary-archer.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 2, bleed: { value: 2, duration: 3 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { bleed: { value: 1 } }, // +1 кровотечение за уровень
        },
        {
            id: "ranger-poison-barrage",
            name: "Ядовитый шквал",
            type: "attack",
            rare: "rare",
            description: "Накладывает яд (2 урона за ход, 3 хода).",
            icon: "legendary-archer.png",
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
            description: "Замедляет врага (-5 скорости на 2 хода).",
            icon: "legendary-archer.png",
            manaCost: 2,
            count: 1,
            bonus: { spd: -5, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { spd: -1 }, // -1 скорость за уровень
        },
        {
            id: "ranger-evasion-boost",
            name: "Ветер перемен",
            type: "defense",
            rare: "rare",
            description: "+5 уклонения на 2 хода.",
            icon: "legendary-archer.png",
            manaCost: 2,
            count: 1,
            bonus: { dodge: 5, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { dodge: 1 }, // +1 уклонение за уровень
        },
        {
            id: "ranger-rapid-shot",
            name: "Быстрый выстрел",
            type: "attack",
            rare: "common",
            description: "Наносит 2 урона.",
            icon: "legendary-archer.png",
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
            icon: "legendary-archer.png",
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
            description: "+3 уклонения на 2 хода.",
            icon: "legendary-archer.png",
            manaCost: 2,
            count: 1,
            bonus: { dodge: 3, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { dodge: 1 }, // +1 уклонение за уровень
        },
        {
            id: "ranger-legendary-shot",
            name: "Легендарный выстрел",
            type: "attack",
            rare: "epic",
            description: "Наносит 5 урона, +10% шанс критического удара.",
            icon: "legendary-archer.png",
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
            icon: "smash.png",
            manaCost: 3,
            count: 1,
            bonus: { str: 3, ignoreDefense: 50 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { str: 1 }, // +1 урон за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "Алмазный шит",
            type: "defense",
            rare: "rare",
            description: "+2 защиты, наносит 1 урон при зашите.",
            icon: "shield-bash.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "ударная волна",
            type: "control",
            rare: "rare",
            description: "станит врага на 1 ход и накладывает дебафф -20% характеристик на 2 хода",
            icon: "shield-bash.png",
            manaCost: 3,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "+ 4 hp и 2 mana",
            icon: "shield-bash.png",
            manaCost: 2,
            count: 4,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "Кристалическая инфузия",
            type: "atack",
            rare: "rare",
            description: "баф атаки на 4 и невосприемчивость к дебафам на 3 хода",
            icon: "shield-bash.png",
            manaCost: 5,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "Фарсированый удар",
            type: "atack",
            rare: "rare",
            description: "+ 3 к урону +-1 урон в зависимости от количества хп врага +-50%",
            icon: "shield-bash.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "Кристализация",
            type: "defense",
            rare: "rare",
            description: "на 2 хода не уязвим но также не может наносить урон",
            icon: "shield-bash.png",
            manaCost: 3,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "Точность ювелира",
            type: "buff",
            rare: "rare",
            description: "2 хода не промахиваеться",
            icon: "shield-bash.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 2, str: 1 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
        },
        {
            id: "wrecker-shield-bash",
            name: "Мощный удар",
            type: "atack",
            rare: "rare",
            description: "+ 2 к урона + 1 к урона за каждую карточку",
            icon: "shield-bash.png",
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
            id: "arcanist-fireball",
            name: "Огненный шар",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 магического урона.",
            icon: "fireball.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 3 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Ледяная стрела",
            type: "attack",
            rare: "rare",
            description: "Наносит 2 урона, замораживает на 1 ход.",
            icon: "ice-arrow.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Магическая вспышка",
            type: "attack",
            rare: "rare",
            description: "наносит 1 урона также имеет +2 урона при использывании на полной мане",
            icon: "ice-arrow.png",
            manaCost: 1,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Ледяной барьер",
            type: "defense",
            rare: "rare",
            description: "получает 4 брони и замораживает цели на 1 ход при защите",
            icon: "ice-arrow.png",
            manaCost: 4,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Мачиская уловка",
            type: "utility",
            rare: "rare",
            description: "перенапрвляет атаку во врага",
            icon: "ice-arrow.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Прилив сил",
            type: "heal",
            rare: "rare",
            description: "востанавливает 4 хп и 4 маны",
            icon: "ice-arrow.png",
            manaCost: 2,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Преврашение",
            type: "control",
            rare: "rare",
            description: "превращяет в овцу на 2 хода атака отменяет превращение",
            icon: "ice-arrow.png",
            manaCost: 3,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Истиное тринити",
            type: "attack",
            rare: "rare",
            description: "накладывает поджигание на 3 хода заморозку на 2 и магический удар на 5 урона",
            icon: "ice-arrow.png",
            manaCost: 5,
            count: 1,
            bonus: { int: 2, freeze: { duration: 1 } },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { int: 1 }, // +1 урон за уровень
        },
        {
            id: "arcanist-ice-arrow",
            name: "Скрытые знания",
            type: "buff",
            rare: "rare",
            description: "увеличивает урон и уменьшений стоимости заклинаний 1 на 2 хода",
            icon: "ice-arrow.png",
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
            id: "monk-healing-light",
            name: "Исцеляющий свет",
            type: "heal",
            rare: "rare",
            description: "Восстанавливает 3 HP.",
            icon: "healing-light.png",
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
            description: "Наносит 2 урона.",
            icon: "spiritual-strike.png",
            manaCost: 2,
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
            id: "inferno-blast",
            name: "Адский взрыв",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 магического урона.",
            icon: "inferno-blast.png",
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
            description: "+3 защиты на 2 хода.",
            icon: "flame-shield.png",
            manaCost: 2,
            count: 1,
            bonus: { def: 3, duration: 2 },
            level: 1,
            maxLevel: 3,
            upgradeCost: 5,
            upgradeEffect: { def: 1 }, // +1 защита за уровень
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
            id: "assassin-shadow-blade",
            name: "Теневой клинок",
            type: "attack",
            rare: "rare",
            description: "Наносит 3 урона, +10% шанс критического удара.",
            icon: "shadow-blade.png",
            manaCost: 3,
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
            description: "Наносит 2 урона, накладывает яд (2 урона за ход, 3 хода).",
            icon: "poison-strike.png",
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