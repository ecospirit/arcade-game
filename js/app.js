// Constants

var SPEED_1 = 50;
var SPEED_2 = 100;
var SPEED_3 = 75;
var SPEED_4 = 65;
var C_WIDTH = 505;
var C_HEIGHT = 606;
var PLAYER_X = 202;
var PLAYER_Y = 415;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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
    
    if (this.x > C_WIDTH) // When gets to rightmost end of canvas, start over at left side
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // just trying to see if I can get this far
    // need to figure out how to pass allEnemies coordinates
    
    if (this.collisionCheck(0,0)) {
        //if collide with enemy, restart at bottom
        this.cols++;
        this.reset();       
    }
        //if get to water, restart at bottom
    if (this.y < 0) {
        this.wins++;
        this.reset();
    }    
};

Player.prototype.handleInput = function(inKey) {
    
    switch (inKey) {
        case 'left':   
            if (this.x - 101 < 0) this.reset()
                else this.x = this.x - 101;
            break;
        case 'up': 
            this.y = this.y - 83;
            break;
        case 'right': 
            if ((this.x + 101) > 404) this.reset()
                else this.x = this.x + 101;
            break;
        case 'down': 
            if ((this.y + 83) > 332) this.reset()
                else this.y = this.y + 83;    
            break;
        default:   //invalid key
        break; 
    }
};

Player.prototype.reset = function() {
    this.x = PLAYER_X;
    this.y = PLAYER_Y;
 }; 

function PointInOther(x,y,other) {
    if (x > other.x && 
        x < other.x + other.width &&
        y > other.y &&
        y < other.y + other.height)
        return true;
    return false;
}    

function collisionCheck(spr1, spr2) {

// define a square for each sprite, get coordinates for each
// then find out if an enemy overlaps/intersects with player
// get dimensions of image    
    
    if (PointInOther(spr1.x, spr1.y,spr2)) return true;
    //use each corner ...
    
    
/*
    
    for (var i=0;i++;i<4) {  //compare player to each of 4 enemies
        
            
            ctx.drawImage(Resources.get('crash.png'), this.x, this.y);            
        }        

    }
*/
};    
  

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(100,70,SPEED_1);
var enemy2 = new Enemy(400,125,SPEED_2);
var enemy3 = new Enemy(250,220,SPEED_3);
var enemy4 = new Enemy(250,70,SPEED_4);

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

 

Player.prototype.checkEnd = function() {

//end game if player has 100 collisions or 100 wins

/*
    player.cols++;
    if (player.cols > 100)
        endGame();
*/        
};  
     
