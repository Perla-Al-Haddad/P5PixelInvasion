let player;
let enemies = [];

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    createP("Made with <span class='emoji'>♥</span> by Perla Al Haddad");
    player = new Player();

    for (let i = 0; i < 6; i++) {
        let currEnemyX = i * (ENEMY_WIDTH + ENEMY_OFFSET) + ENEMY_CONTAINER_X_PADDING;
        let enemy = new Enemy(currEnemyX, ENEMY_CONTAINER_Y_PADDING);
        enemies.push(enemy);
    }
}

function draw() {
    background(45);

    for (let i = player.bullets.length-1; i >= 0; i--) {
        if (player.bullets[i].active) {
            player.bullets[i].show();
            player.bullets[i].move();
            for (let j = enemies.length-1; j >= 0; j--) {
                if (player.bullets[i].collidWith(enemies[j])) {
                    player.bullets[i].active = false;
                    enemies.splice(j, 1);
                };
            }
        } else {
            player.bullets.splice(i, 1);
        }
    }

    player.show();
    player.move();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].show();
        enemies[i].move();
    }
}


function keyPressed() {
    if (keyCode === 32) {
        player.fire();
    }
}