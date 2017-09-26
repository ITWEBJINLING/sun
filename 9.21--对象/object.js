
	function float(obj){
		this.obj=obj;
		this.max=innerWidth - this.obj.offsetWidth;
		this.mbx=innerHeight - this.obj.offsetHeight;
		this.speed=20;
		this.speeds=20;
	}
	float.prototype.resize=function(){
		this.max=innerWidth - this.obj.offsetWidth;
		this.mbx=innerHeight - this.obj.offsetHeight;
	}
	float.prototype.stop=function(){
		clearInterval(this.t)
	}
	float.prototype.move=function(){
		let that =this;
		this.t = setInterval(function(){
			let lefts=that.obj.offsetLeft+that.speed;
			let tops=that.obj.offsetTop+that.speeds;
			if(lefts>=that.max){
				lefts=that.max;
				that.speed *=-1;
			}
			if(lefts<=0){
				lefts=0;
				that.speed *=-1;
			}
			if(tops>=that.mbx){
				tops=that.mbx;
				that.speeds *=-1;
			}
			if(tops<=0){
				tops=0;
				that.speeds *=-1;
			}
			that.obj.style.left=lefts+'px';
			that.obj.style.top=tops+'px';
		},60)
	}
