// shapes.test.js


import {Triangle,Circle,Square,Star} from '../js/shapes.mjs';


let triangleRotate = new Triangle( { "id" : "triangleRotate01", "x": 25, "y":25, "size": 20, "rotation": 45 });
let circleRotate = new Circle( { "id" : "circleRotate01", "x": 75, "y":25, "size": 20, "rotation": 45 });
let squareRotate = new Square( { "id" : "squareRotate01", "x": 125, "y":25, "size": 20, "rotation": 45 });
let starRotate = new Star( { "id" : "starRotate01", "x": 175, "y":25, "size": 20, "rotation": 45 });

let circleMove = new Circle( { "id" : "circleMove01", "x": 25, "y":25, "size": 20, "rotation": 45 });

let canvasRotate=document.getElementById("test-rotate-canvas");
let ctxRotate = canvasRotate.getContext('2d');

let canvasMove=document.getElementById("test-move-canvas");
let ctxMove = canvasMove.getContext('2d');

let degrees = -180;
let move = -25;

let timerId = setInterval(function() {
  ctxRotate.clearRect(0, 0, canvasRotate.width, canvasRotate.height);
  ctxMove.clearRect(0, 0, canvasMove.width, canvasMove.height);
  if (degrees == 180) {
    degrees = -180;
  }

  if (move == 225) {
    move = -25;
  }

  triangleRotate.rotation = degrees;
  triangleRotate.draw(ctxRotate);
  circleRotate.rotation = degrees;
  circleRotate.draw(ctxRotate);
  squareRotate.rotation = degrees;
  squareRotate.draw(ctxRotate);
  starRotate.rotation = degrees;
  starRotate.draw(ctxRotate);
  degrees++;

  circleMove.x = move;
  circleMove.draw(ctxMove);
  move++;

}, 10);
