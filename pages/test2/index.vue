<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
    data: () => ({
        cells: [], // Клетки поля боя
        hero: null, // Данные героя
        enemies: [], // Массив врагов
        currentTurn: "hero", // Текущий ход: "hero" или "enemy"
        currentEnemyIndex: 0, // Индекс текущего врага для хода
        heroAnimationClass: "", // Для управления анимацией героя
    }),
    methods: {
        createBattlefield(width, height) {
            this.cells = [];
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    this.cells.push({ x, y });
                }
            }
        },
        handleCellClick(x, y) {
            if (this.currentTurn !== "hero") return;

            const moved = this.heroMoveTo(x, y);
            if (moved) {
                this.addToLog(`Герой переместился на (${x}, ${y})`);
                if (this.isHeroTurnOver()) {
                    this.endHeroTurn();
                }
            }
        },
        heroMoveTo(x, y) {
            if (this.hero.movesLeft <= 0) return false;

            const distance = Math.abs(this.hero.x - x) + Math.abs(this.hero.y - y);
            if (distance > this.hero.movePoints) return false;

            this.hero.x = x;
            this.hero.y = y;
            this.hero.movesLeft -= distance;

            return true;
        },
        heroAttack(attackType) {
            const target = this.findClosestEnemy();
            if (!target) {
                this.addToLog("Нет врагов в зоне атаки!");
                return;
            }

            if (this.hero.attacksLeft <= 0) return;

            const attack = this.hero.attacks[attackType];
            if (!attack) return;

            const distance = Math.abs(this.hero.x - target.x) + Math.abs(this.hero.y - target.y);
            if (distance > attack.range) {
                this.addToLog("Враг слишком далеко для атаки!");
                return;
            }

            const damage = attack.baseDamage + Math.floor(Math.random() * attack.variation);
            target.health -= damage;

            // Устанавливаем GIF анимацию атаки
            this.hero.currentGif = `/images/sprites/persons/arcanist/${attackType}.gif`;
            this.heroAnimationClass = `game__person--${attackType}`;
            this.addToLog(`Герой атакует ${target.type} (${attack.name}) и наносит ${damage} урона!`);

            setTimeout(() => {
                this.hero.currentGif = "/images/sprites/persons/arcanist/idle.gif"; // Возврат к idle
                this.heroAnimationClass = "";
            }, 1000); // Длительность анимации атаки

            if (target.health <= 0) {
                const targetIndex = this.enemies.indexOf(target);
                this.enemies.splice(targetIndex, 1);
                this.addToLog(`${target.type} повержен!`);
                if (this.enemies.length === 0) {
                    this.addToLog("Победа! Все враги повержены!");
                    this.currentTurn = "game-over";
                }
            } else {
                target.currentGif = `/images/sprites/persons/enemies/${target.type}_hit.gif`;
                target.animationClass = "game__mob--hit";
                setTimeout(() => {
                    target.currentGif = `/images/sprites/persons/enemies/${target.type}_idle.gif`;
                    target.animationClass = "";
                }, 500);
            }

            this.hero.attacksLeft--;

            if (this.isHeroTurnOver()) {
                this.endHeroTurn();
            }
        },
        findClosestEnemy() {
            let closest = null;
            let minDistance = Infinity;

            for (const enemy of this.enemies) {
                const distance = Math.abs(this.hero.x - enemy.x) + Math.abs(this.hero.y - enemy.y);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = enemy;
                }
            }

            return closest;
        },
        isHeroTurnOver() {
            return this.hero.movesLeft <= 0 && this.hero.attacksLeft <= 0;
        },
        endHeroTurn() {
            this.addToLog("Ход героя завершен.");
            this.currentTurn = "enemy";
            this.currentEnemyIndex = 0;
            this.hero.movesLeft = this.hero.movePoints;
            this.hero.attacksLeft = 1;
            this.processEnemyTurn();
        },
        processEnemyTurn() {
            if (this.currentEnemyIndex >= this.enemies.length) {
                this.endEnemyTurn();
                return;
            }

            const enemy = this.enemies[this.currentEnemyIndex];
            this.addToLog(`Ход ${enemy.type}.`);

            setTimeout(() => {
                this.enemyMakeMove(enemy);
                if (this.hero.health <= 0) {
                    this.addToLog("Поражение! Герой погиб!");
                    this.currentTurn = "game-over";
                    return;
                }
                this.currentEnemyIndex++;
                this.processEnemyTurn();
            }, 1000);
        },
        enemyMakeMove(enemy) {
            const dx = this.hero.x - enemy.x;
            const dy = this.hero.y - enemy.y;

            if (Math.abs(dx) + Math.abs(dy) <= enemy.attackRange) {
                const damage = enemy.attackDamage + Math.floor(Math.random() * 5);
                this.hero.health -= damage;
                this.heroAnimationClass = "game__person--hit";
                this.addToLog(`${enemy.type} атакует героя и наносит ${damage} урона!`);
                return;
            }

            let newX = enemy.x;
            let newY = enemy.y;

            if (Math.abs(dx) > Math.abs(dy)) {
                newX += dx > 0 ? 1 : -1;
            } else {
                newY += dy > 0 ? 1 : -1;
            }

            if (this.isCellEmpty(newX, newY, enemy)) {
                enemy.x = newX;
                enemy.y = newY;
                this.addToLog(`${enemy.type} переместился на (${newX}, ${newY})`);
            }
        },
        isCellEmpty(x, y, currentEnemy) {
            if (this.hero.x === x && this.hero.y === y) return false;
            return !this.enemies.some((enemy) => enemy !== currentEnemy && enemy.x === x && enemy.y === y);
        },
        endEnemyTurn() {
            this.addToLog("Ход врагов завершен.");
            this.currentTurn = "hero";
            this.hero.movesLeft = this.hero.movePoints;
            this.hero.attacksLeft = 1;
        },
        addToLog(message) {
            const log = this.$refs.log;
            const entry = document.createElement("div");
            entry.textContent = message;
            log.appendChild(entry);
            log.scrollTop = log.scrollHeight;
        },
    },
    mounted() {
        // Создаём поле боя
        this.createBattlefield(14, 10);

        this.hero = {
            x: 2,
            y: 5,
            health: 100,
            movePoints: 2,
            movesLeft: 2,
            attacksLeft: 1,
            currentGif: "/images/sprites/persons/arcanist/idle.gif", // Начальная анимация
            attacks: {
                atk1: { name: "Ближний бой", baseDamage: 15, variation: 10, range: 1 },
                atk2: { name: "Дальний бой", baseDamage: 10, variation: 5, range: 4 },
                atk3: { name: "Магия", baseDamage: 20, variation: 15, range: 3 },
                special: { name: "Особая атака", baseDamage: 25, variation: 5, range: 2 },
            },
        };

        this.enemies = [
            {
                x: 10,
                y: 3,
                type: "goblin",
                health: 30,
                attackDamage: 8,
                attackRange: 1,
                currentGif: "/images/sprites/persons/arcanist/idle.gif",
                animationClass: "",
            },
            {
                x: 11,
                y: 6,
                type: "orc",
                health: 50,
                attackDamage: 12,
                attackRange: 1,
                currentGif: "/images/sprites/persons/arcanist/idle.gif",
                animationClass: "",
            },
            {
                x: 9,
                y: 5,
                type: "archer",
                health: 25,
                attackDamage: 10,
                attackRange: 3,
                currentGif: "/images/sprites/persons/arcanist/idle.gif",
                animationClass: "",
            },
        ];
    }
});
</script>

