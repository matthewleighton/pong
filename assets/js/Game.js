class Game {
	constructor(config) {

		// This is needed because 'this' in window resize event listener refers to the window, not the Game object.
		self = this;

		// Dynamically assign object variables based on items in config object.
		for (var key in config) {
			if (config.hasOwnProperty(key)) {
				this[key] = config[key];
			};
		}

		this.height = this.resolution;
		this.width = this.resolution;

		this.setPixelSizeCSS();

		this.setGameSize();
		window.addEventListener('resize', this.setGameSize);

		this.grid = new Grid(this);

		this.grid.spawnPaddle(1);
	}

	setPixelSizeCSS() {

		var resolution = this.height;
		var pixelSize = 100 / resolution;

		var css = ".square{width:" + pixelSize + "%;}";
		css += ".row{height:" + pixelSize + "%;}";

		
		console.log(css);
		document.getElementsByTagName('style')[0].innerHTML = css;
		//document.getElementsByTagName('style')[0].innerHTML = ".square{width:calc(100%/50);}.row{height:2%;}";
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

}