function Game(level) {
	Dom.call(this);
	this.body = document.querySelector(".main");
	this.level = level
	this.diren = []
	this.score = 0
	this.pause = false
	this.shootCount = 0
}

Game.prototype = {
	start: function() {
		var options = document.querySelector("#options");
		options.remove();
		this.bgMove();
		this.loading(function() {
			new MyPlane(this).init();
			new MakePlane(this).init()
			this.showScore()
			this.showPauseBtn()
		}.bind(this));
	},
	loading: function(callback) {
		var logo = document.querySelector(".logo");
		var loading = document.createElement("div");
		loading.className = "loading";
		this.body.appendChild(loading);

		var count = 1;
		var loadTimer = setInterval(function() {
			count++;
			if(count > 3) count = 1;
			loading.style.background = "url(images/loading" + count + ".png)";
		}, 300);

		setTimeout(function() {
			logo.remove();
			loading.remove();
			clearInterval(loadTimer);
			callback();
		}, 1000);
	},
	showScore: function() {
		this.scoreEle = document.createElement("div")
		this.scoreEle.className = "score"
		this.scoreEle.innerText = "得分：" + this.score
		this.body.appendChild(this.scoreEle)

		this.shootCountEle = document.createElement("div")
		this.shootCountEle.className = "shootCount"
		this.shootCountEle.innerText = "摧毁敌机数：" + this.shootCount
		this.shootCountEle.style.top = this.scoreEle.offsetTop + this.scoreEle.offsetHeight + "px"
		this.body.appendChild(this.shootCountEle)
	},
	showPauseBtn: function() {
		var pause = document.createElement("div")
		pause.className = "pause"
		pause.innerText = this.pause ? "开始" : "暂停"
		this.body.appendChild(pause)
		pause.onclick = function() {
			this.pause = !this.pause
			pause.innerText = this.pause ? "开始" : "暂停"
			if(this.pause) {
				pause.style.borderColor = "#ff6900"
				pause.style.color = "#ff6900"
			} else {
				pause.style.borderColor = "#333"
				pause.style.color = "#333"
			}
		}.bind(this)
	},
	bgMove: function() {
		var count = 0;
		setInterval(function() {
			if(!this.pause) {
				count += 2;
				this.body.style.backgroundPositionY = count + "px";
			}
		}.bind(this), 30);
	},
	isShoot: function(zidan) {
		if(this.diren.length > 0) {
			for(var i = 0; i < this.diren.length; i++) {
				if((zidan.left() + zidan.width()) >= this.diren[i].left() && zidan.left() <= (this.diren[i].left() + this.diren[i].width())) {
					if(zidan.top() <= (this.diren[i].top() + this.diren[i].height()) && (zidan.top() + zidan.height()) >= this.diren[i].top()) {
						zidan.destroy()
						this.diren[i].life -= 1
						if(this.diren[i].life <= 0) {
							this.score += this.diren[i].score
							this.scoreEle.innerText = "得分：" + this.score
							this.diren[i].boom()
							this.diren.splice(i, 1)
							this.shootCount += 1
							this.shootCountEle.innerText = "摧毁敌机数：" + this.shootCount
						}
					}
				}
			}
		}
	},
	isImpact: function(me) {
		this.isImpactTimer = setInterval(function() {
			if(this.diren.length > 0 && me) {
				for(var i = 0; i < this.diren.length; i++) {
					if((me.left() + me.width()) >= this.diren[i].left() && me.left() <= (this.diren[i].left() + this.diren[i].width())) {
						if(me.top() <= (this.diren[i].top() + this.diren[i].height()) && (me.top() + me.height()) >= this.diren[i].top()) {
							clearInterval(this.isImpactTimer)
							me.boom()
							this.diren[i].boom()
							this.diren.splice(i, 1)
							this.gameOver()
						}
					}
				}
			}
		}.bind(this), 1)
	},
	gameOver: function() {
		setTimeout(function() {
			var gameOverBg = document.createElement("div")
			gameOverBg.className = "gameOver-Bg"
			this.body.appendChild(gameOverBg)
			this.pause = true
			var gameOver = document.createElement("div")
			gameOver.className = "gameOver-Text"
			gameOver.innerText = "GAME OVER!"
			gameOverBg.appendChild(gameOver)
			
			var score = document.createElement("div")
			score.className = "gameOver-Score"
			score.innerText = "您的成绩是" + this.score + "分"
			gameOverBg.appendChild(score)
			
			var shootCount = document.createElement("div")
			shootCount.className = "gameOver-ShootCount"
			shootCount.innerText = "您摧毁了" + this.shootCount + "架敌机"
			gameOverBg.appendChild(shootCount)
			
			var reload = document.createElement("div")
			reload.className = "gameOver-Reload"
			reload.innerText = "重玩"
			gameOverBg.appendChild(reload)
			reload.onclick = function(){
				location.reload()
			}
		}.bind(this), 3000)

	}
}