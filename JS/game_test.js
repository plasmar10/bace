"use strict";

let oceanBackground;

function preload(){
    oceanBackground = loadImage("./assets/Ocean.gif")
}

function setup() {
    createCanvas(1920, 1076);
}

function draw() {
    tests()
    ocean()

}

function tests() {
    background(120, 120, 120);
    image(oceanBackground, 0, 0, width, height)

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

image




}