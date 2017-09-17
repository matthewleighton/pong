class Grid {
	constructor(config) {
		this.config = config;

		this.height = config.height;
		this.width = config.width;
		this.container = config.container;

		//this.render(this.container);
		
		this.createGrid();
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

			/*
			for (var x = 0; x < this.gridArray[y].length; x++) {
				var square = document.createElement('div');
				square.setAttribute('id', 'square-' + x + '-' + y);
				square.setAttribute('class', 'square');

				row.appendChild(square);
			}
			*/

			container.appendChild(row);
		};

	}

	createGrid(render = true) {
		var gridArray = [];

		for (var y = 0; y < this.height; y++) {
			var rowArray = [];

			if (render) {
				var rowElement = document.createElement('div');
				rowElement.setAttribute('id', 'row-' + y);
				rowElement.setAttribute('class', 'row');
				
				document.getElementById(this.container).appendChild(rowElement);
			}

			for (var x = 0; x < this.width; x++) {
				rowArray.push(new Square(x, y, this.config, render));
			}

			gridArray.push(rowArray);
		}

		return gridArray;
	}
}