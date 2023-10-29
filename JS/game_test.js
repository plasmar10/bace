"use strict";

let backgroundImage;
let CanvasWidth = 1200;
let CanvasHeight = 700;
function setup() {

    createCanvas(1920, 1080);
}

function draw() {
    backgroundImage = loadImage("../assets/image.png");

    background(120, 120, 120);
    image(backgroundImage, 0, 0, CanvasWidth, CanvasHeight);

    let recWidth = 200;
    let recHeight = 100;

    fill(255, 255, 255);
    rect(mouseX - recWidth / 2, mouseY - recHeight / 2, recWidth, recHeight, 10);
    fill(255, 0, 0);
    textSize(20);
    textStyle(BOLD);
    text("X: " + mouseX + "   Y: " + mouseY, mouseX - 67, mouseY + 8);
    console.log(mouseX, mouseY);



    for (let i = 0; i < 9; i++) {
        rect(100+i*50, 100+i*50, 100, 100)
    }



}