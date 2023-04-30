let player;
let enemyMatrix;
let pixelFont;

let enemyBullets = [];

function preload() {
    pixelFont = loadFont('assets/fonts/I-pixel-u.ttf');
}

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    // createP("Made with <span class='emoji'>♥</span> by Perla Al Haddad");

    textFont(pixelFont);

    player = new Player();
    enemyMatrix = new EnemyMatrix();
}

function draw() {
    background(45);

    if (GAME_STATE == 'play') {

        textAlign(LEFT);
        setLineDash([5, 5]); //create the dashed line pattern here
        stroke(255, 255, 255);
        line(0, ENEMY_Y_LIMIT, GAME_WIDTH, ENEMY_Y_LIMIT);

        noStroke();

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

        for (let i = enemyBullets.length - 1; i >= 0; i--) {
            if (enemyBullets[i].active) {
                enemyBullets[i].move();
                enemyBullets[i].show();

                player.handleBulletCollision(enemyBullets[i]);
            } else {
                enemyBullets.splice(i, 1);
            }
        }

        enemyMatrix.processEnemies();

    } else if (GAME_STATE == 'game_over') {
        textSize(32);
        textAlign(CENTER);
        fill(0, 255, 0);
        text("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2);
        player.renderScore(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 32);
        textSize(16);
        text("Press 'r' to restart the game.".toUpperCase(), GAME_WIDTH / 2, GAME_HEIGHT / 2 + 32 * 2);
    }
}


function keyPressed() {
    if (keyCode === 32) { // press spacebar
        player.fire();
    }
    if (keyCode === 82) { // press r
        resetGame();
    }
}

function resetGame() {
    player.reset();
    ENEMY_SPEED = ENEMY_INIT_SPEED;
    enemyBullets = [];
    enemyMatrix.resetEnemyMatrix();
    GAME_STATE = 'play';
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}