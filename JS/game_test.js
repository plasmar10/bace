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
let ui;
let pointsforselect, startpoint, endpoint, selectionrectangle;
let shotOnce = false;
let enemyInRange = false;
let MonsterEnemyDistance;
let bulletTimer = 0;
let calX = 0
let calY = 0
let actualships = [];
let shipSelected = false;
let selectionStartX, selectionStartY;
let selectionEndX, selectionEndY;
let selectedShips = [];

let Resources = [];


function preload() {
    oceanBackground = loadImage("./assets/ocean.jpg");
    scoutShipImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png");
    scoutShipCannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png")
    resourceImage = loadImage("./assets/metalplate.png");
    mothershipImage = loadImage("./assets/Mothership.gif");
    cannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_big_gun.png");
SeaMonSha= loadImage("./assets/enemy_sprites/reaper.gif")
}

function setup() {
    new Group();
    createCanvas(1920, 1076);
    ocean();
    creatpointsforselection();
    mothership();
    resourceNodes();
    makeships();
    enemies();//may have to go in draw for animation and stuff
    
gameInterface(); // this must alwas be done last
}

function draw() {

    zoom();
    scoutShip();


    monsterAni();
    selection_system()


   GUIE(); //this must alwas be done last 
}


function ocean() {
    oceanBackground.resize(width * 5, height * 5)
    oceanSprite = new Sprite(width / 2, height / 2, width * 10, height * 10, "n")
    oceanSprite.image = oceanBackground
    oceanSprite.layer = -10
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
    scoutShip1Cannon = new ships.Sprite(0, 700, 30, 20, "n");
    scoutShip1Cannon.img = cannonImage
    moveBackPoint = new ships.Sprite(scoutShip1.x, scoutShip1.y, 10, "n");
    actualships.push(scoutShip1)
}



let scoutShip1MoveBackDirection;
let moveTowardsX;
let moveTowardsY;
let moveBackPoint;
let movePointDistance;

