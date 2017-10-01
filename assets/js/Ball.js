class Ball extends Physical {
	
	constructor(game) {
		super({}, game);

		self = this;

		this.objectType = 'ball';
		this.id = 'ball';

		this.xFromOrigin = this.percentageToPixel(1);
		this.yFromOrigin = this.percentageToPixel(1);
				
		this.originX = this.percentageToPixel(50);
		this.originY = this.percentageToPixel(50);

		this.momentum = {x: this.percentageToPixel(-1), y: this.percentageToPixel(0.5)};
	}

}