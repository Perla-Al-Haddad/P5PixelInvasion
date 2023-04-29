class Enemy {
    constructor(x, y) {
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.x = x;
        this.y = y;
    }

    show() {
        rectMode('center');
        fill(0, 255, 0);
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        // this.y+=0.2;
    }

}