async function scoutShip() {


    scoutShip1MoveBackDirection = -scoutShip1.rotation
    movePointDistance = dist(scoutShip1.x, scoutShip1.y, moveBackPoint.x, moveBackPoint.y);
if (shipSelected){
    if (mouse.pressed()) {
        moveTowardsX = mouse.x
        moveTowardsY = mouse.y
        console.log("pressed")
        moveBackPoint.x = scoutShip1.x;
        moveBackPoint.y = scoutShip1.y;
        await scoutShip1.rotateTo(mouse, 5);
        await scoutShip1.moveTo(moveTowardsX, moveTowardsY, 1);
    }
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

    if (MonsterEnemyDistance < 1800) {
        enemyInRange = true;
    } else {
        enemyInRange = false;
    }


    //console.log(MonsterEnemyDistance)


    //console.log(enemyInRange)



    if (enemyInRange === true) {
        scoutShip1Cannon.rotateTowards(SeaMon, 1, 0)
        await delay(400);
        let x = scoutShip1Cannon.x;
        let y = scoutShip1Cannon.y;
        let direction = scoutShip1Cannon.direction;
        let selectedAmmo = basicShot;

        ammo(x, y, direction, selectedAmmo);
        bulletTimer += 1;

    } else if (enemyInRange === false) {
        scoutShip1Cannon.direction = scoutShip1.direction
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

    if (scrollZoomLevel > 1.4) {
        camera.x = camera.x + (camera.mouse.x - width / 2) * 0.01
        camera.y = camera.y + (camera.mouse.y - height / 2) * 0.01
    }
else if (event.delta < 0) {
    camera.x = camera.x + (camera.mouse.x - width / 2) * 0.1
    camera.y = camera.y + (camera.mouse.y - height / 2) * 0.1
}
    
}

function GUIE() {
    camera.off();
    ui.color = 'orange';
    for (let i = 0; i < 9; i++) {
        if (kb[i + 1]) ui[i].color = 'red';
    }
    ui.draw();
}

function gameInterface() {
	ui = new Group();
	for (let i = 0; i < 9; i++) {
		new ui.Sprite(100 + i * 40, 1000, 35, 35, 'n');
    }
}

function zoom() {
    scrollNumber = 0
    camera.zoomTo(scrollZoomLevel)
    background(0);
    
    camera.on();
    drawAllSpritesExcept();
    if (kb.pressing('arrowleft')) {
        camera.x = camera.x - 10
    }
    if (kb.pressing('arrowright')) {
        camera.x = camera.x + 10
    }
    if (kb.pressing('arrowup')) {
        camera.y = camera.y - 10
    }
    if (kb.pressing('arrowdown')) {
        camera.y = camera.y + 10
    }
    camera.off();
    ui.draw();
    ui.layer = 9999



}

function drawAllSpritesExcept() {

    for (let i = 0; i < allSprites.length; i++) {
        const sprite = allSprites[i];
        if (allSprites[i].layer < 9999) {
            sprite.draw();
        }
    }
}

function selection_system(){
    strokeWeight(1);
    (selectionStartX, selectionStartY);
    point(selectionEndX, selectionEndY);
    // Draw the selection rectangle while the mouse is pressed
    if (mouse.presses()) {
        selectionStartX = mouse.x;
        selectionStartY = mouse.y;
        selectionEndX = mouse.x;
        selectionEndY = mouse.y;
    } else if (mouse.pressing()) {
        selectionEndX = mouse.x;
        selectionEndY = mouse.y;
    }

    // Draw the selection rectangle
    if (mouse.released())
for (let i = 0; i < actualships.length; i++) {
    actualships[i].selected = false; 
    
    //console.log(actualships[i].x)
    // Check for selected ships when the mouse is released
    if(!shipSelected){
    if (
        actualships[i].x > min(selectionStartX, selectionEndX) &&
        actualships[i].x < max(selectionStartX, selectionEndX) &&
        actualships[i].y > min(selectionStartY, selectionEndY) &&
        actualships[i].y < max(selectionStartY, selectionEndY)
        ) {
            
            console.log("ship selected" +  actualships[i]);
            actualships[i].selected = true;
         }
        // else{
        //     actualships[i].selected = false; 
        // }
        console.log( actualships[i].selected)
    }
}

    
    for (let i = 0; i < actualships.length; i++) {
if(actualships[i].selected === true ){
    actualships[i].debug = true
console.log(actualships[i] + 'selected')

    } else {
        actualships[i].debug = false;
    }
    }
   
//is a shop selected

if(mouse.released()){
    console.log('mouse releced')
    for (let i = 0; i < actualships.length; i++) {
        if(actualships[i].selected === true ){
        shipSelected = true
            } 
            else{
                shipSelected = false
            }
            }
}


    


    startpoint.x = selectionStartX
    startpoint.y = selectionStartY
    endpoint.x = selectionEndX
    endpoint.y = selectionEndY
if(startpoint.x > endpoint.x){
    if (startpoint.y >= endpoint.y){
        calX = selectionStartX - ((dist(selectionStartX,0,selectionEndX,0)/2))
        calY = selectionStartY - ((dist(selectionStartY,0,selectionEndY,0)/2))
    }
    else{
    calX = selectionStartX - ((dist(selectionStartX,0,selectionEndX,0)/2))
    calY = selectionStartY + ((dist(selectionStartY,0,selectionEndY,0)/2))
    }
}
else{
    if (startpoint.y >= endpoint.y){
        calX = selectionStartX + ((dist(selectionStartX,0,selectionEndX,0)/2))
        calY = selectionStartY - ((dist(selectionStartY,0,selectionEndY,0)/2))
    }
    else{
    calX = selectionStartX + ((dist(selectionStartX,0,selectionEndX,0)/2))
    calY = selectionStartY + ((dist(selectionStartY,0,selectionEndY,0)/2))
    }
}
    if(selectionrectangle){
        selectionrectangle.remove()
       }


if (calX > -99999){
    selectionrectangle = new pointsforselect.Sprite(calX , calY, dist(selectionStartX,0,selectionEndX,0), dist(selectionStartY,0,selectionEndY,0), "n");
    selectionrectangle.color= color(0,255,0, 50)



}

}

function creatpointsforselection(){
    pointsforselect = new Group();
    startpoint = new pointsforselect.Sprite(99999, 99999, 1, "n")
    endpoint = new pointsforselect.Sprite(99999, 99999, 1, "n");

}

// remonder for omrhi // use angleto for better prefromens for shiops and points so they resolve the promice cliding problem