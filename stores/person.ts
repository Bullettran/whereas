import { defineStore } from "pinia";

export const usePersonState = defineStore("person", {
    state: () => ({
        username: "" as string,
        isSelectedSpecies: false as boolean,
        isAdmin: false as boolean,
        act: 0,
        character: {
            stats: {
                attack: 1,
                critical: 1,
                hp: 1,
                mp: 1,
                hitChance: 1,
                dodge: 1,
                speed: 1,
                defence: 1,
            },
            game_stats: {
                level: 1,
                freeCount: 0,
                maxEnergy: 10,
                currentExp: 0,
                currentEnergy: 10,
            },
            professions: [
                {
                    name: "",
                    short: "",
                    lvl: 0,
                    description: "",
                    exp: 0,
                    needExp: 10
                }
            ],
            species: "",
            species_name: "",
        },
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

        setExpChar(amount: number) {
            const getExpToNext = (level: number) => 10 + (level - 1) * 2;
            this.character.game_stats.currentExp += amount;
            while (this.character.game_stats.currentExp >= getExpToNext(this.character.game_stats.level)) {
                this.character.game_stats.currentExp -= getExpToNext(this.character.game_stats.level);
                this.setUpLevel();
            }
        },

        //todo(kharal)
        setValChars(val: number, type: string): void {
            // @ts-ignore
            this.character.stats[type] = this.character.stats[type] + val;
        },
        setUpLevel() {
            this.character.game_stats.level += 1;
            this.character.game_stats.freeCount += 1;
        },
    },
    persist: true,
});