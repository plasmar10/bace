"use strict";
let mothershiphome;
let oceanBackground;
let player

function preload(){
    oceanBackground = loadImage("./assets/Ocean.gif")
}

function setup() {
    createCanvas(1920, 1076);
    mothership()
}

function draw() {
    tests()
    ocean()
    testingdraw()
}

function tests() {
    background(120, 120, 120);
    image(oceanBackground, 0, 0, width, height)

    let recWidth = 200;
    let recHeight = 100;

    fill(255, 255, 255);
    rect(mouseX - recWidth / 2, mouseY - recHeight / 2, recWidth, recHeight, 10);
    fill(255, 0, 0);
    textSize(20);
    textStyle(BOLD);
    text("X: " + mouseX + "   Y: " + mouseY, mouseX - 67, mouseY + 8);


}

function ocean() {

image




}



function mothership() {
mothershiphome = new Sprite(1000,700,100)

camera.x = 1000
camera.y = 800;

player = new Sprite();
	player.d = 80;
	player.color = 'magenta';
    camera.zoom = 0.5;


}


function testingdraw() {

    camera.on();

	for (let i = 0; i < 10; i++) {
		fill(i * 20, 200, 200); // blue to gray
		rect(-250 + i * 50, -250 + i * 100, 750, 50);
	}
	//player.moveTowards(mouse, 0.01);
	player.draw();
    if (kb.presses('a')) { 
        camera.x = camera.x+10
    }
    if (kb.presses('d')) { 
        camera.x = camera.x-10
        }

	camera.off();
}


// function setup() {
// 	new Canvas(500, 240);
// 	player = new Sprite();
// 	player.d = 80;
// 	player.color = 'magenta';


// 	camera.zoom = 0.5;
// }

// function draw() {
// 	background(0);

// 	camera.on();

// 	for (let i = 0; i < 10; i++) {
// 		fill(i * 20, 200, 200); // blue to gray
// 		rect(-250 + i * 50, -250 + i * 100, 750, 50);
// 	}
// 	player.moveTowards(mouse, 0.01);
// 	player.draw();
// 	camera.x = player.x;
// 	camera.y = player.y;

// 	camera.off();

// 	ui.color = 'orange';
// 	for (let i = 0; i < 9; i++) {
// 		if (kb[i + 1]) ui[i].color = 'red';
// 	}
// 	ui.draw();
// }