let player;
let enemyMatrix;
let inconsolata;

function preload() {
    inconsolata = loadFont('assets/fonts/I-pixel-u.ttf');
}

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    // createP("Made with <span class='emoji'>♥</span> by Perla Al Haddad");

    textFont(inconsolata);

    player = new Player();
    enemyMatrix = new EnemyMatrix();
}

function draw() {
    background(45);

    for (let i = player.bullets.length - 1; i >= 0; i--) {
        if (player.bullets[i].active) {
            player.bullets[i].show();
            player.bullets[i].move();

            enemyMatrix.handleBulletCollision(player.bullets[i], player);
        } else {
            player.bullets.splice(i, 1);
        }
    }

    player.show();
    player.move();

    enemyMatrix.processEnemies();
}


function keyPressed() {
    if (keyCode === 32) {
        player.fire();
    }
}