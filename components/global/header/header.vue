<script lang="ts">

export default defineComponent({
    name: "Header",
    setup() {
        const {clear, session} = useUserSession();
        const person = usePersonState();
        return {session, clear, person}
    },
    methods: {
        logout():void {
            this.clear();
            this.person.clearStore();
            navigateTo("/");
        }
    }
})
</script>

<template>
    <header class="header">
        <div class="header__container container">
            <ul class="header__nav list">
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/my/" title="Личный кабинет">Личный кабинет</nuxt-link>
                </li>
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/travel/" title="v">Отправиться в путешествие</nuxt-link>
                </li>
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/professions/" title="Профессии">Профессии</nuxt-link>
                </li>
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/equip/" title="Снаряжение">Снаряжение</nuxt-link>
                </li>
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/talants/" title="Таланты">Таланты</nuxt-link>
                </li>
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/beasts/" title="Бестиарий">Бестиарий</nuxt-link>
                </li>
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/achievements/" title="Достижения">Достижения</nuxt-link>
                </li>
                <li class="header__item">
                    <nuxt-link class="header__link link link--white" to="/shop/" title="Лавка">Лавка</nuxt-link>
                </li>
            </ul>
            <button class="header__logout button" type="button" @click="logout">Выйти</button>
        </div>
    </header>
</template>

<style scoped lang="scss">
@import "header";
</style>