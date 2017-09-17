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
		return Math.floor((this.resolution / 100) * percentage);
	}

	// This draws an object by coloring every square between the object's top left and bottom right.
	drawSquares() {
		var topLeft = {
			x: this.originX - this.xFromOrigin,
			y: this.originY - this.yFromOrigin
		};
		this.grid.getSquare(topLeft['x'], topLeft['y']).setSquareType('test');

		var bottomRight = {
			x: this.originX + this.xFromOrigin,
			y: this.originY + this.yFromOrigin
		};
		this.grid.getSquare(bottomRight['x'], bottomRight['y']).setSquareType('test');

		for (var x = topLeft['x']; x <= bottomRight['x']; x++) {
			for (var y = topLeft['y']; y <= bottomRight['y']; y++) {
				this.grid.getSquare(x, y).setSquareType('paddle');
			}
		}

		// Test line - remove later.
		this.grid.getSquare(this.originX, this.originY).setSquareType('test');
	}

}