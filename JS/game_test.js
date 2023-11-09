"use strict";
let mothershipBase, defaultResource, resourceZone;
let oceanBackground, mothershipImage, mainMusic;
let oceanSprite;
let scrollNumber = 0
let scrollZoomLevel = 0.25
let ships, scoutShipsClass, resourceStation;
let scoutShipImage;
let scrapMetalImage, oilImage, crystalImage;
let cannonImage, destroyerimg, fighterShipimg;
let SeaMon;
let SeaMonShadowImage;
let shots, basicShot;
let ui;

let shotOnce = false;

let actualships = [];

let scrapMetalCounter, oilCounter, crystalCounter;
let fighterShipsClass, destroyerShipsClass, constructorShipsClass;

let resourceStations
let scrapMetalResourceNodes = [];
let oilResourceNodes = [];
let crystalResourceNodes = [];

let calX = 0
let calY = 0
let pointsforselect, startpoint, endpoint, selectionrectangle;
let shipSelected = false;
let selectionStartX, selectionStartY;
let selectionEndX, selectionEndY;
let selectedShips = [];
let lastmovepoint = 0
let movepoint
let movepoints = []
let moveBackPoint;
let movePointDistance;

let smallCan = [];
let smallCan2 = [];

let resourceStationSpawned = false;


let currentScreen = 0
let mainMenuScreen = 0
let introScreen = 1
let gameScreen = 2

let gameLoadOnce = false;
let menuLoadOnce = false;
let videoPlayOnce = false;
let playEasterEggVideo = false;


let MenuSprites, newGameButton, menuBackground;
let introVideo, easterEggVideo;




function preload() {
    //Background//
    menuBackground = loadImage("./assets/menuImage.jpg");
    oceanBackground = loadImage("./assets/ocean.jpg");

    //Resources//
    scrapMetalImage = loadImage("./assets/metalplate.png");
    oilImage = loadImage("./assets/oil.png");
    crystalImage = loadImage("./assets/Crystal.png");

    //Ships//
    mothershipImage = loadImage("./assets/Mothership.gif");
    scoutShipImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png");
    fighterShipimg = loadImage("./assets/ship_sptites/shipz/images/ship_medium_body.png");
    destroyerimg = loadImage("./assets/ship_sptites/shipz/images/ship_large_body.png");
    cannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_big_gun.png");

    //Monsters//
    SeaMonShadowImage = loadImage("./assets/enemy_sprites/reaper.gif")

    //Music//
    mainMusic = loadSound("./assets/music/Salutations.mp3")

    //Videos//
    introVideo = createVideo("./assets/videos/IntroVideo.mp4")
    easterEggVideo = createVideo("./assets/videos/EasterEggVideo.mp4")
    introVideo.hide();
    easterEggVideo.hide();
    introVideo.volume(0.1);
    easterEggVideo.volume(0.5);


}

function setup() {
    createCanvas(1920, 1076);


}

function draw() {

    if (currentScreen === 0) { //MainMenu
        image(menuBackground, 0, 0, width, height)

        //MenuSetup//
        if (menuLoadOnce === false) {
            MenuSprites = new Group();
            newGameButton = new Sprite(width / 5, height / 2.8, 350, 120)
            newGameButton.textSize = '80'
            newGameButton.text = 'Start';
            MenuSprites.push(newGameButton)
            newGameButton.color = 'white';

            menuLoadOnce = true;
        }

        if (newGameButton.mouse.pressed()) {
            MenuSprites.remove();
            currentScreen = 1;


        };
        if (newGameButton.mouse.hovering()) {
            newGameButton.color = 'blue';
            newGameButton.textColor = 'white';
        } else {
            newGameButton.color = 'white';
            newGameButton.textColor = 'black';
        }




    }
    else if (currentScreen === 1) { //Intro
        background('black')
        image(introVideo, 0, 0, width, height);

        //IntroSetup//
        if (videoPlayOnce === false) {
            introVideo.play();
            videoPlayOnce = true;

        } else if (videoPlayOnce === true && kb.presses(' ')) {
            introVideo.stop();
            gameLoadOnce = false;
            currentScreen = 2
            videoPlayOnce = false;
        }

        introVideo.onended(IntroEnded);





    }
    else if (currentScreen === 2) { //Game

        clear();
        //GameSetup//
        if (gameLoadOnce === false) {
            new Group();

            ocean();
            creatpointsforselection();
            mothership();
            resourceSpawner();
            makeships();
            enemies();//may have to go in draw for animation and stuff
            resourceStations = new Group();

            gameInterface(); // this must alwas be done last


            gameLoadOnce = true;
        }








        zoom();
        moveShips();
        moveselectedships();
        Weapons();
        hpsystem()
        monsterAni();
        selection_system();
        resourceCollection();
        resourceCollected();     //idl why but it was breaking game

        GUIE(); //this must alwas be done last 



        //MainMusic//
        if (mainMusic.isPlaying()) {

        } else {
            mainMusic.loop();
            mainMusic.setVolume(0.1);
        }

        //EasterEggVideo//
        if (playEasterEggVideo === false && kb.presses('l')) {

            easterEggVideo.play();

            playEasterEggVideo = true;

        } else if (playEasterEggVideo === true && kb.presses('l')) {
            easterEggVideo.stop();
            playEasterEggVideo = false;

        }

        if (playEasterEggVideo === true) {
            image(easterEggVideo, 0, 0, width, height);
        }

    }




}

