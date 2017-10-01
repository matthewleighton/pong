class Game {
	constructor(config) {

		// This is needed because 'this' in window resize event listener refers to the window, not the Game object.
		self = this;

		this.keysPressed = {};
		this.objects = {};

		this.resolution = config.resolution;
		this.container = config.container;

		this.setPixelSizeCSS();
		this.setGameSize();
		window.addEventListener('resize', this.setGameSize);

		this.grid = new Grid(this);
		
		this.spawnPaddle(1);
		this.spawnPaddle(2);

		this.spawnBall();

		this.toggleInputListeners(true);

		this.activeGameLoop();
	}

	setPixelSizeCSS() {
		var pixelSize = 100 / this.resolution;

		var css = ".square{width:" + pixelSize + "%;}";
		css += ".row{height:" + pixelSize + "%;}";

		document.getElementsByTagName('style')[0].innerHTML = css;
	}

	setGameSize() {
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
			windowHeight = w.innerHeight || e.clientHeight || g.clientHeight;

		var container = document.getElementById(self.container);

		if (windowWidth > windowHeight) {
			container.style.height = windowHeight + 'px';
			container.style.width = windowHeight + 'px';
		} else {
			container.style.height = windowWidth + 'px';
			container.style.width = windowWidth + 'px';
		}
	}

	spawnBall() {
		var ballSettings = {
			resolution: this.resolution
		};

		var ball = new Ball(this);

		this.objects[ball.id] = ball;

		this.grid.drawSquares(ball);
	}

	spawnPaddle(playerNumber) {
		var paddleSettings = {
			playerNumber: playerNumber,
			resolution: this.resolution
		};

		var paddle = new Paddle(paddleSettings);

		this.objects[paddle.id] = paddle;

		this.grid.drawSquares(paddle);
	}

	toggleInputListeners(active = true) {
		if (active) {
			document.addEventListener('keydown', (e) => {
				this.keysPressed[e.which] = true;
			});
			document.addEventListener('keyup', (e) => {
				this.keysPressed[e.which] = false;
			});
		} else {

		}
	}

	moveViaInputCommand() {
		//console.log(this.keysPressed);

		// W key
		if (this.keysPressed[87]) {
			this.grid.moveObject(this.objects['paddle-1'], {x: 0, y: 0.5});
		};

		// S key
		if (this.keysPressed[83]) {
			this.grid.moveObject(this.objects['paddle-1'], {x: 0, y: -0.5});	
		}

		// Up arrow
		if (this.keysPressed[38]) {
			this.grid.moveObject(this.objects['paddle-2'], {x: 0, y: 0.5});	
		}

		// Down arrow
		if (this.keysPressed[40]) {
			this.grid.moveObject(this.objects['paddle-2'], {x: 0, y: -0.5});
		}
	}

	activeGameLoop() {
		let loop = setInterval(() => {this.gameLoop(), 150});
	}

	gameLoop() {
		this.moveViaInputCommand();
	}

}