// eventHandler.test.js

// Import class under test.
import {EventHandler} from '../js/eventHandler.mjs';

// Import some faked classes, which behaive as expected for testing.
import {FakeShapeManager, FakeCanvas} from './testing-fakes.mjs';

// tests use the chai assert (TDD) style checks, so import them here.
var assert = chai.assert;
var expect = chai.expect;

describe('EventHandler move (mouse event) tests', function () {

  let shapeManager = FakeShapeManager.getSpy();
  let canvas = FakeCanvas.getSpy();
  let shapeSelectedCallBack = sinon.fake();
  let shapeUnSelectedCallBack = sinon.fake();

  // Create an instance of EventHander, and pass in the fakes and spies.
  let eventHandler = new EventHandler(shapeManager, canvas, shapeSelectedCallBack, shapeUnSelectedCallBack);  
  eventHandler.init();
  
  // Run the tests. These tests assume they will be run in the order specified.
  it('eventHandler.onMouseMove by itself should have no interaction with shapeManager', function () {
    var event = { };    // event has no region, which means it was not over a shape.
    eventHandler.onMouseMove(event);
    assert(shapeManager.redrawAll.calledOnce); // called by init only.
    assert(!eventHandler.isDragging);
  });

  it('MouseDown, MouseMove is a drag, and then MouseUp stops dragging', function () {
    var event = { region : "test01" };
    assert.equal(shapeManager.redrawAll.callCount, 1);  // called by init only.

    eventHandler.onMouseDown(event);
    assert.equal(shapeManager.redrawAll.callCount, 2);  // causes redraw

    eventHandler.onMouseMove(event);
    assert.equal(shapeManager.redrawAll.callCount, 3);  // causes redraw
    assert(eventHandler.isDragging);

    eventHandler.onMouseUp(event);
    assert.equal(shapeManager.redrawAll.callCount, 4);  // causes redraw
    assert(!eventHandler.isDragging);         // no longer dragging.

  });

});


describe('EventHandler rotate,scale,delete,create tests', function () {

  let shapeManager = FakeShapeManager.getSpy();
  let canvas = FakeCanvas.getSpy();
  let shapeSelectedCallBack = sinon.fake();
  let shapeUnSelectedCallBack = sinon.fake();

  // Create an instance of EventHander, and pass in the fakes and spies.
  let eventHandler = new EventHandler(shapeManager, canvas, shapeSelectedCallBack, shapeUnSelectedCallBack);  
  eventHandler.init();
  
  // Run the tests. These tests assume they will be run in the order specified.
  it('eventHandler will call shapeManager.redrawAll on init(), but only once', function () {
    assert(shapeManager.redrawAll.calledOnce);
  });

  it('eventHandler.rotateShape will call shapeManager.rotateSelected and then shapeManager.redrawAll again', function () {
    eventHandler.rotateShape(10);
    assert(shapeManager.rotateSelected.calledOnceWith(10));
    assert(shapeManager.redrawAll.calledTwice);
  }); 

  it('eventHandler.scaleShape will call shapeManager.scaleSelected and then shapeManager.redrawAll again', function () {
    eventHandler.scaleShape(20);
    assert(shapeManager.scaleSelected.calledOnceWith(20));
    assert(shapeManager.redrawAll.calledThrice);
  }); 

  it('eventHandler.deleteShape will call shapeManager.deleteSelected and then shapeManager.redrawAll again', function () {
    eventHandler.deleteShape();
    assert(shapeManager.deleteSelected.calledOnce);
    assert.equal(shapeManager.redrawAll.callCount, 4);
  }); 

  it('eventHandler.createShape will call shapeManager.createShaoe and then shapeManager.redrawAll again', function () {
    eventHandler.createShape("TRIANGLE");
    assert(shapeManager.createShape.calledOnce);
    assert.equal(shapeManager.redrawAll.callCount, 5);
  }); 

});