class Grid {
	constructor(config) {
		this.config = config;

		this.height = config.height;
		this.width = config.width;
		this.container = config.container;

		this.render(this.container);
	}

	render() {
		if (!this.gridArray) {
			this.gridArray = this.createGridArray();
		};

		console.log(this.gridArray);

		let container = document.getElementById(this.container);

		for (var y = 0; y < this.gridArray.length; y++) {
			var row = document.createElement('div');
			row.setAttribute('id', 'row-' + y);
			row.setAttribute('class', 'row');

			for (var x = 0; x < this.gridArray[y].length; x++) {
				var square = document.createElement('div');
				square.setAttribute('id', 'square-' + x + '-' + y);
				square.setAttribute('class', 'square');

				row.appendChild(square);
			}

			container.appendChild(row);
		};

	}

	createGridArray() {
		var gridArray = [];

		for (var y = 0; y < this.height; y++) {
			var row = [];

			for (var x = 0; x < this.width; x++) {
				row.push(new Square(x, y, this.config));
			}

			gridArray.push(row);
		}

		return gridArray;
	}
}