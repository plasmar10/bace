"use strict";
let mothershipBase, defaultResource, resourceZone, resourceBackground, offScreenBackground;
let oceanBackground, mothershipImage, mainMusic, oceanBorderSprite, SeaMon2;
let oceanSprite;
let scrollNumber = 0
let scrollZoomLevel = 0.25
let ships, scoutShipsClass, resourceStation;
let scoutShipImage;
let scrapMetalImage, oilImage, crystalImage, resourcesBackgroundImage, metalImage, damagedScoutShipimg;
let cannonImage, destroyerimg, fighterShipimg, damagedFighterShipimg, damagedCannonImage, damagedDestroyerShipimg;
let SeaMon, lavaKraken, radiationSquid, dukeFishron;
let SeaMonShadowImage, lavaKrakenImage, dukeFishronImageRight, dukeFishronImageLeft, dukeFishron2ImageLeft, dukeFishron2ImageRight;
let basicShot;
let ui;
let constructorimg
let startgamebuttion
let loadingscreen

let shotOnce = false;
let shots = [];

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
let menuebuttionsgroup
let menuebuttionsgroupimg

let smallCan = [];
let smallCan2 = [];
let allCannons = [];
let healthBarComponents = [];
let monsterHealthBarComponents = [];

let oceanCreatures = [];

let resourceStationSpawned = false;

let menuselectionsoundefect

let currentScreen = 2
let mainMenuScreen = 0
let introScreen = 1
let gameScreen = 2

let gameLoadOnce = false;
let menuLoadOnce = false;
let videoPlayOnce = false;
let playEasterEggVideo = false;


let MenuSprites, newGameButton, menuBackground;
let introVideo, easterEggVideo;
let zoneSpawned = false
let lavaZone, lavaZone2, lavaZone3;
let radiationZone;
let buyScreen;
let buyConstructor;
let surfaceNauticaVideo;
let soundPlayed1 = false;
let soundPlayed2 = false;
let soundPlayed3 = false;
let buyRC
let buyBarracks

let difficultyButton, creditsButton;
let makeMenuButtons = false
let menuimg1, menuimg2, menuimg3
let menubuttionsblankimg
let SeaMonImage;
let oilRig;
let buyImg;
let shipYards
let shipYard;
let buyFigther
let buyScout
let buyDestroyer
let menuestiffgroup
let gameHasLoaded = false;
let scrapMetalCounterImage
let oilCounterImage
let crystalCounterImage
let barrackImg;
let buyRad;
let buyLava;
let lavaUp = false
let radUp = false
let launch
let rocket
let rocketImg

function preload() {
    //Background//
    menuBackground = loadImage("./assets/menuImage.png");
    menubuttionsblankimg = loadImage("./assets/blank_img.png");
    menuebuttionsgroupimg = loadImage("./assets/menue_buttion.png");
    //oceanBackground = loadImage("./assets/small_backround_low_rez.jpg");
    oceanBackground = loadImage("./assets/backround_with_zones.jpg");
    offScreenBackground = loadImage("./assets/backgroundJump.jpg");




    //Resources//
    scrapMetalImage = loadImage("./assets/metalplate.png");
    oilImage = loadImage("./assets/Oil.png");
    crystalImage = loadImage("./assets/Crystal.png");

    metalImage = loadImage("./assets/MetalIngot.png");


    //Ships//
    mothershipImage = loadImage("./assets/mothership.gif");

    scoutShipImage = loadImage("./assets/ship_sptites/shipz/images/ship_small_body.png");
    damagedScoutShipimg = loadImage("./assets/ship_sptites/shipz/images/ship_small_body_destroyed.png");

    fighterShipimg = loadImage("./assets/ship_sptites/shipz/images/ship_medium_body.png");
    damagedFighterShipimg = loadImage("./assets/ship_sptites/shipz/images/ship_medium_body_destroyed.png");

    destroyerimg = loadImage("./assets/ship_sptites/shipz/images/ship_large_body.png");
    damagedDestroyerShipimg = loadImage("./assets/ship_sptites/shipz/images/ship_large_body_destroyed.png");

    constructorimg = loadImage("./assets/ship_sptites/shipz/images/constructer_ship.png");

    cannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_big_gun.png");
    damagedCannonImage = loadImage("./assets/ship_sptites/shipz/images/ship_big_gun_destroyed.png");

    //Monsters//
    SeaMonShadowImage = loadImage("./assets/enemy_sprites/reaper.gif")
    // SeaMonImage = loadImage ("./assets/enemy_sprites/seamonster.gif")

    lavaKrakenImage = loadImage("./assets/enemy_sprites/LavaKraken.gif")
    dukeFishronImageLeft = loadImage("./assets/enemy_sprites/DukeFishronFirstForm.gif")
    dukeFishronImageRight = loadImage("./assets/enemy_sprites/DukeFishronFirstFormRight.gif")

    dukeFishron2ImageLeft = loadImage("./assets/enemy_sprites/DukeFishronSecondFormLeft.gif")
    dukeFishron2ImageRight = loadImage("./assets/enemy_sprites/DukeFishronSecondForm.gif")

    //Music//
    mainMusic = loadSound("./assets/music/Salutations.mp3")
    menuselectionsoundefect = loadSound("./assets/sound_effects/menu selection sound.mp3")

    //buildings
    oilRig = loadImage("./assets/backround_removed_oilrig.png")
    barrackImg = loadImage("./assets/barracks.webp")
    rocketImg = loadImage("./assets/rocket.png")

    //
    buyImg = loadImage("./assets/buyScreen.png")
    resourcesBackgroundImage = loadImage("./assets/resourceBackground.gif")
    credditscreen = loadImage("./assets/creddits.png")


    //Videos//
    introVideo = createVideo("./assets/videos/IntroVideo.mp4")
    easterEggVideo = createVideo("./assets/videos/EasterEggVideo.mp4")
    introVideo.hide();
    easterEggVideo.hide();
    introVideo.volume(0.1);
    easterEggVideo.volume(0.5);
    surfaceNauticaVideo = createVideo("./assets/videos/surfusnatica_1.mp4");
    surfaceNauticaVideo.hide();
    allSprites.autoCull = false;
    allSprites.debug = false;
}

function setup() {
    createCanvas(1920, 1076);
    menuestiffgroup = new Group()
}

function gameLoaded() {
    gameHasLoaded = true;
}

function videoLoaded() {
    surfaceNauticaVideo.loop();
}

