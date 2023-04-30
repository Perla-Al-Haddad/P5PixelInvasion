class Star {
    constructor(x, dim, speed, opacity) {
        this.startingY = -1 * (Math.random() * GAME_HEIGHT);

        this.x = x;
        this.y = this.startingY;
        this.dim = dim;
        this.speed = speed;
        this.opacity = opacity;
    }

    show() {
        fill(220, 200, 255, this.opacity);
        rect(this.x, this.y, this.dim, this.dim);
    }

    move() {
        this.y += this.speed;
        if (this.y > GAME_HEIGHT) {
            this.y = this.startingY;
        }
    }
}