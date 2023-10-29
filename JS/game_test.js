"use strict";
let mothershiphome;
let oceanBackground;
let player;
let oceansprite;
let scrolnumber = 0;

function preload() {
    oceanBackground = loadImage("./assets/ochan.png");
}

function setup() {
    createCanvas(1920, 1076);
    ocean();
    mothership();

}

function draw() {
    tests();
    testingdraw()
}

function tests() {
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
    oceanBackground.resize(width * 5, height * 5)
    oceansprite = new Sprite(960, 538, width * 5, height * 5, "n")
    oceansprite.image = oceanBackground
    oceansprite.layer = 0
}


function mothership() {
mothershiphome = new Sprite(1000,700,1000)

    camera.x = 1000
    camera.y = 800;

    player = new Sprite();
    player.d = 80;
    player.color = 'magenta';
    camera.zoom = 0.5;


}


function testingdraw() {
background (0);
    camera.on();

    for (let i = 0; i < 10; i++) {
        fill(i * 20, 200, 200); // blue to gray
        rect(-250 + i * 50, -250 + i * 100, 750, 50);
    }
    //player.moveTowards(mouse, 0.01);
    player.draw();
    if (kb.pressing('a')) {
        camera.x = camera.x - 10
    }
    if (kb.pressing('d')) {
        camera.x = camera.x + 10
    }
    if (kb.pressing('w')) {
        camera.y = camera.y - 10
    }
    if (kb.pressing('s')) {
        camera.y = camera.y + 10
    }

	camera.off();
    if (kb.pressing('arrowUp')) { 
        mothershiphome.y = mothershiphome.y-10
    }
    if (kb.pressing('arrowDown')) { 
        mothershiphome.y = mothershiphome.y+10
        }
        if (kb.pressing('arrowLeft')) { 
            mothershiphome.x = mothershiphome.x-10
        }
        if (kb.pressing('arrowRight')) { 
            mothershiphome.x = mothershiphome.x+10
            }

}


function mouseWheel(event) { 
    scrolnumber += event.delta
    console.log(scrolnumber)
} 