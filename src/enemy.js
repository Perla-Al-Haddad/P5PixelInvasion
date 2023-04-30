class Enemy {
    constructor(x, y) {
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.x = x;
        this.y = y;
        this.score = ENEMY_SCORE;

        this.active = true;
        this.spriteIndex = Math.floor(Math.random() * NUMBER_OF_ENEMY_SHIP_SPRITES);
        this.sprite = enemySprites[this.spriteIndex];


        this.interval = this.setUpEnemyFireInterval();
    }

    show() {
        image(this.sprite, this.x, this.y, 16*2, 16*2);
        fill(0, 255, 0, 100);
        // rect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += ENEMY_DIR * ENEMY_SPEED;
        if (this.y + this.height > ENEMY_Y_LIMIT) {
            game.state = game.states.GAME_OVER;
        }
    }

    fire() {
        let bullet = new Bullet(this.x + this.width / 2, this.y, 1, ENEMY_BULLET_SPEED);
        game.enemyBullets.push(bullet);
    }

    deactivate() {
        this.active = false;
        clearInterval(this.interval);
    }

    setUpEnemyFireInterval() {
        return window.setInterval(() => {
            if (!this.active) return;
            let willFire = Math.floor(Math.random() / ENEMY_FIRE_LIKELIHOOD);
            if (willFire == 1) this.fire();
        }, ENEMY_FIRE_FREQUENCY);
    }
}