import {Point, Triangle} from '../js/shapes.mjs';

// Fake which always returns 100, 100
export class FakeRandomPointGenerator {
  create() {
      return new Point(100,100);
  }
}

// Fake which always returns the same ID.
export class FakeRandomIdGenerator {
  static randomId() {
    return '_12345678';
  }
}

export class FakeSessionStorage {
  constructor(object) {
  this.counter = 0;
  this.object = object;
  }
  getObject() {
    return this.object;
  }
  setObject(object) {
    this.counter++;
  }

  getCounter(){
    return this.counter;
  }
}

export class FakeShapeManager {
  static getSpy() {
    var item = { mouseOver : sinon.spy(), drag: sinon.spy(), size: sinon.spy() };
    let shapeManager = {
            redrawAll: sinon.spy(),
            rotateSelected : sinon.spy(),
            scaleSelected : sinon.spy(),
            deleteSelected : sinon.spy(),
            createShape : sinon.spy(),
            getItem : function(id) {  return item; },
            selectShape: sinon.spy(),
            persistLocations: sinon.spy(),
            getSelected: function(id) { return item; }
    };
    return shapeManager;
  }
}

export class FakeCanvas {
  static getSpy() {
    let ctx = sinon.fake();
    let canvas = { getContext: function(){}};
    let getContextStub = sinon.stub(canvas, 'getContext').returns(ctx);
    return canvas;
  }
}