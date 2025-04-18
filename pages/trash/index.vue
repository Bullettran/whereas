<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
    data: () => ({
        currentChoice: null,
        selectedSpecies: {
            value: "",
            name: "",
        },
        characteristics: {
            str: 1,
            agi: 1,
            vit: 1,
            acc: 1,
            int: 1,
            spd: 1,
            luc: 1,
            def: 1,
        },
        errorMessage: "" as string,
        upgrades: {}// Добавлено для ошибок
    }),
    methods: {
        async fetchCharacter(): Promise<void> {
            this.errorMessage = "";

            try {
                const { data: userData, error: authError } = await this.$supabase.auth.getUser();

                if (authError || !userData.user) {
                    this.errorMessage = "Ошибка: пользователь не авторизован";
                    return;
                }

                const userId = userData.user.id;
                const { data, error } = await this.$supabase
                    .from("characters")
                    .select("*")
                    .eq("id", userId)
                    .single();

                if (error) {
                    this.errorMessage = `Ошибка получения персонажа: ${error.message}`;
                    console.error(error);
                    return;
                }

                if (data) {
                    this.selectedSpecies.value = data.species;
                    this.selectedSpecies.name = data.species_name;
                    this.characteristics = data.characteristics;
                    this.upgrades = data.upgrades;
                    this.currentChoice = data.species; // Показываем выбранного персонажа

                    console.log("Персонаж загружен:", data);
                    const personStore = usePersonState();
                    personStore.setCharacter({
                        characteristics: data.characteristics,
                        upgrades: data.upgrades,
                        species: data.species,
                        name: data.selectedSpecies,
                    })
                }
            } catch (err) {
                this.errorMessage = "Неизвестная ошибка. Попробуйте позже.";
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchCharacter();
    }
});
</script>

<template>
    <pre style="color: #fff; z-index: 80000;">{{usePersonState().character}}</pre>
</template>

<style scoped lang="scss">

</style>