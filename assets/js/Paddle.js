class Paddle extends Physical {

	constructor(paddleSettings, game) {		
		
		super(paddleSettings, game);

		this.playerNumber = paddleSettings.playerNumber;
		this.id = 'paddle-' + this.playerNumber;

		//this.setId('paddle' + this.playerNumber);

		this.objectType = 'paddle';

		this.xFromOrigin = this.percentageToPixel(0.7);
		this.yFromOrigin = this.percentageToPixel(10);
		
		this.originX = (this.playerNumber == 1 ? this.percentageToPixel(5) : this.percentageToPixel(95));
		this.originY = this.percentageToPixel(50);
	}

	initControls() {
		

		// This will be moved elsewhere. Will not be contained within the paddle.
		
		let paddle = this;

		document.addEventListener('keydown', function(event) {
			console.log('key press');
			paddle.keysPressed[event.which] = true;

			console.log(paddle.keysPressed);
		});

		document.addEventListener('keyup', function(event) {
			paddle.keysPressed[event.which] = false;
		});


		return;

		

		switch (this.playerNumber) {
			case 1: // Player 1 Controls
				document.addEventListener('keydown', function(e) {
					
					//console.log(paddle);
					//
					
					console.log(e.which);

					paddle.keysPressed[e.which] = true;

					switch(e.keyCode) {
						case 87: // W key
							

							//paddle.keysPressed[87]
							//paddle.moveObject(0, 2);
							break;
						case 83: // S key
							paddle.moveObject(0, -2);
							break;
					}
				});
				break;
			default: // Player 2 Controls
				document.addEventListener('keydown', function(e) {
					switch(e.keyCode) {
						case 38: // Up arrow
							paddle.moveObject(0, 2);
							break;
						case 40: // Down arrow
							paddle.moveObject(0, -2);
							break;
					}
				});
				break;
		}
	}

}