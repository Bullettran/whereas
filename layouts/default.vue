<script lang="ts">

import {usePersonState} from "~/stores/person";

export default defineComponent({
    name: "Default",
    setup() {
        const {clear, user, session, loggedIn} = useUserSession();
        const person = usePersonState();
        if (!loggedIn.value) {
            navigateTo("/");
        }
        if (!person.isSelectedSpecies) {
            navigateTo("/selection/");
        }
        return {
            loggedIn
        }
    }
});
</script>

<template>
    <template v-if="loggedIn">
        <Header/>
        <main class="default">
            <slot></slot>
        </main>
    </template>
    <template v-else>
        Ошибка
    </template>
</template>

<style lang="scss">
@use "assets/scss/pages/layouts/default/default";
</style>
