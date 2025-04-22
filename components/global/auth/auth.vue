<script lang="ts">
import { defineComponent } from "vue";
import { usePersonState } from "~/stores/person";

export default defineComponent({
    name: "Auth",
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            formError: "" as string,
        };
    },
    methods: {
        async logIn() {
            // Сбрасываем предыдущую ошибку
            this.formError = "";

            // Валидация
            if (!this.form.username || !this.form.password) {
                this.formError = "Заполните все поля";
                return;
            }

            try {
                const { data, error } = await this.$supabase.auth.signInWithPassword({
                    email: `${this.form.username}@mail.ru`, // Заглушка для email
                    password: this.form.password,
                });

                if (error) {
                    this.formError = "Ошибка входа: неверное имя пользователя или пароль";
                    return;
                }

                // Получаем данные пользователя
                const user = data.user;
                const personStore = usePersonState();
                personStore.setLogin(user.user_metadata.username || this.form.username);
                personStore.setSpecies(user.user_metadata.isSelectedSpecies || false);
                personStore.setAdmin(user.user_metadata.isAdmin || false);

                // Закрываем модальное окно
                const bootstrap = this.$bootstrap as any;
                const modal = bootstrap.Modal.getInstance(document.querySelector("#auth"));
                modal && modal.hide();

                // Перенаправляем на главную страницу
                if (personStore.isSelectedSpecies) {
                    this.$router.push("/town/");
                } else {
                    this.$router.push("/selections/");
                }

            } catch (err) {
                this.formError = "Неизвестная ошибка. Попробуйте позже.";
                console.error(err);
            }
        },
        async logOut() {
            try {
                const { error } = await this.$supabase.auth.signOut();
                if (error) throw error;

                // Очищаем состояние
                const personStore = usePersonState();
                personStore.clear();

                // Закрываем модальное окно
                const bootstrap = this.$bootstrap as any;
                const modal = bootstrap.Modal.getInstance(document.querySelector("#auth"));
                modal && modal.hide();
            } catch (err) {
                this.formError = "Ошибка выхода: " + (err as Error).message;
                console.error(err);
            }
        },
    },
});
</script>

<template>
    <div class="auth">
        <h2 class="auth__title">Вход</h2>
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="logIn">
            <div class="auth__field">
                <input
                    class="auth__input"
                    v-model="form.username"
                    type="text"
                    autocomplete="off"
                    placeholder="Имя пользователя"
                />
            </div>
            <div class="auth__field">
                <input
                    class="auth__input"
                    v-model="form.password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="Пароль"
                />
            </div>
            <div class="auth__error" v-if="formError">{{ formError }}</div>
            <div class="auth__buttons">
                <button class="auth__button button button--metal" type="submit">Войти</button>
                <button class="auth__button button button--metal" type="button" @click="logOut">Выйти</button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
@use "auth";
</style>