function IntroEnded() {
    if (videoPlayOnce === true) {
        introVideo.stop();
        gameLoadOnce = false;
        currentScreen = 2
        videoPlayOnce = false;
    }
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

        //console.log(scrapMetalResourceNodes)
        // console.log(oilResourceNodes)
        //console.log(crystalResourceNodes)


    }







    //add purchasable placeable mines

}


function makeships() {
    ships = new Group();
    scoutShipsClass = new ships.Group();
    fighterShipsClass = new ships.Group();
    destroyerShipsClass = new ships.Group();
    constructorShipsClass = new ships.Group();
    makeship("scout", 200, 400)
    makeship("fighter", 500, 700)
    makeship("destroyer", 800, 1000)
    makeship('constructor', 1500, 700)


}

function makeship(shiptype, newshipX, newshipY) {
    let scout
    let fighter
    let destroyer
    let constructor
    //console.log(actualships.length)
    if (shiptype == "scout") {
        scout = new scoutShipsClass.Sprite(newshipX, newshipY, 105, 54, "d")
        scoutShipsClass.img = scoutShipImage
        scout.needstobemoved = false
        scout.maxHP = 25
        scout.hp = 25
        scout.shipclass = "scout"
        console.log(scout.shipclass)

        actualships.push(scout)

        let newSmallCan = new Sprite(newshipX, newshipY, 20, 20)
        newSmallCan.img = cannonImage
        newSmallCan.id = scout.idNum
        newSmallCan.overlaps(ships)
        smallCan.push(newSmallCan)



    }
    if (shiptype == "fighter") {
        fighter = new fighterShipsClass.Sprite(newshipX, newshipY, 179, 62, "d")
        fighterShipsClass.img = fighterShipimg
        fighter.needstobemoved = false
        let newSmallCan2 = new Sprite(newshipX, newshipY, 20, 20)
        newSmallCan2.id = fighter.idNum
        newSmallCan2.overlaps(ships)
        smallCan2.push(newSmallCan2)
        newSmallCan2.img = cannonImage
        newSmallCan2.cannonnumber = 1

        let newSmallCan3 = new Sprite(newshipX, newshipY, 20, 20)
        newSmallCan3.id = fighter.idNum
        newSmallCan3.overlaps(ships)
        smallCan2.push(newSmallCan3)
        newSmallCan3.cannonnumber = 2
        newSmallCan3.img = cannonImage
        fighter.shipclass = "fighter"
        fighter.maxHP = 100
        fighter.hp = 100
        actualships.push(fighter)


    }
    if (shiptype == "destroyer") {
        destroyer = new destroyerShipsClass.Sprite(newshipX, newshipY, 368, 122, "d")
        destroyerShipsClass.img = destroyerimg
        destroyer.needstobemoved = false
        destroyer.shipclass = "destroyer"
        destroyer.maxHP = 500
        destroyer.hp = 500
        actualships.push(destroyer)
    }
    if (shiptype == "constructor") {
        constructor = new constructorShipsClass.Sprite(newshipX, newshipY, 179, 62, "d")
        constructor.img = fighterShipimg
        constructor.needstobemoved = false
        constructor.shipclass = "constructor"
        constructor.maxHP = 100
        constructor.hp = 100
        actualships.push(constructor)

    }
    constructor

}


