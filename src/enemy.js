class Enemy {
    constructor(x, y) {
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.x = x;
        this.y = y;
        this.speed = ENEMY_SPEED;
        this.score = ENEMY_SCORE;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += ENEMY_DIR * this.speed;
    }

}