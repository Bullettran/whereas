<script lang="ts">
import {api} from "~/api/api";
import {reloadNuxtApp} from "#app";
import {usePersonState} from "~/stores/person";

export default defineComponent({
    name: "Auth",
    setup() {
        const form = reactive({
            username: "",
            password: "",
        })

        const {clear, user, session, loggedIn} = useUserSession();
        const person = usePersonState();
        return {form, session, clear, person}
    },
    data: () => ({
        formError: false,
    }),
    methods: {
        async logIn() {
            const {data, error, status}: any = await useFetch(api.auth, {
                method: "POST",
                //@ts-ignore
                body: {
                    //@ts-ignore
                    ...this.form
                }
            })

            if (status.value === "success") {
                this.person.setLogin(data.value.user.username);
                this.person.setSpecies(data.value.user.isSelectedSpecies);
                this.person.setAdmin(data.value.user.isAdmin);
                reloadNuxtApp();
                const bootstrap = this.$bootstrap as any;
                let modal = bootstrap.Modal.getInstance(document.querySelector("#auth"));
                modal && modal.hide();
            }
            if (error.value) {
                this.formError = true;
            }
        }
    }
})
</script>

<template>
    <div class="auth">
        <h2 class="auth__title">Войти</h2>
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="logIn">
            <div class="auth__field">
                <input class="auth__input" v-model="form.username" type="text" autocomplete="false" placeholder="Имя пользователя"/>
            </div>
            <div class="auth__field">
                <input class="auth__input" v-model="form.password" type="password" autocomplete="false" placeholder="Пароль"/>
            </div>
            <div class="auth__buttons">
                <button class="auth__button button button--md" type="submit">Войти</button>
                <button class="auth__button button button--md" @click="clear" data-bs-dismiss="modal">Выйти</button>
            </div>
            <div v-if="formError">ошибка</div>
        </form>
    </div>
</template>

<style scoped lang="scss">
@import "auth";
</style>