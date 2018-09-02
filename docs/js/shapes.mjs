const TRIANGLE = "TRIANGLE";
const SQUARE = "SQUARE";
const CIRCLE = "CIRCLE";
const STAR = "STAR";


export class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class RandomPointGenerator {
	constructor(minWidth, maxWidth, minHeight, maxHeight) {
		this.minWidth = minWidth;
		this.maxWidth = maxWidth;
		this.minHeight = minHeight;
		this.maxHeight = maxHeight;
	}

	create() {
	    return new Point(
		      Math.floor(Math.random() * (this.maxWidth - this.minWidth + 1)) + this.minWidth,
		      Math.floor(Math.random() * (this.maxHeight - this.minHeight + 1)) + this.minHeight
			);
	}
}

export class Shape {
	constructor(type, id, x, y, size, rotation) {
		this.type = type;
		this.id = id;
    	this.x = parseInt(x);
    	this.y = parseInt(y);

    	this.size = parseInt(size);
    	this.rotation = rotation;
    	this.selected = false;
	}

	drag(x, y, ctx) {
		this.x = x;
		this.y = y;
	}

	select(select, ctx) {
		this.selected = select;
		this.draw(ctx);
	}

	draw(ctx) {
		ctx.save();
	    if (this.selected) {
			ctx.fillStyle = "#ff0000";
		}
		this.drawShape(ctx);
        ctx.fill(); 
	    if (this.selected) {
	    	ctx.stroke();
	    }        
	    ctx.restore();
		ctx.addHitRegion({id: this.id});

	}

	mouseOver(ctx) {
	    ctx.save();
	    this.drawShape(ctx);
        ctx.stroke();
	    ctx.restore();
	}

	drawShape(ctx) {
	    ctx.translate(this.x, this.y);
	    ctx.rotate((Math.PI / 180) * this.rotation);
	    ctx.beginPath();
	    this.drawPath(ctx); // call the shape specific method
        ctx.closePath();
	}

}

export class Triangle extends Shape {
	 constructor(shape) {
	    super(TRIANGLE, shape.id, shape.x, shape.y, shape.size, shape.rotation); // call the super class constructor and pass in the name parameter
	 }

	drawPath(ctx) {

        let h = this.size * (Math.sqrt(3)/2);
        ctx.moveTo(0, -h / 2);
        ctx.lineTo( -this.size / 2, h / 2);
        ctx.lineTo(this.size / 2, h / 2);
        ctx.lineTo(0, -h / 2);

	}

}

export class Square extends Shape {
	 constructor(shape) {
	    super(SQUARE, shape.id, shape.x, shape.y, shape.size, shape.rotation); // call the super class constructor and pass in the name parameter
	 }

	drawPath(ctx) {
		let halfsize = this.size/2
    	ctx.moveTo(0-halfsize, 0-halfsize);
    	ctx.lineTo(0+halfsize ,0-halfsize);
    	ctx.lineTo(0+halfsize ,0+halfsize);
    	ctx.lineTo(0-halfsize, 0+halfsize);
	}

}

export class Circle extends Shape {
	 constructor(shape) {
	    super(CIRCLE, shape.id, shape.x, shape.y, shape.size, shape.rotation); // call the super class constructor and pass in the name parameter
	 }

	drawPath(ctx) {
      	ctx.arc(0, 0, this.size/2, 0, 2 * Math.PI, false);
	}

}

export class Star extends Shape {
	 constructor(shape) {
	    super(STAR, shape.id, shape.x, shape.y, shape.size, shape.rotation); // call the super class constructor and pass in the name parameter
	 }

	drawPath(ctx) {
		let r = this.size/4;
		let n = 5;
		let inset = 2;
		ctx.rotate(Math.PI / n);
	    ctx.moveTo(0,0-r);
	    for (let i = 0; i < n; i++) {
	        ctx.rotate(Math.PI / n);
	        ctx.lineTo(0, 0 - (r*inset));
	        ctx.rotate(Math.PI / n);
	        ctx.lineTo(0, 0 - r);
	    }
      	
	}

}

