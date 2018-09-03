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

  // Firstly, check if addHitRegion is enabled.
  // If not, show error, then return and don't go any further.
  if ( typeof canvas.getContext('2d').addHitRegion != "function") { 
      handleHitRegionError();
      return;
  }

  // Create the shapeManager, and pass in the SessionStorage, 
  // the shape ID generator, and random point generator.
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
          }
        );

  addCanvasEventHandlers(eventHandler);
  addDomEventHandlers(eventHandler);

  eventHandler.init(); // request the initial draw to run.

};

window.onload = load; 


// Bind the mouse events on the canvas to the eventHandler
function addCanvasEventHandlers(eventHandler) {
  canvas.addEventListener('mousemove', function(event){ eventHandler.onMouseMove(event); });
  canvas.addEventListener('mousedown', function(event){ eventHandler.onMouseDown(event); });
  canvas.addEventListener('mouseup',   function(event){ eventHandler.onMouseUp(event);   });
}

// Bind the mouse events on the DOM to the eventHandler
function addDomEventHandlers(eventHandler) {
  // Handle changes to the rotation slider and pass them to the eventHandler
  rotateInput.addEventListener("input", function() {
          document.getElementById("rotateValue").textContent = rotateInput.value;
          eventHandler.rotateShape(rotateInput.value);
  }, false);

  // Handle changes to the scale slider and pass them to the eventHandler
  scaleInput.addEventListener("input", function() {
          document.getElementById("scaleValue").textContent = scaleInput.value;
          eventHandler.scaleShape(scaleInput.value);
  }, false);

  // Handle clicks of the delete button and pass them to the eventHandler
  deleteInput.addEventListener("click", function() {
          eventHandler.deleteShape();
          toolsPanel.style.visibility = "hidden";
  }, false);

  // Handle clicks of the create panel "Triangle" button and pass them to the eventHandler
  newTriangle.addEventListener("click", function() {
          eventHandler.createShape("TRIANGLE");
  }, false);

  // Handle clicks of the create panel "Square" button and pass them to the eventHandler
  newSquare.addEventListener("click", function() {
          eventHandler.createShape("SQUARE");
  }, false);

  // Handle clicks of the create panel "Circle" button and pass them to the eventHandler
  newCircle.addEventListener("click", function() {
          eventHandler.createShape("CIRCLE");
  }, false);

  // Handle clicks of the create panel "Star" button and pass them to the eventHandler
  newStar.addEventListener("click", function() {
          eventHandler.createShape("STAR");
  }, false);  

}

// callback to show error message when ES feature "canvas.context.addHitRegion" is not enabled.
function handleHitRegionError(){ 
    errorPanel.style.visibility = "visible";
    console.error("canvas.context.addHitRegion is not enabled. " +
                    "Please see readme.");
}

