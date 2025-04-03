<script lang="ts">

interface Stats {
    str?: number;
    def?: number;
    luc?: number;
    spd?: number;
    int?: number;
    acc?: number;
    vit?: number;
    agi?: number;
}

interface Set {
    type: string;
}

interface Buffs {
    value: number;
    type: "hp" | "mp" | "str" | string;
}

interface InventoryItem {
    id: string;
    name: string;
    icon: string;
    count: number;
    type: "material" | "equip" | "weapon" | "potion";
    description: string;
    stats?: Stats;
    set?: Set;
    buffs?: Buffs;
}

interface RecipeIngredient {
    id: string;
    name: string;
    icon: string;
    count: number;
}

interface Recipe {
    id: string;
    name: string;
    description: string;
    image: string;
    type: "potion" | string; // Уточните возможные типы рецептов
    buffs?: Buffs;
    ingredients: RecipeIngredient[];
    requirements: string;
}

interface SimpleInventoryItem {
    id: string;
    name: string;
    icon: string;
    count: number;
    description: string;
    type: string;
    stats: Stats,
}

export default defineComponent({
    name: "Inventory",
    props: {
        inventory: {
            type: Array as PropType<(InventoryItem | SimpleInventoryItem)[]>,
            required: true,
            default: () => [] as InventoryItem[],
        },
        location: {
            type: String,
            required: false,
            default: "",
        },
    },
    data: () => ({
        activeContextItemId: null as string | null,
    }),
    methods: {
        handleClick(item: any) {
            if (item.count > 0) {
                this.$emit("item-click", item);
            }
        },
        handleContext(item: InventoryItem | SimpleInventoryItem, event: MouseEvent) {
            event.preventDefault();
            event.stopPropagation();
            this.activeContextItemId = item.id;

            // Добавляем обработчик для клика вне элемента
            const handleClickOutside = (e: MouseEvent) => {
                if (!(e.target as HTMLElement).closest(".inventory__slot.inventory__slot--context")) {
                    this.activeContextItemId = null;
                    document.removeEventListener("click", handleClickOutside);
                    document.removeEventListener("contextmenu", handleClickOutside);
                }
            };

            // Удаляем предыдущие обработчики, если были
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("contextmenu", handleClickOutside);

            // Добавляем новые обработчики
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("contextmenu", handleClickOutside);

            console.log("Правый клик по предмету:", item);
        },
        removeItem(item: any) {
            this.$emit("item-remove", item);
        },
        onEquip(item: any) {

        },
        onUse(item: any) {

        },
    },
});
</script>

<template>
    <div :class="[location ? `inventory--${location}`: '','inventory']">
        <div class="inventory__wrap">
            <h3 class="inventory__title">Инвентарь</h3>
            <div class="inventory__filters">
                <button class="inventory__button button button--metal-sm active" type="button">Снаряжение</button>
                <button class="inventory__button button button--metal-sm " type="button">Все</button>
            </div>
        </div>
        <div class="inventory__slots">
            <div v-for="(item, index) in inventory" :key="index" @click="handleClick(item)"
                 @contextmenu="handleContext(item, $event)" draggable="true" :class="[activeContextItemId === item.id ? 'inventory__slot--context' : '','inventory__slot']">
                <span class="inventory__icon">{{ item.icon }}</span>
                <span class="inventory__count">{{ item.count }}</span>
            </div>
        </div>
        <div class="inventory__context" v-if="activeContextItemId">
            <div class="inventory__descriptions" v-for="(item, index) in inventory" :key="index">
                <div v-if="activeContextItemId === item.id">
                    <div class="inventory__name">{{ item.name }}</div>
                    <div class="inventory__description">{{ item.description }}</div>
                    <div class="inventory__stats" v-if="item.stats">
                        <div class="inventory__stat">
                            <div class="inventory__block" v-if="item.stats.str !== 0">
                                <div class="inventory__stat-name">Сила</div>
                                <div class="inventory__stat-value">{{item.stats.str}}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.def !== 0">
                                <div class="inventory__stat-name">Защита</div>
                                <div class="inventory__stat-value">{{item.stats.def}}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.vit !== 0">
                                <div class="inventory__stat-name">Вынос.</div>
                                <div class="inventory__stat-value">{{item.stats.vit}}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.int !== 0">
                                <div class="inventory__stat-name">Интелект</div>
                                <div class="inventory__stat-value">{{item.stats.int}}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.luc !== 0">
                                <div class="inventory__stat-name">Удача</div>
                                <div class="inventory__stat-value">{{item.stats.luc}}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.agi !== 0">
                                <div class="inventory__stat-name">Ловкость</div>
                                <div class="inventory__stat-value">{{item.stats.agi}}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.acc !== 0">
                                <div class="inventory__stat-name">Меткость</div>
                                <div class="inventory__stat-value">{{item.stats.acc}}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.spd !== 0">
                                <div class="inventory__stat-name">Скорость</div>
                                <div class="inventory__stat-value">{{item.stats.spd}}</div>
                            </div>
                        </div>

                    </div>
                    <div class="inventory__buttons" v-if="location !== 'craft'">
                        <button class="inventory__event button button--metal-sm" type="button"
                                v-if="item.type !== 'material' && item.type !== 'equip' && item.type !== 'weapon'"
                                @click="onUse(item)">Использовать
                        </button>
                        <button class="inventory__event button button--metal-sm" type="button"
                                v-if="item.type === 'weapon' || item.type === 'equip'" @click="onEquip(item)">Надеть
                        </button>
                        <button class="inventory__event button button--metal-sm" type="button" @click="removeItem(item)">Выбросить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "inventory";
</style>