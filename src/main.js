let player;
let enemyMatrix;
let pixelFont;
let enemySprites = [];
let playerSprites = [];

function preload() {
    pixelFont = loadFont('assets/fonts/I-pixel-u.ttf');

    for (let i = 1; i < NUMBER_OF_ENEMY_SHIP_SPRITES+1; i++) {
        enemySprites.push(loadImage(`assets/sprites/enemyShips/ship${i}.png`));
    }

    playerSprites[0] = loadImage('assets/sprites/ships/ship5/shipLeft.png');
    playerSprites[1] = loadImage('assets/sprites/ships/ship5/ship.png');
    playerSprites[2] = loadImage('assets/sprites/ships/ship5/shipRight.png');
}

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    // createP("Made with <span class='emoji'>♥</span> by Perla Al Haddad");

    noSmooth();

    textFont(pixelFont);

    player = new Player();
    enemyMatrix = new EnemyMatrix();

    game = new Game(player, enemyMatrix);
}

function draw() {
    background(20);

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