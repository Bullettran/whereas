<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Registration",
    data() {
        return {
            form: {
                username: "",
                password: "",
                isSelectedSpecies: false,
                isAdmin: false,
            },
            formError: "" as string,
        };
    },
    methods: {
        async createUser() {
            // Сбрасываем предыдущую ошибку
            this.formError = "";

            // Валидация
            if (!this.form.username || !this.form.password) {
                this.formError = "Заполните все поля";
                return;
            }
            if (this.form.password.length < 6) {
                this.formError = "Пароль должен быть не короче 6 символов";
                return;
            }

            try {
                const { data, error } = await this.$supabase.auth.signUp({
                    email: `${this.form.username}@mail.ru`, // Supabase требует email, используем заглушку
                    password: this.form.password,
                    options: {
                        data: {
                            username: this.form.username,
                            isSelectedSpecies: this.form.isSelectedSpecies,
                            isAdmin: this.form.isAdmin,
                        },
                    },
                });

                if (error) {
                    if (error.message.includes("User already registered")) {
                        this.formError = "Пользователь с таким именем уже существует";
                    } else {
                        this.formError = "Ошибка регистрации: " + error.message;
                    }
                    return;
                }

                // Успешная регистрация
                const bootstrap = this.$bootstrap as any;
                const modal = bootstrap.Modal.getInstance(document.querySelector("#registration"));
                modal && modal.hide();

                // Перенаправление или уведомление
                this.$router.push("/"); // Или другая страница
            } catch (err) {
                this.formError = "Неизвестная ошибка. Попробуйте позже.";
                console.error(err);
            }
        },
    },
});
</script>

<template>
    <div class="registration">
        <h2 class="registration__title">Регистрация</h2>
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="createUser">
            <div class="registration__field">
                <input
                    class="registration__input"
                    v-model="form.username"
                    type="text"
                    autocomplete="off"
                    placeholder="Имя пользователя"
                />
            </div>
            <div class="registration__field">
                <input
                    class="registration__input"
                    v-model="form.password"
                    type="password"
                    autocomplete="new-password"
                    placeholder="Пароль"
                />
            </div>
            <div class="registration__buttons">
                <button class="registration__button button button--metal" type="submit">Создать пользователя</button>
            </div>
            <div class="registration__error" v-if="formError">{{ formError }}</div>
        </form>
    </div>
</template>

<style scoped lang="scss">
@use "registration";
</style>