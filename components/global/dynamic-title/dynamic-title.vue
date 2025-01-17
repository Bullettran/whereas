<script lang="ts">
export default defineComponent({
    name: "DynamicTitle",
    data: () => ({
        text: "WHEREAS"
    })
})
</script>

<template>
    <div class="dynamic-title">
        <div>
            <div class="dynamic-title__text" v-for="i in 40" :key="i">{{text}}</div>
        </div>
    </div>

</template>

<style scoped lang="scss">
@import "dynamic-title";
</style>