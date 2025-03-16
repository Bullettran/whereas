import { gsap } from "gsap";
// @ts-ignore
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("gsap", gsap);
});