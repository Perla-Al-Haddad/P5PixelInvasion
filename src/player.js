class Player {
    constructor() {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = GAME_WIDTH / 2 - this.width / 2;
        this.y = GAME_HEIGHT - this.height * 2;
        this.speed = PLAYER_SPEED;

        this.bullets = [];
    }

    show() {
        fill(255, 255, 255);
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
        }
    }

    fire() {
        let bullet = new Bullet(this.x + this.width/2, this.y);
        this.bullets.push(bullet);
    }

}