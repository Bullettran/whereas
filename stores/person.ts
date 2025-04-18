import { defineStore } from "pinia";

export const usePersonState = defineStore("person", {
    state: () => ({
        username: "" as string,
        isSelectedSpecies: false as boolean,
        isAdmin: false as boolean,
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
        clear() {
            this.username = "";
            this.isSelectedSpecies = false;
            this.isAdmin = false;
        },
    },
});