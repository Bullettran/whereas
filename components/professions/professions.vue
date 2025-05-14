<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Professions",
    data: () => ({
        allProffessions: {
            COOKING: {
                id: 'cooking',
                name: 'Приготовление пищи',
                description: 'Позволяет создавать еду, восстанавливающую HP/MP',
                baseExpPerAction: 5,
                bonuses: [
                    { level: 5, effect: 'Разблокирует рецепты редкой еды' },
                    { level: 10, effect: '+10% к эффективности еды' }
                ]
            },
            BLACKSMITH: {
                id: 'blacksmith',
                name: 'Кузнечное дело',
                description: 'Позволяет создавать оружие и броню',
                baseExpPerAction: 8,
                bonuses: [
                    { level: 5, effect: 'Может улучшать предметы' },
                    { level: 10, effect: '+5% к характеристикам созданного снаряжения' }
                ]
            },

            ENCHANTING: {
                id: 'enchanting',
                name: 'Зачарование',
                description: 'Накладывает магические эффекты на предметы',
                baseExpPerAction: 7,
                bonuses: [
                    { level: 5, effect: 'Разблокирует мощные чары' },
                    { level: 10, effect: 'Шанс 15% создать чары двойной силы' }
                ]
            },
            HERBALISM: {
                id: 'herbalism',
                name: 'Травничество',
                description: 'Сбор лекарственных трав и создание зелий',
                baseExpPerAction: 6,
                bonuses: [
                    { level: 5, effect: 'Находит больше редких трав' },
                    { level: 10, effect: 'Шанс создать дополнительное зелье' }
                ]
            },
            ENGINEERING: {
                id: 'engineering',
                name: 'Инженерия',
                description: 'Создание механических устройств и ловушек',
                baseExpPerAction: 10,
                bonuses: [
                    { level: 5, effect: 'Может создавать бомбы' },
                    { level: 10, effect: 'Устройства работают на 20% дольше' }
                ]
            },
            JEWELCRAFTING: {
                id: 'jewelcrafting',
                name: 'Ювелирное дело',
                description: 'Огранка камней и создание украшений',
                baseExpPerAction: 9,
                bonuses: [
                    { level: 5, effect: 'Украшения дают +1 к характеристикам' },
                    { level: 10, effect: 'Шанс создать уникальное украшение' }
                ]
            },
            ARCHAEOLOGY: {
                id: 'archaeology',
                name: 'Археология',
                description: 'Поиск древних артефактов и реликвий',
                baseExpPerAction: 4,
                bonuses: [
                    { level: 5, effect: 'Может расшифровывать древние тексты' },
                    { level: 10, effect: 'Находит больше редких артефактов' }
                ]
            }
        }
    }),
});
</script>

<template>
    <div class="professions">

    </div>
</template>

<style scoped lang="scss">
@use "professions";
</style>