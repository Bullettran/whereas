<script lang="ts">
import { defineComponent } from "vue";
import Reward from "~/components/reward/reward.vue";

export default defineComponent({
    name: "FlyDemon",
    components: { Reward },
    data: () => ({
        char: usePersonState(),
        log: [] as Array<any>,
        isPlayerTurn: true,
        isMobDied: false,
        isPlayerDied: false,
        isPlayerHidden: false,
        isMobHidden: false,
        mob: {
            stats: {
                attack: 4,
                critical: 0,
                hp: 10,
                mp: 6,
                speed: 1,
                defence: 2,
                currentHp: 10,
                currentMp: 6,
            },
            actions: {
                x: 640,
                y: 520,
                speed: 3,
                facingLeft: false,
                previousX: 394,
                moving: false,
                moveInterval: null as any,
                state: "idle",
            },
            skills: [
                {
                    id: "auto-attack",
                    name: "Автоатака",
                    description: "Наносит урон врагу",
                    type: "attack",
                    manaCost: 0,
                    effect: {
                        damage: 0,
                        duration: 0,
                        element: "",
                    },
                    animType: "attack",
                },
                {
                    id: "bleed",
                    name: "блабла",
                    description: "Атакует и вешает дебаф",
                    type: "attack",
                    manaCost: 3,
                    effect: {
                        damage: 1,
                        damagePerTurn: 1,
                        duration: 2,
                        description: "Каждый ход получает урон",
                        element: "debuff",
                    },
                    animType: "attack",
                },
            ],
            buffs: [],
            debuffs: [] as any,
            bonus: {
                attack: 0,
                critical: 0,
                hp: 0,
                mp: 0,
                speed: 0,
                defence: 0,
            },
            image: "/images/sprites/mobs/red-flying-demon/icon.png",
        },
        person: {
            actions: {
                x: 200,
                y: 410,
                speed: 3,
                facingLeft: false,
                previousX: 394,
                moving: false,
                moveInterval: null as any,
                state: "idle",
            },
            stats: {
                currentHp: 7,
                currentMp: 6,
            },
            skills: [
                {
                    id: "auto-attack",
                    name: "Автоатака",
                    description: "Наносит урон врагу",
                    type: "attack",
                    manaCost: 0,
                    effect: {
                        damage: 0,
                        duration: 0,
                        element: "",
                    },
                    animType: "attack",
                },
                {
                    id: "burning",
                    name: "Огненный шар",
                    description: "Наносит урон врагу",
                    type: "attack",
                    manaCost: 1,
                    effect: {
                        damage: 2,
                        duration: 0,
                        element: "",
                    },
                    animType: "attack1",
                },
                {
                    id: "blade-of-flame",
                    name: "Меч пламени",
                    description: "Наносит множесветнный урон врагу",
                    type: "attack",
                    manaCost: 2,
                    effect: {
                        damage: 3,
                        duration: 0,
                        element: "",
                    },
                    animType: "attack2",
                },
                {
                    id: "eternal-flame",
                    name: "блабла",
                    description: "Атакует и вешает дебаф",
                    type: "attack",
                    manaCost: 3,
                    effect: {
                        damage: 1,
                        damagePerTurn: 1,
                        duration: 2,
                        description: "Каждый ход получает урон",
                        element: "debuff",
                    },
                    animType: "attack3",
                },
                {
                    id: "flame-control",
                    name: "бббб",
                    description: "Восстанавливает жизни 2 хода",
                    type: "buff",
                    manaCost: 3,
                    effect: {
                        healPerTurn: 1,
                        duration: 2,
                        element: "heal",
                        description: "Восстанавливает здоровье",
                    },
                    animType: "buff",
                },
                {
                    id: "flame-shield",
                    name: "ббб",
                    description: "Увеличивает атаку на 7 ходов",
                    type: "buff",
                    manaCost: 4,
                    effect: {
                        attack: 2,
                        duration: 7,
                        element: "buff",
                        description: "Увеличена атака",
                    },
                    animType: "buff",
                },
            ],
            potions: [
                {
                    id: "hp-1",
                    name: "Эликсир здоровья",
                    description: "Восполняет 2 здоровья",
                    type: "potion",
                    manaCost: 0,
                    used: false,
                    effect: {
                        heal: 2,          // Урон, наносимый скиллом
                        duration: 0,        // Продолжительность эффекта (0 — мгновенный)
                        element: "heal",     // Тип урона/эффекта (огонь)
                    },
                },
                {
                    id: "mp-1",
                    name: "Эликсир маны",
                    description: "Восполняет 2 маны",
                    type: "potion",
                    manaCost: 0,
                    used: false,
                    effect: {
                        mp: 2,          // Урон, наносимый скиллом
                        duration: 0,        // Продолжительность эффекта (0 — мгновенный)
                        element: "mana",     // Тип урона/эффекта (огонь)
                    },
                },
                {
                    id: "def-1",
                    name: "Эликсир маны",
                    description: "Увеличивает защиту на ",
                    type: "potion",
                    manaCost: 0,
                    used: false,
                    effect: {
                        defence: 2,          // Урон, наносимый скиллом
                        duration: 0,        // Продолжительность эффекта (0 — мгновенный)
                        element: "defence",     // Тип урона/эффекта (огонь)
                    },
                },
            ],
            buffs: [],
            debuffs: [] as any,
            bonus: {
                attack: 0,
                critical: 0,
                hp: 0,
                mp: 0,
                speed: 0,
                defence: 0,
            } as any,
        },
        targets: {
            start: {
                x: 200,
                y: 410,
            },
            battle: {
                x: 460,
                y: 440,
            },
            person: {
                x: 350,
                y: 500,
            },
            mob: {
                x: 640,
                y: 520,
            },
        },
        rewardGold: 10,
        rewards: [
            {
                id: "moonstone",
                name: "Лунный камень",
                description: "Камень, светящийся мягким лунным светом.",
                type: "material",
                rare: "standard",
                chance: 20,
                icon: "moonstone",
                count: 2,
                stats: {},
                set: {},
                buffs: {},
                questItem: {
                    isQuest: false,
                    type: "",
                },
            },
            {
                id: "demon-essence",
                name: "Эссенция демона",
                description: "Таинственная субстанция, добытая из демонических существ.",
                type: "material",
                rare: "standard",
                icon: "demon-essence",
                chance: 100,
                count: 1,
                stats: {},
                set: {},
                buffs: {},
                questItem: {
                    isQuest: false,
                    type: "",
                },
            },
            {
                id: "tree",
                name: "Простая древесина",
                description: "Простая древесина",
                type: "material",
                rare: "standard",
                icon: "tree",
                count: 1,
                chance: 50,
                stats: {},
                set: {},
                buffs: {},
                questItem: {
                    isQuest: false,
                    type: "",
                },
            },
        ],
    }),
    methods: {
        // проверка что персонаж жив
        isPersonAlive() {
            return this.person.stats.currentHp > 0;
        },
        // проверка что моб жив
        isMobAlive() {
            return this.mob.stats.currentHp > 0;
        },
        // Метод передвижения моба
        moveMobTo(type: string) {
            if (this.mob.actions.moving) return;
            this.mob.actions.moving = true;
            this.mob.actions.state = "run";
            const target = {
                // @ts-ignore
                x: this.targets[type].x,
                // @ts-ignore
                y: this.targets[type].y,
            };
            clearInterval(this.mob.actions.moveInterval);
            this.mob.actions.moveInterval = setInterval(() => {
                const dx = target.x - this.mob.actions.x;
                const dy = target.y - this.mob.actions.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Определяем направление по оси X
                if (dx > 0) {
                    this.mob.actions.facingLeft = true;
                } else if (dx < 0) {
                    this.mob.actions.facingLeft = false;
                }
                if (dist < this.mob.actions.speed) {
                    this.mob.actions.x = target.x;
                    this.mob.actions.y = target.y;
                    this.mob.actions.moving = false;
                    clearInterval(this.mob.actions.moveInterval);
                    if (type === "person") {
                        this.mob.actions.state = "attack";
                        this.mobAnimations("attack");
                        setTimeout(() => {
                            this.mob.actions.state = "idle";
                            this.moveMobTo("mob");
                        }, 600);
                    } else if (type === "mob") {
                        this.mob.actions.state = "idle";
                        this.mob.actions.facingLeft = false;
                    }
                    return;
                }
                this.mob.actions.previousX = this.mob.actions.x;
                // Двигаем моба по направлению к цели
                this.mob.actions.x += (dx / dist) * this.mob.actions.speed;
                this.mob.actions.y += (dy / dist) * this.mob.actions.speed;
                if (this.mob.actions.state !== "run") {
                    this.mob.actions.state = "run";
                }
            }, 16); // ~60fps
        },
        // Метож передвижения персонажа
        moveTo(type: string, skill: any) {
            if (this.person.actions.moving) return;
            this.person.actions.moving = true;
            this.person.actions.state = "run";
            const target = {
                // @ts-ignore
                x: this.targets[type].x,
                // @ts-ignore
                y: this.targets[type].y,
            };
            clearInterval(this.person.actions.moveInterval);
            this.person.actions.moveInterval = setInterval(() => {
                const dx = target.x - this.person.actions.x;
                const dy = target.y - this.person.actions.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // Определяем направление по оси X
                if (dx < 0) {
                    this.person.actions.facingLeft = true;
                } else if (dx > 0) {
                    this.person.actions.facingLeft = false;
                }
                if (dist < this.person.actions.speed) {
                    this.person.actions.x = target.x;
                    this.person.actions.y = target.y;
                    this.person.actions.moving = false;
                    clearInterval(this.person.actions.moveInterval);
                    if (type === "battle") {
                        this.onFightPerson(type, skill);
                    } else if (type === "start") {
                        this.person.actions.state = "idle";
                        this.person.actions.facingLeft = false;
                    }
                    return;
                }
                this.person.actions.previousX = this.person.actions.x;
                // Двигаем персонажа по направлению к цели
                this.person.actions.x += (dx / dist) * this.person.actions.speed;
                this.person.actions.y += (dy / dist) * this.person.actions.speed;
            }, 16); // ~60fps
        },
        // Метод самой битвы для персонажа
        onFightPerson(type: any, skill: any) {
            if (!this.isPersonAlive() || !this.isMobAlive()) return;
            if (skill.animType === "buff") {
                this.setBuff(skill, "person");
                this.playAnimType(skill.animType);
            } else {
                this.playAnimType(skill.animType);
                // Если имеется свойство дебафа
                if (skill.effect.element === "debuff") {
                    this.setDebuff(skill, "mob");
                }

                const dmg = skill.effect.damage + this.char.character.stats.attack + this.person.bonus.attack;
                this.applyDamageToMob(this.isCriticalHit("person", dmg));

                this.onReturnStart();
            }
            this.endPlayerTurn();
        },
        chooseMobSkill() {
            const skills = this.mob.skills;
            const affordableSkills = skills.filter((skill) => {
                return this.mob.stats.currentMp >= (skill.manaCost || 0);
            });

            if (affordableSkills.length === 0) {
                return skills.find(skill => skill.id === "auto-attack") || skills[0];
            }

            const randomIndex = Math.floor(Math.random() * affordableSkills.length);
            return affordableSkills[randomIndex];
        },
        enemyTurn() {
            if (!this.isPersonAlive() || !this.isMobAlive()) return;
            const skill = this.chooseMobSkill();
            if (skill.manaCost) {
                this.mob.stats.currentMp -= skill.manaCost;
            }
            setTimeout(() => {
                this.moveMobTo("person");
                setTimeout(() => {
                    // Снова проверяем, не умер ли кто-то за время анимации
                    if (!this.isPersonAlive() || !this.isMobAlive()) return;
                    if (skill.effect.element === "debuff") {
                        this.setDebuff(skill, "person");
                    }
                    const damage = (skill.effect.damage || 0) + this.mob.stats.attack + (this.mob.bonus.attack || 0);
                    this.applyDamageToPerson(damage);
                    this.setLogs(`Враг использует "${skill.name}" и наносит ${damage} урона`);
                    this.processEffects(this.person);
                    this.processEffects(this.mob);
                    this.regenMana();
                    this.isPlayerTurn = true;
                }, 1200);
            }, 700);
        },
        // Реген маны todo(kharal):
        regenMana() {
            // @ts-ignore
            this.person.stats.currentMp = Math.min(this.person.stats.currentMp + 1, this.char.character.stats.mp);
        },
        setBuff(skill: any, target: any) {
            // @ts-ignore
            this[target].buffs.push({
                duration: skill.effect.duration,
                healPerTurn: skill.effect.healPerTurn ? skill.effect.healPerTurn : 0,
                bonus: {
                    attack: skill.effect.attack ? skill.effect.attack : 0,
                    critical: skill.effect.critical ? skill.effect.critical : 0,
                    hp: skill.effect.hp ? skill.effect.hp : 0,
                    mp: skill.effect.mp ? skill.effect.mp : 0,
                    speed: skill.effect.speed ? skill.effect.speed : 0,
                    defence: skill.effect.defence ? skill.effect.defence : 0,
                },
                image: `/images/skills/${this.char.character.species}/${skill.id}.png`,
                desc: skill.effect.description,
            });
        },
        // Получение мобом дебафоф
        setDebuff(skill: any, target: any) {
            // @ts-ignore
            this[target].debuffs.push({
                duration: skill.effect.duration,
                damagePerTurn: skill.effect.damagePerTurn,
                image: target === "mob" ? `/images/skills/${this.char.character.species}/${skill.id}.png` : `/images/skills/mob/${skill.id}.png`,
                desc: skill.effect.description,
            });
        },
        /**
         * Универсальная обработка всех бафов и дебафов у цели (персонажа или моба)
         * - Применяет эффекты (лечение, урон, бонусы)
         * - Уменьшает длительность
         * - Удаляет истекшие эффекты
         */
        processEffects(target: any) {
            // Бафы
            if (Array.isArray(target.buffs)) {
                for (let i = target.buffs.length - 1; i >= 0; i--) {
                    const buff = target.buffs[i];

                    // Обработка лечения
                    if (buff.healPerTurn) {
                        // Хиляем но не больше максимума хп
                        target.stats.currentHp = Math.min(target.stats.currentHp + buff.healPerTurn, this.char.character.stats.hp);
                        this.setLogs(`+${buff.healPerTurn} здоровья от бафа (${buff.desc})`);
                    }

                    // Обработка бонусов статов
                    if (buff.bonus) {
                        Object.keys(buff.bonus).forEach((key) => {
                            if (buff.bonus[key]) {
                                target.bonus[key] = (target.bonus[key] || 0) + buff.bonus[key];
                            }
                        });
                    }
                    buff.duration--;
                    // обработка длительности эффектов
                    if (buff.duration <= 0) {
                        if (buff.bonus) {
                            Object.keys(buff.bonus).forEach((key) => {
                                if (buff.bonus[key]) {
                                    target.bonus[key] = (target.bonus[key] || 0);
                                }
                            });
                        }
                        target.buffs.splice(i, 1);
                        this.setLogs(`Баф (${buff.desc}) закончился`);
                    }
                }
            }
            // Дебафы
            if (Array.isArray(target.debuffs)) {
                for (let i = target.debuffs.length - 1; i >= 0; i--) {
                    const debuff = target.debuffs[i];

                    if (debuff.damagePerTurn > 0) {
                        if (target === this.person) {
                            this.applyDamageToPerson(debuff.damagePerTurn);
                            this.setLogs(`-${debuff.damagePerTurn} здоровья от дебафа (${debuff.desc})`);
                        } else {
                            this.applyDamageToMob(debuff.damagePerTurn);
                            this.setLogs(`-${debuff.damagePerTurn} здоровья от дебафа (${debuff.desc})`);
                        }
                    }
                    debuff.duration--;
                    if (debuff.duration <= 0) {
                        target.debuffs.splice(i, 1);
                        this.setLogs(`Дебаф "${debuff.desc}" закончился`);
                    }

                }
            }
            this.checkMobDeath();
            this.checkPlayerDeath();
        },
        endPlayerTurn() {
            setTimeout(() => {
                this.processEffects(this.person);
                this.processEffects(this.mob);
                this.log.unshift("Ход персонажа закончился");
                this.enemyTurn();
            }, 2000);
        },
        // Возврат к месту стойки персонажа
        onReturnStart() {
            setTimeout(() => {
                this.moveTo("start", null);
            }, 1000);
        },
        // Анимация получения урона мобом
        mobAnimations(type: string) {
            this.mob.actions.state = type;
        },
        // Анимации атак и бафоф
        playAnimType(animType: string) {
            const characterEl = this.$refs.character;
            if (!characterEl) return;
            // @ts-ignore
            const classList = characterEl.classList;
            [
                `${this.char.character.species}--attack`,
                `${this.char.character.species}--attack1`,
                `${this.char.character.species}--attack2`,
                `${this.char.character.species}--attack3`,
                `${this.char.character.species}--def`,
                `${this.char.character.species}--buff`,
                `${this.char.character.species}--hit`,
                `${this.char.character.species}--death`,
            ].forEach(cls => classList.remove(cls));
            if (animType) {
                classList.add(`${this.char.character.species}--${animType}`);
            }
            setTimeout(() => {
                classList.remove(`${this.char.character.species}--${animType}`);
            }, 1000);
        },
        // Использование скиллов
        useSkill(skill: any) {
            if (!this.isPersonAlive() || !this.isMobAlive()) return;
            if (!this.isPlayerTurn) return;
            // Уменьшаем ману и проверяем
            if (this.person.stats.currentMp < skill.manaCost) return;
            this.person.stats.currentMp -= skill.manaCost;

            this.isPlayerTurn = false;
            // Если баф то не бежим к мобу
            if (skill.animType !== "buff") {
                this.moveTo("battle", skill);
            } else {
                this.onFightPerson("battle", skill);
            }
        },
        // Получение урона персонажем
        applyDamageToPerson(damage: number) {
            if (!this.isPersonAlive() || !this.isMobAlive()) return;
            const defence = this.char.character.stats.defence + this.person.bonus.defence;
            // todo(kharal): Продумать баланс может минимум 1 урон
            const finalDmg = Math.max(damage - defence, 1);

            this.person.stats.currentHp = Math.max(this.person.stats.currentHp - finalDmg, 0);
            setTimeout(() => {
                this.playAnimType("hit");
            }, 500);
            setTimeout(() => {
                if (this.person.stats.currentHp > 0) {
                    this.person.actions.state = "idle";
                } else {
                    this.playAnimType("death");
                }
            }, 1000);
            this.setLogs(`Персонаж получил ${finalDmg} урона (с учётом защиты ${defence})`);
            this.checkPlayerDeath();
        },
        // проверка смерти игрока
        checkPlayerDeath() {
            if (this.isPlayerDied) return;
            if (this.person.stats.currentHp <= 0) {
                this.isPlayerDied = true;
                this.person.stats.currentHp = 0;
                this.playAnimType("death");
                this.setLogs("Персонаж погиб!");
                // Блокируем действия игрока
                this.isPlayerTurn = false;
                setTimeout(() => {
                    this.isPlayerHidden = true;
                }, 1000);
            }
        },
        // Получение урона мобом
        applyDamageToMob(damage: number) {
            if (!this.isPersonAlive() || !this.isMobAlive()) return;
            const defence = this.mob.stats.defence + (this.mob.bonus.defence || 0);
            // todo(kharal): Продумать баланс может минимум 1 урон
            const finalDmg = Math.max(damage - defence, 1);
            this.mob.stats.currentHp = Math.max(this.mob.stats.currentHp - finalDmg, 0);
            setTimeout(() => {
                this.mob.actions.state = "hit";
            }, 400);
            setTimeout(() => {
                if (this.mob.stats.currentHp > 0) {
                    this.mob.actions.state = "idle";
                } else {
                    this.mob.actions.state = "death";
                    this.isMobDied = true;
                }
            }, 2000);
            this.setLogs(`Моб получил ${finalDmg} урона (с учётом защиты ${defence})`);
            this.checkMobDeath();
        },
        // проверка смерти моба
        checkMobDeath() {
            if (this.isMobDied) return;
            if (this.mob.stats.currentHp <= 0) {
                this.isMobDied = true;
                this.mob.stats.currentHp = 0;
                this.mob.actions.state = "death";
                this.setLogs("Моб повержен!");
                // Блокируем действия врага
                this.isPlayerTurn = false;
                setTimeout(() => {
                    this.isMobHidden = true;
                    this.openReward();
                }, 1500);
            }
        },
        // Получение процента
        onPercentage(exp: number, needExp: number): any {
            return (exp / needExp) * 100;
        },
        // Расчет критического урона
        isCriticalHit(target: "person" | "mob", dmg: number): number {
            let criticalChance = 0 as number;
            if (target === "person") {
                criticalChance = this.char.character.stats.critical + this.person.bonus.critical;
                this.setLogs("Успех критического удара");
            } else {
                criticalChance = this.mob.stats.critical + this.mob.bonus.critical;
            }
            const roll = Math.random() * 100;
            if (roll <= criticalChance) {
                return dmg * 2;
            } else {
                return dmg;
            }
        },

        drinkPotion(potion: any) {
            this.setLogs(`Использовано зелье: ${potion.name}`);
            // Лечение HP
            if (potion.effect.heal) {
                const maxHp = this.char.character.stats.hp;
                const prevHp = this.person.stats.currentHp;
                this.person.stats.currentHp = Math.min(this.person.stats.currentHp + potion.effect.heal, maxHp);
                this.setLogs(`+${this.person.stats.currentHp - prevHp} Здоровья`);
            }
            // Восстановление MP
            if (potion.effect.mp) {
                const maxMp = this.char.character.stats.mp;
                const prevMp = this.person.stats.currentMp;
                this.person.stats.currentMp = Math.min(this.person.stats.currentMp + potion.effect.mp, maxMp);
                this.setLogs(`+${this.person.stats.currentMp - prevMp} MP`);
            }
            // Мгновенное усиление защиты
            if (potion.effect.defence) {
                this.person.bonus.defence = (this.person.bonus.defence || 0) + potion.effect.defence;
                this.setLogs(`Защита увеличена на ${potion.effect.defence}`);
            }
            potion.used = true;
        },
        // Логи боя
        setLogs(text: string) {
            this.log.unshift(text);
        },
        // Получение награды
        openReward() {
            //@ts-ignore
            let modal = new this.$bootstrap.Modal(document.getElementById("reward"), {
                backdrop: "static",
                keyboard: false,
            });
            modal.show();
        },
        onRewardClose(generatedRewards: any) {
            // todo(kharal): Добавить вещи в инвентарь
            console.log(generatedRewards);
            navigateTo("/town");
        },
    },
    mounted() {
    },
});
</script>

