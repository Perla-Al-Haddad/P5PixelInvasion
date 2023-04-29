let player;

function setup() {
    createCanvas(GAME_WIDTH, GAME_HEIGHT);
    player = new Player();
}

function draw() {
    background(45);
    
    player.show();
    player.move();
}
