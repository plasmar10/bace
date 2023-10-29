"use strict";


function setup() {
    createCanvas(1920, 1076);
}

function draw() {
    tests()
    ocean()
    mothership()
}

function tests() {
    background(120, 120, 120);

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

function ocean() {





    
}



function mothership() {

}