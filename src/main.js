let player;
let enemyMatrix;
let pixelFont;

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

    if (game_state == 'play') {
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
    
        enemyMatrix.processEnemies(player);
    } else if (game_state == 'game_over') {
        textSize(32);
        textAlign(CENTER);
        fill(0, 255, 0);
        text("GAME OVER", GAME_WIDTH/2, GAME_HEIGHT/2);
        player.renderScore(GAME_WIDTH/2, GAME_HEIGHT/2 + 32);

    }
}


function keyPressed() {
    if (keyCode === 32) {
        player.fire();
    }
}