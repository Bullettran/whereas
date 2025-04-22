<script lang="ts">
import { defineComponent } from "vue";
import { usePersonState } from "~/stores/person";

export default defineComponent({
    name: "Default",
    setup() {
        // const {clear, user, session, loggedIn} = useUserSession();
        // const person = usePersonState();
        // if (!loggedIn.value) {
        //     navigateTo("/");
        // }
        // if (!person.isSelectedSpecies) {
        //     navigateTo("/selection/");
        // }
        // return {
        //     loggedIn
        // }
    },
});
</script>

<template>
    <div class="default">
        <slot></slot>
    </div>
</template>

<style lang="scss">
@use "assets/scss/pages/layouts/default/default";
</style>
