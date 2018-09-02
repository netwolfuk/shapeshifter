import {Triangle, Square, Circle, Star} from './shapes.mjs';

export class ShapeManager {

  constructor (storage, idGenerator, locationRandomiser) {
    this.shapes = new Map();
    this.idGenerator = idGenerator;
    this.storage = storage;
    this.locationRandomiser = locationRandomiser;
    this.selectedShape = null;
    if(this.storage.getObject("shapes")){
      this.shapes = this.deserialiaseShapes(objToStrMap(this.storage.getObject("shapes")));
    } else {
      this.createInitialShapes();
    }
  }

  persistLocations() {
    this.storage.setObject("shapes", this.shapes);
  }

  redrawAll(canvasWidth, canvasHeight, ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let item of this.getAll()) {
      if (this.selectedShape === item.id) {
        item.select(true, ctx);
      } else {
        item.select(false,ctx);
      }
    }
  }

  getAll() {
    return this.shapes.values();
  }

  getItem(id) {
    return this.shapes.get(id);
  }

  getSelected() {
    return this.getItem(this.selectedShape);
  }

  selectShape(id, ctx) {
    this.selectedShape = id;
    this.persistLocations();
  }

  rotateSelected(degrees) {
    this.getItem(this.selectedShape).rotation = degrees;
  }

  scaleSelected(size) {
    this.shapes.get(this.selectedShape).size = size;
  }

  deleteSelected() {
    this.shapes.delete(this.selectedShape);
    this.selectedShape = null;
    this.persistLocations();
  }

  createInitialShapes() {
    let triId = this.idGenerator.randomId();
    this.shapes.set(triId, this.newTriangle(triId));
    
    let squId = this.idGenerator.randomId();
    this.shapes.set(squId, this.newSquare(squId));

    let circId = this.idGenerator.randomId();
    this.shapes.set(circId, this.newCircle(circId));

    let starId = this.idGenerator.randomId();
    this.shapes.set(starId, this.newStar(starId));

    this.persistLocations();
  }

  createShape(type) {
    let id = this.idGenerator.randomId();
    switch(type) {
      case "TRIANGLE":
        this.shapes.set(id, this.newTriangle(id));
        break;
      case "SQUARE":
        this.shapes.set(id, this.newSquare(id));
        break;
      case "CIRCLE":
        this.shapes.set(id, this.newCircle(id));
        break;
      case "STAR":
        this.shapes.set(id, this.newStar(id));
        break;                        
    }
    this.persistLocations();
    this.selectedShape = id;
  }

  deserialiaseShapes(object) {
    let shapes = new Map();
    if (object instanceof Map) {
      for (let item of object.values()) {
        if (item.type === 'TRIANGLE') {
          shapes.set(item.id, new Triangle(item));
        } else if (item.type === 'SQUARE') {
          shapes.set(item.id, new Square(item));        
        } else if (item.type === 'CIRCLE') {
          shapes.set(item.id, new Circle(item));        
        } else if (item.type === 'STAR') {
          shapes.set(item.id, new Star(item));        
        }
      }
    }
    return shapes;
  }

  newTriangle(id){
    let p = this.locationRandomiser.create();
    return new Triangle({"id": id, 'x':p.x, 'y':p.y, 'size':100, 'rotation': 0});
  }

  newSquare(id){
    let p = this.locationRandomiser.create();
    return new Square({"id": id, 'x':p.x, 'y':p.y, 'size':100, 'rotation': 0});
  }

  newCircle(id){
    let p = this.locationRandomiser.create();
    return new Circle({"id": id, 'x':p.x, 'y':p.y, 'size':100, 'rotation': 0});
  }

  newStar(id){
    let p = this.locationRandomiser.create();
    return new Star({"id": id, 'x':p.x, 'y':p.y, 'size':100, 'rotation': 0});
  }

}

// Serialisation of Maps to JSON needs an extra step.
// http://2ality.com/2015/08/es6-map-json.html

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k] = v;
    }
    return obj;
}
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

// Extend the "Storage" system to use JSON for persist and read.
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(strMapToObj(value)));
}

Storage.prototype.getObject = function(key) {
  return JSON.parse(this.getItem(key));
}