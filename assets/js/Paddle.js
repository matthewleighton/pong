class Paddle extends Physical {

	constructor(physicalSettings, config) {
		
		super(physicalSettings, config);

		console.log('paddle');
		this.heightFromOrigin = 10;
		this.widthFromOrigin = 1;

		//this.originX = (this.playerNumber == 1 ? 3 : 97);
		
		console.log(this.playerNumber);
		
		this.originX = (this.playerNumber == 1 ? this.percentageToPixel(5) : this.percentageToPixel(95));

		this.originY = this.percentageToPixel(50);

		this.grid.getSquare(this.originX, this.originY).setSquareType('paddle');
	}

}