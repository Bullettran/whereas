import { defineStore } from "pinia";

export const usePersonState = defineStore("person", {
    state: () => ({
        username: "" as string,
        isSelectedSpecies: false as boolean,
        isAdmin: false as boolean,
        character: null as any,

    }),
    actions: {
        setLogin(username: string) {
            this.username = username;
        },
        setSpecies(isSelectedSpecies: boolean) {
            this.isSelectedSpecies = isSelectedSpecies;
        },
        setAdmin(isAdmin: boolean) {
            this.isAdmin = isAdmin;
        },
        setCharacter(character: any) {
            this.character = character;
            this.isSelectedSpecies = true;
        },
        clear() {
            this.username = "";
            this.isSelectedSpecies = false;
            this.isAdmin = false;
        },
    },
    persist: true
});