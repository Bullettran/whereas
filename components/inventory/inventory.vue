<script lang="ts">
export default defineComponent({
    name: "Inventory",
    props: {
        inventory: {
            type: Array,
            required: true,
            default: [

            ]
        }
    }
})
</script>

<template>
    <div class="inventory">
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

        </div>
    </div>
</template>

<style scoped lang="scss">
@use "inventory";
</style>