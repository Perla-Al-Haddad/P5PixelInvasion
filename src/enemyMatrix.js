
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

    incrementEnemySpeed() {
        if (ENEMY_SPEED < ENEMY_SPEED_THRESHOLD) ENEMY_SPEED += ENEMY_SPEED_INCREMENT;
    }

    handleBulletCollision(bullet, player) {
        for (let j = 0; j < this.enemies.length; j++) {
            for (let k = 0; k < this.enemies[j].length; k++) {
                if (!bullet.collidWith(this.enemies[j][k])) continue;
                
                game.playExplosionFX(0.1);

                bullet.setActive(false);
                
                player.incrementScore(this.enemies[j][k].score);
                
                this.incrementEnemySpeed();

                this.enemies[j][k].deactivate();
                this.enemies[j].splice(k, 1);
            }
        }
    }

    processEnemies() {
        let self = this;

        function bounceBorderEnemies(enemy, enemyIndex, enemyLineLength) {
            let isLastEnemy = enemyIndex == enemyLineLength - 1; 
            let hasReachedEnd = enemy.x > GAME_WIDTH - ENEMY_CONTAINER_X_PADDING * 2;
            let lastEnemyHasReachedEnd = isLastEnemy && hasReachedEnd;

            if (lastEnemyHasReachedEnd) {
                enemy.x = GAME_WIDTH - ENEMY_CONTAINER_X_PADDING * 2;
                ENEMY_DIR = -1;
                self.moveDown();
                return;
            }

            let isFirstEnemy = enemyIndex == 0;
            let hasReachedBeginning = enemy.x < ENEMY_CONTAINER_X_PADDING;
            let firstEnemyHasReachedBeginning = isFirstEnemy && hasReachedBeginning;  
            
            if (firstEnemyHasReachedBeginning) {
                enemy.x = ENEMY_CONTAINER_X_PADDING;
                ENEMY_DIR = 1;
                self.moveDown();
            }
        }

        let enemyCount = 0;

        for (let i = 0; i < this.enemies.length; i++) {
            for (let j = 0; j < this.enemies[i].length; j++) {
                enemyCount++;

                this.enemies[i][j].show();
                this.enemies[i][j].move();

                bounceBorderEnemies(this.enemies[i][j], j, this.enemies[i].length);
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
