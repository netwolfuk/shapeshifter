// shapeManager.test.js

// Import class under test.
import {ShapeManager} from '../js/shapeManager.mjs';

// Import classes needed by test.
import {RandomIdGenerator} from '../js/randomId.mjs';

// Import some faked classes, which behaive as expected for testing.
import {FakeRandomPointGenerator, FakeRandomIdGenerator, FakeSessionStorage} from './testing-fakes.mjs';

// tests use the chai assert (TDD) style checks, so import them here.
var assert = chai.assert;

describe('ShapeManager (with null storage)', function () {

  	let fakeSessionStorage = new FakeSessionStorage(null);
	let shapeManager = new ShapeManager(
	                            fakeSessionStorage, 
	                            RandomIdGenerator,
	                            new FakeRandomPointGenerator()
	                        );

  it('storage should be persisted to only once', function () {
	assert.strictEqual(1, fakeSessionStorage.getCounter());
  });	

  it('null storage should generate four default shapes', function () {

  	let items = Array.from(shapeManager.getAll());
	assert.strictEqual(items.length, 4);

	assert.strictEqual(items[0].type, "TRIANGLE");
	assert.strictEqual(items[1].type, "SQUARE");
	assert.strictEqual(items[2].type, "CIRCLE");
	assert.strictEqual(items[3].type, "STAR");
  	
  });

});


// Note, the following test assumed that 
// the tests will run in order.
describe('ShapeManager (with empty storage)', function () {
	let emptyStorage = {};
  	let fakeSessionStorage = new FakeSessionStorage(emptyStorage);
	let shapeManager = new ShapeManager(
	                            fakeSessionStorage, 
	                            FakeRandomIdGenerator,
	                            new FakeRandomPointGenerator()
	                        );

  it('empty storage should not be persisted to as 0 new items will have been created', function () {
	assert.strictEqual(0, fakeSessionStorage.getCounter());
  });	

  it('empty storage should contain no shapes', function () {
  	let items = Array.from(shapeManager.getAll());
	assert.strictEqual(items.length, 0);
  	
  });

  it('creating new item causes storage hit', function () {
  	shapeManager.createShape('TRIANGLE');
	assert.strictEqual(1, fakeSessionStorage.getCounter());
  });

  it('newly created shape is triangle', function () {
  	let shape = shapeManager.getItem(FakeRandomIdGenerator.randomId());
	assert.strictEqual(shape.type, 'TRIANGLE');
  });

});