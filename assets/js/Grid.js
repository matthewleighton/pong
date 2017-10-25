class Grid {
	constructor(game) {
		//console.log(game);
		this.game = game;

		this.height = game.resolution;
		this.width = game.resolution;
		this.container = game.container;
		this.objects = game.objects;
		
		this.gridArray = this.createGrid();

		//console.log(this.gridArray);
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

		// Test line - remove later. Marking the origin as red.
		//this.getSquare(object.originX, object.originY).setSquareType('test');
	}

	moveObject(object, movement) {
		if (!this.isValidMovement(object, movement)) {
			if (object.objectType == 'ball') {
				object.updateMovementAfterCollision();
				movement = object.momentum;
				//this.game.stopGameLoop();
			} else {
				return false;
			}
		}

		console.log(movement);

		this.drawSquares(object, 'empty');

		// Drawing test path
		let originalSquare
		if (originalSquare = this.getSquare(object.originX, object.originY)) {
			//originalSquare.setSquareType('test');
		}

		object.originX += object.percentageToPixel(movement.x);
		object.originY += object.percentageToPixel(movement.y);
		
		//object.originX += movement.x;
		//object.originY += movement.y;

		this.drawSquares(object);

		return true;
	}

	isValidMovement(object, movement) {
		let valid = true;
		let collisionSide;

		let objectEdgesPoints = object.getEdgePointsAfterMove(movement);

		if (objectEdgesPoints.top > object.resolution) {
			valid = false;
			object.collisionSide = 'top';
		} else if (objectEdgesPoints.bottom < 0) {
			valid = false;
			object.collisionSide = 'bottom';
		} else if (objectEdgesPoints.right > object.resolution) {
			valid = false;
			object.collisionSide = 'right';
		} else if (objectEdgesPoints.left < 0) {
			valid = false;
			object.collisionSide = 'left';
		}

		if (object.objectType == 'ball' && valid == true) {
			// Ball needs to do an extra check for collision with paddles.
			
			

			return !this.isPaddleCollision(object, objectEdgesPoints);
		} else {
			return valid;
		}
	}

	isPaddleCollision(ball, ballEdges) {
		let cornerOne,
			cornerTwo,
			collision = false,
			collisionSide,
			collisionCorners,
			cornerSquare;

		// Only need to check the ball edges in the direction the ball is moving.
		if (ball.momentum.x > 0) {
			collisionSide = 'right';
			collisionCorners = [
				{
					x: ballEdges.right,
					y: ballEdges.top
				},
				{
					x: ballEdges.right,
					y: ballEdges.bottom
				}
			];
		} else if (ball.momentum.x < 0) {
			collisionSide = 'left';
			collisionCorners = [
				{
					x: ballEdges.left,
					y: ballEdges.top
				},
				{
					x: ballEdges.left,
					y: ballEdges.bottom
				}
			];
		}

		if (this.testSquaresForType(collisionCorners, 'paddle')) {
			collision = true;
		}

		if (!collision) {
			if (ball.momentum.y > 0) {
				collisionSide = 'top';
				collisionCorners = [
					{
						x: ballEdges.left,
						y: ballEdges.top
					},
					{
						x: ballEdges.right,
						y: ballEdges.top
					}
				];
			} else if (ball.momentum.y < 0) {
				collisionSide = 'bottom';
				collisionCorners = [
					{
						x: ballEdges.left,
						y: ballEdges.top
					},
					{
						x: ballEdges.right,
						y: ballEdges.top
					}
				];
			}

			if (this.testSquaresForType(collisionCorners, 'paddle')) {
				collision = true;
			}
		}

		if (collision) {
			ball.collisionSide = collisionSide;
			ball.updatePaddleCollisionPosition();
			return true;
		}

		return false;
	}

	// Returns true if any of the given coordinates contain a square of the given type.
	testSquaresForType(coords, squareType) {
		for (var i = 0; i < coords.length; i++) {
			var square = this.getSquare(
				coords[i].x,
				coords[i].y,
			);

			if (square.squareType == 'paddle') return true;
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