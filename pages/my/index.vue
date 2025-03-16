<script lang="ts">

export default defineComponent({
    name: "Index",
});
</script>

<template>
    <div class="my">
        <div class="my__container container">
            <div class="my__person">
                <Person/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "assets/scss/pages/my/styles";
</style>