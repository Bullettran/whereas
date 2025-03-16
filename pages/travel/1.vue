<script lang="ts">
import { usePersonState } from "~/stores/person";
import { useSuccessChance } from "~/composables/useSuccessChance";
import { usePercent } from "~/composables/usePercent";

export default defineComponent({
    name: "Index",
    setup() {
        const person = usePersonState();
        const { $gsap } = useNuxtApp();
        return {
            person,
            $gsap
        };
    },
    data: () => ({
        personPhysicsDmg: 0,
        isFight: false,
        mobsStats: {
            name: "Тестовый заяц",
            image: "images/components/mobs/test.jpg",
            hp: 10,
            mana: 1,
            def: 1,
            mageDef: 0,
            dmg: 1,
            mageDmg: 0,
            hit: 50,
            speed: 5,
            critical: 2,
            dodge: 0,
            exp: 1,
        },
    }),
    methods: {
        getDmgValue(target: any, value: any) {
            console.log(target);
            console.log(value);

            const person = document.querySelector(".detail__person");
            const enemy = document.querySelector(".detail__mobs");
            const fight = document.querySelector(".detail__fight");
            const particles = [];
            const particleCount = 50; // Количество частиц
            const radius = 30; // Радиус шара

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.backgroundColor = "#fff";
                fight.appendChild(particle);
                particles.push(particle);

                // Начальная позиция частиц (случайная)
                this.$gsap.set(particle, {
                    x: person.offsetLeft + person.offsetWidth / 2 + (Math.random() - 0.5) * 50,
                    y: person.offsetTop + person.offsetHeight / 2 + (Math.random() - 0.5) * 50,
                    opacity: 0,
                });

                // Анимация сбора частиц в шар
                this.$gsap.to(particle, {
                    x: person.offsetLeft + person.offsetWidth / 2 + Math.cos((i / particleCount) * Math.PI * 2) * radius,
                    y: person.offsetTop + person.offsetHeight / 2 + Math.sin((i / particleCount) * Math.PI * 2) * radius,
                    opacity: 1,
                    duration: 0.5,
                    delay: i * 0.01,
                    ease: 'power2.out',
                });
            }

            this.$gsap.to(particles, {
                x: enemy.offsetLeft + enemy.offsetWidth / 2,
                y: enemy.offsetTop + enemy.offsetHeight / 2,
                duration: 0.5,
                delay: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    // Удаляем частицы шара
                    particles.forEach(particle => fight.removeChild(particle));

                    // Создаем эффект взрыва
                    const explosionParticles = [];
                    for (let i = 0; i < particleCount; i++) {
                        const explosionParticle = document.createElement('div');
                        explosionParticle.className = 'explosion-particle';
                        explosionParticle.style.backgroundColor = "#fff";
                        fight.appendChild(explosionParticle);
                        explosionParticles.push(explosionParticle);

                        // Начальная позиция частиц взрыва
                        this.$gsap.set(explosionParticle, {
                            x: enemy.offsetLeft + enemy.offsetWidth / 2,
                            y: enemy.offsetTop + enemy.offsetHeight / 2,
                            opacity: 1,
                        });

                        // Анимация разлета частиц
                        this.$gsap.to(explosionParticle, {
                            x: enemy.offsetLeft + enemy.offsetWidth / 2 + (Math.random() - 0.5) * 100,
                            y: enemy.offsetTop + enemy.offsetHeight / 2 + (Math.random() - 0.5) * 100,
                            opacity: 0,
                            duration: 0.5,
                            ease: 'power2.out',
                            onComplete: () => {
                                fight.removeChild(explosionParticle);
                            }
                        });
                    }

                    // Анимация дергания карточки противника
                    this.$gsap.to(enemy, {
                        x: -5,
                        y: -5,
                        duration: 0.1,
                        repeat: 3,
                        yoyo: true,
                        ease: 'power1.inOut',
                        onComplete: () => {
                            this.$gsap.to(enemy, { x: 0, y: 0, duration: 0.1 });
                        }
                    });
                }
            });




            const targetChar = this.$refs[target];
            if (targetChar) {
                //@ts-ignore
                targetChar.receiveDamage(value.dmg);
            }
        },
        mobAttack() {
            const hit = useSuccessChance(this.mobsStats.hit);
            if (hit) {
                const dodge = useSuccessChance(this.person.characteristic.dodge);
                if (!dodge) {
                    const critical = useSuccessChance(this.mobsStats.critical);
                    if (critical) {
                        console.log("Персонаж получил критический урон");
                        let dmgFromMob = usePercent(this.mobsStats.dmg * 2, this.person.characteristic.physicalDef);
                        console.log(dmgFromMob);
                    } else {
                        console.log("Персонаж получил урон");
                        let dmgFromMob = usePercent(this.mobsStats.dmg, this.person.characteristic.physicalDef);
                        console.log(dmgFromMob);
                    }
                } else {
                    console.log("Персонаж увернулся");
                }

            } else {
                console.log("Моб промахнулся");
            }
        },
        onStartFight() {
            this.isFight = true;
            if (this.mobsStats.speed > this.person.characteristic.speed) {
                this.mobAttack();
            }
        },
    },
});
</script>

<template>
    <div class="detail">
        <div class="detail__container container">
            <div class="detail__fight" v-if="isFight">
                <div class="detail__person">
                    <Person
                        ref="person"
                        :isVisibleCharacteristics="false"
                        @physicsAttack="getDmgValue('mob', $event)"
                        @magicAttack="getDmgValue('mob', $event)"
                    />
                </div>
                <div class="detail__mobs">
                    <div class="detail__mob">
                        <MobsMob :mob="mobsStats"
                            ref="mob"
                            @physicsAttack="getDmgValue('person', $event)"
                        />
                    </div>
                </div>
            </div>
            <div class="detail__start" v-else>
                <button class="detail__button-start animated-button1" type="button" @click="onStartFight">Начать бой
                </button>
                <nuxt-link to="/my/" class="detail__button-start link animated-button4">Вернуться</nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "assets/scss/pages/travel/id/styles";
.detail__fight {
    position: relative;
    width: 100%;
    min-height: 800px;
    overflow: hidden;
}
.detail__person {
    position: absolute;
    left: 20px;
    top: 50px;
    width: 50px;
    height: 80px;
    background-color: gray;
}

.detail__mobs {
    position: absolute;
    right: 20px;
    top: 50px;
    width: 50px;
    height: 80px;
    background-color: black;
}

@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}

.shake {
    animation: shake 0.3s ease-in-out;
}

/* Стили для частиц */
.particle {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: red; /* Базовый цвет, будет переопределён в JS */
    opacity: 0;
}

/* Эффект взрыва */
.explosion-particle {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: red; /* Базовый цвет, будет переопределён в JS */
    opacity: 0;
}
</style>