import {Point, RandomPointGenerator} from './shapes.mjs';
import {ShapeManager} from './shapeManager.mjs';
import {RandomIdGenerator} from './randomId.mjs';
import {EventHandler} from './eventHandler.mjs';


const load = () => {
  let canvas=document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let errorPanel = document.getElementById("errorPanel");
  let toolsPanel = document.getElementById("toolsPanel");
  let rotateValue = document.getElementById("rotateValue");
  let rotateInput = document.getElementById("rotateInput");
  let scaleValue = document.getElementById("scaleValue");
  let scaleInput = document.getElementById("scaleInput");

  // Create the shapeManager, and pass in the SessionStorage, 
  // the shape ID generator, and andom point generator.
  let shapeManager = new ShapeManager(
                            sessionStorage, 
                            RandomIdGenerator,
                            new RandomPointGenerator(0,canvas.width, 0, canvas.height));

  // Create the EventHandler, and pass in the canvas reference,
  // as well as two callbacks for managing the tools pallete.
  // This is because the EventHander is designed to run with no access to the DOM.
  let eventHandler = new EventHandler(
          shapeManager, 
          canvas,

          // Callback to update the toolsPanel when a new shape is selected
          function(size, rotation){ 
              toolsPanel.style.visibility = "visible";
              scaleInput.value = size;
              scaleValue.textContent = scaleInput.value;
              rotateInput.value = rotation;
              rotateValue.textContent = rotateInput.value;
          },

          // Callback to hide toolsPanel when shape is de-selected.
          function(){
              toolsPanel.style.visibility = "hidden";
          },

          // callback to show error message when ES feature "canvas.context.addHitRegion" is not enabled.
          function(){ 
              errorPanel.style.visibility = "visible";
              console.error("canvas.context.addHitRegion is not enabled. " 
                  + "Please see readme.")
          }
        );

  eventHandler.init(); // request the initial draw to run.

  canvas.addEventListener('mousemove', function(event){ eventHandler.onMouseMove(event); });
  canvas.addEventListener('mousedown', function(event){ eventHandler.onMouseDown(event); });
  canvas.addEventListener('mouseup',   function(event){ eventHandler.onMouseUp(event);   });

  rotateInput.addEventListener("input", function() {
          document.getElementById("rotateValue").textContent = rotateInput.value;
          eventHandler.rotateShape(rotateInput.value);
  }, false);

  scaleInput.addEventListener("input", function() {
          document.getElementById("scaleValue").textContent = scaleInput.value;
          eventHandler.scaleShape(scaleInput.value);
  }, false);

  deleteInput.addEventListener("click", function() {
          eventHandler.deleteShape();
          toolsPanel.style.visibility = "hidden";
  }, false);

  newTriangle.addEventListener("click", function() {
          eventHandler.createShape("TRIANGLE");
  }, false);

  newSquare.addEventListener("click", function() {
          eventHandler.createShape("SQUARE");
  }, false);

  newCircle.addEventListener("click", function() {
          eventHandler.createShape("CIRCLE");
  }, false);

  newStar.addEventListener("click", function() {
          eventHandler.createShape("STAR");
  }, false);

};

window.onload = load; 
