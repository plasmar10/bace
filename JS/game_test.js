"use strict";
let mothershiphome, rawResource, resourceZone;
let oceanBackground;
let player;
let oceansprite;
let scrollNumber = 0
let scrollzoomleval = 0.25
let ships, scoutshipsClass, scoutShip1;

function preload() {
    oceanBackground = loadImage("./assets/ochan.png");
}

function setup() {
    createCanvas(1920, 1076);
    ocean();
    mothership();
    resourceNodes();
    makeships()

}

function draw() {
    tests();
    testingdraw()
    scoutShip()
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
    oceansprite = new Sprite(width / 2, height / 2, width * 10, height * 10, "n")
    oceansprite.image = oceanBackground
    oceansprite.layer = 0
}


function mothership() {
    mothershiphome = new Sprite(1000, 700, 100)

    camera.x = 1000
    camera.y = 800;

    player = new Sprite();
    player.d = 80;
    player.color = 'magenta';



}


function testingdraw() {
    scrollNumber = 0
    camera.zoom = scrollzoomleval;
    background(0);
    camera.on();
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
        mothershiphome.y = mothershiphome.y - 10
    }
    if (kb.pressing('arrowDown')) {
        mothershiphome.y = mothershiphome.y + 10
    }
    if (kb.pressing('arrowLeft')) {
        mothershiphome.x = mothershiphome.x - 10
    }
    if (kb.pressing('arrowRight')) {
        mothershiphome.x = mothershiphome.x + 10
    }

}



function mouseWheel(event) {
    scrollNumber += event.delta
    if (scrollzoomleval < 0.25) {
        scrollzoomleval = 0.25
    }
    if (scrollzoomleval > 2) {
        scrollzoomleval = 2
    }
    console.log(scrollzoomleval)
    scrollzoomleval = scrollzoomleval + scrollNumber / 4000
    if (scrollzoomleval < 0.25) {
        scrollzoomleval = 0.25
    }
    if (scrollzoomleval > 2) {
        scrollzoomleval = 2
    }

}


function resourceNodes() {
    let zoneSize = 1000;

    resourceZone = new Sprite(-1500, -500, 4000, 2500, 's');
    resourceZone.shape = 'chain';
    resourceZone.color = 'red';

    for (let i = 0; i < 50; i++) {
        let bruhTestX = random(-3460, 460);
        let bruhTestY = random(-1710, 710);
        console.log(bruhTestX);


        rawResource = new Sprite(bruhTestX, bruhTestY, 80, 80, 's');
        rawResource.color = '#997950';





        
    }

}

function scoutShip() {

}

function makeships() {
    ships = new Group();
    scoutshipsClass = new ships.Group();
    scoutShip1 = new scoutshipsClass.Sprite(1000, 700, 100)
}