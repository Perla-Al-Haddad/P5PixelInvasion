class Player {
    constructor() {
        this.width = 40;
        this.height = 30;
        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT - this.height;
        this.speed = 5;
    }

    show() {
        rectMode('center');
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

}