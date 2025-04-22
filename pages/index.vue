<script lang="ts">

export default defineComponent({
    name: "Index",
    async setup() {
        definePageMeta({
            layout: "start",
        });
    },
    data: () => ({
        isVisibleButtons: false,
        loggedIn: false,
        isSpecies: false
    }),
    methods: {
        checkAuth() {
            this.loggedIn = !!usePersonState().username;
        }
    },
    mounted() {
        this.checkAuth();
        setTimeout(() => {
            this.isVisibleButtons = true;
        }, 3500)
    }
});
</script>

<template>
    <div class="start">
        <div class="start__container container">
            <DynamicTitle/>
            <div class="start__buttons" v-if="loggedIn && isVisibleButtons">
                <nuxt-link v-if="!isSpecies" to="/selections/" class="start__button animated-button6">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Начать игру
                </nuxt-link>
                <nuxt-link v-else to="/town/" class="start__button animated-button6">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Продолжить игру
                </nuxt-link>
            </div>
            <div class="start__buttons" v-if="!loggedIn && isVisibleButtons">
                <button type="button" class="start__button animated-button7" data-bs-toggle="modal"
                        data-bs-target="#registration">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Зарегистрироваться
                </button>
                <button type="button" class="start__button animated-button6" data-bs-toggle="modal"
                        data-bs-target="#auth">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Войти
                </button>
            </div>
        </div>
    </div>
    <Modal size="sm" id="auth">
        <Auth/>
    </Modal>
    <Modal size="sm" id="registration">
        <Registration/>
    </Modal>
</template>

<style lang="scss" scoped>
@use "assets/scss/pages/index/styles";
</style>