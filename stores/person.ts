import { defineStore } from "pinia";

export const usePersonState = defineStore("person", {
    state: () => ({
        username: "" as string,
        isSelectedSpecies: false as boolean,
        isAdmin: false as boolean,
        character: {
            characteristics: { "acc": 1, "agi": 1, "def": 2, "int": 1, "luc": 2, "spd": 1, "str": 3, "vit": 2 },
            upgrades: {"card": {"icon": "defence.png", "name": "Нерушимая стена", "rare": "standard", "type": "Защита", "bonus": {"immune": true}, "count": 2, "manaCost": 3, "description": "+100% защиты на 1 ход"}, "slot": {"val": 2, "name": "def"}, "progress": {"val": 1, "name": "vit"}},
            game_stats: {"level": 1, "freeCount": 0, "maxEnergy": 10, "currentExp": 0, "currentEnergy": 5},
            species: "",
            species_name: ""
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

        //todo(kharal)
        setValChars(val: number, type: string): void {
            // @ts-ignore
            this.character.characteristics[type] = this.character.characteristics[type] + val;
        },
        setUpLevel() {
            this.character.game_stats.level += 1;
            this.character.game_stats.freeCount += 1;
        },
    },
    persist: true,
});