<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
    setup() {
        // @ts-ignore
        definePageMeta({
            layout: "selection",
        });
    },
    data: () => ({
        currentChoice: null,
        selectedSpecies: {
            value: "",
            name: "",
        },
        characteristics: {
            str: 1,
            agi: 1,
            vit: 1,
            acc: 1,
            int: 1,
            spd: 1,
            luc: 1,
            def: 1,
        }
    }) as any,
    methods: {
        onChoice(type: string): void {
            this.currentChoice = type;
        },
        onSelect(val: string, name: string, characteristics: object): void {
            this.selectedSpecies.value = val;
            this.selectedSpecies.name = name;
            this.characteristics = characteristics;
        },

        async onAccept(): Promise<any> {
            // todo(kharal): Добавить запрос для отправки на бек
        }
    },
});
</script>

<template>
    <div class="selections">
        <div class="selections__container container">
            <h1 class="selections__title">Выбор персонажа</h1>
            <div class="selections__wrap">
                <div class="selections__cards">
                    <button :class="[currentChoice === 'ranger' ? 'selections__card--active': '', 'selections__card']"
                            type="button" @click="onChoice('ranger')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/ranger/icon-ranger.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Рейнджер</div>
                    </button>
                    <button :class="[currentChoice === 'wrecker' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('wrecker')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/wrecker/icon-wrecker.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Крушитель</div>
                    </button>
                    <button :class="[currentChoice === 'arcanist' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('arcanist')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/arcanist/icon-arcanist.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Арканист</div>
                    </button>
                    <button :class="[currentChoice === 'monk' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('monk')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/monk/icon-monk.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Монах</div>
                    </button>
                    <button :class="[currentChoice === 'inferno' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('inferno')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/inferno/icon-inferno.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Инферно</div>
                    </button>
                    <button :class="[currentChoice === 'assasin' ? 'selections__card--active': '', 'selections__card']"
                            class="selections__card" type="button" @click="onChoice('assasin')">
                        <div class="selections__picture">
                            <nuxt-img class="selections__image" src="images/sprites/persons/assasin/icon-assasin.png"
                                      alt="Иконка персонажа" />
                        </div>
                        <div class="selections__type">Ассасин</div>
                    </button>
                </div>
                <div class="selections__person animate">
                    <div v-if="currentChoice === 'ranger'"
                         class="selections__animate animate__ranger animate__idle"></div>
                    <div v-if="currentChoice === 'wrecker'"
                         class="selections__animate animate__wrecker animate__idle"></div>
                    <div v-if="currentChoice === 'arcanist'"
                         class="selections__animate animate__arcanist animate__idle"></div>
                    <div v-if="currentChoice === 'monk'" class="selections__animate animate__monk animate__idle"></div>
                    <div v-if="currentChoice === 'inferno'"
                         class="selections__animate animate__inferno animate__idle"></div>
                    <div v-if="currentChoice === 'assasin'"
                         class="selections__animate animate__assasin animate__idle"></div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'ranger'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">1</div>
                            </li>
                        </ul>
                    </div>
                    <div class="selections__description">
                        <h2 class="selections__subtitle">Описание</h2>
                        Ветви деревьев как будто согнулись, чтобы поклониться ему. Рейнджер с ловкостью, сравнимой лишь
                        с легким дуновением ветра, движется среди лесных просторов. Его стрелы, вырезанные из древесины
                        древних деревьев, находят свою цель с беспрецедентной точностью. Ушной лук, украшенный символами
                        охоты, всегда готов к действию. Замаскированный под листву, он следит за врагами издалека,
                        используя свои знания природы, чтобы обойти даже самые трудные преграды.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, ea impedit incidunt
                        perspiciatis quam unde. Accusamus aliquam atque dolorum ipsam labore magni optio, recusandae
                        repellendus sapiente unde. Id, laudantium, rerum!
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" type="button" @click="onSelect('ranger', 'Рейнджер', {
                        str: 1,
                        agi: 2,
                        vit: 1,
                        acc: 3,
                        int: 1,
                        spd: 2,
                        luc: 2,
                        def: 1,
                        })">Подтвердить
                        </button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'wrecker'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">2</div>
                            </li>
                        </ul>
                    </div>
                    <div class="selections__description">
                        <h2 class="selections__subtitle">Описание</h2>
                        Крушитель — могучий гном с коричневыми, как земля, волосами и бородой, которая словно обвивает
                        его массивный туловище. Его молот, выковыливаемый из магического металла, ярко сверкает, когда
                        он выступает против врагов. С каждым ударом молота в землю проникает энергия гор, живущих в его
                        предках. На его доспехах выбиты знаки клана, а глаза сверкают, полные решимости и готовности
                        выстоять защиту своего народа. Крушитель не знает страха и лишь смеется в лицо смерти, когда
                        между ним и врагами встает бой.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, ea impedit incidunt
                        perspiciatis quam unde. Accusamus aliquam atque dolorum ipsam labore magni optio, recusandae
                        repellendus sapiente unde. Id, laudantium, rerum!
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" type="button" @click="onSelect('wrecker', 'Крушитель', {
                        str: 3,
                        agi: 1,
                        vit: 2,
                        acc: 1,
                        int: 1,
                        spd: 1,
                        luc: 2,
                        def: 2,
                        })">Подтвердить</button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'arcanist'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">1</div>
                            </li>
                        </ul>
                    </div>
                    <div class="selections__description">
                        <h2 class="selections__subtitle">Описание</h2>
                        Арканист — мастер магии, облаченный в длинный, искрящийся мантии, на плечах у него лежит книга
                        заклинаний, написанная древними рунами. Словно ниточка света, он плетет заклинания, вызывая
                        энергии стихий из глубин Вселенной. Его глаза, полные знаний и таинств, словно окутаны тайным
                        светом. Он научился преобразовывать элементы природы и манипулировать ими по своему желанию, но
                        знает, что любая магия требует жертвы. Арканист стремится сохранить баланс между силами света и
                        тьмы, часто жертвуя собственным временем в поисках утраченных тайн.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, ea impedit incidunt
                        perspiciatis quam unde. Accusamus aliquam atque dolorum ipsam labore magni optio, recusandae
                        repellendus sapiente unde. Id, laudantium, rerum!
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" type="button" @click="onSelect('arcanist', 'Арканист', {
                        str: 1,
                        agi: 2,
                        vit: 1,
                        acc: 2,
                        int: 3,
                        spd: 2,
                        luc: 1,
                        def: 1,
                        })">Подтвердить</button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'monk'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">2</div>
                            </li>
                        </ul>
                    </div>
                    <div class="selections__description">
                        <h2 class="selections__subtitle">Описание</h2>
                        Монах, подобно водной глади, спокоен и уравновешен. Его простая одежда позволяет ему свободно
                        двигаться, а каждая поза говорит о его глубоких знаниях боевых искусств. Он использует свою
                        физическую силу, элементы ци и духовное спокойствие, чтобы достигать недостижимого. С каждым
                        ударом и каждым кувырком, он притягивает внимание как магниты, завершая свои движения с грацией
                        и точно несет послание о мире и гармонии. Он стремится не к победе, а к просветлению, уничтожая
                        зло, но лишь если это действительно необходимо.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, ea impedit incidunt
                        perspiciatis quam unde. Accusamus aliquam atque dolorum ipsam labore magni optio, recusandae
                        repellendus sapiente unde. Id, laudantium, rerum!
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" type="button" @click="onSelect('monk', 'Монах', {
                        str: 2,
                        agi: 2,
                        vit: 2,
                        acc: 1,
                        int: 1,
                        spd: 2,
                        luc: 1,
                        def: 2,
                        })">Подтвердить</button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'inferno'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">2</div>
                            </li>
                        </ul>
                    </div>
                    <div class="selections__description">
                        <h2 class="selections__subtitle">Описание</h2>
                        Инферно — гордый воин, его меч, закаленный в пламени, словно дышит огнем. Тепла от его
                        присутствия достаточно, чтобы разжечь пламя страха в сердцах врагов. Его доспехи словно плавлены
                        самим солнцем, сверкают и излучают тепло. Каждый его шаг – это вызов состязающимся, каждой
                        атакой он устраняет болезни этого мира. Инферно — не только воин; он носитель справедливости,
                        защитник слабых и одержимый желанием искоренить зло из своего королевства. Его дух яркий как
                        пламя, а сердце горит желанием защищать родину.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, ea impedit incidunt
                        perspiciatis quam unde. Accusamus aliquam atque dolorum ipsam labore magni optio, recusandae
                        repellendus sapiente unde. Id, laudantium, rerum!
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" type="button" @click="onSelect('inferno', 'Инферно', {
                        str: 2,
                        agi: 2,
                        vit: 3,
                        acc: 1,
                        int: 1,
                        spd: 1,
                        luc: 1,
                        def: 2,
                        })">Подтвердить</button>
                    </div>
                </div>
                <div class="selections__info" v-if="currentChoice === 'assasin'">
                    <div class="selections__stats">
                        <h2 class="selections__subtitle">Характеристики</h2>
                        <ul class="selections__list list">
                            <li class="selections__item">
                                <div class="selections__name">Сила</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Ловкость</div>
                                <div class="selections__value">3</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Выносливость</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Меткость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Интелект</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Скорость</div>
                                <div class="selections__value">2</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Удача</div>
                                <div class="selections__value">1</div>
                            </li>
                            <li class="selections__item">
                                <div class="selections__name">Защита</div>
                                <div class="selections__value">1</div>
                            </li>
                        </ul>
                    </div>
                    <div class="selections__description">
                        <h2 class="selections__subtitle">Описание</h2>
                        Ассасин, как тень, проникает в самые темные уголки мира. Его поставленные на учет клинки,
                        сверкающие в лунном свете, готовы к мгновенной расправе. Легкий и хладнокровный, он движется
                        незаметно, словно ветер. Его одежда черная как самая ночь, а за плечами скрыта целая жизнь
                        тайных операций и опасных встреч. В каждом его действии скрыта изысканная техника: он понимает,
                        что истинный мастер не оставляет следов. Однако за его безжалостной маской скрывается взгляд, в
                        котором можно обнаружить мрак, гармонирующий с преданностью своему делу.
                    </div>
                    <div class="selections__professions">
                        <h2 class="selections__subtitle">Улучшения</h2>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, ea impedit incidunt
                        perspiciatis quam unde. Accusamus aliquam atque dolorum ipsam labore magni optio, recusandae
                        repellendus sapiente unde. Id, laudantium, rerum!
                    </div>
                    <div class="selections__buttons">
                        <button class="selections__button button--metal" type="button" @click="onSelect('assasin', 'Ассасин', {
                        str: 1,
                        agi: 3,
                        vit: 1,
                        acc: 2,
                        int: 2,
                        spd: 2,
                        luc: 1,
                        def: 1,
                        })">Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/selections/styles";
</style>