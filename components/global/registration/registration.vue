<script lang="ts">
import {api} from "~/api/api";

export default defineComponent({
    name: "Registration",
    setup() {
        const form = reactive({
            username: "",
            password: "",
            isSelectedSpecies: false,
            isAdmin: false,
        })
        return {form}
    },
    data: () => ({
        formError: false,
    }),
    methods: {
        async createUser() {
            const {data, status, error} = await useFetch(api.user, {
                method: "POST",
                //@ts-ignore
                body: {
                    //@ts-ignore
                    ...this.form
                }
            })
            if (error.value) {
                this.formError = true;
            } else {
                const bootstrap = this.$bootstrap as any;
                let modal = bootstrap.Modal.getInstance(document.querySelector("#registration"));
                modal && modal.hide();
            }
        }
    }
})
</script>

<template>
    <div class="registration">
        <h2 class="registration__title">Регистрация</h2>
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="createUser">
            <div class="registration__field">
                <input class="registration__input" v-model="form.username" type="text" autocomplete="false" placeholder="Имя пользователя"/>
            </div>
            <div class="registration__field">
                <input class="registration__input" v-model="form.password" type="password" autocomplete="false" placeholder="Пароль"/>
            </div>
            <div class="registration__buttons">
                <button class="registration__button button button--md" type="submit">Создать пользователя</button>
            </div>
            <div v-if="formError">пользователь существует</div>
        </form>
    </div>
</template>

<style scoped lang="scss">
@import "registration";
</style>