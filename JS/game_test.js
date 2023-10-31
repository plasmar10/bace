"use strict";
let mothershipBase, resourceScrapMetal, resourceZone;
let oceanBackground, mothershipImage, scoutShipCannonImage;
let player;
let oceanSprite;
let scrollNumber = 0
let scrollZoomLevel = 0.25
let ships, scoutShipsClass, scoutShip1, scoutShip1Cannon;
let scoutShipImage;
let resourceImage;
let cannonImage;
let GUI;
let SeaMon;
let SeaMonSha
let shots, basicShot;

let shotOnce = false;
let enemyInRange = false;
let MonsterEnemyDistance;
let bulletTimer = 0;


let Resources = [];


function preload() {
    oceanBackground = loadImage("./assets/ocean.jpg");
    scoutShipImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png");
    scoutShipCannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png")
    resourceImage = loadImage("./assets/metalplate.png");
    mothershipImage = loadImage("./assets/Mothership.gif");
    cannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_big_gun.png");
    SeaMonSha = loadImage("./assets/enemy_sprites/reaper.gif")
}

function setup() {
    new Group();
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
    oceanSprite = new Sprite(width / 2, height / 2, width * 10, height * 10, "n")
    oceanSprite.image = oceanBackground
    oceanSprite.layer = -10
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
    mothershipBase = new Sprite(1000, 1000, 400, 400, 's')
    mothershipBase.color = 'black'
    mothershipImage.resize(400, 400)
    mothershipBase.img = mothershipImage
    mothershipBase.debug = true


    camera.x = 1000
    camera.y = 800;
}


function zoom() {
    scrollNumber = 0
    camera.zoomTo(scrollZoomLevel)
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
    if (scrollZoomLevel < 0.25) {
        scrollZoomLevel = 0.25
    }
    if (scrollZoomLevel > 2.5) {
        scrollZoomLevel = 2.5
    }
    console.log(scrollZoomLevel)
    scrollZoomLevel = scrollZoomLevel + scrollNumber / 4000
    if (scrollZoomLevel < 0.25) {
        scrollZoomLevel = 0.25
    }
    if (scrollZoomLevel > 2.5) {
        scrollZoomLevel = 2.5
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
    scoutShipsClass = new ships.Group();
    scoutShip1 = new scoutShipsClass.Sprite(0, 700, 105, 54, "d");
    scoutShip1.img = scoutShipImage

    scoutShip1Cannon = new scoutShipsClass.Sprite(0, 700, 30, 20, "n");
    scoutShip1Cannon.img = cannonImage

    moveBackPoint = new scoutShipsClass.Sprite(scoutShip1.x, scoutShip1.y, 10, "n");
}



let scoutShip1MoveBackDirection;
let moveTowardsX;
let moveTowardsY;
let moveBackPoint;
let movePointDistance;

async function scoutShip() {


    scoutShip1MoveBackDirection = -scoutShip1.rotation
    movePointDistance = dist(scoutShip1.x, scoutShip1.y, moveBackPoint.x, moveBackPoint.y);

    if (mouse.pressed()) {
        moveTowardsX = mouse.x
        moveTowardsY = mouse.y
        console.log("pressed")
        moveBackPoint.x = scoutShip1.x;
        moveBackPoint.y = scoutShip1.y;
        await scoutShip1.rotateTo(mouse, 5);
        await scoutShip1.moveTo(moveTowardsX, moveTowardsY, 1);

    }


    if (scoutShip1.collides(allSprites)) {
        scoutShip1.rotationSpeed = 0;
        scoutShip1.vel.x = 0;
        scoutShip1.vel.y = 0;
        console.log("scoutShip1 has stoped because it has colided with somthing")
        await delay(500);
        await scoutShip1.moveTo(moveBackPoint, 1)

    }

    if (movePointDistance > 80) {
        moveBackPoint.direction = moveBackPoint.angleTo(scoutShip1);
        moveBackPoint.speed = 2;
    } else if (movePointDistance < 30) {
        moveBackPoint.speed = 0;
    }


    //Cannon//
    scoutShip1Cannon.x = scoutShip1.x
    scoutShip1Cannon.y = scoutShip1.y



    scoutShip1Cannon.rotation = scoutShip1Cannon.direction





    MonsterEnemyDistance = dist(scoutShip1.x, scoutShip1.y, SeaMon.x, SeaMon.y)

    if (MonsterEnemyDistance < 1600) {
        enemyInRange = true;
    } else {
        enemyInRange = false;
    }


    console.log(MonsterEnemyDistance)


    //console.log(enemyInRange)




    if (enemyInRange === true) {
        scoutShip1Cannon.rotateTowards(SeaMon, 1, 0);
        let x = scoutShip1Cannon.x;
        let y = scoutShip1Cannon.y;
        let direction = scoutShip1Cannon.direction;
        let selectedAmmo = basicShot;

        ammo(x, y, direction, selectedAmmo);
        bulletTimer += 1;

    } else {

        bulletTimer = 0
        bulletTimer += 0
    }


    if (bulletTimer > 100) {
        shotOnce = false;
        bulletTimer = 0
    }





}


function ammo(x, y, direction, selectedAmmo) {

    if (shotOnce === false && selectedAmmo === basicShot) {
        basicShot = new Sprite(x, y, 5);
        basicShot.direction = direction;
        basicShot.speed = 0;
        basicShot.life = 400;

        basicShot.speed = 5;
        basicShot.collider = 'd';
        basicShot.color = 'red';
        basicShot.overlaps(scoutShip1)
        basicShot.overlaps(basicShot)


        shotOnce = true;
    }

    if (basicShot.collides(allSprites)) {
        basicShot.remove();
    }
}



function enemies() {

    SeaMon = new Sprite(-1500, 2000, 100, 200)

    SeaMonSha.resize(500, 500)
    SeaMon.img = SeaMonSha
    SeaMon.debug = true;

}


function monsterAni() {
    SeaMon.direction = SeaMon.rotation;//sync direction to rotation
    SeaMon.speed = 5;

    if (dist(scoutShip1.x, scoutShip1.y, SeaMon.x, SeaMon.y) < 1000) {
        SeaMon.rotation -= 0
        SeaMon.rotateTowards(scoutShip1)
        console.log("hi")

    }
    else {
        SeaMon.rotation -= 1;
    }


}
