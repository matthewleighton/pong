class Physical {

	constructor(physicalSettings, config) {
		
		console.log('Physical');

		console.log(physicalSettings);

		for (var key in physicalSettings) {
			if (physicalSettings.hasOwnProperty(key)) {
				this[key] = physicalSettings[key];
			};
		}

		console.log(this.playerNumber);

		// Dynamically assign object variables based on items in config object.
		for (var key in config) {
			if (config.hasOwnProperty(key)) {
				this[key] = config[key];
			};
		}

		console.log(config);

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

		console.log(percentage);
		console.log((this.resolution / 100) * percentage);

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
		this.grid.getSquare(this.originX, this.originY).setSquareType('test');
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

}