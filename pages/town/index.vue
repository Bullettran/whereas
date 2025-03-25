<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
});
</script>

<template>
    <div class="town">
        <div class="town__container container">
            <div class="person">
                <button class="person__char button" type="button" @click="">
                    <nuxt-img class="person__image" src="/images/sprites/persons/arcanist/icon-arcanist.png" alt="Иконка персонажа"/>
                </button>
                <div class="person__health">
                    <ProgressBar class="person__hp" :value="100">
                        Жизни
                    </ProgressBar>
                    <ProgressBar class="person__mp" :value="80">
                        Мана
                    </ProgressBar>
                    <ProgressBar class="person__exp" :value="100">Опыт</ProgressBar>
                </div>
            </div>
            <div class="town__person town__person--arcanist town__person--idle"></div>
            <nuxt-link class="" to="/game/1" style="color:#fff;">ТУда</nuxt-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/town/styles";

.person {
    display: flex;
    grid-column-gap: 8px;
}

.person__char {
    height: 80px;
    width: 80px;
}

.person__image {
    border-radius: 50%;
    display: block;
    max-width: 100%;
}

.person__health {
    display: flex;
    flex-direction: column;
    grid-row-gap: 8px;
}

.person__hp {
    width: 100px;
    height: 20px;
    background: var(--black1);
    border: 1px solid #fff;
    border-radius: 4px;
}

:deep(.person__hp .p-progressbar-value) {
    background: var(--orange1);
}

.person__mp {
    width: 100px;
    height: 20px;
    background: var(--black1);
    border: 1px solid #fff;
    border-radius: 4px;
}

:deep(.person__mp .p-progressbar-value) {
    background: var(--blue1);
}

.person__exp {
    width: 100px;
    height: 20px;
    background: var(--black1);
    border: 1px solid #fff;
    border-radius: 4px;
}

:deep(.person__exp .p-progressbar-value) {
    background: var(--green2);
}

</style>