class Grid {
	constructor(game) {
		console.log(game);
		this.game = game;

		this.height = game.resolution;
		this.width = game.resolution;
		this.container = game.container;
		this.objects = game.objects;
		
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
		if (!this.isValidMovement(object, movement)) {
			if (object.objectType == 'ball') {
				movement = object.momentum;
			} else {
				return false;
			}
		}

		this.drawSquares(object, 'empty');

		// Drawing test path
		let originalSquare
		if (originalSquare = this.getSquare(object.originX, object.originY)) {
			//originalSquare.setSquareType('test');
		}

		object.originX += object.percentageToPixel(movement.x);
		object.originY += object.percentageToPixel(movement.y);

		this.drawSquares(object);

		return true;
	}

	isValidMovement(object, movement) {
		let valid = true;
		let collisionSide;

		let topEdge = object.originY + object.yFromOrigin;
		let topAfterMove = topEdge + object.percentageToPixel(movement.y);
		if (topAfterMove > object.resolution) {
			valid = false;
			collisionSide = 'top';
		}

		let bottomEdge = object.originY - object.yFromOrigin;
		let bottomAfterMove = bottomEdge + object.percentageToPixel(movement.y);
		if (bottomAfterMove < 0) {
			valid = false;
			collisionSide = 'bottom';
		}


		let rightEdge = object.originX + object.xFromOrigin;
		let rightAfterMove = rightEdge + object.percentageToPixel(movement.x);
		if (rightAfterMove > object.resolution) {
			valid = false;
			collisionSide = 'right';
		}

		let leftEdge = object.originX - object.xFromOrigin;
		let leftAfterMove = leftEdge + object.percentageToPixel(movement.x);
		if (leftAfterMove < 0) {
			valid = false;
			collisionSide = 'left';
		}

		if (object.objectType !== 'ball') return valid;

		// Extra logic for ball collisions
		let ball = object;
		if (!valid) {
			console.log('invalid ball move');
			ball.momentum = ball.momentumAfterCollision(collisionSide);
			console.log(collisionSide);
			//this.game.stopGameLoop();
			return false;
		}

		let ballEdges = {
			top: topAfterMove,
			right: rightAfterMove,
			bottom: bottomAfterMove,
			left: leftAfterMove
		};


		// Check that the target square exists. For the case of coli


		return !this.isPaddleCollision(ball, ballEdges);
	}

	isPaddleCollision(ball, ballEdges) {
		let cornerOne,
			cornerTwo,
			collisionSide;

		// Only need to check the ball edges in the direction the ball is moving.
		if (ball.momentum.x > 0) {
			// Check right edge.
			collisionSide = 'right';
			cornerOne = {
				x: ballEdges.right,
				y: ballEdges.top
			};
			cornerTwo = {
				x: ballEdges.right,
				y: ballEdges.bottom
			};
		} else if (ball.momentum.x < 0) {
			// Check left edge.
			collisionSide = 'left';
			cornerOne = {
				x: ballEdges.left,
				y: ballEdges.top
			};
			cornerTwo = {
				x: ballEdges.left,
				y: ballEdges.bottom
			};
		}

		for (var x = cornerOne.x; x <= cornerTwo.x; x++) {
			for (var y = cornerOne.y; y <= cornerTwo.y; y++) {
				let square = this.getSquare(x, y);

				if (square.squareType == 'paddle') {
					ball.momentum = ball.momentumAfterCollision(collisionSide);
					console.log('paddle colission');
					console.log(collisionSide);
					//this.game.stopGameLoop();
					return true;
				}
			}
		}

		if (ball.momentum.y > 0) {
			// Check top edge.
			//collisionSide = 'top';
			collisionSide = 'right';
			cornerOne = {
				x: ballEdges.left,
				y: ballEdges.top
			};
			cornerTwo = {
				x: ballEdges.right,
				y: ballEdges.top
			};
		} else if (ball.momentum.y < 0) {
			// Check bottom edge.
			//collisionSide = 'bottom';
			collisionSide = 'left';
			cornerOne = {
				x: ballEdges.left,
				y: ballEdges.bottom
			};
			cornerTwo = {
				x: ballEdges.right,
				y: ballEdges.bottom
			};
		}

		for (var x = cornerOne.x; x <= cornerTwo.x; x++) {
			for (var y = cornerOne.y; y <= cornerTwo.y; y++) {
				let square = this.getSquare(x, y);

				if (square.squareType == 'paddle') {
					console.log(collisionSide);
					ball.momentum = ball.momentumAfterCollision(collisionSide);
					console.log('paddle colission');
					//this.game.stopGameLoop();
					return true;
				}
			}
		}

		return false;
	}

	getEdgeCoordinates(ballEdges, whichEdge) {
		let coordinates = [];
		let cornerOne,
			cornerTwo;

		if (whichEdge == 'left') {
			
		} else if (whichEdge == 'top') {
			
		} else if (whichEdge == 'right') {
			
		} else if (whichEdge == 'bottom') {
			
		}


		for (var x = cornerOne.x; x <= cornerTwo.x; x++) {
			for (var y = cornerOne.y; y <= cornerTwo.y; y++) {
				let square = this.getSquare(x, y);
			}
		}


	}


}