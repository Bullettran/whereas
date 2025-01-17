<script lang="ts">
import {defineComponent} from 'vue'
import {usePersonState} from "~/stores/person";
import {api} from "~/api/api";

export default defineComponent({
    name: "Index",
    async setup() {
        const person = usePersonState();
        const { data, error }: any = await useFetch(`${api.inventory}?username=${person.getLogin}`, {
            method: "GET",
        })
        const test = data;
        return {
            person,
            test
        }
    },
    data: () => ({
        text: "WHEREAS"
    }),
    mounted() {

    }
})
</script>

<template>
    <pre style="background: #fff;">{{test}}</pre>
</template>

<style scoped lang="scss">
</style>