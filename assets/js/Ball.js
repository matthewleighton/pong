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

		this.momentum = {
			//x: this.percentageToPixel(-1),
			//y: this.percentageToPixel(1)
			x: 1,
			y: 1
		};

		this.paddleCollisionPosition = false;
	}

	updateMovementAfterCollision() {
		let oldMomentum = this.momentum;
		let xNewMomentum,
			yNewMomentum;

		//this.game.stopGameLoop();

		if (!this.collisionSide) return false;

		if (this.collisionSide == 'left' || this.collisionSide == 'right') {
			// Only reverse x coordinate.
			let yMomentum;
			if (!this.paddleCollisionPosition) {
				yMomentum = this.momentum.y;
			} else {
				yMomentum = this.normalizeCollisionMomentum();
				//yMomentum = 1;
				//yMomentum = this.paddleCollisionPosition;
			}

			this.momentum = {
				x: 0 - this.momentum.x,
				y: yMomentum
			}
		} else {
			// Only reverse y coordinate.
			this.momentum = {
				x: this.momentum.x,
				y: 0 - this.momentum.y
			}
		}

		//console.log(this.momentum);

		this.paddleCollisionPosition = false;
	}

	// Calculate which part of the paddle the ball collided with.
	// This later determines in which direction the ball should rebound.
	updatePaddleCollisionPosition() {
		let paddleNumber = this.originX < this.game.resolution / 2 ? 1 : 2;
		let paddle = this.game.getObject('paddle-' + paddleNumber);
		let paddleOrigin = paddle.originY;
		let ballOrigin = this.originY;

		// A high originDifference indicates a collision at the top of the paddle.
		// Low means bottom. 0 is center.
		let originDifference = ballOrigin - paddleOrigin;

		this.paddleCollisionPosition = originDifference;

		//console.log(originDifference);
		//this.game.stopGameLoop();
	}

	// Translates the paddleCollisionPosition into a momentum speed between -2 and 2.
	normalizeCollisionMomentum() {
		let paddleHeight = this.game.resolution / 10;// * 2;

		//console.log(paddleHeight);

		console.log(paddleHeight - this.paddleCollisionPosition);

		console.log('test----');
		console.log(this.percentageToPixel(1));
		console.log(this.percentageToPixel(1.1));
		console.log(this.percentageToPixel(1.2));
		console.log(this.percentageToPixel(1.3));
		console.log(this.percentageToPixel(1.4));
		console.log(this.percentageToPixel(1.5));
		console.log(this.percentageToPixel(1.6));
		console.log(this.percentageToPixel(1.7));
		console.log(this.percentageToPixel(1.8));
		console.log(this.percentageToPixel(1.9));
		console.log(this.percentageToPixel(2));
		console.log(this.percentageToPixel(2.1));
		
		//console.log(Math.floor(1.7));
		console.log('---endTest');		
		this.game.stopGameLoop();

		//return this.percentageToPixel(1.3);
		return 1.2;
	}

}