class Enemy {
    constructor(x, y) {
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.x = x;
        this.y = y;
        this.score = ENEMY_SCORE;

        this.bullets = [];
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += ENEMY_DIR * ENEMY_SPEED;
        if (this.y + this.height > ENEMY_Y_LIMIT) {
            GAME_STATE = 'game_over';
        }
    }

    fire() {
        if (this.bullets.length >= BULLET_LIMIT) return;
        let bullet = new Bullet(this.x + this.width / 2, this.y, 1, ENEMY_BULLET_SPEED);
        this.bullets.push(bullet);
    }

}