function draw() {

    if (currentScreen === 0) { //Start Screen
        startscreen()
    }
    else if (currentScreen === 1) { //Menu Screen
        menuScreen()


    }
    else if (currentScreen === 3) { //creddit screen
        image(credditscreen, 0, 0, 1920, 1076);
    }
    else if (currentScreen === 2) { //Game
        clear();

        image(offScreenBackground, 0, 0, width, height)

        //GameSetup//
        if (gameLoadOnce === false) {
            new Group();


            ocean();
            Zones();
            creatpointsforselection();
            mothership();
            resourceSpawner();
            makeships();
            enemies();//may have to go in draw for animation and stuff
            resourceStations = new Group();
            shipYards = new Group();
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
        resourceCollected();





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








        GUIE(); //this must alwas be done last 

    }
}


function menuScreen() {
    background(0);
    surfaceNauticaVideo.loop();
    image(surfaceNauticaVideo, 0, 0, 1920, 1076);
    // Display your video or any other content for the menu screen here
    if (mainMusic.isPlaying()) {
        noStroke();
    } else {
        mainMusic.loop();

        mainMusic.setVolume(0.1);
    }
    if (!makeMenuButtons) {
        menuebuttionsgroup = new menuestiffgroup.Group()
        menuebuttionsgroupimg.resize(354, 80);
        startgamebuttion = new menuestiffgroup.Sprite(420, 700, 414, 80, 's');
        startgamebuttion.img = menubuttionsblankimg
        creditsButton = new menuestiffgroup.Sprite(420, 810, 414, 80, 's')
        creditsButton.img = menubuttionsblankimg
        difficultyButton = new menuestiffgroup.Sprite(420, 920, 414, 80, 's')
        difficultyButton.img = menubuttionsblankimg


        menuimg1 = new menuebuttionsgroup.Sprite(450, 700, 354, 80, 'n');
        menuimg2 = new menuebuttionsgroup.Sprite(450, 810, 354, 80, 'n')
        menuimg3 = new menuebuttionsgroup.Sprite(450, 920, 354, 80, 'n')
        menuebuttionsgroup.img = menuebuttionsgroupimg


        makeMenuButtons = true
    }

    noFill();
    stroke(88, 176, 229);
    strokeWeight(7)
    circle(250, 700, 62);
    circle(250, 810, 62);
    circle(250, 920, 62);
    //hovver
    noStroke();
    strokeWeight(0)
    fill(251, 192, 45)





    circle(250, 700, ((menuimg1.x - 450) * 1.54));
    circle(250, 810, ((menuimg2.x - 450) * 1.54));
    circle(250, 920, ((menuimg3.x - 450) * 1.54));
    if (menuimg1.x < 450) {
        menuimg1.x = 450
    }
    if (menuimg2.x < 450) {
        menuimg2.x = 450
    }
    if (menuimg3.x < 450) {
        menuimg3.x = 450
    }
    if (startgamebuttion.mouse.hovering()) {
        if (!soundPlayed1) {
            menuselectionsoundefect.play();
            menuselectionsoundefect.setVolume(0.1);
            soundPlayed1 = true;
        }
        if (menuimg1.x < 451)
            menuimg1.move(30, 'right', 3);
    }
    else {
        soundPlayed1 = false;
        if (menuimg1.x > 450)
            menuimg1.move(5, 'left', 3);
    }
    if (creditsButton.mouse.hovering()) {
        if (!soundPlayed2) {
            menuselectionsoundefect.play();
            menuselectionsoundefect.setVolume(0.1);
            soundPlayed2 = true;
        }
        if (menuimg2.x < 451)
            menuimg2.move(30, 'right', 3);
    }
    else {
        soundPlayed2 = false;
        if (menuimg2.x > 450)
            menuimg2.move(5, 'left', 3);
    }

    if (difficultyButton.mouse.hovering()) {
        if (!soundPlayed3) {
            menuselectionsoundefect.play();
            menuselectionsoundefect.setVolume(0.1);
            soundPlayed3 = true;
        }
        if (menuimg3.x < 451)
            menuimg3.move(30, 'right', 3);
    }
    else {
        soundPlayed3 = false;
        if (menuimg3.x > 450)
            menuimg3.move(5, 'left', 3);
    }

    if (startgamebuttion.mouse.pressed()) {
        loadingscreen = new menuestiffgroup.Sprite(width / 2, height / 2, width, height)
        loadingscreen.img = menuBackground
        currentScreen = 2
        menuestiffgroup.remove()


    }





}


function playMenuSelectionSound() {
    // Play the menu selection sound
    if (!soundPlayed1) {
        menuselectionsoundefect.play();
        menuselectionsoundefect.setVolume(0.1);
        soundPlayed1 = true;
    }
    if (!soundPlayed2) {
        menuselectionsoundefect.play();
        menuselectionsoundefect.setVolume(0.1);
        soundPlayed2 = true;
    }
    if (!soundPlayed3) {
        menuselectionsoundefect.play();
        menuselectionsoundefect.setVolume(0.1);
        soundPlayed3 = true;
    }
}


function startscreen() {
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

function IntroEnded() {
    if (videoPlayOnce === true) {
        introVideo.stop();
        gameLoadOnce = false;
        currentScreen = 2
        videoPlayOnce = false;
    }
}


function ocean() {
    //Ocean//
    oceanBackground.resize(width * 10, height * 10);
    oceanSprite = new Sprite(width / 2, height / 2, width * 10, height * 10, "n");
    oceanSprite.image = oceanBackground;
    oceanSprite.color = 'blue';
    oceanSprite.layer = -10;


    //OceanBorder//
    oceanBorderSprite = new Sprite(width / 2, height / 2, width * 10, height * 10, "s");
    oceanBorderSprite.shape = 'chain';
    oceanBorderSprite.layer = -10;
    oceanBorderSprite.stroke = 'black';




}

function mothership() {
    mothershipBase = new Sprite(width / 2, height / 2, 400, 190, 's')
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
        let resourceZoneWidth = 3300;
        let resourceZoneHeight = 2000;

        let resourceZoneX1 = 2800;
        let resourceZoneY1 = -4500;

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
    metalImage.resize(50, 50)
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

                if (d < 600) { //edit this to change how far spread apart the resources are
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

    makeship('scout', 500, 500)
    
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
        actualships.push(scout)

        let newSmallCan = new Sprite(newshipX, newshipY, 20, 20)
        newSmallCan.img = cannonImage
        newSmallCan.idNum = scout.idNum
        newSmallCan.shoot = true;
        newSmallCan.overlaps(ships)
        smallCan.push(newSmallCan)
        allCannons.push(newSmallCan)
        newSmallCan.bulletTimer = random(0, 50);

        let healthBarBackground = new Sprite(-1000, 100, 100, 15, 'none');
        healthBarBackground.idNum = scout.idNum;
        healthBarBackground.componentId = 'background';
        healthBarBackground.color = 'black';
        healthBarComponents.push(healthBarBackground)

        let healthBarLife = new Sprite(-1000, 100, 100, 14, 'none');
        healthBarLife.idNum = scout.idNum;
        healthBarLife.componentId = 'bar';
        healthBarLife.color = 'lightgreen';
        healthBarComponents.push(healthBarLife)



    }
    if (shiptype == "fighter") {
        fighter = new fighterShipsClass.Sprite(newshipX, newshipY, 179, 62, "d")
        fighterShipsClass.img = fighterShipimg
        fighter.needstobemoved = false
        fighter.shipclass = "fighter"
        fighter.maxHP = 100
        fighter.hp = 100
        actualships.push(fighter)


        let newSmallCan2 = new Sprite(newshipX, newshipY, 20, 20)
        newSmallCan2.idNum = fighter.idNum
        newSmallCan2.shoot = true;
        newSmallCan2.overlaps(ships)
        smallCan2.push(newSmallCan2)
        allCannons.push(newSmallCan2)
        newSmallCan2.img = cannonImage
        newSmallCan2.cannonnumber = 1
        newSmallCan2.bulletTimer = random(0, 50);

        let newSmallCan3 = new Sprite(newshipX, newshipY, 20, 20)
        newSmallCan3.idNum = fighter.idNum
        newSmallCan3.shoot = true;
        newSmallCan3.overlaps(ships)
        smallCan2.push(newSmallCan3)
        allCannons.push(newSmallCan3)
        newSmallCan3.img = cannonImage
        newSmallCan3.cannonnumber = 2
        newSmallCan3.bulletTimer = random(0, 50);

        let healthBarBackground = new Sprite(-1000, 100, 100, 15, 'none');
        healthBarBackground.idNum = fighter.idNum;
        healthBarBackground.componentId = 'background';
        healthBarBackground.color = 'black';
        healthBarComponents.push(healthBarBackground)

        let healthBarLife = new Sprite(-1000, 100, 100, 14, 'none');
        healthBarLife.idNum = fighter.idNum;
        healthBarLife.componentId = 'bar';
        healthBarLife.color = 'lightgreen';
        healthBarComponents.push(healthBarLife)


    }
    if (shiptype == "destroyer") {
        destroyer = new destroyerShipsClass.Sprite(newshipX, newshipY, 368, 122, "d")
        destroyerShipsClass.img = destroyerimg
        destroyer.needstobemoved = false
        destroyer.shipclass = "destroyer"
        destroyer.maxHP = 500
        destroyer.hp = 500
        actualships.push(destroyer)

        let healthBarBackground = new Sprite(-1000, 100, 100, 15, 'none');
        healthBarBackground.idNum = destroyer.idNum;
        healthBarBackground.componentId = 'background';
        healthBarBackground.color = 'black';
        healthBarComponents.push(healthBarBackground)

        let healthBarLife = new Sprite(-1000, 100, 100, 14, 'none');
        healthBarLife.idNum = destroyer.idNum;
        healthBarLife.componentId = 'bar';
        healthBarLife.color = 'lightgreen';
        healthBarComponents.push(healthBarLife)


    }
    if (shiptype == "constructor") {
        constructor = new constructorShipsClass.Sprite(newshipX, newshipY, 368, 224, "d")
        constructor.img = constructorimg
        constructor.needstobemoved = false
        constructor.shipclass = "constructor"
        constructor.maxHP = 100
        constructor.hp = 100
        constructor.layer = 1

        actualships.push(constructor)

        let healthBarBackground = new Sprite(-1000, 100, 100, 15, 'none');
        healthBarBackground.idNum = constructor.idNum;
        healthBarBackground.componentId = 'background';
        healthBarBackground.color = 'black';
        healthBarBackground.layer = 1
        healthBarComponents.push(healthBarBackground)

        let healthBarLife = new Sprite(-1000, 100, 100, 14, 'none');
        healthBarLife.idNum = constructor.idNum;
        healthBarLife.componentId = 'bar';
        healthBarLife.color = 'lightgreen';
        healthBarLife.layer = 1
        healthBarComponents.push(healthBarLife)

    }


}



function Weapons() {


    //scout
    for (let cannon of smallCan) {
        for (let ship of ships) {
            if (cannon.idNum === ship.idNum) {
                cannon.collider = 'none';
                cannon.x = ship.x
                cannon.y = ship.y

                //console.log(ship.hp)
                if (ship.hp <= 1) {
                    cannon.remove();
                    cannon.shoot = false;


                }


                for (let i = 0; i < oceanCreatures.length; i++) {

                    let MonsterEnemyDistance = dist(ship.x, ship.y, oceanCreatures[i].x, oceanCreatures[i].y)

                    if (MonsterEnemyDistance < 1600 && cannon.shoot === true) {
                        cannon.rotateTowards(oceanCreatures[i], 1, 0);
                        let x = cannon.x;
                        let y = cannon.y;
                        let direction = cannon.direction;
                        let selectedAmmo = basicShot;

                        let timer = cannon.bulletTimer;


                        ammo(x, y, direction, selectedAmmo, timer);


                        cannon.bulletTimer += 1;

                    }
                }

                if (cannon.bulletTimer >= 200) {
                    cannon.bulletTimer = -1;
                }

                if (ship.hp <= 2) {
                    cannon.remove();

                }
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



            if (cannon.idNum === ship.idNum) {

                cannon.collider = 'none';

                if (cannon.cannonnumber === 1) {
                    cannon.x = ship.x + fighterCannon1X
                    cannon.y = ship.y + fighterCannon1Y
                }
                if (cannon.cannonnumber === 2) {
                    cannon.x = ship.x + fighterCannon2X
                    cannon.y = ship.y + fighterCannon2Y
                }

                for (let i = 0; i < oceanCreatures.length; i++) {

                    let MonsterEnemyDistance = dist(ship.x, ship.y, oceanCreatures[i].x, oceanCreatures[i].y)

                    if (MonsterEnemyDistance < 1600 && cannon.shoot === true) {
                        cannon.rotateTowards(oceanCreatures[i], 1, 0);
                        let x = cannon.x;
                        let y = cannon.y;
                        let direction = cannon.direction;
                        let selectedAmmo = basicShot;

                        let timer = cannon.bulletTimer;


                        ammo(x, y, direction, selectedAmmo, timer);


                        cannon.bulletTimer += 1;

                    }
                }

                if (cannon.bulletTimer >= 90) {
                    cannon.bulletTimer = -1;
                }

                if (ship.hp <= 2) {
                    cannon.remove();

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


                    movepoint.visible = false;
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
                selectedship.speed = 2
            }
            if (selectedship.shipclass === "destroyer") {
                selectedship.speed = 1.5
            }
            if (selectedship.shipclass === "constructor") {
                selectedship.speed = 1
            }
        }
        //console.log(movepoints[lastmovepoint - 1] + "  testing problem")

        if (selectedship.needstobemoved && (dist(selectedship.x, selectedship.y, selectedship.movepoint.x, selectedship.movepoint.y) < 100)) {
            selectedship.rotation = selectedship.direction
            selectedship.needstobemoved = false
            selectedship.vel.x = 0;
            selectedship.vel.y = 0;
            selectedship.speed = 0;
            selectedship.rotationLock = true;

        }
    }


}


function ammo(x, y, direction, selectedAmmo, timer) {




    if (timer === 0) {

        if (selectedAmmo === basicShot) {
            basicShot = new Sprite(x, y, 8);
            basicShot.direction = direction;
            basicShot.speed = 0;
            basicShot.life = 300;

            basicShot.speed = 5;
            basicShot.collider = 'd';
            basicShot.color = 'red';
            basicShot.overlaps(basicShot)

            for (let i = 0; i < ships.length; i++) {
                basicShot.overlaps(ships[i])
            }


            shots.push(basicShot)


            shotOnce = true;

        }
    }






}


function enemies() {

    //Leviathan//
    SeaMon = new Sprite(-1500, 2000, 480, 200)
    SeaMonShadowImage.resize(480, 330)
    SeaMon.offset.x = -230;
    SeaMon.offset.y = 0;
    SeaMon.img = SeaMonShadowImage
    SeaMon.maxHP = 10000;
    SeaMon.hp = 10000;
    SeaMon.idNum = 0;
    oceanCreatures.push(SeaMon)

    let leviathanHealthBarBackground = new Sprite(-1000, 100, 300, 15, 'none');
    leviathanHealthBarBackground.componentId = 'background';
    leviathanHealthBarBackground.color = 'black';
    leviathanHealthBarBackground.idNum = SeaMon.idNum;
    monsterHealthBarComponents.push(leviathanHealthBarBackground)


    let leviathanHealthBarLife = new Sprite(-1000, 100, 300, 14, 'none');
    leviathanHealthBarLife.componentId = 'bar';
    leviathanHealthBarLife.color = 'lightgreen';
    leviathanHealthBarLife.idNum = SeaMon.idNum;
    monsterHealthBarComponents.push(leviathanHealthBarLife)



    //LavaKraken//
    lavaKraken = new Sprite(-6300, -100, 720, 550, 'k')
    lavaKraken.offset.y = 100;
    lavaKraken.offset.x = -70;
    lavaKraken.img = lavaKrakenImage
    lavaKraken.maxHP = 10000;
    lavaKraken.hp = 10000;
    lavaKraken.idNum = 1;
    oceanCreatures.push(lavaKraken)

    let lavaKrakenHealthBarBackground = new Sprite(-1000, 100, 300, 15, 'none');
    lavaKrakenHealthBarBackground.componentId = 'background';
    lavaKrakenHealthBarBackground.color = 'black';
    lavaKrakenHealthBarBackground.idNum = lavaKraken.idNum;
    monsterHealthBarComponents.push(lavaKrakenHealthBarBackground)


    let lavaKrakenHealthBarLife = new Sprite(-1000, 100, 300, 14, 'none');
    lavaKrakenHealthBarLife.componentId = 'bar';
    lavaKrakenHealthBarLife.color = 'lightgreen';
    lavaKrakenHealthBarLife.idNum = lavaKraken.idNum;
    monsterHealthBarComponents.push(lavaKrakenHealthBarLife)



    //DukeFishron//
    dukeFishron = new Sprite(-8000, 5297, 550, 380, 'k')
    dukeFishron.offset.y = 170;
    dukeFishron.offset.x = 20;
    dukeFishronImageLeft.resize(600, 450);
    dukeFishronImageRight.resize(600, 450);
    dukeFishron2ImageLeft.resize(600, 450);
    dukeFishron2ImageRight.resize(600, 450);
    dukeFishron.img = dukeFishronImageLeft;
    dukeFishron.maxHP = 10000;
    dukeFishron.hp = 10000;
    dukeFishron.idNum = 2;
    oceanCreatures.push(dukeFishron);

    let dukeFishronHealthBarBackground = new Sprite(-1000, 100, 300, 15, 'none');
    dukeFishronHealthBarBackground.componentId = 'background';
    dukeFishronHealthBarBackground.color = 'black';
    dukeFishronHealthBarBackground.idNum = dukeFishron.idNum;
    monsterHealthBarComponents.push(dukeFishronHealthBarBackground)


    let dukeFishronHealthBarLife = new Sprite(-1000, 100, 300, 14, 'none');
    dukeFishronHealthBarLife.componentId = 'bar';
    dukeFishronHealthBarLife.color = 'lightgreen';
    dukeFishronHealthBarLife.idNum = dukeFishron.idNum;
    monsterHealthBarComponents.push(dukeFishronHealthBarLife)



    //Leviathan2//
    SeaMon2 = new Sprite(6000, 2000, 480, 200)
    SeaMonShadowImage.resize(480, 330)
    SeaMon2.offset.x = -230;
    SeaMon2.offset.y = 0;
    SeaMon2.img = SeaMonShadowImage
    SeaMon2.maxHP = 10000;
    SeaMon2.hp = 10000;
    SeaMon2.idNum = 3;
    oceanCreatures.push(SeaMon2)

    let leviathanHealthBarBackground2 = new Sprite(-1000, 100, 300, 15, 'none');
    leviathanHealthBarBackground2.componentId = 'background';
    leviathanHealthBarBackground2.color = 'black';
    leviathanHealthBarBackground2.idNum = SeaMon2.idNum;
    monsterHealthBarComponents.push(leviathanHealthBarBackground2)


    let leviathanHealthBarLife2 = new Sprite(-1000, 100, 300, 14, 'none');
    leviathanHealthBarLife2.componentId = 'bar';
    leviathanHealthBarLife2.color = 'lightgreen';
    leviathanHealthBarLife2.idNum = SeaMon2.idNum;
    monsterHealthBarComponents.push(leviathanHealthBarLife2)

    for (let monster of oceanCreatures) {
        monster.debug = false;

    }

}

let LavaKrakenRouteComplete = false;
let dukeFishronRouteComplete = false;

let leviathanFollowedShip = false;
let leviathanReachedLocation = false;

let lavaKrakenFollowedShip = false;
let dukeFishronFollowedShip = false;
function monsterAni() {


    //Leviathan//
    SeaMon.direction = SeaMon.rotation;//sync direction to rotation


    console.log(actualships)
    for (let i = 0; i < actualships.length; i++) {

        let MonsterShipDist = dist(actualships[i].x, actualships[i].y, SeaMon.x, SeaMon.y)


        if (MonsterShipDist < 1000) {
            SeaMon.rotation -= 0;
            SeaMon.rotateTowards(actualships[i], 0.1);
            SeaMon.moveTowards(actualships[i], 0.02);
            leviathanFollowedShip = true;
            leviathanReachedLocation = false;


        } else if (leviathanReachedLocation = true) {
            SeaMon.speed = 5;
            SeaMon.rotation -= 0.2;

        } else if (SeaMon.x < -1400 && SeaMon.x > -1600 && SeaMon.y < 2100 && SeaMon.y > 1900) {
            leviathanFollowedShip = false;
            leviathanReachedLocation = true;
        }






    }

    //Seamon2//
    SeaMon2.direction = SeaMon2.rotation;//sync direction to rotation


    console.log(actualships)
    for (let i = 0; i < actualships.length; i++) {

        let MonsterShipDist = dist(actualships[i].x, actualships[i].y, SeaMon2.x, SeaMon2.y)


        if (MonsterShipDist < 1000) {
            SeaMon2.rotation -= 0;
            SeaMon2.rotateTowards(actualships[i], 0.1);
            SeaMon2.moveTowards(actualships[i], 0.02);
            leviathanFollowedShip = true;
            leviathanReachedLocation = false;


        } else if (leviathanFollowedShip === true && MonsterShipDist > 1500) {
            SeaMon2.rotateTowards(6000, 2000, 0.1);
            SeaMon2.moveTowards(6000, 2000, 0.02);



        } else if (leviathanReachedLocation = true) {
            SeaMon2.speed = 5;
            SeaMon2.rotation -= 0.2;

        } else if (SeaMon2.x < 6100 && SeaMon2.x > 5900 && SeaMon2.y < 2100 && SeaMon2.y > 1900) {
            leviathanFollowedShip = false;
            leviathanReachedLocation = true;
        }



    }


    lavaKraken.rotationLock = true;
    dukeFishron.rotationLock = true;

    //Lava Kraken//
    for (let i = 0; i < actualships.length; i++) {

        let MonsterShipDist = dist(actualships[i].x, actualships[i].y, lavaKraken.x, lavaKraken.y)


        if (MonsterShipDist < 1500 && actualships[i].overlapping(lavaZone) || actualships[i].overlapping(lavaZone2) || actualships[i].overlapping(lavaZone3)) {
            lavaKraken.speed = 0;
            lavaKraken.moveTowards(actualships[i], 0.05)
            // lavaKraken.img = lavaKrakenImage

            lavaKrakenFollowedShip = true;


        } else if (lavaKraken.x === -6300 && lavaKraken.y === -100) {
            lavaKraken.speed = 0;
            lavaKraken.moveTowards(-6300, -4000, 0.004)
            LavaKrakenRouteComplete = false;

        } else if (lavaKraken.x === -6300 && lavaKraken.y === -4000 && LavaKrakenRouteComplete === false) {
            lavaKraken.speed = 0;
            lavaKraken.moveTowards(1000, -4000, 0.002)

        } else if (lavaKraken.x === 1000 && lavaKraken.y === -4000) {
            lavaKraken.speed = 0;
            lavaKraken.moveTowards(-6300, -4000, 0.002)
            LavaKrakenRouteComplete = true;

        } else if (lavaKraken.x === -6300 && lavaKraken.y === -4000 && LavaKrakenRouteComplete === true) {
            lavaKraken.speed = 0;
            lavaKraken.moveTowards(-6300, -100, 0.004)

        } else if (lavaKrakenFollowedShip === true && MonsterShipDist > 1500) {
            lavaKraken.speed = 0;
            lavaKraken.moveTowards(-6300, -100, 0.004)
            lavaKrakenFollowedShip = false;
            LavaKrakenRouteComplete = false;
        }

    }


    //Duke Fishron//
    for (let i = 0; i < actualships.length; i++) {

        let MonsterShipDist = dist(actualships[i].x, actualships[i].y, dukeFishron.x, dukeFishron.y)


        if (MonsterShipDist < 2000 && actualships[i].overlapping(radiationZone)) {
            dukeFishron.rotation -= 0;

            dukeFishron.moveTowards(actualships[i], 0.02);
            dukeFishronFollowedShip = true;

        } else if (dukeFishron.x === -8000 && dukeFishron.y === 5297) {
            dukeFishron.speed = 0;
            dukeFishron.moveTowards(-5500, 2000, 0.01);


        } else if (dukeFishron.x === -5500 && dukeFishron.y === 2000) {
            dukeFishron.speed = 0;
            dukeFishron.moveTowards(-3400, 5297, 0.01);



        } else if (dukeFishron.x === -3400 && dukeFishron.y === 5297) {
            dukeFishron.speed = 0;
            dukeFishron.moveTowards(-8000, 5297, 0.01);




        } else if (dukeFishronFollowedShip === true && !actualships[i].overlapping(radiationZone)) {
            dukeFishron.speed = 0;
            dukeFishron.moveTowards(-8000, 5297, 0.02);
            dukeFishronFollowedShip = false;


        }





    }

    if (dukeFishron.direction < 90 && dukeFishron.direction > -90) {

        dukeFishron.img = dukeFishronImageRight;
    } else {
        dukeFishron.img = dukeFishronImageLeft;
    }


    monsterHpSystem();

}

function monsterHpSystem() {


    for (let monster of oceanCreatures) {

        let removeMonster = false;

        //Monster Regeneration//
        monster.hp += 2.5;

        if (monster.hp >= 10000) {
            monster.hp = 10000;
        }


        for (let health of monsterHealthBarComponents) {
            //console.log(health.idNum)


            if (health.idNum === monster.idNum) {
                health.collider = 'none';
                health.x = monster.x;
                health.y = monster.y - 50;
            }

            if (health.componentId === 'bar' && health.idNum === monster.idNum) {

                health.width = monster.hp / 20;
                //console.log(monster.maxHP)
                //console.log(monster.hp)

                if (monster.maxHP / 4 > monster.hp && health.idNum === monster.idNum) {
                    health.color = 'red';

                    if (monster.idNum === 2) {
                        if (monster.direction < 90 && monster.direction > -90) {

                            monster.img = dukeFishron2ImageRight;
                        } else {
                            monster.img = dukeFishron2ImageLeft;
                        }
                    }

                } else if (monster.maxHP / 1.5 > monster.hp && health.idNum === monster.idNum) {
                    health.color = 'yellow';


                    if (monster.idNum === 2) {
                        if (monster.direction < 90 && monster.direction > -90) {

                            monster.img = dukeFishron2ImageRight
                        } else {
                            monster.img = dukeFishron2ImageLeft
                        }
                    }

                }

            }
            if (health.componentId === 'background' && health.idNum === monster.idNum) {

                health.width = monster.maxHP / 20;
                //console.log(health.width)
            }


            for (let i = 0; i < oceanCreatures.length; i++) {
                if (oceanCreatures[i].hp < 100) {
                    removeMonster = true;

                    for (let health of monsterHealthBarComponents) {
                        if (health.componentId === 'bar' && health.idNum === oceanCreatures[i].idNum) {
                            health.width = 0;
                        }
                    }

                    console.log(monsterHealthBarComponents[i].width)
                    oceanCreatures[i].remove();
                    oceanCreatures.splice(i, 1)


                }
            }
        }


        for (let i = 0; i < monsterHealthBarComponents.length; i++) {

            if (monsterHealthBarComponents[i].width < 10 && removeMonster === true) {

                monsterHealthBarComponents[i].remove();
                monsterHealthBarComponents[i - 1].remove();
                monsterHealthBarComponents.splice(i - 1, 2)

            }
        }

        for (let i = 0; i < shots.length; i++) {
            if (shots[i].collides(monster)) {
                shots[i].remove();
                monster.hp -= 100;
            }

        }


        if (monster.hp <= 0) {
            monster.hp = 0;
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

let createMenu = true
function GUIE() {
    camera.off();
    // ui.color = 'orange';

    scrapMetalCounter.color = color(0, 0, 0, 0);
    scrapMetalCounter.textColor = 'white';
    scrapMetalCounter.stroke = color(255, 255, 255, 0);

    oilCounter.color = color(0, 0, 0, 0);
    oilCounter.textColor = 'white';
    oilCounter.stroke = color(255, 255, 255, 0);

    crystalCounter.color = color(0, 0, 0, 0);
    crystalCounter.textColor = 'white';
    crystalCounter.stroke = color(255, 255, 255, 0);


    if (createMenu) {
        buyScreen = new ui.Sprite(9000, 225, 400, 600, 'n')
        buyScreen.img = buyImg
        buyScreen.collider = 's'
        buyImg.resize(599, 1000)
        buyConstructor = new ui.Sprite(9000, 65, 200, 60)
        buyConstructor.colour = 'white '
        buyConstructor.text = 'constructor'
        buyConstructor.collider = 's'
        buyConstructor.textSize = 30
        buyRC = new ui.Sprite(9000, 65, 200, 60)
        buyRC.colour = 'white'
        buyRC.text = 'Resource Collector'
        buyRC.textSize = 20
        buyRC.collider = 's'
        buyBarracks = new ui.Sprite(9000, 205, 200, 60)
        buyBarracks.colour = 'white'
        buyBarracks.text = 'Barracks'
        buyBarracks.textSize = 30
        buyBarracks.collider = 's'
        buyScout = new ui.Sprite(9000, 65, 200, 60)
        buyScout.colour = 'white'
        buyScout.text = 'Scout'
        buyScout.textSize = 30
        buyScout.collider = 's'
        buyFigther = new ui.Sprite(9000, 205, 200, 60)
        buyFigther.colour = 'white'
        buyFigther.text = 'Fighter'
        buyFigther.textSize = 30
        buyFigther.collider = 's'
        buyDestroyer = new ui.Sprite(9000, 365, 200, 60)
        buyDestroyer.colour = 'white'
        buyDestroyer.text = 'Destroyer'
        buyDestroyer.textSize = 30
        buyDestroyer.collider = 's'
        buyRad = new ui.Sprite(9000, 65, 200, 60)
        buyRad.colour = 'white'
        buyRad.text = 'Rad Up'
        buyRad.textSize = 30
        buyRad.collider = 's'
        buyLava = new ui.Sprite(9000, 205, 200, 60)
        buyLava.colour = 'white'
        buyLava.text = 'Lava Up'
        buyLava.textSize = 30
        buyLava.collider = 's'
        launch = new ui.Sprite(9000, 205, 200, 60)
        launch.colour = 'white'
        launch.text = 'Rocket'
        launch.textSize = 30
        launch.collider = 's'

        createMenu = false

    }

    if (mothershipBase.mouse.pressed()) {
        buyScreen.x = 1750
        buyConstructor.x = 1750
        launch.x = 1750

    }
    if (mouse.pressed()) {
        if (!mothershipBase.mouse.pressed()) {
            buyScreen.x = 9000
            buyConstructor.x = 9000
            buyBarracks.x = 9000
            buyRC.x = 9000
            buyScout.x = 9000
            buyFigther.x = 9000
            buyDestroyer.x = 9000
            buyRad.x = 9000
            buyLava.x = 9000
            launch.x = 9000

        }
    }
    if (buyConstructor.mouse.pressed() && scrapMetalCounter.text > 99 && oilCounter.text > 49 && crystalCounter.text > 49) {
        makeship('constructor', 1500, 750)
        scrapMetalCounter.text -= 100
        oilCounter.text -= 50
        crystalCounter.text -= 50
    }

    if (constructorShipsClass.mouse.pressed()) {
        buyScreen.x = 1750
        buyBarracks.x = 1700
        buyRC.x = 1700

    }

    if (shipYard) {
        if (shipYard.mouse.pressed()) {
            buyScreen.x = 1750
            buyScout.x = 1700
            buyFigther.x = 1700
            buyDestroyer.x = 1700
        }

    }
    if (buyScout.mouse.presses() && scrapMetalCounter.text > 49 && oilCounter.text > 24) {
        makeship('scout', 1500, 750)
        scrapMetalCounter.text -= 50
        oilCounter.text -= 25
    }
    if (buyFigther.mouse.presses() && scrapMetalCounter.text > 99 && oilCounter.text > 49) {
        makeship('fighter', 1500, 750)
        scrapMetalCounter.text -= 100
        oilCounter.text -= 50
    }
    if (buyDestroyer.mouse.presses() && scrapMetalCounter.text > 199 && oilCounter.text > 99 && crystalCounter.text > 24) {
        makeship('destroyer', 1500, 750)
        scrapMetalCounter.text -= 200
        oilCounter.text -= 100
        crystalCounter.text -= 25

    }

    if (fighterShipsClass.mouse.pressed() || scoutShipsClass.mouse.pressed() || destroyerShipsClass.mouse.pressed()) {
        buyScreen.x = 1750
        buyRad.x = 1700
        buyLava.x = 1700
    }
    if (buyRad.mouse.presses() && crystalCounter.text > 299) {
        radUp = true
        crystalCounter.text -= 300

    }
    if (buyLava.mouse.presses() && scrapMetalCounter.text > 299) {
        lavaUp = true
        scrapMetalCounter.text -= 300
    }
    if(launch.mouse.pressed( ) && scrapMetalCounter.text > 2){
        rocket = new Sprite(mothership.x,mothership.y)
        rocket.collider = 'n'
        rocket.img = rocketImg
    }
    ui.draw();

}



function gameInterface() {
    ui = new Group();

    resourceBackground = new ui.Sprite(-100, -100, 100, 400, 'n');
    resourceBackground.img = buyImg;

    //ScrapMetal//
    scrapMetalCounterImage = new ui.Sprite(35, 35, 30, 40, 'n');
    scrapMetalCounterImage.img = metalImage;

    scrapMetalCounter = new ui.Sprite(85, 40, 30, 40, 'n');
    scrapMetalCounter.textSize = 25
    scrapMetalCounter.text = 400

    //Oil//
    oilCounterImage = new ui.Sprite(35, 105, 30, 40, 'n');
    oilCounterImage.img = oilImage;

    oilCounter = new ui.Sprite(85, 105, 30, 40, 'n');
    oilCounter.textSize = 25
    oilCounter.text = 200

    //Crystal//
    crystalCounterImage = new ui.Sprite(35, 170, 30, 40, 'n');
    crystalCounterImage.img = crystalImage;

    crystalCounter = new ui.Sprite(85, 172, 30, 40, 'n');
    crystalCounter.textSize = 25
    crystalCounter.text = 150




}

function zoom() {
    scrollNumber = 0
    camera.zoomTo(scrollZoomLevel)

    camera.on();
    drawAllSpritesExcept();
    if (kb.pressing('arrowleft') && camera.x > -7100) {
        camera.x = camera.x - 10
    }
    if (kb.pressing('arrowright') && camera.x < 10200) {
        camera.x = camera.x + 10
    }
    if (kb.pressing('arrowup') && camera.y > -6961) {
        camera.y = camera.y - 10
    }
    if (kb.pressing('arrowdown') && camera.y < 6700) {
        camera.y = camera.y + 10
    }
    camera.off();
    ui.draw();
    ui.layer = 9999

    //console.log(camera.x, camera.y)

    if (camera.x <= -4950) {
        camera.x = -4950
    }
    if (camera.x >= 6870) {
        camera.x = 6870
    }


    if (camera.y <= -2800) {
        camera.y = -2800
    }
    if (camera.y >= 3900) {
        camera.y = 3900
    }

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


    if (mouse.released() && gameHasLoaded === true)
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

    for (let resourceStation of resourceStations) {
        if (resourceStationSpawned === true) {
            //ScrapMetal
            for (let i = 0; i < scrapMetalResourceNodes.length; i++) {
                let c = dist(resourceStation.x, resourceStation.y, scrapMetalResourceNodes[i].x, scrapMetalResourceNodes[i].y)
                if (c < 400) {
                    if (frameCount % 60 === 0) {
                        scrapMetalCounter.text++
                    }

                }
            }

            //Oil
            for (let i = 0; i < oilResourceNodes.length; i++) {
                let c = dist(resourceStation.x, resourceStation.y, oilResourceNodes[i].x, oilResourceNodes[i].y)
                if (c < 400) {
                    if (frameCount % 60 === 0) {
                        oilCounter.text++
                    }

                }
            }

            //Crystal
            for (let i = 0; i < crystalResourceNodes.length; i++) {
                let c = dist(resourceStation.x, resourceStation.y, crystalResourceNodes[i].x, crystalResourceNodes[i].y)
                if (c < 400) {
                    if (frameCount % 60 === 0) {
                        crystalCounter.text++
                    }

                }
            }

        }
    }


}

async function resourceCollection() {


    for (let selectedship of actualships) {

        if (selectedship.shipclass === 'constructor') {
            if (selectedship.mouse.pressed()) {
                selectedship.clicked = true

            }
            else if (!selectedship.mouse.pressed() && !selectedship.clicked) {
                selectedship.clicked = false

            }
            if (mouse.pressed() && !selectedship.mouse.pressed()) {
                selectedship.clicked = false

            }


            //ScrapMetal
            for (let i = 0; i < scrapMetalResourceNodes.length; i++) {
                for (let i = 0; i < scrapMetalResourceNodes.length; i++) {

                    let d = dist(selectedship.x, selectedship.y, scrapMetalResourceNodes[i].x, scrapMetalResourceNodes[i].y)
                    if (d < 400 && buyRC.mouse.pressed() && scrapMetalCounter.text > 199) {
                        resourceStation = new Sprite(selectedship.x, selectedship.y, 50, 50)
                        resourceStation.collider = 'd'
                        resourceStation.img = oilRig
                        oilRig.resize(248, 338)
                        resourceStationSpawned = true;
                        scrapMetalCounter.text -= 200

                        selectedship.hp = 0;
                        for (let health of healthBarComponents) {
                            if (health.componentId === 'bar' && health.idNum === selectedship.idNum) {
                                health.width = 0;
                            }
                        }
                        selectedship.remove();
                        resourceStations.push(resourceStation)
                    }


                }
            }

            //Oil
            for (let i = 0; i < oilResourceNodes.length; i++) {
                for (let i = 0; i < oilResourceNodes.length; i++) {

                    let d = dist(selectedship.x, selectedship.y, oilResourceNodes[i].x, oilResourceNodes[i].y)
                    if (d < 400 && buyRC.mouse.pressed() && scrapMetalCounter.text > 199) {
                        resourceStation = new Sprite(selectedship.x, selectedship.y)
                        resourceStation.collider = 'static'
                        resourceStation.img = oilRig
                        resourceStation.debug = true
                        oilRig.resize(248, 338)
                        resourceStationSpawned = true
                        scrapMetalCounter.text -= 200

                        selectedship.hp = 0;
                        for (let health of healthBarComponents) {
                            if (health.componentId === 'bar' && health.idNum === selectedship.idNum) {
                                health.width = 0;
                            }
                        }
                        selectedship.remove()
                        resourceStations.push(resourceStation)
                    }


                }
            }

            //Crystal
            for (let i = 0; i < crystalResourceNodes.length; i++) {
                for (let i = 0; i < crystalResourceNodes.length; i++) {

                    let d = dist(selectedship.x, selectedship.y, crystalResourceNodes[i].x, crystalResourceNodes[i].y)
                    if (d < 400 && buyRC.mouse.pressed() && scrapMetalCounter.text > 199) {
                        resourceStation = new Sprite(selectedship.x, selectedship.y)
                        resourceStation.collider = 'static'
                        resourceStation.img = oilRig
                        oilRig.resize(248, 338)
                        resourceStationSpawned = true
                        scrapMetalCounter.text -= 200

                        selectedship.hp = 0;
                        for (let health of healthBarComponents) {
                            if (health.componentId === 'bar' && health.idNum === selectedship.idNum) {
                                health.width = 0;
                            }
                        }
                        selectedship.remove()
                        resourceStations.push(resourceStation)
                    }


                }
            }

            if (selectedship.clicked) {
                if (buyBarracks.mouse.presses() && scrapMetalCounter.text > 249) {
                    console.log(selectedship)
                    shipYard = new Sprite(selectedship.x, selectedship.y, 200, 200)
                    shipYard.collider = 's'
                    shipYard.img = barrackImg

                    selectedship.hp = 0;
                    for (let health of healthBarComponents) {
                        if (health.componentId === 'bar' && health.idNum === selectedship.idNum) {
                            health.width = 0;
                        }
                    }

                    selectedship.remove();
                    shipYards.push(shipYard)
                    scrapMetalCounter.text -= 250
                    selectedship.clicked = false
                    shipYard.debug = true
                }
            }


        }
    }

    await delay(999999999999999)
    gameLoaded();

}


function hpsystem() {

    for (let selectedship of actualships) {
        // console.log(selectedship.hp)
        //console.log(selectedship.idNum)

        let removeShip = false;


        for (let health of healthBarComponents) {
            //console.log(health.idNum)


            if (health.idNum === selectedship.idNum) {
                health.collider = 'none';
                health.x = selectedship.x
                health.y = selectedship.y - 60
            }

            if (health.componentId === 'bar' && health.idNum === selectedship.idNum) {

                health.width = selectedship.hp;
                //console.log(selectedship.maxHP)
                //console.log(selectedship.hp)

                if (selectedship.maxHP / 4 > selectedship.hp && health.idNum === selectedship.idNum) {
                    health.color = 'red';

                    if (selectedship.shipclass === 'scout') {
                        selectedship.img = damagedScoutShipimg
                        for (let cannon of smallCan) {
                            if (cannon.idNum === selectedship.idNum) {
                                cannon.img = damagedCannonImage
                            }
                        }
                    }

                    if (selectedship.shipclass === 'fighter') {
                        selectedship.img = damagedFighterShipimg
                        for (let cannon of smallCan2) {
                            if (cannon.idNum === selectedship.idNum) {
                                cannon.img = damagedCannonImage
                            }
                        }
                    }

                    if (selectedship.shipclass === 'destroyer') {
                        selectedship.img = damagedDestroyerShipimg


                    }






                } else if (selectedship.maxHP / 1.5 > selectedship.hp && health.idNum === selectedship.idNum) {
                    health.color = 'yellow';
                }

            }
            if (health.componentId === 'background' && health.idNum === selectedship.idNum) {

                health.width = selectedship.maxHP;
                //console.log(health.width)
            }




            for (let i = 0; i < actualships.length; i++) {
                if (actualships[i].hp < 0.6) {
                    removeShip = true;
                    if (health.componentId === 'bar' && health.idNum === selectedship.idNum) {
                        health.width = 0;
                    }
                    actualships[i].remove();
                    actualships.splice(i, 1)


                }
            }
        }


        for (let i = 0; i < healthBarComponents.length; i++) {

            if (healthBarComponents[i].width < 2.1 && removeShip === true) {
                healthBarComponents[i].remove();
                healthBarComponents[i - 1].remove();
                healthBarComponents.splice(i - 1, 2)

            }
        }


        for (let monster of oceanCreatures) {
            if (selectedship.collides(monster)) {

                console.log('WERE HIT ', selectedship.hp)

                selectedship.hp -= 2;
            }
        }



        if (selectedship.hp <= 0) {
            selectedship.hp = 0;
        }

        if (selectedship.overlapping(radiationZone)) {
            selectedship.hp -= 0.25;
            //console.log(selectedship.hp)
        }
        if (selectedship.overlapping(lavaZone) || selectedship.overlapping(lavaZone2) || selectedship.overlapping(lavaZone3) && lavaUp === false) {
            selectedship.hp -= 0.25;
            //console.log(selectedship.hp)
        }



    }


}


function Zones() {
    if (zoneSpawned === false) {

        //LAVA//
        lavaZone = new Sprite(-5850, -1650, 5575, 6375, 'n');
        lavaZone.color = color(220, 0, 0, 0);
        lavaZone.visible = false;

        lavaZone2 = new Sprite(-165, -3425, 5780, 2805, 'n');
        lavaZone2.color = color(220, 0, 0, 0);
        lavaZone2.visible = false;

        lavaZone3 = new Sprite(8350, -2320, 4390, 4990, 'n');
        lavaZone3.color = color(220, 0, 0, 0);
        lavaZone3.visible = false;












        //RADIATION//
        radiationZone = new Sprite(-5650, 3825, 5970, 4160, 'n');
        radiationZone.color = color(0, 0, 0, 0);
        radiationZone.visible = false;


        zoneSpawned = true;




    }

}



