class Square {
	constructor(x, y, config, render = true) {
		this.config = config;
		this.x = x;
		this.y = y;

		this.renderSquare(render);

		this.isGoal = this.isGoalSquare();
		if (this.isGoal) {
			this.setColor('goal');
		}
	}

	getHexCode(type) {
		var black = '#000000';
		var white = '#ffffff';

		var colorCodes = {
			ball: white,
			goal: 'blue',
			paddle: white
		};

		if (type in colorCodes) {
			return colorCodes[type];
		};

		return black;
	};

	setColor(type) {
		var squareId = 'square-' + this.x + '-' + this.y;
		var element = document.getElementById(squareId);

		if (element == null) return false;

		element.style.backgroundColor = this.getHexCode(type);
	};

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
			this.setColor('goal');
			return true;
		}

		// Also return true if x is equal to the grid's total width.
		// Else return false.
	};
}