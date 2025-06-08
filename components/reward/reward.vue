<script lang="ts">
import { defineComponent } from "vue";
import { useInventoryState } from "~/stores/inventory";

export default defineComponent({
    name: "Reward",
    props: {
        rewards: {
            type: Array,
            required: true,
        },
        gold: {
            type: Number,
            default: 0,
        },
        exp: {
            type: Number,
            default: 0,
        }
    },
    data: () => ({
        generatedRewards: [] as any[],
        inventory: useInventoryState(),
        char: usePersonState(),
    }),
    methods: {
        generateRewards() {
            this.generatedRewards = this.rewards.filter((item: any) => {
                return Math.random() * 100 < item.chance;
                // @ts-ignore
            }).map(item => ({ ...item }));
        },
        closeReward() {
            this.generatedRewards.forEach((el: any) => {
                this.inventory.addItem(el, el.quantity);
            })
            this.char.setExpChar(this.exp);
            this.inventory.addGold(this.gold);
            this.$emit("close", this.generatedRewards);
        },
    },
    mounted() {
        this.generateRewards();
    }
});
</script>

<template>
    <div class="reward">
        <h2 class="reward__title">
            Награда за победу
        </h2>
        <div class="reward__items">
            <div class="reward__item" v-if="generatedRewards.length > 0" v-for="item in generatedRewards" :key="item.id">
                <img class="reward__icon" v-if="item.icon" :src="item.icon" :alt="item.name">
                <span class="reward__count">{{ item.count }}</span>
                <div class="reward__desc">{{item.description}}</div>
            </div>
            <div v-else class="reward__nothing">В этот раз ничего не выпало</div>
        </div>
        <div class="reward__gold" v-if="gold > 0">
            <div class="reward__picture">
                <img class="reward__image" src="/images/components/global/gold.png" alt="Изображение золота">
            </div>
            <div class="reward__value">Золото +{{gold}}</div>
        </div>
        <div class="reward__gold" v-if="exp > 0">
            <div class="reward__picture">
                <img class="reward__image" src="/images/components/global/exp.png" alt="Изображение опыта">
            </div>
            <div class="reward__value">Опыт +{{exp}}</div>
        </div>
        <div class="reward__buttons">
            <button class="reward__button button button--metal" @click="closeReward" data-bs-dismiss="modal" aria-label="Закрыть">Забрать</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "reward";
</style>