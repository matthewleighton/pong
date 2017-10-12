class Square {
	constructor(x, y, config, render = true) {
		this.config = config;
		this.x = x;
		this.y = y;

		this.renderSquare(render);

		if (x == config.resolution/2 && y % 2) {
			this.setBaseColor('white');
		}

		if (this.isGoalSquare()) {
			this.setSquareType('goal');
		} else {
			this.setSquareType('empty');
		}
	};

	/**
	 * 
	 * @param  {[type]} squareType [description]
	 * @return {[type]}            [description]
	 */
	setSquareType(squareType = 'empty') {
		this.squareType = squareType;
		this.setSquareColor();
	}

	setBaseColor(baseColor) {
		this.baseColor = baseColor;
	}

	/**
	 * Returns a string of the hex code for the square squareType we enter.
	 * Defaults to black if no squareType is given.
	 * @param  {string} squareType - The squareType of square we want to know the hex code for. (E.g. ball/goal, etc).
	 * @return {string} - The hex code of the square squareType we used.
	 */
	getHexCode(squareType) {
		var black = '#000000';
		var white = '#ffffff';

		if (squareType == 'empty') {
			squareType = this.baseColor;
		}

		var colorCodes = {
			ball: white,
			empty: black,
			goal: 'blue',
			green: 'green',
			orange: 'orange',
			paddle: white,
			test: 'red',
			white: white
		};

		if (squareType in colorCodes) {
			return colorCodes[squareType];
		};

		return black;
	};

	/**
	 * Changes the css of the html element representing this Square.
	 * @param {string} squareType - The squareType of square we want to know the hex code for. (E.g. ball/goal, etc).
	 */
	setSquareColor(/*squareType*/) {
		var squareId = 'square-' + this.x + '-' + this.y;
		var element = document.getElementById(squareId);

		if (element == null) return false;

		element.style.backgroundColor = this.getHexCode(this.squareType);
	};

	// Only creates HTML element. Does not set color.
	renderSquare(render) {
		if (!render) return false;

		//var row = document.createElement('div');
		var rowElement = document.getElementById('row-' + this.y);

		var squareElement = document.createElement('div');
		squareElement.setAttribute('id', 'square-' + this.x + '-' + this.y);
		squareElement.setAttribute('class', 'square');

		rowElement.appendChild(squareElement);
	};

	isGoalSquare() {
		if (this.x == 0 || this.x == (this.config.width -1)) {
			//this.setSquareColor('goal');
			return true;
		} else {
			return false;
		}
	};
}