let bulletTimer = 0;
function Weapons() {


    //scout
    for (let newSmallCan of smallCan) {
        for (let ship of ships) {
            if (newSmallCan.id === ship.idNum) {
                newSmallCan.collider = 'none';
                newSmallCan.x = ship.x
                newSmallCan.y = ship.y
            }
            let MonsterEnemyDistance = dist(ship.x, ship.y, SeaMon.x, SeaMon.y)


            if (MonsterEnemyDistance < 1600) {
                newSmallCan.rotateTowards(SeaMon, 1, 0);
                let x = newSmallCan.x;
                let y = newSmallCan.y;
                let direction = newSmallCan.direction;
                let selectedAmmo = basicShot;

                if (bulletTimer === 0) {

                    shotOnce = false;
                    ammo(x, y, direction, selectedAmmo);
                }

                if (bulletTimer >= 300) {
                    bulletTimer = -1;
                }

                bulletTimer++;


            }
        }
    }

    //fighter
    for (let cannon of smallCan2) {
        for (let ship of ships) {

            //ship.offset.x = 10; 
            // ship.debug = true;


            let fighterCannon1X = 40 * cos(ship.rotation);
            let fighterCannon1Y = 40 * sin(ship.rotation);
            let fighterCannon2X = 40 * cos(ship.rotation - 180);
            let fighterCannon2Y = 40 * sin(ship.rotation - 180);



            if (cannon.id === ship.idNum) {

                //cannon.img = cannonImage
                cannon.collider = 'none';

                if (cannon.cannonnumber === 1) {
                    cannon.x = ship.x + fighterCannon1X
                    cannon.y = ship.y + fighterCannon1Y
                }
                if (cannon.cannonnumber === 2) {
                    cannon.x = ship.x + fighterCannon2X
                    cannon.y = ship.y + fighterCannon2Y
                }

                let MonsterEnemyDistance = dist(ship.x, ship.y, SeaMon.x, SeaMon.y)


                if (MonsterEnemyDistance < 1600) {
                    cannon.rotateTowards(SeaMon, 1, 0);
                    let x = cannon.x;
                    let y = cannon.y;
                    let direction = cannon.direction;
                    let selectedAmmo = basicShot;

                    if (bulletTimer === 0) {

                        shotOnce = false;
                        ammo(x, y, direction, selectedAmmo);
                    }

                    if (bulletTimer >= 300) {
                        bulletTimer = -1;
                    }

                    bulletTimer++;

                }
            }




        }
    }











}







function moveShips() {
    //console.log(selectedShips)
    if (shipSelected && selectionrectangle.width < 100) {
        if (mouse.pressed()) {
            movepoints.splice(0, actualships.length)
            for (let i = 0; i < selectedShips.length; i++) {


                if (selectedShips[i].selected == true) {

                    let xAxisDistance = dist(selectedShips[0].x, 0, mouse.x, 0)
                    let yAxisDistance = dist(0, selectedShips[0].y, 0, mouse.y)

                    if (xAxisDistance < yAxisDistance) {
                        movepoint = new Sprite(mouse.x + i * 100 - 100 * (selectedShips.length / 3), mouse.y, 50, "n")
                    } else {
                        movepoint = new Sprite(mouse.x, mouse.y + i * 100 - 100 * (selectedShips.length / 3), 50, "n")
                    }


                    movepoint.visible = true;
                    selectedShips[i].needstobemoved = true
                    lastmovepoint = movepoints.length
                    selectedShips[i].movepoint = movepoint
                    //console.log(selectedShips[i].movepoint, movepoint)
                    movepoint.life = 240000
                    movepoints.push(movepoint)
                }


            }
        }
    }
}








function moveselectedships() {

    for (let selectedship of actualships) {
        // console.log(selectedship.hp)
        if (selectedship.needstobemoved) {
            selectedship.rotation = selectedship.direction
            selectedship.direction = selectedship.angleTo(selectedship.movepoint);

            //console.log(selectedship)
            //console.log(selectedship.shipclass)
            //console.log(selectedship.hp)

            if (selectedship.shipclass === "scout") {
                selectedship.speed = 2
            }
            if (selectedship.shipclass === "fighter") {
                selectedship.speed = 1
            }
            if (selectedship.shipclass === "destroyer") {
                selectedship.speed = 0.5
            }
            if (selectedship.shipclass === "constructor") {
                selectedship.speed = 10
            }
        }
        //console.log(movepoints[lastmovepoint - 1] + "  testing problem")

        if (selectedship.needstobemoved && (dist(selectedship.x, selectedship.y, selectedship.movepoint.x, selectedship.movepoint.y) < 100)) {
            selectedship.rotation = selectedship.direction
            console.log("Finished Moving")
            selectedship.needstobemoved = false
            selectedship.vel.x = 0;
            selectedship.vel.y = 0;
            selectedship.speed = 0;
            selectedship.rotationLock = true;

        }
    }


}


