<script lang="ts">
import {usePersonState} from "~/stores/person";

export default defineComponent({
    name: "Selection",
    setup() {
        const {clear, user, session, loggedIn} = useUserSession();
        const person = usePersonState();
        if (!loggedIn.value) {
            navigateTo("/");
        }
        if (person.isSelectedSpecies) {
            navigateTo("/my/");
        }
    }
})
</script>

<template>
    <main class="selection">
        <slot></slot>
    </main>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/layouts/selection/selection";
</style>