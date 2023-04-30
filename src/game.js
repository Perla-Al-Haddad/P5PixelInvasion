class Game {
    states = {
        PLAY: 'play',
        GAME_OVER: 'game_over'
    };

    constructor(player, enemyMatrix) {
        this.state = this.states.PLAY;

        this.player = player;
        this.enemyBullets = [];
        this.enemyMatrix = enemyMatrix;
    }

    renderLimitLine() {
        setLineDash([5, 5]); // create the dashed line pattern here
        stroke(255, 255, 255);
        line(0, ENEMY_Y_LIMIT, GAME_WIDTH, ENEMY_Y_LIMIT);
    }

    processPlayer() {
        for (let i = this.player.bullets.length - 1; i >= 0; i--) {
            if (this.player.bullets[i].active) {
                this.player.bullets[i].show();
                this.player.bullets[i].move();

                this.enemyMatrix.handleBulletCollision(this.player.bullets[i], this.player);
            } else {
                this.player.bullets.splice(i, 1);
            }
        }

        this.player.show();
        this.player.move();
    }

    processEnemyBullets() {
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            if (this.enemyBullets[i].active) {
                this.enemyBullets[i].move();
                this.enemyBullets[i].show();

                this.player.handleBulletCollision(this.enemyBullets[i]);
            } else {
                this.enemyBullets.splice(i, 1);
            }
        }
    }

    processGameOverState() {
        textSize(32);
        textAlign(CENTER);
        fill(0, 255, 0);
        text("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2);
        this.player.renderScore(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 32);
        textSize(16);
        text("Press 'r' to restart the game.".toUpperCase(), GAME_WIDTH / 2, GAME_HEIGHT / 2 + 32 * 2);
    }

    processPlayState() {
        textAlign(LEFT);
        this.renderLimitLine();
        noStroke();
        this.processPlayer();
        this.processEnemyBullets();
        this.enemyMatrix.processEnemies();
    }

    resetGame() {
        this.player.reset();
        ENEMY_SPEED = ENEMY_INIT_SPEED;
        this.enemyBullets = [];
        this.enemyMatrix.resetEnemyMatrix();
        this.state = this.states.PLAY;
    }
}