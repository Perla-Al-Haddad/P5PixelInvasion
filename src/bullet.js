class Bullet {
    constructor(x, y) {
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.x = x - this.width/2;
        this.y = y;

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