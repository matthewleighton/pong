class Paddle extends Physical {

	constructor(physicalSettings, config) {		
		super(physicalSettings, config);

		this.objectType = 'paddle';

		this.xFromOrigin = this.percentageToPixel(0.7);
		this.yFromOrigin = this.percentageToPixel(10);
		
		this.originX = (this.playerNumber == 1 ? this.percentageToPixel(5) : this.percentageToPixel(95));
		this.originY = this.percentageToPixel(50);

		this.drawSquares('paddle');
		//this.moveObject(2, 0);

		
		window.setTimeout(() => {
			this.moveObject(0, 10);
		},3000);
		

	}

}