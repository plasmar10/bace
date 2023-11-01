"use strict";
let mothershipBase, defaultResource, resourceZone;
let oceanBackground, mothershipImage, scoutShipCannonImage;
let player;
let oceanSprite;
let scrollNumber = 0
let scrollZoomLevel = 0.25
let ships, scoutShipsClass, scoutShip1, scoutShip1Cannon;
let scoutShipImage;
let scrapMetalImage, oilImage, crystalImage;
let cannonImage;
let destroyerimg
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
let destinationPoint
let scrapMetalCounter, oilCounter, crystalCounter;
let fighterShipsClass
let destroyerShipsClass
let constructerShipsClass
let movepoint
let movepoints = []
let resourceStations
let scrapMetalResourceNodes = [];
let oilResourceNodes = [];
let crystalResourceNodes = [];

let scoutShip1MoveBackDirection;
let moveTowardsX;
let moveTowardsY;
let moveBackPoint;
let movePointDistance;


function preload() {
    oceanBackground = loadImage("./assets/ocean.jpg");
    scoutShipImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png");
    scoutShipCannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png")
    scrapMetalImage = loadImage("./assets/metalplate.png");
    oilImage = loadImage("./assets/oil.png");
    crystalImage = loadImage("./assets/Crystal.png");
    mothershipImage = loadImage("./assets/Mothership.gif");
    cannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_big_gun.png");
    SeaMonSha = loadImage("./assets/enemy_sprites/reaper.gif")
    fighterShipimg = loadImage("./assets/ship_sptites/shipz/images/ship_medium_body.png")
    SeaMonSha = loadImage("./assets/enemy_sprites/reaper.gif")
    destroyerimg = loadImage("./assets/ship_sptites/shipz/images/ship_large_body.png")
    fighterShipimg = loadImage("./assets/ship_sptites/shipz/images/ship_medium_body.png")
}

function setup() {
    new Group();
    createCanvas(1920, 1076);
    ocean();
    creatpointsforselection();
    mothership();
    resourceSpawner();
    makeships();
    resourceShip();
    enemies();//may have to go in draw for animation and stuff
    resourceStations = new Group();

    gameInterface(); // this must alwas be done last

}

function draw() {


    zoom();
    moveShips();
    moveselectedships();

    monsterAni();
    selection_system();
    resourceCollection();//
    resourceCollector();
    GUIE(); //this must alwas be done last 
}


function ocean() {
    oceanBackground.resize(width * 5, height * 5)
    oceanSprite = new Sprite(width / 2, height / 2, width * 10, height * 10, "n")
    oceanSprite.image = oceanBackground
    oceanSprite.layer = -10
}

function mothership() {
    mothershipBase = new Sprite(width / 2, height / 2, 400, 400, 's')
    mothershipBase.color = 'black'
    mothershipImage.resize(400, 400)
    mothershipBase.img = mothershipImage
    mothershipBase.debug = true


    camera.x = 1000
    camera.y = 800;
}

function resourceSpawner() {


    //SCRAP METAL//
    if (1 === 1) {
        let resourceZoneWidth = 3000;
        let resourceZoneHeight = 1500;

        let resourceZoneX1 = -2750;
        let resourceZoneY1 = -1500;

        let resourceZoneX2 = resourceZoneX1 + resourceZoneWidth;
        let resourceZoneY2 = resourceZoneY1 + resourceZoneHeight;

        let selectedResource = 'ScrapMetal';

        resourceNodes(resourceZoneWidth, resourceZoneHeight, resourceZoneX1, resourceZoneY1, resourceZoneX2, resourceZoneY2, selectedResource)
    }

    //Oil//
    if (1 === 1) {
        let resourceZoneWidth = 3000;
        let resourceZoneHeight = 1500;

        let resourceZoneX1 = 1750;
        let resourceZoneY1 = -1500;

        let resourceZoneX2 = resourceZoneX1 + resourceZoneWidth;
        let resourceZoneY2 = resourceZoneY1 + resourceZoneHeight;

        let selectedResource = 'Oil';

        resourceNodes(resourceZoneWidth, resourceZoneHeight, resourceZoneX1, resourceZoneY1, resourceZoneX2, resourceZoneY2, selectedResource)
    }

    //Crystal//
    if (1 === 1) {
        let resourceZoneWidth = 3000;
        let resourceZoneHeight = 1500;

        let resourceZoneX1 = 1750;
        let resourceZoneY1 = 1000;

        let resourceZoneX2 = resourceZoneX1 + resourceZoneWidth;
        let resourceZoneY2 = resourceZoneY1 + resourceZoneHeight;

        let selectedResource = 'Crystal';

        resourceNodes(resourceZoneWidth, resourceZoneHeight, resourceZoneX1, resourceZoneY1, resourceZoneX2, resourceZoneY2, selectedResource)
    }


}





