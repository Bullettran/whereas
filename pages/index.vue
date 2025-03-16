<script lang="ts">
import {usePersonState} from "~/stores/person";
import Auth from "~/components/global/auth/auth.vue";
import {api} from "~/api/api";
import DyncamicTitle from "~/components/global/dynamic-title/dynamic-title.vue";

export default defineComponent({
    name: "Index",
    components: {DyncamicTitle, Auth},
    setup() {
        definePageMeta({
            layout: "start",
        });
        const {clear, user, session, loggedIn} = useUserSession();
        const person = usePersonState();
        return {
            person,
            loggedIn
        }
    },
    data: () => ({
        isVisibleButtons: false,
    }),
    methods: {
        async test() {
            const { data, error } = await useFetch(api.user, {
                method: "PUT",
                //@ts-ignore
                body: {
                    username: "test",
                    isSelectedSpecies: false,
                }
            })
            if (error) {
                console.log(error);
            } else {
                console.log(123);
            }
            this.person.setSpecies(false);
        }
    },
    mounted() {
        setTimeout(() => {
            this.isVisibleButtons = true;
        }, 6500)
    }
});
</script>

<template>
    <div class="start">
<!--        <button @click="test" style="color: white;">test</button>-->
        <div class="start__container container">
            <DyncamicTitle/>
            <div class="start__buttons" v-if="loggedIn && isVisibleButtons">
                <nuxt-link v-if="!person.isSelectedSpecies" to="/selection/" class="start__button animated-button6">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Начать игру
                </nuxt-link>
                <nuxt-link v-else to="/my/" class="start__button animated-button6">
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
    <Modal id="auth">
        <Auth/>
    </Modal>
    <Modal id="registration">
        <Registration/>
    </Modal>
</template>

<style lang="scss" scoped>
@use "assets/scss/pages/index/styles";
</style>