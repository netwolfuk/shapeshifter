export class EventHandler {

  constructor (shapeManager, canvas, shapeSelectedCallBack, shapeUnSelectedCallBack) {
  	this.shapeManager = shapeManager;
  	this.canvas = canvas;
  	this.ctx = canvas.getContext('2d');
    this.shapeId = null;
    this.isOverShape = false;
    this.isDragging = false;
    this.shapeSelectedCallBack = shapeSelectedCallBack;
    this.shapeUnSelectedCallBack = shapeUnSelectedCallBack;

    // Set some defaults.
    this.ctx.fillStyle = "#ffff00";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 5;

  }
  
  init() {
    this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
  }

  onMouseMove(event) {
    if (this.isDragging) {
        this.shapeManager.getItem(this.shapeId).drag(event.pageX, event.pageY, this.ctx);
        this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
        this.shapeManager.getItem(this.shapeId).mouseOver(this.ctx);
    } else if(event.region && ! this.isOverShape) {
        this.isOverShape = true;
        this.shapeManager.getItem(event.region).mouseOver(this.ctx);

    // TODO: handle case where we're moving from one overlapping shape to another.
    } else if(event.region && this.isOverShape) {  // don't do anything. We are moving over the shape.

    } else if (this.isOverShape) { // We have moused out of a shape.
        this.isOverShape = false;
        this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
      
    }
  }

  onMouseDown(event) {
    if(event.region) {
      this.isDragging = true;
      this.shapeId = event.region;
      this.shapeManager.selectShape(this.shapeId, this.ctx);
      this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
    } else if (this.shapeId) {
      this.shapeId = null;
      this.shapeManager.selectShape(this.shapeId, this.ctx);
      this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
    }
  }

  onMouseUp(event) {
    if (this.isDragging) {
      this.shapeManager.getItem(this.shapeId).mouseOver(this.ctx);
      this.shapeManager.persistLocations();
    }
    this.isDragging = false;
    if (event.region === this.shapeId) {
      this.shapeManager.selectShape(this.shapeId, this.ctx);
      
    } 
    this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
    if (this.shapeId) {
      let shape = this.shapeManager.getSelected();
      this.shapeSelectedCallBack(shape.size, shape.rotation);
    } else {
      this.shapeUnSelectedCallBack();
    }
  }

  rotateShape(degrees) {
    this.shapeManager.rotateSelected(degrees);
    this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
  }

  scaleShape(size) {
    this.shapeManager.scaleSelected(size);
    this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
  }

  deleteShape() {
    this.shapeManager.deleteSelected();
    this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx);
  }

  createShape(type) {
    this.shapeManager.createShape(type);
    this.shapeManager.redrawAll(this.canvas.width, this.canvas.height, this.ctx); 
  }
}