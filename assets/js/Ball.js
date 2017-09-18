class Ball extends Physical {
	
	constructor(config) {
		super(config);

		self = this;

		this.objectType = 'ball';

		this.xFromOrigin = this.percentageToPixel(1);
		this.yFromOrigin = this.percentageToPixel(1);
		
		//this.originX = (this.playerNumber == 1 ? this.percentageToPixel(5) : this.percentageToPixel(95));
		
		this.originX = this.percentageToPixel(50);
		this.originY = this.percentageToPixel(50);

		this.drawSquares('ball');

		
		// Movement test
		(function myLoop(i) {
			setTimeout(function() {
				self.moveObject(-0.5, -0.5);
				if (--i) myLoop(i);
			}, 10);
		})(80);

	}

}