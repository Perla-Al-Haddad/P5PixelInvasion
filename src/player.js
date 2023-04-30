class Player {
    constructor() {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = GAME_WIDTH / 2 - this.width / 2;
        this.y = GAME_HEIGHT - this.height * 2;
        this.speed = PLAYER_SPEED;

        this.lives = 3;
        this.score = 0;

        this.bullets = [];
    }

    show() {
        fill(255, 255, 255);
        rect(this.x, this.y, this.width, this.height);
        this.renderScore(10, 35);
        this.renderLives();
    }

    move() {
        if (this.x < 0) {
            this.x = GAME_WIDTH;
        } else if (this.x > GAME_WIDTH) {
            this.x = 0;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
        }
    }

    fire() {
        if (this.bullets.length >= BULLET_LIMIT) return;
        let bullet = new Bullet(this.x + this.width / 2, this.y, -1, PLAYER_BULLET_SPEED);
        this.bullets.push(bullet);
    }

    incrementScore(score) {
        this.score += score;
    }

    renderScore(x, y) {
        fill(255, 255, 255);

        textSize(20);
        text('SCORE: ' + this.score, x, y);
    }

    renderLives() {
        fill(255, 255, 255);

        textSize(20);
        text('LIVES: ' + '#'.repeat(this.lives), GAME_WIDTH - 150, 35);
    }

    resetPosition() {
        this.x = GAME_WIDTH / 2 - this.width / 2;
    }

    handleBulletCollision(bullet) {
        if (!bullet.collidWith(this)) return;
        bullet.setActive(false);
        this.resetPosition();
        this.lives--;
        if (this.lives == 0) {
            game.state = game.states.GAME_OVER;
        }
    }

    reset() {
        this.lives = 3;
        this.score = 0;
        this.bullets = [];
    }
}