function ammo(x, y, direction, selectedAmmo) {


    if (shotOnce === false && selectedAmmo === basicShot) {
        basicShot = new Sprite(x, y, 8);
        basicShot.direction = direction;
        basicShot.speed = 0;
        basicShot.life = 300;

        basicShot.speed = 5;
        basicShot.collider = 'd';
        basicShot.color = 'red';
        basicShot.overlaps(basicShot)

        for (let i = 0; i < actualships.length; i++) {
            basicShot.overlaps(actualships[i])
        }

        shotOnce = true;

    }

    if (basicShot.collides(allSprites)) {
        basicShot.remove();
    }


}



function enemies() {

    SeaMon = new Sprite(-1500, 2000, 100, 200)

    SeaMonShadowImage.resize(500, 500)
    SeaMon.img = SeaMonShadowImage

}


function monsterAni() {
    SeaMon.direction = SeaMon.rotation;//sync direction to rotation
    SeaMon.speed = 5;
    for (let i = 0; i < actualships.length; i++) {

        let MonsterShipDist = dist(actualships[i].x, actualships[i].y, SeaMon.x, SeaMon.y)

        if (MonsterShipDist < 1000) {
            SeaMon.rotation -= 0
            SeaMon.rotateTowards(actualships[i])


        }
        else {
            SeaMon.rotation -= 0.2;
        }


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
    for (let i = 0; i < actualships.length; i++) {
        if (actualships[i].needstobemoved === false) {
            actualships[i].speed = 0
            actualships[i].rotationSpeed = 0
        }
    }


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


                selectedShips.splice(i, actualships.length)


                if (
                    actualships[i].x > min(selectionStartX, selectionEndX) &&
                    actualships[i].x < max(selectionStartX, selectionEndX) &&
                    actualships[i].y > min(selectionStartY, selectionEndY) &&
                    actualships[i].y < max(selectionStartY, selectionEndY)
                ) {

                    console.log("ship selected " + actualships[i]);
                    selectedShips.push(actualships[i])
                    actualships[i].selected = true;

                }

                //console.log(actualships[i].selected)

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
    // problematic only works if all are selected
    if (mouse.released()) {
        //console.log('mouse released');
        shipSelected = false;
        for (let i = 0; i < actualships.length; i++) {
            if (actualships[i].selected === true) {
                shipSelected = true;
                break;
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




}

function creatpointsforselection() {
    pointsforselect = new Group();
    startpoint = new pointsforselect.Sprite(99999, 99999, 1, "n")
    endpoint = new pointsforselect.Sprite(99999, 99999, 1, "n");

}


function resourceCollected() {

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


async function resourceCollection() {


    for (let selectedship of actualships) {

        if (selectedship.shipclass === 'constructor') {


            //ScrapMetal
            for (let i = 0; i < scrapMetalResourceNodes.length; i++) {
                for (let i = 0; i < scrapMetalResourceNodes.length; i++) {

                    let d = dist(selectedship.x, selectedship.y, scrapMetalResourceNodes[i].x, scrapMetalResourceNodes[i].y)
                    if (d < 200 && kb.presses('p') && !resourceStationSpawned) {
                        resourceStation = new Sprite(selectedship.x, selectedship.y)
                        resourceStation.collider = 'static'
                        resourceStationSpawned = true;
                        selectedship.remove()
                        resourceStations.push(resourceStation)
                    }


                }
            }

            //Oil
            for (let i = 0; i < oilResourceNodes.length; i++) {
                for (let i = 0; i < oilResourceNodes.length; i++) {

                    let d = dist(selectedship.x, selectedship.y, oilResourceNodes[i].x, oilResourceNodes[i].y)
                    if (d < 200 && kb.presses('p') && !resourceStationSpawned) {
                        resourceStation = new Sprite(selectedship.x, selectedship.y)
                        resourceStation.collider = 'static'
                        resourceStationSpawned = true;
                        selectedship.remove()
                        resourceStations.push(resourceStation)
                    }


                }
            }

            //Crystal
            for (let i = 0; i < crystalResourceNodes.length; i++) {
                for (let i = 0; i < crystalResourceNodes.length; i++) {

                    let d = dist(selectedship.x, selectedship.y, crystalResourceNodes[i].x, crystalResourceNodes[i].y)
                    if (d < 200 && kb.presses('p') && !resourceStationSpawned) {
                        resourceStation = new Sprite(selectedship.x, selectedship.y)
                        resourceStation.collider = 'static'
                        resourceStationSpawned = true;
                        selectedship.remove()
                        resourceStations.push(resourceStation)
                    }


                }
            }




        }
    }
}


function hpsystem() {

    for (let selectedship of actualships) {
        //console.log(selectedship.hp)

    }
}
