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

var birdReady = false;
var birdImage = new Image();
birdImage.onload = function () {
	birdReady = true;
};
birdImage.src = "images/bird.png";

var foodReady = false;
var foodImage = new Image();
foodImage.onload = function () {
	foodReady = true;
};
foodImage.src = "images/pipe.png";

var bird = {
	speed: 256 // movement in pixels per second
};
var food = {
	speed: 256	
};
var foodsCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var reset = function () {
if(foodsCaught == 0){
	bird.x = canvas.width / 4;
	bird.y = canvas.height / 2;
}
	food.x = (canvas.width / 2)*1.5;
	food.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
	
		food.x -=1 + foodsCaught/3;

	
	if (38 in keysDown) { // Player holding up
		bird.y -= (bird.speed * modifier + foodsCaught/4);
	}
	if (40 in keysDown) { // Player holding down
		bird.y += (bird.speed * modifier + foodsCaught/4);
	}
	if (37 in keysDown) { // Player holding left
		bird.x -= (bird.speed * modifier + foodsCaught/4);
	}
	if (39 in keysDown) { // Player holding right
		bird.x += (bird.speed * modifier + foodsCaught/4);
	}

	if (
		bird.x <= (food.x + 32)
		&& food.x <= (bird.x + 32)
		&& bird.y <= (food.y + 32)
		&& food.y <= (bird.y + 32)
		
	) {
		nom.play();
		++foodsCaught;
		reset();
	}

	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (birdReady) {
		ctx.drawImage(birdImage, bird.x, bird.y);
	}

	if (foodReady) {
		ctx.drawImage(foodImage, food.x, food.y);
	}


if(food.x <= 1){
		ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Game Over you scored:" + foodsCaught, 32, 32);
die.play();	
}else{
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Blocks Eaten: " + foodsCaught, 32, 32);}
};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	
	then = now;

	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
