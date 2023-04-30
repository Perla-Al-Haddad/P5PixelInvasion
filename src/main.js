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

    game = new Game(player, enemyMatrix);
}

function draw() {
    background(45);

    if (game.state == game.states.PLAY) {
        game.processPlayState();
    } else if (game.state == game.states.GAME_OVER) {
        game.processGameOverState();
    }
}

function keyPressed() {
    if (keyCode === 32) { // press spacebar
        player.fire();
    }
    if (keyCode === 82) { // press r
        game.resetGame();
    }
}


function setLineDash(list) {
    drawingContext.setLineDash(list);
}