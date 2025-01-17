<script lang="ts">
import {api} from "~/api/api";
export default defineComponent({
    name: "Index",
    setup: function () {
        definePageMeta({
            layout: "selection",
        });
        const {clear, user, session, loggedIn} = useUserSession();
        const person = usePersonState();
        const {baseURL} = useRuntimeConfig().public as any;
        return {
            user,
            baseURL,
            person
        }
    },
    data: () => ({
        isWoman: false,
        selectedSpecies: {
            sex: "",
            value: "",
            name: ""
        },
        characteristics: {
            image: "/video/persons/orc-woman.mp4",
            str: 1,
            agi: 1,
            vit: 1,
            acc: 1,
            int: 1,
            spd: 1,
            luc: 1,
            def: 1,
        }
    }),
    methods: {
        onStartVideo(val: string): void {
            let video = document.querySelector(`#${val}`);
            //@ts-ignore
            video && video.play();
        },
        onPauseVideo(val: string): void {
            let video = document.querySelector(`#${val}`);
            //@ts-ignore
            video && video.pause();
        },
        onChoiceSpecies(sex: string, val: string, name: string, characteristics: object): void {
            //@ts-ignore
            this.selectedSpecies.sex = sex;
            //@ts-ignore
            this.selectedSpecies.value = val;
            //@ts-ignore
            this.selectedSpecies.name = name;
            //@ts-ignore
            this.characteristics = characteristics;
        },
        async onAccept(): Promise<any> {
            const { data, status } = await useFetch(api.characteristics, {
                method: "POST",
                baseURL: this.baseURL,
                //@ts-ignore
                body: {
                    username: this.person.login,
                    //@ts-ignore
                    ...this.characteristics
                }
            })
            if (status.value === "success") {
                const bootstrap = this.$bootstrap as any;
                let modal = bootstrap.Modal.getInstance(document.querySelector("#accept-species"));
                modal && modal.hide();
                const { data, error } = await useFetch(api.user, {
                    method: "PUT",
                    baseURL: this.baseURL,
                    body: {
                        username: this.person.login,
                        isSelectedSpecies: true
                    }
                })
                if (error) {
                    console.log(error);
                } else {
                    console.log("Данные пользователя обновлены")
                }
                this.person.setSpecies(true);
                navigateTo("/my/");
            }
        }
    }
})
</script>

