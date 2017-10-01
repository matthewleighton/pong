class Physical {

	constructor(physicalSettings, game) {
		
		//console.log('Physical');
		//console.log(physicalSettings);
		
		this.game = game;

		for (var key in physicalSettings) {
			if (physicalSettings.hasOwnProperty(key)) {
				this[key] = physicalSettings[key];
			};
		}

		// Dynamically assign object variables based on items in config object.
		

		for (var key in game) {
			if (game.hasOwnProperty(key)) {
				this[key] = game[key];
			};
		}

		console.log(this);
		
		//console.log(config);

		//heightFromOrigin
		//widthFromOrigin
		//player
		//originX
		//originY
		//
	}

	percentageToPixel(percentage) {
		if (percentage == 0) return 0;

		var pixel = Math.floor((this.resolution / 100) * percentage);
		if (pixel == 0) return 1;

		return pixel;
	}

	// This draws an object by coloring every square between the object's top left and bottom right.
	drawSquares(squareType) {
		var topLeft = {
			x: this.originX - this.xFromOrigin,
			y: this.originY - this.yFromOrigin
		};

		//console.log('top left');
		//console.log(topLeft);

		//this.grid.getSquare(topLeft['x'], topLeft['y']).setSquareType('orange');

		var bottomRight = {
			x: this.originX + this.xFromOrigin,
			y: this.originY + this.yFromOrigin
		};

		//console.log('bottom right');
		//console.log(bottomRight);

		//this.grid.getSquare(bottomRight['x'], bottomRight['y']).setSquareType('green');

		for (var x = topLeft['x']; x <= bottomRight['x']; x++) {
			for (var y = topLeft['y']; y <= bottomRight['y']; y++) {
				this.grid.getSquare(x, y).setSquareType(squareType);
			}
		}

		// Test line - remove later. Marking the origin as red.
		this.game.grid.getSquare(this.originX, this.originY).setSquareType('test');
	}

	moveObject(xChange, yChange) {
		this.drawSquares('empty');
		this.grid.getSquare(this.originX, this.originY).setSquareType('test');

		//console.log(this.percentageToPixel(xChange));

		//console.log('before move');
		//console.log(this.originY);

		this.originX += this.percentageToPixel(xChange);
		this.originY += this.percentageToPixel(yChange);
		this.drawSquares(this.objectType);

		//console.log('after move');
		//console.log(this.originY);
	}

	setId(id) {
		this.id = id;
		this.game.objects[id] = this;
	}

}