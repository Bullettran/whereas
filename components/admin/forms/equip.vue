<script lang="ts">
import {Field, Form, ErrorMessage, defineRule} from "vee-validate";
import {required, min_value} from "@vee-validate/rules";
defineRule("required", required);
defineRule("min_value", min_value);
import {api} from "~/api/api";
import {boolean} from "drizzle-orm/pg-core";

export default defineComponent({
    name: "Equip",
    components: {ErrorMessage, Field, Form},
    data: () => ({
        body: {
            name: "",
            rusName: "",
            type: "",
            image: "",
            set: "",
            attack: 0,
            str: 0,
            agi: 0,
            vit: 0,
            acc: 0,
            int: 0,
            spd: 0,
            luc: 0,
            def: 0,
        },
        hasError: false,
        errorMessage: "",
        answer: null as boolean | null,
    }),
    methods: {
        async onSubmit(): Promise<any> {
            try {
                const { status, error } = await useFetch(api.equip, {
                    baseURL: useRuntimeConfig().public.baseURL,
                    method: "POST",
                    body: {
                        name: this.body.name,
                        rusName: this.body.rusName,
                        type: this.body.type,
                        image: this.body.image,
                        set: this.body.set,
                        attack: this.body.attack,
                        str: this.body.str,
                        agi: this.body.agi,
                        vit: this.body.vit,
                        acc: this.body.acc,
                        int: this.body.int,
                        spd: this.body.spd,
                        luc: this.body.luc,
                        def: this.body.def,
                    }
                })
                this.answer = !error.value;
            } catch (e: any) {
                console.log(e);
            }

        }
    }
})
</script>

<template>
    <Form class="form" @submit="onSubmit" method="post" ref="form" v-slot="{errors}">
        <div class="form__block" v-if="answer === null">
            <h2 class="form__title h2a">Добавить снаряжение</h2>
            <div class="form__fields">
                <div class="form__field">
                    <label class="form__label" for="equip-name">Наименование на английском</label>
                    <Field
                        :class="[errors['name'] ? 'form__input--error' : '', 'form__input']"
                        type="text"
                        name="name"
                        id="equip-name"
                        placeholder="Наименование на английском"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.name"
                    />
                    <ErrorMessage name="name" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-rusName">Наименование на русском</label>
                    <Field
                        :class="[errors['rusName'] ? 'form__input--error' : '', 'form__input']"
                        type="text"
                        name="rusName"
                        id="equip-rusName"
                        placeholder="Наименование на русском"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.rusName"
                    />
                    <ErrorMessage name="rusName" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-type">Тип снаряжения</label>
                    <Field
                        :class="[errors['type'] ? 'form__input--error' : '', 'form__input']"
                        type="text"
                        name="type"
                        id="equip-type"
                        placeholder="Тип снаряжения"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.type"
                    />
                    <ErrorMessage name="type" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-set">Наименование сета</label>
                    <Field
                        :class="[errors['set'] ? 'form__input--error' : '', 'form__input']"
                        type="text"
                        name="set"
                        id="equip-set"
                        placeholder="Наименование сета"
                        v-model="body.set"
                    />
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-attack">Атака</label>
                    <Field
                        :class="[errors['name'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="attack"
                        id="equip-attack"
                        placeholder="Атака"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.attack"
                    />
                    <ErrorMessage name="attack" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-str">Сила</label>
                    <Field
                        :class="[errors['str'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="str"
                        id="equip-str"
                        placeholder="Сила"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.str"
                    />
                    <ErrorMessage name="str" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-agi">Ловкость</label>
                    <Field
                        :class="[errors['agi'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="agi"
                        id="equip-agi"
                        placeholder="Ловкость"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.agi"
                    />
                    <ErrorMessage name="agi" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-vit">Выносливость</label>
                    <Field
                        :class="[errors['vit'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="vit"
                        id="equip-vit"
                        placeholder="Выносливость"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.vit"
                    />
                    <ErrorMessage name="vit" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-str">Меткость</label>
                    <Field
                        :class="[errors['acc'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="acc"
                        id="equip-acc"
                        placeholder="Меткость"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.acc"
                    />
                    <ErrorMessage name="acc" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-int">Интелект</label>
                    <Field
                        :class="[errors['int'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="int"
                        id="equip-int"
                        placeholder="Интелект"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.int"
                    />
                    <ErrorMessage name="int" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-spd">Скорость</label>
                    <Field
                        :class="[errors['spd'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="spd"
                        id="equip-spd"
                        placeholder="Скорость"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.spd"
                    />
                    <ErrorMessage name="spd" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-luc">Удача</label>
                    <Field
                        :class="[errors['luc'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="luc"
                        id="equip-luc"
                        placeholder="Удача"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.luc"
                    />
                    <ErrorMessage name="luc" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-def">Защита</label>
                    <Field
                        :class="[errors['def'] ? 'form__input--error' : '', 'form__input']"
                        type="number"
                        name="def"
                        id="equip-def"
                        placeholder="Защита"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.def"
                    />
                    <ErrorMessage name="def" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
                <div class="form__field">
                    <label class="form__label" for="equip-image">Наименование изображение</label>
                    <Field
                        :class="[errors['image'] ? 'form__input--error' : '', 'form__input']"
                        type="text"
                        name="image"
                        id="equip-image"
                        placeholder="Наименование изображение"
                        :rules="{required: true}"
                        :validateOnInput="true"
                        v-model="body.image"
                    />
                    <ErrorMessage name="image" as="p" v-slot="message">
                        <p class="form__error">Обязательное поле</p>
                    </ErrorMessage>
                </div>
            </div>
            <div class="form__buttons">
                <button class="form__button button button--metal" type="submit">Добавить</button>
            </div>
        </div>
        <div class="form__success" v-if="answer === true">
            <h2 class="form__title form__title--success h2a">Успех</h2>
            <p class="form__text">Форма успешно отправлена</p>
        </div>
        <div class="form__success" v-if="answer === false">
            <h2 class="form__title form__title--error h2a">Ошибка</h2>
            <p class="form__text">{{errorMessage}}</p>
        </div>

    </Form>
</template>

<style scoped lang="scss">
@import "styles";
</style>