function MiddlePlane(game) {
	Dom.call(this)
	this.game = game
	this.life = 4
	this.speed = 3
	this.score = 400
	this.init()
}
MiddlePlane.prototype = {
	init: function() {
		SmallPlane.prototype.init.call(this, "middlePlane");
	},
	move: function() {
		SmallPlane.prototype.move.call(this);
	},
	boom: function() {
		var i = 0
		var boomTimer = setInterval(function() {
			if(!this.game.pause) {
				i++
				if(i > 4) {
					clearInterval(boomTimer)
					this.body.remove()
					return
				}
				this.body.style.background = "url(images/plain2_die" + i + ".png)"
			}
		}.bind(this), 100)
	}
}