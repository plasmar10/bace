"use strict";
let mothershiphome, resourceScrapMetal, resourceZone;
let oceanBackground, mothershipImage, scoutShipCannonImg;
let player;
let oceansprite;
let scrollNumber = 0
let scrollzoomleval = 0.25
let ships, scoutshipsClass, scoutShip1, scoutShip1Cannon;
let scoutshipimg;
let resourceImage;
let cannonimg;
let GUI;
let SeaMon;
let SeaMonSha
let shots


let Resources = [];


function preload() {
    oceanBackground = loadImage("./assets/ocean.jpg");
    scoutshipimg = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png");
    scoutShipCannonImg = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png")
    resourceImage = loadImage("./assets/metalplate.png");
    mothershipImage = loadImage("./assets/Mothership.gif");
    cannonimg = loadImage("./assets/ship_sptites/shipz/images/ship_big_gun.png");
SeaMonSha= loadImage("./assets/enemy_sprites/reaper.gif")
}

function setup() {
    createCanvas(1920, 1076);
    ocean();
    mothership();
    resourceNodes();
    makeships();


    gameInterface();

    enemies();//may have to go in draw for animation and stuff


}

function draw() {

    zoom();
    scoutShip();
    monsterAni();




}


function ocean() {
    oceanBackground.resize(width * 5, height * 5)
    oceansprite = new Sprite(width / 2, height / 2, width * 10, height * 10, "n")
    oceansprite.image = oceanBackground
    oceansprite.layer = -10
}



function gameInterface() {

    /*

    GUI = new Sprite(0, 0, 1076, 50, 'n');
    GUI.scale = 10
    GUI.color = color(100, 100, 100, 225);

    https://p5play.org/learn/camera.html?page=3

    
    */





}


function mothership() {
    mothershiphome = new Sprite(1000, 1000, 400, 400, 's')
    mothershiphome.color = 'black'
    mothershipImage.resize(400, 400)
    mothershiphome.img = mothershipImage
    mothershiphome.debug = true

    camera.x = 1000
    camera.y = 800;
}


function zoom() {
    scrollNumber = 0
    camera.zoomTo(scrollzoomleval)
    background(0);
    camera.on();

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

}



function mouseWheel(event) {
    scrollNumber -= event.delta
    if (scrollzoomleval < 0.25) {
        scrollzoomleval = 0.25
    }
    if (scrollzoomleval > 2.5) {
        scrollzoomleval = 2.5
    }
    console.log(scrollzoomleval)
    scrollzoomleval = scrollzoomleval + scrollNumber / 4000
    if (scrollzoomleval < 0.25) {
        scrollzoomleval = 0.25
    }
    if (scrollzoomleval > 2.5) {
        scrollzoomleval = 2.5
    }

}


function resourceNodes() {

    resourceZone = new Sprite(-1500, -500, 4000, 2500, 'n');
    resourceZone.color = color(255, 255, 255, 100);

    for (let i = 0; i < 50; i++) {

        let resourceX = random(-3460, 460);
        let resourceY = random(-1710, 710);

        resourceScrapMetal = new Sprite(resourceX, resourceY, 40, 40, 's');
        resourceScrapMetal.color = 'gray';

        for (let i = 0; i < Resources.length; i++) {

            let d = dist(resourceScrapMetal.x, resourceScrapMetal.y, Resources[i].x, Resources[i].y)

            if (d < 200) {
                resourceScrapMetal.remove();

            }

        }

        resourceImage.resize(40, 40)
        resourceScrapMetal.img = resourceImage
        Resources.push(resourceScrapMetal)

    }




    //add purchasable placeable mines



}

function makeships() {
    ships = new Group();
    scoutshipsClass = new ships.Group();
    scoutShip1 = new scoutshipsClass.Sprite(1000, 700, 105, 54, "d");
    scoutShip1.img = scoutshipimg

    scoutShip1Cannon = new scoutshipsClass.Sprite(1000, 700, 30, 20, "n");
    scoutShip1Cannon.img = cannonimg

    movebackPoint = new scoutshipsClass.Sprite(1000, 700, 10, "n");
}



let scoutShip1moveBackDirection
let movecowordsx
let movecowordsy
let movebackPoint
let distance
async function scoutShip() {
    scoutShip1moveBackDirection = -scoutShip1.rotation
    distance = dist(scoutShip1.x, scoutShip1.y, movebackPoint.x, movebackPoint.y);

    if (mouse.pressed()) {
        movecowordsx = mouse.x
        movecowordsy = mouse.y
        console.log("pressed")
        movebackPoint.x = scoutShip1.x;
        movebackPoint.y = scoutShip1.y;
        await scoutShip1.rotateTo(mouse, 5);
        await scoutShip1.moveTo(movecowordsx, movecowordsy, 5);

    }

    if (scoutShip1.collides(allSprites)) {
        scoutShip1.rotationSpeed = 0;
        scoutShip1.vel.x = 0;
        scoutShip1.vel.y = 0;
        console.log("scoutShip1 has stoped because it has colided with somthing")
        await delay(500);
        await scoutShip1.moveTo(movebackPoint, 1)

    }

    if (distance > 80) {
        movebackPoint.direction = movebackPoint.angleTo(scoutShip1);
        movebackPoint.speed = 2;
    } else if (distance < 30) {
        movebackPoint.speed = 0;
    }


    //Cannon//
    scoutShip1Cannon.x = scoutShip1.x
    scoutShip1Cannon.y = scoutShip1.y

    //console.log(scoutShip1.direction)

    scoutShip1Cannon.direction = scoutShip1.direction

    //console.log(scoutShip1Cannon.direction)
    if (scoutShip1Cannon) {

    }
}


function ammo() {

    let bullet = new Sprite(scoutShip1Cannon.x, scoutShip1Cannon.y);




}



function enemies() {
 SeaMon = new Sprite(-1500, 2000, 100, 100)

 SeaMonSha.resize(500,500)
SeaMon.img = SeaMonSha

}


function monsterAni() {
    SeaMon.direction = SeaMon.rotation;//sync direction to rotation
      SeaMon.speed = 5; 

if(dist(scoutShip1.x,scoutShip1.y,SeaMon.x,SeaMon.y) < 1000){
    SeaMon.rotation -= 0
    SeaMon.rotateTowards(scoutShip1)
    console.log("hi")

}
else{
 SeaMon.rotation -= 1; 
}

    
}