function resourceNodes(resourceZoneWidth, resourceZoneHeight, resourceZoneX1, resourceZoneY1, resourceZoneX2, resourceZoneY2, selectedResource) {

    resourceZone = new Sprite(resourceZoneX1, resourceZoneY1, resourceZoneWidth, resourceZoneHeight, 'n');
    resourceZone.offset.x = resourceZoneWidth / 2;
    resourceZone.offset.y = resourceZoneHeight / 2;
    scrapMetalImage.resize(50, 50)
    oilImage.resize(50, 50)
    crystalImage.resize(50, 50)
    resourceZone.debug = true;

    for (let i = 0; i < 25; i++) {

        let resourceX = random(resourceZoneX1 + 40, resourceZoneX2 - 40);
        let resourceY = random(resourceZoneY1 + 40, resourceZoneY2 - 40);

        defaultResource = new Sprite(resourceX, resourceY, 40, 40, 's');
        defaultResource.color = 'gray';



        if (selectedResource === 'ScrapMetal') {
            defaultResource.img = scrapMetalImage

            for (let i = 0; i < scrapMetalResourceNodes.length; i++) {

                let d = dist(defaultResource.x, defaultResource.y, scrapMetalResourceNodes[i].x, scrapMetalResourceNodes[i].y)

                if (d < 250) { //edit this to change how far spread apart the resources are
                    defaultResource.remove();

                }
            }

            scrapMetalResourceNodes.push(defaultResource)
        }

        else if (selectedResource === 'Oil') {
            defaultResource.img = oilImage

            for (let i = 0; i < oilResourceNodes.length; i++) {

                let d = dist(defaultResource.x, defaultResource.y, oilResourceNodes[i].x, oilResourceNodes[i].y)

                if (d < 200) { //edit this to change how far spread apart the resources are
                    defaultResource.remove();

                }
            }
            oilResourceNodes.push(defaultResource)
        }

        else if (selectedResource === 'Crystal') {
            defaultResource.img = crystalImage

            for (let i = 0; i < crystalResourceNodes.length; i++) {

                let d = dist(defaultResource.x, defaultResource.y, crystalResourceNodes[i].x, crystalResourceNodes[i].y)

                if (d < 300) { //edit this to change how far spread apart the resources are
                    defaultResource.remove();

                }
            }
            crystalResourceNodes.push(defaultResource)
        }

        console.log(scrapMetalResourceNodes)
        console.log(oilResourceNodes)
        console.log(crystalResourceNodes)


    }







    //add purchasable placeable mines

}


function makeships() {
    ships = new Group();
    scoutShipsClass = new ships.Group();
    fighterShipsClass = new ships.Group();
    destroyerShipsClass = new ships.Group();
    constructerShipsClass = new ships.Group();
    scoutShip1 = new scoutShipsClass.Sprite(0, 700, 105, 54, "d");
    scoutShip1.img = scoutShipImage
    scoutShip1Cannon = new ships.Sprite(0, 700, 30, 20, "n");
    scoutShip1Cannon.img = cannonImage
    moveBackPoint = new ships.Sprite(scoutShip1.x, scoutShip1.y, 10, "n");
    actualships.push(scoutShip1)
    makeship("scout", 200, 700)
    makeship("fighter", 500, 700)
    makeship("destroyer",800,700)


}
let test
let scoutshipnum
function makeship(shiptype, newshipX, newshipY) {
    console.log(actualships.length)
    if (shiptype == "scout") {
        test = new scoutShipsClass.Sprite(newshipX, newshipY, 105, 54, "d")
        actualships.push(test)
       scoutShipsClass.img = scoutShipImage
    }
    if (shiptype == "fighter") {
        test = new fighterShipsClass.Sprite(newshipX, newshipY, 200, 54, "d")
        actualships.push(test)
        fighterShipsClass.img = fighterShipimg
    }
    if (shiptype == "destroyer") {
        test = new destroyerShipsClass.Sprite(newshipX, newshipY, 300, 54, "d")
        actualships.push(test)
        destroyerShipsClass.img = destroyerimg
    }
    if (shiptype == "constructer") {
        test = new constructerShipsClass.Sprite(newshipX, newshipY, 300, 200, "d")
        actualships.push(test)
    }

}







