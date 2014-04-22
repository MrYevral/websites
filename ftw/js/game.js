// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var nom = document.getElementById("sound");
var die = document.getElementById("death");
canvas.width = 909;
canvas.height = 600;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/sky.png";

// Bird
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/bird.png";

// Food image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/pipe.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {
	speed: 256	
};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player eats
var reset = function () {
if(monstersCaught == 0){
	hero.x = canvas.width / 4;
	hero.y = canvas.height / 2;
}
	// Throw the food somewhere on the screen randomly
	monster.x = (canvas.width / 2)*1.5;
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	
		monster.x -=1 + monstersCaught/3;

	
	if (38 in keysDown) { // Player holding up
		hero.y -= (hero.speed * modifier + monstersCaught/4);
	}
	if (40 in keysDown) { // Player holding down
		hero.y += (hero.speed * modifier + monstersCaught/4);
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= (hero.speed * modifier + monstersCaught/4);
	}
	if (39 in keysDown) { // Player holding right
		hero.x += (hero.speed * modifier + monstersCaught/4);
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
		
	) {
		nom.play();
		++monstersCaught;
		reset();
	}

	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score

if(monster.x <= 1){
		ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Game Over you scored:" + monstersCaught, 32, 32);
die.play();	
break;	
}else{
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Blocks Eaten: " + monstersCaught, 32, 32);}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
