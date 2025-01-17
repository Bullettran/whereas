<script lang="ts">
import { api } from "~/api/api";

export default defineComponent({
    name: "Index",
    async setup() {
        const { baseURL } = useRuntimeConfig().public as any;
        const { data: rawProfs } = await useFetch(api.professions, {
            baseURL,
        }) as any;
        const { data: profs } = rawProfs.value as any;
        return {
            profs
        }
    }
})
</script>

<template>
    <div class="professions">
        <div class="professions__container container">
            <div class="professions__cards">
                <template v-for="prof in profs">
                    <ProfessionsCard :prof="prof.attributes" />
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "assets/scss/pages/professions/styles";
</style>