function Zidan(game, myplan) {
	Dom.call(this)
	this.game = game;
	this.myplan = myplan;
}

Zidan.prototype = {
	init: function() {
		this.body = document.createElement("div")
		this.body.className = "zidan"
		this.game.body.appendChild(this.body)
		this.body.style.left = (this.myplan.left() + this.myplan.width() / 2) - this.width() / 2 + 1 + "px";
		this.body.style.top = this.myplan.top() - this.height() + "px";
		this.move()
	},
	move: function() {
		var y = this.top()
		this.moveTimer = setInterval(function() {
			if(!this.game.pause) {
				y -= 5
				this.body.style.top = y + "px"
				this.game.isShoot(this)
				if(this.top() <= -this.height()) {
					this.destroy()
				}
			}
		}.bind(this), 10)
	},
	destroy: function() {
		this.body.remove()
		clearInterval(this.moveTimer)
	}
}