<script lang="ts">
export default defineComponent({
    name: "Inventory",
    props: {
        inventory: {
            type: Array,
            required: true,
            default: [],
        },
    },
});
</script>

<template>
    <div class="inventory">
        <div class="inventory__wrap">
            <h3 class="inventory__title">Инвентарь</h3>
            <div class="inventory__filters">
                <button class="inventory__button button button--metal-sm" type="button">Снаряжение</button>
                <button class="inventory__button button button--metal-sm active" type="button">Все</button>
            </div>
        </div>
        <div class="inventory__slots">
            <div class="inventory__slot">
                <span class="inventory__count">100</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
            <div class="inventory__slot">
                <span class="inventory__count">0</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "inventory";
</style>