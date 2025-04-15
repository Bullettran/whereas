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
                <nuxt-img class="equip__plug" src="images/pages/equip/necklace.jpg" alt="Изображение ожерелья"/>
                <nuxt-img class="equip__image" src="" alt="Изображение ожерелья"/>
            </div>
            <div class="equip__item equip__item--shoulder">
                <nuxt-img class="equip__plug" src="images/pages/equip/shoulder.jpg" alt="Изображение наплечников"/>
                <nuxt-img class="equip__image" src="" alt="Изображение наплечников"/>
            </div>
            <div class="equip__item equip__item--body">
                <nuxt-img class="equip__plug" src="images/pages/equip/body.jpg" alt="Изображение нагрудника"/>
                <nuxt-img class="equip__image" src="" alt="Изображение нагрудника"/>
            </div>
            <div class="equip__item equip__item--bracelets">
                <nuxt-img class="equip__plug" src="images/pages/equip/bracer.jpg" alt="Изображение браслетов"/>
                <nuxt-img class="equip__image" src="" alt="Изображение браслетов"/>
            </div>
            <div class="equip__item equip__item--gloves">
                <nuxt-img class="equip__plug" src="images/pages/equip/gloves.jpg" alt="Изображение перчаток"/>
                <nuxt-img class="equip__image" src="" alt="Изображение перчаток"/>
            </div>
            <div class="equip__item equip__item--pants">
                <nuxt-img class="equip__plug" src="images/pages/equip/pants.jpg" alt="Изображение поножей"/>
                <nuxt-img class="equip__image" src="" alt="Изображение поножей"/>
            </div>
            <div class="equip__item equip__item--shoes">
                <nuxt-img class="equip__plug" src="images/pages/equip/shoes.jpg" alt="Изображение обуви"/>
                <nuxt-img class="equip__image" src="" alt="Изображение обуви"/>
            </div>
            <div class="equip__item equip__item--ring">
                <nuxt-img class="equip__plug" src="images/pages/equip/ring.jpg" alt="Изображение кольца"/>
                <nuxt-img class="equip__image" src="" alt="Изображение кольца"/>
            </div>
        </div>
        <div class="equip__weapons">
            <div class="equip__item equip__item--weapon">
                <nuxt-img class="equip__plug" src="images/pages/equip/sword.jpg" alt="Изображение оружия"/>
                <nuxt-img class="equip__image" src="" alt="Изображение оружия"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "equip";
</style>