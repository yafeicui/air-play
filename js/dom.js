function Dom(){
	this.width = function(){
		return this.body.offsetWidth
	}
	this.height = function(){
		return this.body.offsetHeight
	}
	this.left = function(){
		return this.body.offsetLeft
	}
	this.top = function(){
		return this.body.offsetTop
	}
}