<template>
    <div class="fight">
        <div class="fight__container container">
            <div class="fight__stats stats">
                <div class="stats__wrapper">
                    <div class="stats__block stats__block--person">
                        <div class="stats__picture">
                            <img class="stats__image" alt="Изображение персонажа"
                                 :src="`/images/sprites/persons/${char.character.species}/icon-${char.character.species}.png`">
                        </div>
                        <div class="stats__specifications">
                            <ProgressBar class="stats__hp"
                                         :value="onPercentage(person.stats.currentHp, char.character.stats.hp)">
                                {{ person.stats.currentHp }}/{{ char.character.stats.hp }}
                            </ProgressBar>
                            <ProgressBar class="stats__mp"
                                         :value="onPercentage(person.stats.currentMp, char.character.stats.mp)">
                                {{ person.stats.currentMp }}/{{ char.character.stats.mp }}
                            </ProgressBar>
                            <div class="stats__buffs">
                                <p class="stats__text">Бафы:</p>
                                <div class="stats__wrap" v-for="buff in person.buffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }}
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="stats__buffs">
                                <p class="stats__text">Дебафы:</p>
                                <div class="stats__wrap" v-for="buff in person.debuffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }}
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fight__logs logs">
                        <div class="logs__log" v-for="item in log">
                            {{ item }}
                        </div>
                    </div>
                </div>
                <div class="stats__mobs">
                    <div class="stats__block stats__block--mob">
                        <div class="stats__picture">
                            <img class="stats__image" :src="mob.image" alt="Изображение моба">
                        </div>
                        <div class="stats__specifications">
                            <ProgressBar class="stats__hp" :value="onPercentage(mob.stats.currentHp, mob.stats.hp)">
                                {{ mob.stats.currentHp }}/{{ mob.stats.hp }}
                            </ProgressBar>
                            <ProgressBar class="stats__mp" :value="onPercentage(mob.stats.currentMp, mob.stats.mp)">
                                {{ mob.stats.currentMp }}/{{ mob.stats.mp }}
                            </ProgressBar>
                            <div class="stats__buffs">
                                <p class="stats__text">Бафы:</p>
                                <div class="stats__wrap" v-for="buff in mob.buffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }}
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration }}
                                    </div>
                                </div>
                            </div>
                            <div class="stats__buffs">
                                <p class="stats__text">Дебафы:</p>
                                <div class="stats__wrap" v-for="buff in mob.debuffs">
                                    <img class="stats__icon" :src="
                                    //@ts-ignore
                                    buff.image" alt="Изображение бафа">
                                    <div class="stats__desc">{{
                                            //@ts-ignore
                                            buff.desc
                                        }} {{
                                            //@ts-ignore
                                            buff.damagePerTurn }} ед.
                                    </div>
                                    <div class="stats__duration">{{
                                            //@ts-ignore
                                            buff.duration }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!isPlayerHidden" :class="[
                person.actions.state === 'run' ? `${char.character.species}--run` : ``,
                person.actions.state === 'idle' ? `${char.character.species}--idle` : ``,
                person.actions.facingLeft ? `${char.character.species}--left` : '',
                 `${char.character.species ? char.character.species : 'arcanist'}`,
                  'fight__person'
                  ]"
                 ref="character" :style="{
                left: person.actions.x + 'px',
                top: person.actions.y + 'px',
            }"></div>
            <div class="fight__mobs">
                <div
                    v-if="!isMobHidden"
                    :class="[
                    mob.actions.state === 'hit' ? 'fight__mob--hit' :
                    mob.actions.state === 'attack' ? 'fight__mob--attack' :
                    mob.actions.state === 'death' ? 'fight__mob--death' : 'fight__mob--idle',
                    mob.actions.facingLeft ? `fight__mob--left` : '',
                    'fight__mob'
                    ]" ref="mob" :style="{
                left: mob.actions.x + 'px',
                top: mob.actions.y + 'px',
            }"></div>
            </div>
            <div class="fight__skills skills">
                <div class="skills__wrap">
                    <div class="skills__skill" v-for="skill in person.skills" @click="useSkill(skill)">
                        <img class="skills__image" :src="`/images/skills/${char.character.species}/${skill.id}.png`"
                             :alt="skill.name">
                        <div class="skills__desc">{{ skill.description }}</div>
                        <div class="skills__cost">
                            {{ skill.manaCost }}
                            <nuxt-icon class="skills__icon-mana" name="stats/mana" />
                        </div>
                    </div>
                </div>
                <div class="skills__wrap skills__wrap--potions">
                    <button :class="[potion.used ? 'skills__skill--used' : '', 'skills__skill button']"
                            :disabled="potion.used" v-for="potion in person.potions" @click="drinkPotion(potion)">
                        <img class="skills__image" :src="`/images/potions/${potion.id}.png`"
                             :alt="potion.name">
                        <div class="skills__desc skills__desc--potions">{{ potion.description }}</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Modal id="reward" size="lg">
        <Reward :gold="rewardGold" :rewards="rewards" @close="onRewardClose" />
    </Modal>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/game/fly-demon/styles";
</style>