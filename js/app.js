// Constants

var SPEED_1 = 150;
var SPEED_2 = 100;
var SPEED_3 = 175;
var SPEED_4 = 65;
var C_WIDTH = 505;
var C_HEIGHT = 606;
var PLAYER_X = 202;
var PLAYER_Y = 410;
var B_WIDTH = 101;
var B_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
// Variables applied to each of our instances
// The image/sprite uses a helper to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;
    // When gets to rightmost end of canvas, start over at left side
    if (this.x > C_WIDTH)
        this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, wins, cols) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.wins = wins;
    this.cols = cols;
};

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {

    //if get to water, restart at bottom
    if (this.y < -5) {
        this.wins++;
        this.reset();
    }

    //compare player location to each enemy

    //Question: Should this be done in Player.update or Enemy.update? or a separate function altogether

    for (var i=0;i<allEnemies.length;i++) {
        if (this.collisionCheck(this.x, this.y, allEnemies[i].x, allEnemies[i].y)) {
            //if collide with enemy, restart at bottom
            this.cols++;
            this.reset();
        }
    }
};

Player.prototype.handleInput = function(inKey) {

    switch (inKey) {
        case 'left':
            if (this.x - B_WIDTH < 0) this.reset();
                else this.x = this.x - B_WIDTH;
            break;
        case 'up':
            this.y = this.y - B_HEIGHT;
            break;
        case 'right':
            if ((this.x + B_WIDTH) > 404) this.reset();
                else this.x = this.x + B_WIDTH;
            break;
        case 'down':
            if ((this.y + B_HEIGHT) > 332) this.reset();
                else this.y = this.y + B_HEIGHT;
            break;
        default:
        break;
    }
};

Player.prototype.reset = function() {
    this.x = PLAYER_X;
    this.y = PLAYER_Y;
};

Player.prototype.collisionCheck = function(px, py, ex, ey) {
 //check the distance between the midpoints of each sprite image
 //if distance < (width|height?), then they overlap
 //Midpoints - got these from actual image sizes, and trial and error

    var x1 = px + 40;
    var x2 = ex + 40;
    var y1 = py + 30;
    var y2 = ey + 30;
    var distance = Math.sqrt(((x2 - x1)*(x2 - x1)) + ((y2 - y1)*(y2 - y1)));

    if (distance < 65)
        return true;
     return false;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(100,65,SPEED_1);
var enemy2 = new Enemy(400,145,SPEED_2);
var enemy3 = new Enemy(250,230,SPEED_3);
var enemy4 = new Enemy(250,65,SPEED_4);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player(PLAYER_X, PLAYER_Y,0, 0); //player starts with 0 wins and 0 collisions

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




