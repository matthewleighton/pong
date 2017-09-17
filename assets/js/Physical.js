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
		console.log('percentageToPixel');

		var pixel = Math.floor((this.resolution / 100) * percentage);

		console.log(pixel)

		return pixel;
	}

}