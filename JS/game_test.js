"use strict";

let CanvasWidth= 1200;
let CanvasHeight= 700;
function setup(){
    
    createCanvas(CanvasWidth,CanvasHeight);
}

function draw(){
    let recWidth= 200;
    let recHeight= 100;
    let recCentWidth= CanvasWidth/2-recWidth/2;
    let recCenHeight= CanvasHeight/2-recHeight/2;
    let textWidthcent= CanvasWidth/2-64
    let textHeightcent= CanvasHeight/2+32
    
    background(120,120,120);
    fill(255,255,255);
    rect (mouseX, mouseY, recWidth, recHeight, 10);
    fill(255,0,0);
    textSize(20);
    textStyle (BOLD);
    text("MouseX + MouseY", textWidthcent, textHeightcent);
   console.log(mouseX, mouseY);

}