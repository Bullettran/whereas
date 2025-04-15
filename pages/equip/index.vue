<script lang="ts">

import {usePersonState} from "~/stores/person";
import {api} from "~/api/api";

export default defineComponent({
    name: "Index",
    async setup() {
        const person = usePersonState();
        const {data, error}: any = await useFetch(`${api.characteristics}?username=${person.getLogin}`, {
            method: "GET",
        })
        const userCharacteristics = data.value.data;
        return {
            person,
            userCharacteristics
        }
    },
    data: () => ({
       type: "",
    }),
    methods: {
        openEquip(type: string) {
            this.type = type;
        }
    }
})
</script>

<template>
    <div class="equip">
        <div class="equip__container container">
            <div class="equip__left">
                <div class="equip__item equip__item--head" @click="openEquip('helm')">
                    <nuxt-img v-if="type === 'helm'" class="equip__image" src="images/components/sets/green/helm-green.jpg" alt="Изображение шлема"/>
                    <nuxt-img v-else class="equip__plug" src="images/pages/equip/helm.jpg" alt="Изображение шлема"/>
                </div>
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
                <div class="equip__item equip__item--bracelets-left">
                    <nuxt-img class="equip__plug" src="images/pages/equip/bracer.jpg" alt="Изображение браслетов"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение браслетов"/>
                </div>
                <div class="equip__item equip__item--ring-left">
                    <nuxt-img class="equip__plug" src="images/pages/equip/ring.jpg" alt="Изображение кольца"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение кольца"/>
                </div>
            </div>
            <div class="equip__center">
                <video id="equip__photo" class="equip__photo">
                    <source :src="userCharacteristics.image">
                </video>
            </div>
            <div class="equip__right">
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
                <div class="equip__item equip__item--talisman">
                    <nuxt-img class="equip__plug" src="images/pages/equip/talisman.jpg" alt="Изображение талисмана"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение талисмана"/>
                </div>
                <div class="equip__item equip__item--bracelets-right">
                    <nuxt-img class="equip__plug" src="images/pages/equip/bracer.jpg" alt="Изображение браслетов"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение браслетов"/>
                </div>
                <div class="equip__item equip__item--ring-right">
                    <nuxt-img class="equip__plug" src="images/pages/equip/ring.jpg" alt="Изображение кольца"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение кольца"/>
                </div>
            </div>
            <div class="equip__bottom">
                <div class="equip__item equip__item--weapon">
                    <nuxt-img class="equip__plug" src="images/pages/equip/sword.jpg" alt="Изображение оружия"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение оружия"/>
                </div>
                <div class="equip__item equip__item--weapon">
                    <nuxt-img class="equip__plug" src="images/pages/equip/sword.jpg" alt="Изображение оружия"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение оружия"/>
                </div>
                <div class="equip__item equip__item--shield">
                    <nuxt-img class="equip__plug" src="images/pages/equip/shield.jpg" alt="Изображение щита"/>
                    <nuxt-img class="equip__image" src="" alt="Изображение щита"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/equip/styles";
</style>