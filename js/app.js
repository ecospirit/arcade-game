// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x = this.x + 50 * dt;
    
    if (this.x > 505) // how do/should I reference Engine.canvas.width?
        this.x = 0;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
// why doesn't this work? Just trying to get it to move at all, like the enemies
    //this.x = this.x - 50 * dt;
    
    
    if (this.y < 0) {
        //if gets to top, go back to bottom and start again
        this.x = 202;
        this.y = 415;
    }
    
};

Player.prototype.handleInput = function(inKey) {

    switch (inKey) {
        case 'left':   
            this.x = this.x - 101;
            break;
        case 'up': 
            this.y = this.y - 23;
            break;
        case 'right': 
            this.x = this.x + 101;
            break;
        case 'down': 
            this.y = this.y - 83;
            break;
       default:
        break; //invalid key
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var enemy1 = new Enemy(100, 70);
var enemy2 = new Enemy(400,125);
var enemy3 = new Enemy(250, 220);
var allEnemies = [enemy1, enemy2, enemy3];
/*
for (var i=0;i++;i<numEnemies) {
        allEnemies[i] = new Enemy();
        //need new coordinates for each Enemy
    };
 */   
var player = new Player(202, 415);

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

/*
function checkCollisions(allEnemies,i,player, cols) {    
        if ((player.x == allEnemies[i].x) and (player.y == allEnemies[i].y)) {
              player.x = 202;
              player.y = 415;      
           
        }        
};    
*/

/*
function checkEnd(cols) {

    player.cols++;
    if (player.cols > 100)
        endGame();
    }    
      
*/