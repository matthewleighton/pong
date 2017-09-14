class Grid {
	constructor(height, width, ID) {
		this.height = height;
		this.width = width;
		this.ID = ID;

		this.render(ID);
	}

	render() {
		if (!this.gridArray) {
			this.gridArray = this.createGridArray();
		};

		let container = document.getElementById(this.ID);

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

			//console.log(row);

			container.appendChild(row);
		};

		//console.log(container);
	}

	createGridArray() {
		var gridArray = [];

		for (var y = 0; y < this.height; y++) {
			var row = [];

			for (var x = 0; x < this.width; x++) {
				row.push(new Square(x, y));
			}

			gridArray.push(row);
		}

		//console.log(gridArray);
		return gridArray;
	}
}

class Square {

}

var myGrid = new Grid(10, 10, 'container');