// @ts-ignore
import {defineStore} from "pinia";
// @ts-ignore
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export const usePersonState = defineStore({
    id: "personState",
    state: () => ({
        login: "" as string,
        level: 1 as number,
        image: "" as string,
        isSelectedSpecies: false,
        isAdmin: true,
    }) as any,
    getters: {
        getLogin: (state: any) => {
            return state.login;
        },
        getLevel: (state: any) => {
            return state.level;
        },
        getImage: (state: any) => {
            return state.image;
        },
    },
    actions: {
        setLogin(login: string): void {
            // @ts-ignore
            this.login = login;
        },
        setSpecies(val:  boolean): void {
          // @ts-ignore
          this.isSelectedSpecies = val;
        },
        setAdmin(val: boolean): void {
            this.isAdmin = val;
        },
        setUser(val: object) {
            // @ts-ignore
            this.login = val.login;
            // @ts-ignore
            this.level = val.level;
            // @ts-ignore
            this.image = val.image;
            // @ts-ignore
            this.isSelectedSpecies = val.isSelectedSpecies;
            // @ts-ignore
            this.isAdmin = val.isAdmin;
        },
        clearStore() {
            // @ts-ignore
            this.login = "";
            // @ts-ignore
            this.level = 1;
            // @ts-ignore
            this.image = "";
            // @ts-ignore
            this.isSelectedSpecies = false;
        }
    },
    persist: true
});
