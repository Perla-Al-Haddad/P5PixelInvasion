
class EnemyMatrix {
    constructor() {
        this.initEnemiesMatrix();
    }

    initEnemiesMatrix() {
        this.enemies = [];
        for (let i = 0; i < NUMBER_OF_ENEMY_LINES; i++) {
            let enemyLine = [];
            for (let j = 0; j < NUMBER_OF_ENEMIES_PER_LINE; j++) {
                let enemy = new Enemy(
                    j * (ENEMY_WIDTH + ENEMY_OFFSET) + ENEMY_CONTAINER_X_PADDING,
                    i * (ENEMY_HEIGHT + ENEMY_OFFSET) + ENEMY_CONTAINER_Y_PADDING);
                enemyLine.push(enemy);
            }
            this.enemies.push(enemyLine);
        }
    }

    moveDown() {
        for (let i = 0; i < this.enemies.length; i++)
            for (let j = 0; j < this.enemies[i].length; j++)
                this.enemies[i][j].y += ENEMY_HEIGHT;
    }

    handleBulletCollision(bullet, player) {
        for (let j = 0; j < this.enemies.length; j++) {
            for (let k = 0; k < this.enemies[j].length; k++) {
                if (!bullet.collidWith(this.enemies[j][k])) continue;
                bullet.setActive(false);
                player.incrementScore(this.enemies[j][k].score);
                if (ENEMY_SPEED < ENEMY_SPEED_THRESHOLD) ENEMY_SPEED += ENEMY_SPEED_INCREMENT;
                this.enemies[j][k].deactivate();
                this.enemies[j].splice(k, 1);
            }
        }
    }

    processEnemies() {
        let enemyCount = 0;

        for (let i = 0; i < this.enemies.length; i++) {
            for (let j = 0; j < this.enemies[i].length; j++) {
                enemyCount++;

                this.enemies[i][j].show();
                this.enemies[i][j].move();

                if (j == this.enemies[i].length - 1 &&
                    this.enemies[i][j].x > GAME_WIDTH - ENEMY_CONTAINER_X_PADDING * 2) {
                    this.enemies[i][j].x = GAME_WIDTH - ENEMY_CONTAINER_X_PADDING * 2;
                    ENEMY_DIR = -1;
                    this.moveDown();
                }
                if (j == 0 && this.enemies[i][j].x < ENEMY_CONTAINER_X_PADDING) {
                    this.enemies[i][j].x = ENEMY_CONTAINER_X_PADDING;
                    ENEMY_DIR = 1;
                    this.moveDown();
                }
            }
        }

        if (enemyCount == 0) {
            this.resetEnemyMatrix();
        }
    }

    resetEnemyMatrix() {
        for (let j = 0; j < this.enemies.length; j++)
            for (let k = 0; k < this.enemies[j].length; k++)
                this.enemies[j][k].deactivate();
        this.initEnemiesMatrix();
    }
}