<template>
    <div class="game-container">
        <div class="battlefield" ref="battlefield">
            <div
                v-for="cell in cells"
                :key="`cell-${cell.x}-${cell.y}`"
                class="cell"
                :data-x="cell.x"
                :data-y="cell.y"
                :style="{ left: `${cell.x * 50}px`, top: `${cell.y * 50}px` }"
                @click="handleCellClick(cell.x, cell.y)"
            ></div>
            <!-- Герой -->
            <img
                v-if="hero"
                :src="hero.currentGif"
                class="game__person"
                :style="{ left: `${hero.x * 50}px`, top: `${hero.y * 50}px` }"
                :class="heroAnimationClass"
            />
            <!-- Враги -->
            <img
                v-for="(enemy, index) in enemies"
                :key="`enemy-${enemy.type}-${index}`"
                :src="enemy.currentGif"
                class="game__mob"
                :style="{ left: `${enemy.x * 50}px`, top: `${enemy.y * 50}px` }"
                :class="enemy.animationClass"
            />
        </div>
        <div class="ui-panel">
            <div class="hero-stats">
                <p>Герой: HP {{ hero?.health }}</p>
            </div>
            <div class="enemy-stats">
                <p v-for="(enemy, index) in enemies" :key="`enemy-stats-${index}`">
                    {{ enemy.type }}: HP {{ enemy.health }}
                </p>
            </div>
            <div class="action-buttons">
                <button
                    v-for="(attack, attackType) in hero?.attacks"
                    :key="attackType"
                    class="action-button"
                    @click="heroAttack(attackType)"
                >
                    {{ attack.name }}
                </button>
                <button class="action-button" @click="endHeroTurn">
                    Закончить ход
                </button>
            </div>
            <div class="log" ref="log"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-container {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    z-index: 19;
}

.battlefield {
    width: 700px;
    height: 500px;
    background: url("/images/pages/game/level1.gif") 0 0 / cover no-repeat;
    position: relative;
    overflow: hidden;
}

.cell {
    width: 50px;
    height: 50px;
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
}

.ui-panel {
    width: 300px;
    padding: 10px;
    background: #2c3e50;
    color: white;
}

.action-button {
    margin: 5px;
    padding: 8px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.log {
    height: 200px;
    overflow-y: auto;
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
    font-family: monospace;
    font-size: 14px;
}

/* Стили для персонажей */
.game__person {
    width: 50px; /* Увеличиваем размер */
    height: 50px;
    position: absolute;
    transition: left 0.3s, top 0.3s; /* Плавное перемещение */
}

.game__person--hit {
    animation: hit 0.5s 1;
}

.game__mob {
    width: 50px; /* Увеличиваем размер */
    height: 50px;
    position: absolute;
    transform: scaleX(-1); /* Отражение врагов */
    transition: left 0.3s, top 0.3s;
}

.game__mob--hit {
    animation: hit 0.5s 1;
}

@keyframes hit {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>