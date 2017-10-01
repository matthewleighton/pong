class Grid {
	constructor(game) {
		console.log(game);
		this.game = game;

		this.height = game.resolution;
		this.width = game.resolution;
		this.container = game.container;
		
		this.gridArray = this.createGrid();

		console.log(this.gridArray);
	}

	/**
	 * Creates the grid array object, which houses the Square objects.
	 * Has an option to render the grid into the HTML as the Squares are appended to the array.
	 * @param  {Boolean} render - Whether or not we want the grid to be rendered in HTML.
	 * @return {Array} - The grid array object.
	 */
	createGrid(render = true) {
		var gridArray = [];

		for (var y = 0; y < this.height; y++ /*var y = this.height-1; y >=0; y--*/) {
			var rowArray = [];

			if (render) {
				var rowElement = document.createElement('div');
				rowElement.setAttribute('id', 'row-' + y);
				rowElement.setAttribute('class', 'row');
				
				document.getElementById(this.container).appendChild(rowElement);
			}

			for (var x = 0; x < this.width; x++) {
				
				//console.log(x + ' ' + y);
				rowArray.push(new Square(x, y, this.game, render));
			}

			// Using unshift here because we're working our way down from the top of the grid, so the first elements added actually have the highest y value.
			// Adding to the start of the array, rather than the end, means that the first elements are those with the lowest numbers.
			gridArray.unshift(rowArray);
		}

		return gridArray;
	}

	// I think this should maybe move to the Game object, rather than the Grid?
	spawnPaddle(playerNumber) {
		var paddleSettings = {
			playerNumber: playerNumber
		}

		var paddle = new Paddle(paddleSettings, this.game);
	}

	getSquare(x, y) {
		
		if (!this.gridArray[x] || ! this.gridArray[x][y]) {
			return false;
		}

		return this.gridArray[y][x];
	}



	// This draws an object by coloring every square between the object's top left and bottom right.
	drawSquares(object, squareType = false) {
		
		squareType = squareType ? squareType : object.objectType;

		var topLeft = {
			x: object.originX - object.xFromOrigin,
			y: object.originY - object.yFromOrigin
		};

		//this.getSquare(topLeft['x'], topLeft['y']).setSquareType('orange');

		var bottomRight = {
			x: object.originX + object.xFromOrigin,
			y: object.originY + object.yFromOrigin
		};

		//this.getSquare(bottomRight['x'], bottomRight['y']).setSquareType('green');

		for (var x = topLeft['x']; x <= bottomRight['x']; x++) {
			for (var y = topLeft['y']; y <= bottomRight['y']; y++) {
				let square;
				if (square = this.getSquare(x, y)) {
					square.setSquareType(squareType);
				}
				//this.getSquare(x, y).setSquareType(squareType);
			}
		}

		//console.log(object);

		// Test line - remove later. Marking the origin as red.
		//this.getSquare(object.originX, object.originY).setSquareType('test');
	}

	moveObject(object, movement) {
		//console.log(object);
		//
		
		if (!this.isValidMovement(object, movement)) {
			console.log('invalid movement');
			return false;
		}

		this.drawSquares(object, 'empty');
		this.getSquare(object.originX, object.originY).setSquareType('test');

		object.originX += object.percentageToPixel(movement.x);
		object.originY += object.percentageToPixel(movement.y);

		//console.log(object.originY);
		//console.log(object.resolution);
		//console.log(object)

		this.drawSquares(object);

		return true;

		//console.log('moveObject');
	}

	isValidMovement(object, movement) {
		
		console.log(object);

		let yTopEdge = object.originY + object.yFromOrigin;
		let yTopAfterMove = yTopEdge + object.percentageToPixel(movement.y);
		if (yTopAfterMove > object.resolution || yTopAfterMove < 0) {
			return false;
		}

		let yBottomEdge = object.originY - object.yFromOrigin;
		let yBottomAfterMove = yBottomEdge + object.percentageToPixel(movement.y);
		if (yBottomAfterMove > object.resolution || yBottomAfterMove < 0) {
			return false;
		}


		let xRightEdge = object.originX + object.xFromOrigin;
		let xRightAfterMove = xRightEdge + object.percentageToPixel(movement.x);
		if (xRightAfterMove > object.resolution || xRightAfterMove < 0) {
			return false;
		}

		let xLeftEdge = object.originX - object.xFromOrigin;
		let xLeftAfterMove = xLeftEdge + object.percentageToPixel(movement.x);
		if (xLeftAfterMove > object.resolution || xLeftAfterMove < 0) {
			console.log('failed bottom');
			return false;
		}

		return true;
	}

	/*
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
	*/


}