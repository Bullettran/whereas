<script lang="ts">
export default defineComponent({
    name: "Index",
    data: () => ({
        tabActive: "alche",
    }),
});
</script>

<template>
    <div class="shop__container container">
        <div class="shop__content">
            <div class="shop__border-top"></div>
            <div class="shop__content-container">
                <div class="shop__border-left"></div>
                <div class="shop__category category">
                    <div class="category__left-border"></div>
                    <button type="button" class="category__button button" @click="tabActive = 'alche'">
                        <nuxt-img class="category__image" src="images/pages/shop/category/category-alche.jpg"
                                  alt="Изображение ожерелья" />
                        Алхимия
                    </button>
                    <button type="button" class="category__button button" @click="tabActive = 'equip'">
                        <nuxt-img class="category__image" src="images/pages/shop/category/category-equip.jpg"
                                  alt="Изображение ожерелья" />
                    </button>
                    <button type="button" class="category__button button" @click="tabActive = 'food'">
                        <nuxt-img class="category__image" src="images/pages/shop/category/category-food.jpg"
                                  alt="Изображение ожерелья" />
                    </button>
                    <button type="button" class="category__button button" @click="tabActive = 'material'">
                        <nuxt-img class="category__image" src="images/pages/shop/category/category-material.jpg"
                                  alt="Изображение ожерелья" />
                    </button>
                </div>
                <div class="shop__border-middle"></div>
                <div class="shop__goods goods">
                    <div class="goods__alche-container" v-if="tabActive === 'alche'">
                        <h2></h2>
                        <ul class="goods__list list">
                            <!-- <li class="goods__item"><nuxt-img class="category__image" src="images/pages/shop/category/category-alche.jpg" alt="Изображение ожерелья"/></li> -->
                            <li class="goods__item">2</li>
                            <li class="goods__item">3</li>
                            <li class="goods__item">4</li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                        </ul>
                    </div>
                    <div class="goods__equip-container" v-if="tabActive === 'equip'">
                        <h2></h2>
                        <ul class="goods__list list">
                            <li class="goods__item">
                                <nuxt-img class="category__image" src="images/pages/shop/category/category-equip.jpg"
                                          alt="Изображение ожерелья" />
                            </li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                        </ul>
                    </div>
                    <div class="goods__food-container" v-if="tabActive === 'food'">
                        <h2></h2>
                        <ul class="goods__list list">
                            <li class="goods__item">
                                <nuxt-img class="category__image" src="images/pages/shop/category/category-food.jpg"
                                          alt="Изображение ожерелья" />
                            </li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                        </ul>
                    </div>
                    <div class="goods__material-container" v-if="tabActive === 'material'">
                        <h2></h2>
                        <ul class="goods__list list">
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                            <li class="goods__item"></li>
                        </ul>
                    </div>

                </div>
                <div class="shop__border-right"></div>
            </div>
            <div class="shop__border-bottom"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.shop__container {
    // display: flex;
    padding-top: 40px;
    padding-bottom: 40px;

}

.shop__content {
    background-color: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    // background-image: url(/images/pages/shop/border/camera.png);
    // background-size: 103%;
    // background-position: -17px -8px;
    // background-repeat: no-repeat;
    // grid-column-gap: 20px;
    // border-radius: 40px;
}

.shop__content-container {
    display: flex;
    min-height: 800px;
    background-image: url(/images/pages/shop/border/back-1.jpg);
    background-size: cover;
}

.shop__border-bottom {
    height: 20px;
    background-image: url(/images/pages/shop/border/border-9.jpg);
    background-size: contain;
    background-position: right;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}

.shop__border-top {
    height: 20px;
    background-image: url(/images/pages/shop/border/border-9.jpg);
    background-size: contain;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
}

.shop__border-left {
    width: 20px;
    background-image: url(/images/pages/shop/border/border-9-1.jpg);
    //    background-size: 100%;
    background-repeat: repeat;
    background-size: contain;
}

.shop__border-right {
    width: 20px;
    background-image: url(/images/pages/shop/border/border-9-1.jpg);
    background-size: 100%;
}

.shop__border-middle {
    width: 20px;
    background-image: url(/images/pages/shop/border/border-9-1.jpg);
    background-size: 100%;
}

.shop__category {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.category__button {
    max-width: 100%;
    max-height: 90px;
    opacity: 0.8;
}

.category__button:hover {
    opacity: 1;
}

.category__image {
    display: block;
    max-width: 100%;
    max-width: 90px;
    max-height: 90px;
    border-radius: 20px;
}

.shop__content-container {
    display: grid;
    grid-template-columns: 20px 270px 20px 1fr 20px;
    width: 100%;
    height: 100%;
}
</style>