<script lang="ts">

export default defineComponent({
    name: "Header",
    setup() {
        const {clear, session} = useUserSession();
        const person = usePersonState();
        return {session, clear, person}
    },
    methods: {
        logout():void {
            this.clear();
            this.person.clearStore();
            navigateTo("/");
        }
    }
})
</script>

<template>
    <header class="header">
<!--        <div class="header__container container">-->
<!--            -->
<!--            <button class="header__logout button" type="button" @click="logout">Выйти</button>-->
<!--        </div>-->
    </header>
</template>

<style scoped lang="scss">
@use "header";
</style>