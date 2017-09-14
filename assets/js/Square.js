class Square {
	constructor(x, y, config) {
		this.config = config;
		this.x = x;
		this.y = y;

		this.isGoal = this.isGoalSquare();
	}

	isGoalSquare() {
		if (this.x == 0 || this.x == (this.config.width -1)) {
			console.log('goal');
			return true;
		}

		// Also return true if x is equal to the grid's total width.
		// Else return false.
	}
}