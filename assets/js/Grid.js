class Grid {
	constructor(config) {
		this.config = config;

		this.height = config.height;
		this.width = config.width;
		this.container = config.container;
		
		this.gridArray = this.createGrid();
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
				rowArray.push(new Square(x, y, this.config, render));
			}

			// Using unshift here because we're working our way down from the top of the grid, so the first elements added actually have the highest y value.
			// Adding to the start of the array, rather than the end, means that the first elements are those with the lowest numbers.
			gridArray.unshift(rowArray);
		}

		return gridArray;
	}

	spawnPaddle(playerNumber) {

		var paddleSettings = {
			playerNumber: playerNumber
		}

		console.log(this.config);
		
		var paddle = new Paddle(paddleSettings, this.config);
	}

	getSquare(x, y) {
		console.log('grid array');
		console.log(this.gridArray);
		return this.gridArray[y][x];
	}
}