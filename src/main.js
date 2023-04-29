let player;
let enemies = [];

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    createP("Made with <span class='emoji'>♥</span> by Perla Al Haddad");
    player = new Player();

    for (let i = 0; i < 5; i++) {
        let currEnemyX = i * (ENEMY_WIDTH + ENEMY_OFFSET) + ENEMY_CONTAINER_X_PADDING;
        let enemy = new Enemy(currEnemyX, ENEMY_CONTAINER_Y_PADDING);
        enemies.push(enemy);
    }
}

function draw() {
    background(45);

    player.show();
    player.move();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].show();
        enemies[i].move();
    }
}
