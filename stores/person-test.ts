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
        currentExp: 4,
        freeCount: 0,
        currentHp: 5,
        currentMp: 5,
        characteristic: {
            str: 10,
            def: 0,
            luc: 0,
            spd: 0,
            int: 0,
            acc: 0,
            vit: 0,
            agi: 0,
        },
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
        setCharacteristic(val: object): void {
            Object.assign(this.characteristic, val);
        },
        setValChars(val: number, type: string): void {
            this.characteristic[type] = this.characteristic[type] + val;
        },
        setUpLevel() {
            this.level += 1;
            this.freeCount += 1;
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
        },
    },
    persist: true
});
