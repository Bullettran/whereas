<script lang="ts">
export default defineComponent({
    name: "Card",
    props: {
        prof: {
            type: Object,
            required: true,
            default: {
                image: "images/pages/professions/card/pickaxe.jpg",
                title: "Добыча руды",
                description: "Добыча руды",
                mining: "10/час",
                energy: "5 ед.",
                time: "1 час",
                value: "mining",
            }
        }
    },
    methods: {
        onChoice(val: any):void {
            console.log(val);
        }
    }
})
</script>

<template>
    <div class="card">
        <button class="card__button button" type="button" @click="onChoice(prof.value)">
            <div class="card__picture">
                <nuxt-img class="card__image" :src="prof.image" :alt="`Изображение профессии ${prof.title}`" />
            </div>
            <div class="card__block">
                <h2 class="card__title">{{ prof.title }}</h2>
                <div class="card__stats">
                    <div class="card__tag">
                        <nuxt-icon class="card__icon card__icon--mining" name="global/mining" />
                        <p class="card__text">{{ prof.mining }}</p>
                    </div>
                    <div class="card__tag">
                        <nuxt-icon class="card__icon card__icon--energy" name="global/energy" />
                        <p class="card__text">{{ prof.energy }}</p>
                    </div>
                    <div class="card__tag">
                        <nuxt-icon class="card__icon card__icon--time" name="global/time" />
                        <p class="card__text">{{ prof.time }}</p>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>

<style scoped lang="scss">
@use "card";
</style>