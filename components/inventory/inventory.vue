<script lang="ts">
export default defineComponent({
    name: "Inventory",
    props: {
        inventory: {
            type: Array as () => Array<{
                id: string;
                name: string;
                icon: string;
                count: number;
            }>,
            required: true,
            default: [],
        },
    },
    methods: {
        handleClick(item: any) {
            if (item.count > 0) {
                this.$emit("item-click", item);
            }
        },
    },
});
</script>

<template>
    <div class="inventory">
        <div class="inventory__wrap">
            <h3 class="inventory__title">Инвентарь</h3>
            <div class="inventory__filters">
                <button class="inventory__button button button--metal-sm active" type="button">Снаряжение</button>
                <button class="inventory__button button button--metal-sm " type="button">Все</button>
            </div>
        </div>
        <div class="inventory__slots">
            <div v-for="(item, index) in inventory" :key="index" @click="handleClick(item)" draggable="true" class="inventory__slot">
                <span class="inventory__icon">{{item.icon}}</span>
                <span class="inventory__count">{{ item.count }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "inventory";
</style>