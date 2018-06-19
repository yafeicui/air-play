function MyPlane(game) {
	Dom.call(this);
	this.game = game;
}
MyPlane.prototype = {
	init: function() {
		this.body = document.createElement("div");
		this.body.className = "myplan";
		this.game.body.appendChild(this.body);
		this.body.style.left = this.game.width() / 2 - this.width() / 2 + "px"
		this.body.style.bottom = "5px";
		this.move()
		this.fire()
		this.game.isImpact(this)
	},
	move: function() {
		this.body.onmousedown = function() {
			this.body.onmousemove = function(e) {
				if(!this.game.pause) {
					this.body.style.left = e.pageX - this.width() / 2 + "px";
					this.body.style.top = e.pageY - this.height() / 2 + "px";
					if(this.left() <= 0) {
						this.body.style.left = "0px";
					}
					if(this.left() >= this.game.width() - this.width()) {
						this.body.style.left = this.game.width() - this.width() + "px";
					}
					if(this.top() <= 0) {
						this.body.style.top = "0px";
					}
					if(this.top() >= this.game.height() - this.height()) {
						this.body.style.top = this.game.height() - this.height() + "px";
					}
				}
			}.bind(this)
		}.bind(this)
		this.body.onmouseup = function() {
			this.onmousemove = undefined
		}
	},
	fire: function() {
		this.fireTimer = setInterval(function() {
			if(!this.game.pause) {
				new Zidan(this.game, this).init()
			}
		}.bind(this), this.game.level * 100)
	},
	boom: function() {
		var i = 0
		var boomTimer = setInterval(function() {
			if(!this.game.pause) {
				i++
				if(i > 4) {
					clearInterval(boomTimer)
					clearInterval(this.fireTimer)
					this.body.remove()
					return
				}
				this.body.style.background = "url(images/me_die" + i + ".png) no-repeat"
				this.body.style.backgroundSize = "100% auto"
			}
		}.bind(this), 100)
	}
}