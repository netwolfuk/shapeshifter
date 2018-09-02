# ShapeShifter : An ES2015 SPA for shifting shapes around

## Requirements for running the app:
Due to the features used in this app, namely `canvas.context.addHitRegion`, this specific ES2015 feature must be enabled in your browser for the application to work.

#### Enabling hit regions
- Chrome hit regions:  Go to `chrome://flags`, and enble **Experimental Web Platform features**
- Firefox hit regions: Go to to `about:config`, enable **canvas.hitregions.enabled**

More information about hit regions, and minimum browser requirements is available at: [CanvasRenderingContext2D.addHitRegion][https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/addHitRegion#Browser_compatibility].

#### Running the app
- Navigate to https://netwolfuk.github.io/shapeshifter/
- You should see four shapes loaded. One each of Triangle, Circle, Square and Star. They will be randomly placed within the browser window.
- Click a shape name in the "Create" box to create new shapes.
- Click and drag to move them.
- Select a shape and change its size and rotation on the pop-up panel.
- Delete a shape by selecting it, and clicking "Delete Shape" from the pop-up panel.
- Refreshing the panel remembers which shapes are on the screen. 
- Closing the browser or tab forgets shapes, and four new ones will be created on page load.

#### Running the Tests
Navigate to [https://netwolfuk.github.io/shapeshifter/test.html](https://netwolfuk.github.io/shapeshifter/test.html)
There are two types of tests on this page.
  - Unit Tests: These are using mocha to do TDD style assertions on the code.
  - Visual Tests: These are simple tests just rendering the Shape objects on the Canvas within a loop.  They do not do any assertions.  

## Architecture
The app is divided into four main classes:

**Shape** ([`src/shapes.mjs`](src/shapes.mjs)) is a generic class which represents a shape. A shape's position, rotation and size are stored within a shape instance, and a shape knows how to draw itself when passed a `context`. The four shapes (Triangle, Circle, Square and Star) are sub-classes of `Shape` and are only required to implement one method called `drawPath(ctx)`. The following is the *Cirlce.drawPath(ctx)* method.
 
 ```
    drawPath(ctx) {
        ctx.arc(0, 0, this.size/2, 0, 2 * Math.PI, false);
    }
 ``` 

**ShapeManager** ([`src/shapeManager.mjs`](src/shapeManager.mjs) is responsible managing and storing shape instances. It loads any shapes in HTML5 localStorage on page load, or creates four starting shapes if no previous storage is found. 
The ShapeManager creates new shape instances, deletes existing ones and manages the size, rotation and location of shape instances. When an update occurs, it asks each shape to redraw itself.

**EventHandler** ([`src/eventHandler.mjs`](src/eventHandler.mjs)). This class manages the events from the UI, and relays these events to the ShapeManager. It translates mouseEvents, into Shape specific events. eg, MouseOver requires a Shape to draw its black border. Mouse drag requires a shape to update its X & Y co-ordinates.

**Index** ([`src/index.js`](src/index.js)) runs from the browser page (index.html), and bootstraps the app. It creates instances of the ShapeManager, EventHandler and a handful of utility classes and then injects their dependencies into the constructor. This method of object creation means that the ShapeManager and EventManager don't need to have any knowledge of the DOM or mouse events, and can be fully unit tested outside the browser.

The index.js file registers for DOM events, and calls methods on the EventHandler when they occur.

## Improvements/Limitations
Currently, ShapeShifter ignores browser resize events. The canvas size does not resize when the browser window size changes. Shapes can therefore "fall" off-screen until the browser size is restored.

## Project Layout
```
 | 
 |- src/                      <- Javascript files (.js) and modules (.mjs)
 |- test/                     <- Javascript files containing tests and fakes.
 |- public/                   <- html docs (index.html, test.html)
 |     - css/                 <- CSS stylesheets  
 |- Gruntfile.js              <- Config file for grunt build
 |- package.json              <- packages for the grunt build
 |- nodemon.json              <- Config file for running nodemon
 |- app.js                    <- Express app to serve files during development
 |- reamdme.md                <- This file
```

#### Running the app locally
This has been tested on Linux, YMMV.
```
git clone https://github.com/netwolfuk/shapeshifter.git
cd shapeshifter
yarn install
./node_modules/.bin/nodemon app.js
```
and then navigate to [http://localhost:9000/](http://localhost:9000/)

#### Building the app.
This has been tested on Linux, YMMV.
```
git clone https://github.com/netwolfuk/shapeshifter.git
cd shapeshifter
yarn install
grunt
```

The site will be copied to `./docs` which is compatable with GitHub pages and can then be pushed to github.

