function MakePlane(game) {
	this.game = game
}
MakePlane.prototype = {
	init: function() {
		setInterval(function() {
			if(!this.game.pause) {
				var r = Math.random()
				if(r < 0.7) {
					new SmallPlane(this.game)
				} else if(r > 0.7 && r < 0.95) {
					new MiddlePlane(this.game)
				} else {
					new LargePlane(this.game)
				}
			}
		}.bind(this), 1000)
	}
}