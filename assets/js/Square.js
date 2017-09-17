class Square {
	constructor(x, y, config, render = true) {
		this.config = config;
		this.x = x;
		this.y = y;

		this.renderSquare(render);

		if (this.isGoalSquare()) {
			this.setSquareType('goal');
		} else {
			this.setSquareType('empty');
		}

		/*
		this.isGoal = this.isGoalSquare();
		if (this.isGoal) {
			this.setSquareColor('goal');
		};
		*/
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

	/**
	 * Returns a string of the hex code for the square squareType we enter.
	 * Defaults to black if no squareType is given.
	 * @param  {string} squareType - The squareType of square we want to know the hex code for. (E.g. ball/goal, etc).
	 * @return {string} - The hex code of the square squareType we used.
	 */
	getHexCode(squareType) {
		var black = '#000000';
		var white = '#ffffff';

		var colorCodes = {
			ball: white,
			empty: black,
			goal: 'blue',
			paddle: white
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