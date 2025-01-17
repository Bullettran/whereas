<script>

export default defineComponent({
    name: "Index",
    mounted() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const player = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: 30,
            color: 'blue',
            speed: 5,
            update(mouseX, mouseY) {
                // Рассчитываем угол поворота
                const angle = Math.atan2(mouseY - this.y, mouseX - this.x);
                // Обновляем координаты игрока, добавляя скорость
                this.x += Math.cos(angle) * this.speed;
                this.y += Math.sin(angle) * this.speed;

                // Ограничение по границам
                this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
                this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
            },
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const enemies = [];
        const maxEnemies = 10;

        class Enemy {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = 20;
                this.color = 'red';
                this.speed = 1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            update(playerX, playerY) {
                const angle = Math.atan2(playerY - this.y, playerX - this.x);
                this.x += Math.cos(angle) * this.speed;
                this.y += Math.sin(angle) * this.speed;
            }
            checkCollision(player) {
                const dx = this.x - player.x;
                const dy = this.y - player.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return distance < this.size + player.size; // Проверка на столкновение
            }
        }

        function spawnEnemies() {
            if (enemies.length < maxEnemies) {
                enemies.push(new Enemy());
            }
        }

        // Переменные для мыши
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        window.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            player.update(mouseX, mouseY);
            player.draw();

            spawnEnemies();

            enemies.forEach(enemy => {
                enemy.update(player.x, player.y);
                enemy.draw();

                // Проверка на столкновение
                if (enemy.checkCollision(player)) {
                    console.log('Collision detected!');
                    // Здесь можно добавить вашу логику при столкновении
                }
            });

            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }
});
</script>

<template>
    <div class="studio">
        <div class="studio__container container">
            <canvas id="gameCanvas" class="studio__canvas"></canvas>
        </div>
    </div>

</template>

<style scoped lang="scss">
@import "assets/scss/pages/studio/styles";
</style>