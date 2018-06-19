function LargePlane(game) {
	Dom.call(this)
	this.game = game
	this.life = 8
	this.speed = 1
	this.score = 800
	this.init()
}
LargePlane.prototype = {
	init: function() {
		SmallPlane.prototype.init.call(this, "largePlane");
	},
	move: function() {
		SmallPlane.prototype.move.call(this);
	},
	boom: function() {
		var i = 0
		var boomTimer = setInterval(function() {
			if(!this.game.pause) {
				i++
				if(i > 6) {
					clearInterval(boomTimer)
					this.body.remove()
					return
				}
				this.body.style.background = "url(images/plain3_die" + i + ".png)"
			}
		}.bind(this), 100)
	}
}