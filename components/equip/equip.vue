<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Equip",
});
</script>

<template>
    <div class="equip">
        <h3 class="equip__title">Снаряжение</h3>
        <div class="equip__items">
            <div class="equip__item equip__item--necklace">
                <img class="equip__plug" src="/images/pages/equip/necklace.jpg" alt="Изображение ожерелья">
                <img class="equip__image" src="" alt="Изображение ожерелья">
            </div>
            <div class="equip__item equip__item--shoulder">
                <img class="equip__plug" src="/images/pages/equip/shoulder.jpg" alt="Изображение наплечников">
                <img class="equip__image" src="" alt="Изображение наплечников">
            </div>
            <div class="equip__item equip__item--body">
                <img class="equip__plug" src="/images/pages/equip/body.jpg" alt="Изображение нагрудника">
                <img class="equip__image" src="" alt="Изображение нагрудника">
            </div>
            <div class="equip__item equip__item--bracelets">
                <img class="equip__plug" src="/images/pages/equip/bracer.jpg" alt="Изображение браслетов">
                <img class="equip__image" src="" alt="Изображение браслетов">
            </div>
            <div class="equip__item equip__item--gloves">
                <img class="equip__plug" src="/images/pages/equip/gloves.jpg" alt="Изображение перчаток">
                <img class="equip__image" src="" alt="Изображение перчаток">
            </div>
            <div class="equip__item equip__item--pants">
                <img class="equip__plug" src="/images/pages/equip/pants.jpg" alt="Изображение поножей">
                <img class="equip__image" src="" alt="Изображение поножей">
            </div>
            <div class="equip__item equip__item--shoes">
                <img class="equip__plug" src="/images/pages/equip/shoes.jpg" alt="Изображение обуви">
                <img class="equip__image" src="" alt="Изображение обуви">
            </div>
            <div class="equip__item equip__item--ring">
                <img class="equip__plug" src="/images/pages/equip/ring.jpg" alt="Изображение кольца">
                <img class="equip__image" src="" alt="Изображение кольца">
            </div>
        </div>
        <div class="equip__weapons">
            <div class="equip__item equip__item--weapon">
                <img class="equip__plug" src="/images/pages/equip/sword.jpg" alt="Изображение оружия">
                <img class="equip__image" src="" alt="Изображение оружия">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "equip";
</style>