<template>
    <div class="selection">
        <div class="selection__container container">
            <div class="selection__tabs">
                <button
                    :class="[!isWoman ? 'active' : '', 'selection__button button button--metal']"
                    @click="isWoman = false">Мужчина
                </button>
                <button
                    :class="[isWoman ? 'active' : '', 'selection__button button button--metal']"
                    @click="isWoman = true">Женщина
                </button>
            </div>
            <div class="selection__cards selection__cards--woman" v-if="isWoman">
                <div class="selection__card"
                     @click="onChoiceSpecies('female', 'human', 'Человек', {
                        image: '/video/persons/human-woman.mp4',
                        str: 1,
                        agi: 2,
                        vit: 2,
                        acc: 1,
                        int: 2,
                        spd: 1,
                        luc: 3,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('human-woman')"
                     @mouseout="onPauseVideo('human-woman')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Человек</p>
                    </div>
                    <div class="selection__body">
                        <video id="human-woman" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/human-woman.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('female', 'orc', 'Орк', {
                        image: '/video/persons/orc-woman.mp4',
                        str: 2,
                        agi: 1,
                        vit: 3,
                        acc: 1,
                        int: 2,
                        spd: 1,
                        luc: 1,
                        def: 2,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('orc-woman')"
                     @mouseout="onPauseVideo('orc-woman')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Орк</p>
                    </div>
                    <div class="selection__body">
                        <video id="orc-woman" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/orc-woman.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>2</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('female', 'elf', 'Эльф', {
                        image: '/video/persons/elf-woman.mp4',
                        str: 1,
                        agi: 3,
                        vit: 1,
                        acc: 2,
                        int: 2,
                        spd: 2,
                        luc: 1,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('elf-woman')"
                     @mouseout="onPauseVideo('elf-woman')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Эльф</p>
                    </div>
                    <div class="selection__body">
                        <video id="elf-woman" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/elf-woman.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('female', 'goblin', 'Гоблин', {
                        image: '/video/persons/goblin-woman.mp4',
                        str: 2,
                        agi: 1,
                        vit: 1,
                        acc: 2,
                        int: 2,
                        spd: 2,
                        luc: 2,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('goblin-woman')"
                     @mouseout="onPauseVideo('goblin-woman')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Гоблин</p>
                    </div>
                    <div class="selection__body">
                        <video id="goblin-woman" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/goblin-woman.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('female', 'vampire', 'Вампир', {
                        image: '/video/persons/vampire-woman.mp4',
                        str: 1,
                        agi: 2,
                        vit: 1,
                        acc: 1,
                        int: 4,
                        spd: 2,
                        luc: 1,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('vampire-woman')"
                     @mouseout="onPauseVideo('vampire-woman')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Вампир</p>
                    </div>
                    <div class="selection__body">
                        <video id="vampire-woman" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/vampire-woman.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>4</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('female', 'gnome', 'Гном', {
                        image: '/video/persons/gnome-woman.mp4',
                        str: 2,
                        agi: 1,
                        vit: 2,
                        acc: 1,
                        int: 2,
                        spd: 1,
                        luc: 1,
                        def: 3,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('gnome-woman')"
                     @mouseout="onPauseVideo('gnome-woman')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Гном</p>
                    </div>
                    <div class="selection__body">
                        <video id="gnome-woman" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/gnome-woman.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>3</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="selection__cards selection__cards--man" v-else>
                <div class="selection__card"
                     @click="onChoiceSpecies('male', 'human', 'Человек', {
                        image: '/video/persons/human.mp4',
                        str: 2,
                        agi: 2,
                        vit: 2,
                        acc: 1,
                        int: 1,
                        spd: 1,
                        luc: 3,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('human')"
                     @mouseout="onPauseVideo('human')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Человек</p>
                    </div>
                    <div class="selection__body">
                        <video id="human" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/human.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('male', 'orc', 'Орк', {
                        image: '/video/persons/orc.mp4',
                        str: 3,
                        agi: 1,
                        vit: 3,
                        acc: 1,
                        int: 1,
                        spd: 1,
                        luc: 1,
                        def: 2,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('orc')"
                     @mouseout="onPauseVideo('orc')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Орк</p>
                    </div>
                    <div class="selection__body">
                        <video id="orc" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/orc.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>2</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('male', 'elf', 'Эльф', {
                        image: '/video/persons/elf.mp4',
                        str: 2,
                        agi: 3,
                        vit: 1,
                        acc: 2,
                        int: 1,
                        spd: 2,
                        luc: 1,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('elf')"
                     @mouseout="onPauseVideo('elf')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Эльф</p>
                    </div>
                    <div class="selection__body">
                        <video id="elf" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/elf.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('male', 'goblin', 'Гоблин', {
                        image: '/video/persons/goblin.mp4',
                        str: 3,
                        agi: 1,
                        vit: 1,
                        acc: 2,
                        int: 1,
                        spd: 2,
                        luc: 2,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('goblin')"
                     @mouseout="onPauseVideo('goblin')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Гоблин</p>
                    </div>
                    <div class="selection__body">
                        <video id="goblin" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/goblin.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('male', 'vampire', 'Вампир', {
                        image: '/video/persons/vampire.mp4',
                        str: 2,
                        agi: 2,
                        vit: 1,
                        acc: 1,
                        int: 3,
                        spd: 2,
                        luc: 1,
                        def: 1,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('vampire')"
                     @mouseout="onPauseVideo('vampire')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Вампир</p>
                    </div>
                    <div class="selection__body">
                        <video id="vampire" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/vampire.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="selection__card"
                     @click="onChoiceSpecies('male', 'gnome', 'Гном', {
                        image: '/video/persons/gnome.mp4',
                        str: 3,
                        agi: 1,
                        vit: 2,
                        acc: 1,
                        int: 1,
                        spd: 1,
                        luc: 1,
                        def: 3,
                     })"
                     data-bs-toggle="modal"
                     data-bs-target="#accept-species"
                     @mouseover="onStartVideo('gnome')"
                     @mouseout="onPauseVideo('gnome')"
                >
                    <div class="selection__up">
                        <p class="selection__species h3">Гном</p>
                    </div>
                    <div class="selection__body">
                        <video id="gnome" class="selection__video"
                               loop
                               muted
                        >
                            <source src="/video/persons/gnome.mp4">
                        </video>
                        <p class="selection__description">
                            Этот герой известен своими выдающимися боевыми навыками и благородством. Он сражается за
                            правое дело и защищает слабых.
                        </p>
                    </div>
                    <div class="selection__down">
                        <div class="selection__block selection__block--first">
                            <p class="selection__subtitle h4a">
                                Базовые характеристики
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    <span>Сила</span>
                                    <span>3</span>
                                </li>
                                <li class="selection__item">
                                    <span>Ловкость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Выносливость</span>
                                    <span>2</span>
                                </li>
                                <li class="selection__item">
                                    <span>Меткость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Интелект</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Скорость</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Удача</span>
                                    <span>1</span>
                                </li>
                                <li class="selection__item">
                                    <span>Защита</span>
                                    <span>3</span>
                                </li>
                            </ul>
                        </div>
                        <div class="selection__block selection__block--second">
                            <p class="selection__subtitle h4a">
                                Особенности расы
                            </p>
                            <ul class="selection__list list">
                                <li class="selection__item">
                                    1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Modal id="accept-species">
        <div class="accept">
            <h2 class="accept__title h3">Вы выбрали расу: {{ selectedSpecies.name }}</h2>
            <div class="accept__buttons">
                <button class="accept__button button button--metal" type="button" @click="onAccept">Подвердить</button>
                <button class="accept__button button button--metal" type="button" data-bs-dismiss="modal">Отменить
                </button>
            </div>

        </div>
    </Modal>
</template>

<style scoped lang="scss">
@import "assets/scss/pages/selection/styles";
</style>