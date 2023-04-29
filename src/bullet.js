class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;

        this.speed = 15;

        this.active = true;
    }

    show() {
        fill(255, 255, 255);
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.active = false;
        }
    }

    collidWith(other) {
        return (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.height + this.y > other.y);
    }
}