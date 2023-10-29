"use strict";

let canWith= 1600;
let canHight= 800;
function setup(){
    
    createCanvas(canWith,canHight);
}

function draw(){
    let recWith= 200;
    let recHight= 100;
    let recCentwith= canWith/2-recWith/2;
    let recCenhight= canHight/2-recHight/2;
    let textWithcent= canWith/2-64
    let textHightcent= canHight/2+32
    
    background(120,120,120);
    fill(255,255,255);
    rect (recCentwith, recCenhight, recWith, recHight, 10);
    fill(255,0,0);
    textSize(20);
    textStyle (BOLD);
    text("MouseX + MouseY", textWithcent, textHightcent);
  

}