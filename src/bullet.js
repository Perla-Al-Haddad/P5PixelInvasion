class Bullet {
    constructor(x, y, dirY, speed) {
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.x = x - this.width/2;
        this.y = y;

        this.dirY = dirY;

        this.speed = speed;

        this.active = true;
    }

    show() {
        fill(255, 255, 255);
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.dirY * this.speed;
        if (this.y < 0 || this.y > GAME_HEIGHT) {
            this.active = false;
        }
    }

    setActive(state) {
        this.active = state;
    }

    collidWith(other) {
        return (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.height + this.y > other.y);
    }
}