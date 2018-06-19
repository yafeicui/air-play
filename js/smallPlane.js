function SmallPlane(game) {
	Dom.call(this)
	this.game = game
	this.life = 2
	this.speed = 4
	this.score = 200
	this.init("smallPlane")
}
SmallPlane.prototype = {
	init: function(className) {
		this.body = document.createElement("div")
		this.body.className = className
		this.game.body.appendChild(this.body)
		this.body.style.top = -this.height() + "px"
		this.body.style.left = Math.random() * (this.game.width() - this.width()) + "px"
		this.move()
		this.game.diren.push(this)
	},
	move: function() {
		var top = this.top()
		var moveTimer = setInterval(function() {
			if(!this.game.pause) {
				top += 2
				this.body.style.top = top + "px"
				if(this.top() >= this.game.height()) {
					this.body.remove()
					clearInterval(moveTimer)
				}
			}
		}.bind(this), 60 / this.speed)

	},
	boom: function() {
		var i = 0
		var boomTimer = setInterval(function() {
			if(!this.game.pause) {
				i++
				if(i > 3) {
					clearInterval(boomTimer)
					this.body.remove()
					return
				}
				this.body.style.background = "url(images/plain1_die" + i + ".png)"
			}
		}.bind(this), 100)
	}
}