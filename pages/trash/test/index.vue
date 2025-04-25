<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "Index",
    async setup() {
    },
    data: () => ({
        canvas: null,
        ctx: null,
        gravity: 0.5,
        cameraOffset: 0,
        worldWidth: 3000,
        backgroundOffset: 0,
        keys: {
            left: false,
            right: false,
            up: false,
            space: false,
        },
        player: {
            x: 50,
            y: 300,
            width: 40,
            height: 40,
            speed: 1,
            jumpForce: 12,
            velX: 0,
            velY: 0,
            isJumping: false,
            health: 100,
            direction: 1,
            state: "idle", // idle, running, jumping, attacking
            currentFrame: 0,
            frameCount: 8,
            frameWidth: 288,
            frameHeight: 180,
            scale: 1,
            spriteSheet: null,
            lastUpdate: 0,
            frameDelay: 100, // ms между кадрами
            attackCooldown: 0,
            runFrameCount: 8, // Количество кадров в анимации бега
            runFrameDelay: 80, // Скорость анимации бега (меньше = быстрее)
        },
        platforms: [
            { x: 100, y: 400, width: 200, height: 20 },
            { x: 400, y: 350, width: 200, height: 20 },
            { x: 700, y: 300, width: 150, height: 20 },
            { x: 1000, y: 400, width: 200, height: 20 },
            { x: 1300, y: 350, width: 200, height: 20 },
            { x: 1600, y: 300, width: 150, height: 20 },
            { x: 2000, y: 400, width: 300, height: 20 },
            { x: 2500, y: 300, width: 200, height: 20 },
        ],
        backgroundElements: [
            { x: 0, y: 100, width: 500, height: 100, color: "#2c3e50" },
            { x: 600, y: 150, width: 400, height: 120, color: "#2c3e50" },
            { x: 1200, y: 80, width: 600, height: 150, color: "#2c3e50" },
            { x: 2000, y: 120, width: 500, height: 100, color: "#2c3e50" },
            { x: 2600, y: 150, width: 400, height: 120, color: "#2c3e50" },
        ],
        animationFrameId: null,
        spriteSheets: {
            idle: null,
            attack1: null,
            attack2: null,
            attack3: null,
            special: null,
            run: null,
        },
    }),
    computed: {
        playerPositionText() {
            return `Позиция: ${Math.floor(this.player.x + this.cameraOffset)}/${this.worldWidth}`;
        },
        playerStateText() {
            return `Состояние: ${this.player.state}`;
        },
    },
    methods: {
        initGame() {
            this.canvas = this.$refs.gameCanvas;
            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = 800;
            this.canvas.height = 500;

            this.loadSprites();
            this.setupEventListeners();
        },

        loadSprites() {
            // Загрузка спрайт-листов
            const loadImage = (url) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.src = url;
                });
            };

            Promise.all([
                loadImage("/images/sprites/persons/assasin/metal_bladekeeper_idle.svg").then(img => {
                    this.spriteSheets.idle = img;
                }),
                loadImage("/images/sprites/persons/assasin/metal_bladekeeper_atack.svg").then(img => {
                    this.spriteSheets.attack1 = img;
                }),
                loadImage("/images/sprites/persons/assasin/metal_bladekeeper_atack2.svg").then(img => {
                    this.spriteSheets.attack2 = img;
                }),
                loadImage("/images/sprites/persons/assasin/metal_bladekeeper_atack3.svg").then(img => {
                    this.spriteSheets.attack3 = img;
                }),
                loadImage("/images/sprites/persons/assasin/metal_bladekeeper_special.svg").then(img => {
                    this.spriteSheets.special = img;
                }),
                loadImage("/images/sprites/persons/assasin/metal_bladekeeper_run.svg").then(img => {
                    this.spriteSheets.run = img;
                }),
            ]).then(() => {
                this.player.spriteSheet = this.spriteSheets.idle;
                this.gameLoop();
            });
        },

        setupEventListeners() {
            window.addEventListener("keydown", this.handleKeyDown);
            window.addEventListener("keyup", this.handleKeyUp);
        },

        handleKeyDown(e) {
            switch (e.key) {
                case "ArrowLeft":
                    this.keys.left = true;
                    this.player.direction = -1;
                    break;
                case "ArrowRight":
                    this.keys.right = true;
                    this.player.direction = 1;
                    break;
                case "ArrowUp":
                    this.keys.up = true;
                    break;
                case " ":
                    this.keys.space = true;
                    this.playerAttack();
                    break;
            }
        },

        handleKeyUp(e) {
            switch (e.key) {
                case "ArrowLeft":
                    this.keys.left = false;
                    break;
                case "ArrowRight":
                    this.keys.right = false;
                    break;
                case "ArrowUp":
                    this.keys.up = false;
                    break;
                case " ":
                    this.keys.space = false;
                    break;
            }
        },

        playerAttack() {
            if (this.player.state !== "attacking" && this.player.attackCooldown === 0) {
                this.player.state = "attacking";
                this.player.currentFrame = 0;
                this.player.attackCooldown = 30;
                // Выбираем случайную атаку
                const attacks = ["attack1", "attack2", "attack3", "special"];
                const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
                this.player.spriteSheet = this.spriteSheets[randomAttack];

                // Через 1 секунду возвращаемся в idle
                setTimeout(() => {
                    if (this.player.state === "attacking") {
                        this.player.state = "idle";
                        this.player.spriteSheet = this.spriteSheets.idle;
                    }
                }, 1000);
            }
        },

        updatePlayer() {
            // Обновление состояния игрока
            if (this.player.state !== "attacking") {
                if (this.player.velY !== 0) {
                    this.player.state = "jumping";
                } else if (this.player.velX !== 0) {
                    this.player.state = "running"; // Изменяем состояние на бег
                    this.player.spriteSheet = this.spriteSheets.run; // Устанавливаем спрайт бега
                } else {
                    this.player.state = "idle";
                    this.player.spriteSheet = this.spriteSheets.idle; // Возвращаем idle-спрайт
                }
            }

            const nowD = Date.now();
            let frameDelay = this.player.frameDelay;

            // Разная скорость анимации для разных состояний
            if (this.player.state === "running") {
                frameDelay = this.player.runFrameDelay;
            }

            if (nowD - this.player.lastUpdate > frameDelay) {
                this.player.currentFrame = (this.player.currentFrame + 1) %
                    (this.player.state === "running" ? this.player.runFrameCount : this.player.frameCount);
                this.player.lastUpdate = nowD;
            }


            // Обновление спрайта в зависимости от состояния
            if (this.player.state === "idle" && this.player.spriteSheet !== this.spriteSheets.idle) {
                this.player.spriteSheet = this.spriteSheets.idle;
            } else if (this.player.state === "running" && this.player.spriteSheet !== this.spriteSheets.idle) {
                this.player.spriteSheet = this.spriteSheets.idle;
            }

            // Применение гравитации
            this.player.velY += this.gravity;

            // Сохраняем предыдущую позицию X для сравнения
            const prevX = this.player.x;

            // Обновление позиции
            this.player.velX = 0;
            if (this.keys.left) this.player.velX = -this.player.speed;
            if (this.keys.right) this.player.velX = this.player.speed;

            this.player.x += this.player.velX;
            this.player.y += this.player.velY;

            // Прыжок
            if (this.keys.up && !this.player.isJumping && this.player.state !== "attacking") {
                this.player.velY = -this.player.jumpForce;
                this.player.isJumping = true;
                this.player.state = "jumping";
            }

            // Зоны прокрутки камеры (30% от ширины экрана с каждой стороны)
            const scrollZoneLeft = this.canvas.width * 0.3;
            const scrollZoneRight = this.canvas.width * 0.7;

            // Вычисляем позицию игрока относительно экрана
            const playerScreenX = this.player.x - this.cameraOffset;

            // Движение камеры вправо
            if (playerScreenX > scrollZoneRight && this.cameraOffset < this.worldWidth - this.canvas.width) {
                this.cameraOffset += this.player.x - prevX;
                this.backgroundOffset += (this.player.x - prevX) * 0.5;
            }

            // Движение камеры влево
            if (playerScreenX < scrollZoneLeft && this.cameraOffset > 0) {
                this.cameraOffset += this.player.x - prevX;
                this.backgroundOffset += (this.player.x - prevX) * 0.5;
            }

            // Ограничение выхода за пределы мира
            if (this.player.x < 0) this.player.x = 0;
            if (this.player.x + this.player.width > this.worldWidth) {
                this.player.x = this.worldWidth - this.player.width;
            }

            // Ограничение падения за пределы экрана
            if (this.player.y + this.player.height > this.canvas.height) {
                this.player.y = this.canvas.height - this.player.height;
                this.player.velY = 0;
                this.player.isJumping = false;
            }

            // Гарантируем, что игрок всегда виден на экране
            if (this.player.x < this.cameraOffset) {
                this.player.x = this.cameraOffset;
            } else if (this.player.x > this.cameraOffset + this.canvas.width - this.player.width) {
                this.player.x = this.cameraOffset + this.canvas.width - this.player.width;
            }

            // Обновление анимации
            const now = Date.now();
            if (now - this.player.lastUpdate > this.player.frameDelay) {
                this.player.currentFrame = (this.player.currentFrame + 1) % this.player.frameCount;
                this.player.lastUpdate = now;
            }

            // Охлаждение атаки
            if (this.player.attackCooldown > 0) {
                this.player.attackCooldown--;
            }
        },

        checkPlatformCollisions() {
            this.platforms.forEach(platform => {
                const platformScreenX = platform.x - this.cameraOffset;

                // Проверка столкновений
                if (
                    this.player.x + this.player.width > platform.x &&
                    this.player.x < platform.x + platform.width &&
                    this.player.y + this.player.height > platform.y &&
                    this.player.y < platform.y + platform.height &&
                    this.player.velY > 0
                ) {
                    this.player.y = platform.y - this.player.height;
                    this.player.velY = 0;
                    this.player.isJumping = false;
                }
            });
        },

        drawBackground() {
            this.ctx.fillStyle = "#87CEEB";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Рисование фоновых элементов
            this.ctx.fillStyle = "#34495e";
            this.backgroundElements.forEach(element => {
                const xPos = element.x - this.backgroundOffset * 0.3;
                if (xPos + element.width > 0 && xPos < this.canvas.width) {
                    this.ctx.fillRect(xPos, element.y, element.width, element.height);
                }
            });
        },

        drawPlatforms() {
            this.ctx.fillStyle = "#2ecc71";
            this.platforms.forEach(platform => {
                const platformScreenX = platform.x - this.cameraOffset;
                if (platformScreenX + platform.width > 0 && platformScreenX < this.canvas.width) {
                    this.ctx.fillRect(platformScreenX, platform.y, platform.width, platform.height);
                }
            });
        },

        drawPlayer() {
            if (!this.player.spriteSheet) return;

            this.ctx.save();
            this.ctx.translate(-this.cameraOffset, 0);

            // Параметры спрайта
            const spriteX = this.player.x - (this.player.frameWidth * this.player.scale - this.player.width) / 2;
            const spriteY = this.player.y + this.player.height - this.player.frameHeight * this.player.scale;
            const spriteWidth = this.player.frameWidth * this.player.scale;
            const spriteHeight = this.player.frameHeight * this.player.scale;

            // Рисуем border (рамку) вокруг полного фрейма
            this.ctx.strokeStyle = "rgba(255, 0, 0, 0.7)"; // Красная полупрозрачная рамка
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(spriteX, spriteY, spriteWidth, spriteHeight);

            // Рисуем хитыбокс (для отладки)
            this.ctx.strokeStyle = "rgba(0, 255, 0, 0.5)"; // Зеленая полупрозрачная рамка
            this.ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);

            // Отражаем спрайт если игрок смотрит влево
            if (this.player.direction < 0) {
                this.ctx.translate(spriteX + spriteWidth, 0);
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(
                    this.player.spriteSheet,
                    this.player.currentFrame * this.player.frameWidth, 0,
                    this.player.frameWidth, this.player.frameHeight,
                    0, spriteY, spriteWidth, spriteHeight,
                );
            } else {
                this.ctx.drawImage(
                    this.player.spriteSheet,
                    this.player.currentFrame * this.player.frameWidth, 0,
                    this.player.frameWidth, this.player.frameHeight,
                    spriteX, spriteY, spriteWidth, spriteHeight,
                );
            }

            // Рисование здоровья
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.player.x, this.player.y - 10, this.player.width, 5);
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.player.x, this.player.y - 10, this.player.width * (this.player.health / 100), 5);

            this.ctx.restore();
        },

        drawUI() {
            this.ctx.fillStyle = "black";
            this.ctx.font = "16px Arial";
            this.ctx.fillText(this.playerPositionText, 20, 30);
            this.ctx.fillText(this.playerStateText, 20, 50);
        },

        gameLoop() {
            // Очистка экрана
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Обновление игрока
            this.updatePlayer();
            this.checkPlatformCollisions();

            // Отрисовка
            this.drawBackground();
            this.drawPlatforms();
            this.drawPlayer();
            this.drawUI();

            // Продолжение игрового цикла
            this.animationFrameId = requestAnimationFrame(this.gameLoop);
        },

        cleanup() {
            window.removeEventListener("keydown", this.handleKeyDown);
            window.removeEventListener("keyup", this.handleKeyUp);
            cancelAnimationFrame(this.animationFrameId);
        },
    },
    mounted() {
        this.initGame();
    },
    beforeDestroy() {
        this.cleanup();
    },
});
</script>

<template>
    <canvas ref="gameCanvas"></canvas>
</template>

<style scoped lang="scss">
body {
    margin: 0;
    overflow: hidden;
    background: #222;
}

canvas {
    display: block;
    z-index: 15;
}
</style>