function moveShips() {
    scoutShip1.angleTo(mouse, 0.5)

    scoutShip1MoveBackDirection = -scoutShip1.rotation
    movePointDistance = dist(scoutShip1.x, scoutShip1.y, moveBackPoint.x, moveBackPoint.y);
    if (shipSelected && selectionrectangle.width < 60) {
        if (mouse.pressed()) {
            for (let selectedship of actualships) {
                if (selectedship.selected == true) {
                    movepoint = new Sprite(mouse.x, mouse.y, 50, "n")
                    movepoints.push(movepoint)

                selectedship.needstobemoved = true
  

                }
            }

        }
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


    //console.log(MonsterEnemyDistance)


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



function moveselectedships(){
    for (let selectedship of actualships) {
        if (selectedship.needstobemoved == true) {
            selectedship.angleTo(100,100)
            console.log("not working")

        }
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

}


function monsterAni() {
    SeaMon.direction = SeaMon.rotation;//sync direction to rotation
    SeaMon.speed = 5;

    if (dist(scoutShip1.x, scoutShip1.y, SeaMon.x, SeaMon.y) < 1000) {
        SeaMon.rotation -= 0
        SeaMon.rotateTowards(scoutShip1)


    }
    else {
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
    
    scrapMetalCounter.color = '#d8d8d8';

    oilCounter.color = 'black'; 
    oilCounter.textColor = 'white';

    crystalCounter.color = '#e6e1f9';
   
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
    scrapMetalCounter = new ui.Sprite(80, 35, 150, 60, 'n');
    scrapMetalCounter.textSize = 50
    scrapMetalCounter.text = 0
    

    oilCounter = new ui.Sprite(250, 35, 150, 60, 'n');
    oilCounter.textSize = 50
    oilCounter.text = 0

    crystalCounter = new ui.Sprite(420, 35, 150, 60, 'n');
    crystalCounter.textSize = 50
    crystalCounter.text = 0

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

function selection_system() {
    if (mouse.presses()) {
        selectionStartX = mouse.x;
        selectionStartY = mouse.y;
        selectionEndX = mouse.x;
        selectionEndY = mouse.y;
    } else if (mouse.pressing()) {
        selectionEndX = mouse.x;
        selectionEndY = mouse.y;
    }


    if (mouse.released())
        if (selectionrectangle.width >= 60) {
            for (let i = 0; i < actualships.length; i++) {
                actualships[i].selected = false;


                if (
                    actualships[i].x > min(selectionStartX, selectionEndX) &&
                    actualships[i].x < max(selectionStartX, selectionEndX) &&
                    actualships[i].y > min(selectionStartY, selectionEndY) &&
                    actualships[i].y < max(selectionStartY, selectionEndY)
                ) {

                    console.log("ship selected" + actualships[i]);
                    actualships[i].selected = true;
                }

                console.log(actualships[i].selected)
            }
        }

    for (let i = 0; i < actualships.length; i++) {
        if (actualships[i].selected === true) {
            actualships[i].debug = true
            //console.log(actualships[i] + 'selected')

        } else {
            actualships[i].debug = false;
        }
    }

    //is a shop selected

    if (mouse.released()) {
        console.log('mouse releced')
        for (let i = 0; i < actualships.length; i++) {
            if (actualships[i].selected === true) {
                shipSelected = true
            }
            else {
                shipSelected = false
            }
        }
    }
    startpoint.x = selectionStartX
    startpoint.y = selectionStartY
    endpoint.x = selectionEndX
    endpoint.y = selectionEndY
    if (startpoint.x > endpoint.x) {
        if (startpoint.y >= endpoint.y) {
            calX = selectionStartX - ((dist(selectionStartX, 0, selectionEndX, 0) / 2))
            calY = selectionStartY - ((dist(selectionStartY, 0, selectionEndY, 0) / 2))
        }
        else {
            calX = selectionStartX - ((dist(selectionStartX, 0, selectionEndX, 0) / 2))
            calY = selectionStartY + ((dist(selectionStartY, 0, selectionEndY, 0) / 2))
        }
    }
    else {
        if (startpoint.y >= endpoint.y) {
            calX = selectionStartX + ((dist(selectionStartX, 0, selectionEndX, 0) / 2))
            calY = selectionStartY - ((dist(selectionStartY, 0, selectionEndY, 0) / 2))
        }
        else {
            calX = selectionStartX + ((dist(selectionStartX, 0, selectionEndX, 0) / 2))
            calY = selectionStartY + ((dist(selectionStartY, 0, selectionEndY, 0) / 2))
        }
    }
    if (selectionrectangle) {
        selectionrectangle.remove()
    }


    if (calX > -99999) {
        selectionrectangle = new pointsforselect.Sprite(calX, calY, dist(selectionStartX, 0, selectionEndX, 0), dist(selectionStartY, 0, selectionEndY, 0), "n");
        selectionrectangle.color = color(0, 255, 0, 50)



    }

    if (mouse.presses()) {
        destinationPoint.x = mouse.x;
        destinationPoint.y = mouse.y;
    }


}

function creatpointsforselection() {
    pointsforselect = new Group();
    startpoint = new pointsforselect.Sprite(99999, 99999, 1, "n")
    endpoint = new pointsforselect.Sprite(99999, 99999, 1, "n");
    destinationPoint = new pointsforselect.Sprite(99999, 99999, 100, "n");

}
let resourceShip1;
let fighterShipimg;
let resourceStation;
let resourceStationSpawned = false;
let resourceShip1MoveBackDirection
function resourceShip() {
    resourceShip1 = new Sprite(1000, 30, 100, 30)
    resourceShip1.img = fighterShipimg


}



async function resourceCollection() {
    resourceShip1MoveBackDirection = -resourceShip1.rotation
    movePointDistance = dist(resourceShip1.x, resourceShip1.y, moveBackPoint.x, moveBackPoint.y);

    if (mouse.pressed()) {
        resourceShip1.x = mouse.x
        resourceShip1.y = mouse.y

    }


    //ScrapMetal
    for (let i = 0; i < scrapMetalResourceNodes.length; i++) {
        for (let i = 0; i < scrapMetalResourceNodes.length; i++) {

            let d = dist(resourceShip1.x, resourceShip1.y, scrapMetalResourceNodes[i].x, scrapMetalResourceNodes[i].y)
            if (d < 200 && key === "p" && !resourceStationSpawned) {
                resourceStation = new Sprite(resourceShip1.x, resourceShip1.y)
                resourceStationSpawned = true;
                resourceShip1.remove()
                resourceStations.push(resourceStation)
            }


        }
    }

    //Oil
    for (let i = 0; i < oilResourceNodes.length; i++) {
        for (let i = 0; i < oilResourceNodes.length; i++) {

            let d = dist(resourceShip1.x, resourceShip1.y, oilResourceNodes[i].x, oilResourceNodes[i].y)
            if (d < 200 && key === "p" && !resourceStationSpawned) {
                resourceStation = new Sprite(resourceShip1.x, resourceShip1.y)
                resourceStationSpawned = true;
                resourceShip1.remove()
                resourceStations.push(resourceStation)
            }


        }
    }

    //Crystal
    for (let i = 0; i < crystalResourceNodes.length; i++) {
        for (let i = 0; i < crystalResourceNodes.length; i++) {

            let d = dist(resourceShip1.x, resourceShip1.y, crystalResourceNodes[i].x, crystalResourceNodes[i].y)
            if (d < 200 && key === "p" && !resourceStationSpawned) {
                resourceStation = new Sprite(resourceShip1.x, resourceShip1.y)
                resourceStationSpawned = true;
                resourceShip1.remove()
                resourceStations.push(resourceStation)
            }


        }
    }




}


function resourceCollector() {

    if (resourceStationSpawned === true) {
        //ScrapMetal
        for (let i = 0; i < scrapMetalResourceNodes.length; i++) {
            let c = dist(resourceStation.x, resourceStation.y, scrapMetalResourceNodes[i].x, scrapMetalResourceNodes[i].y)
            if (c < 200) {
                if (frameCount % 60 === 0) {
                    scrapMetalCounter.text++
                }

            }
        }

        //Oil
        for (let i = 0; i < oilResourceNodes.length; i++) {
            let c = dist(resourceStation.x, resourceStation.y, oilResourceNodes[i].x, oilResourceNodes[i].y)
            if (c < 200) {
                if (frameCount % 60 === 0) {
                    oilCounter.text++
                }

            }
        }

        //Crystal
        for (let i = 0; i < crystalResourceNodes.length; i++) {
            let c = dist(resourceStation.x, resourceStation.y, crystalResourceNodes[i].x, crystalResourceNodes[i].y)
            if (c < 200) {
                if (frameCount % 60 === 0) {
                    crystalCounter.text++
                }

            }
        }








    }




}


// remonder for omrhi // use angleto for better prefromens for shiops and points so they resolve the promice cliding problem