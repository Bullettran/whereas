<script lang="ts">
import { useInventoryState } from "~/stores/inventory";
interface Stats {
    attack: string,
    critical: string,
    hp: string,
    mp: string,
    speed: string,
    defence: string,
}

interface Set {
    type: string;
}

interface Buffs {
    value: number;
    type: "hp" | "mp" | "str" | string;
}

interface InventoryItem {
    id: string,
    name: string,
    description: string,
    type: string,
    rare: string,
    chance: number,
    icon: string,
    quantity: number,
    stats: any,
    set: any,
    buffs: any,
    questItem: any,
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
    stats?: Stats;
}

export default defineComponent({
    name: "Inventory",
    props: {
        // @ts-ignore
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
        activeFilter: "all" as "all" | "equip" | "potion" | "material",
        inventoryState: useInventoryState(),
    }),
    computed: {
        filteredInventory(): (InventoryItem | SimpleInventoryItem)[] {
            switch (this.activeFilter) {
                case "equip":
                    return this.inventory.filter(item =>
                        item.type === "equip" || item.type === "weapon");
                case "potion":
                    return this.inventory.filter(item =>
                        item.type === "potion");
                case "material":
                    return this.inventory.filter(item =>
                        item.type === "material");
                case "all":
                default:
                    return this.inventory;
            }
        },
    },
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
            this.inventoryState.removeItem(item.id);
        },
        onEquip(item: any) {

        },
        onUse(item: any) {

        },
        setFilter(filterType: "all" | "equip" | "potion" | "material") {
            this.activeFilter = filterType;
        },
    },
});
</script>

<template>
    <div :class="[location ? `inventory--${location}`: '','inventory']">
        <div class="inventory__wrap">
            <h3 class="inventory__title">Инвентарь</h3>
            <div class="inventory__filters">
                <button
                    :class="[activeFilter === 'all' ? 'active' : '', 'inventory__button button button--metal-sm']"
                    type="button"
                    title="Весь инвентарь"
                    @click="setFilter('all')"
                >
                    <img class="inventory__filter-image" src="/images/components/filters/all.png"
                              alt="Декоративное изображение" >
                </button>
                <button
                    :class="[activeFilter === 'equip' ? 'active' : '', 'inventory__button button button--metal-sm']"
                    type="button"
                    title="Снаряжение"
                    @click="setFilter('equip')"
                >
                    <img class="inventory__filter-image" src="/images/components/filters/equip.png"
                              alt="Декоративное изображение" >
                </button>
                <button
                    :class="[activeFilter === 'potion' ? 'active' : '', 'inventory__button button button--metal-sm']"
                    type="button"
                    title="Еда и зелья"
                    @click="setFilter('potion')"
                >
                    <img class="inventory__filter-image" src="/images/components/filters/potion.png"
                              alt="Декоративное изображение" >
                </button>
                <button
                    :class="[activeFilter === 'material' ? 'active' : '', 'inventory__button button button--metal-sm']"
                    type="button"
                    title="Материалы"
                    @click="setFilter('material')"
                >
                    <img class="inventory__filter-image" src="/images/components/filters/material.png"
                              alt="Декоративное изображение" >
                </button>
            </div>
        </div>
        <div class="inventory__slots">
            <div v-for="(item, index) in filteredInventory" :key="index" @click="handleClick(item)"
                 @contextmenu="handleContext(item, $event)" draggable="true"
                 :class="[activeContextItemId === item.id ? 'inventory__slot--context' : '','inventory__slot']">
                <span class="inventory__icon">
                    <img class="inventory__image" :src="`/images/components/rewards/${item.icon}.png`">
                </span>
                <span class="inventory__count">{{
                        // @ts-ignore
                        item.quantity
                    }}</span>
            </div>
        </div>
        <div class="inventory__context" v-if="activeContextItemId">
            <div class="inventory__descriptions" v-for="(item, index) in filteredInventory" :key="index">
                <div v-if="activeContextItemId === item.id">
                    <div class="inventory__name">{{ item.name }}</div>
                    <div class="inventory__description">{{ item.description }}</div>
                    <div class="inventory__stats" v-if="Object.keys(item.stats).length">
                        <div class="inventory__stat">
                            <div class="inventory__block" v-if="item.stats.attack !== 0">
                                <div class="inventory__stat-name">Атака</div>
                                <div class="inventory__stat-value">{{ item.stats.attack }}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.critical !== 0">
                                <div class="inventory__stat-name">Крит. шанс</div>
                                <div class="inventory__stat-value">{{ item.stats.critical }}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.hp !== 0">
                                <div class="inventory__stat-name">Здоровье</div>
                                <div class="inventory__stat-value">{{ item.stats.hp }}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.mp !== 0">
                                <div class="inventory__stat-name">Мана</div>
                                <div class="inventory__stat-value">{{ item.stats.mp }}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.speed !== 0">
                                <div class="inventory__stat-name">Скорость</div>
                                <div class="inventory__stat-value">{{ item.stats.speed }}</div>
                            </div>
                            <div class="inventory__block" v-if="item.stats.defence !== 0">
                                <div class="inventory__stat-name">Защита</div>
                                <div class="inventory__stat-value">{{ item.stats.defence }}</div>
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
                        <button class="inventory__event button button--metal-sm" type="button"
                                @click="removeItem(item)">Выбросить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "inventory";
</style>