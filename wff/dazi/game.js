function Game(){
	this.char=[['Q','img/Q.png'],
	['W','img/W.png'],
	['E','img/E.png'],
	['R','img/R.png'],
	['T','img/T.png'],
	['Y','img/Y.png'],
	['U','img/U.png'],
	['I','img/I.png'],
	['O','img/O.png'],
	['P','img/P.png'],
	['A','img/A.png'],
	['S','img/S.png'],
	['D','img/D.png'],
	['F','img/F.png'],
	['G','img/G.png'],
	['H','img/H.png'],
	['J','img/J.png'],
	['K','img/K.png'],
	['L','img/L.png'],
	['Z','img/Z.png'],
	['X','img/X.png'],
	['C','img/C.png'],
	['V','img/V.png'],
	['B','img/B.png'],
	['N','img/N.png'],
	['M','img/M.png']];
	this.num = 5;
	this.speed= 10;
	this.current=[];
	this.position=[];
	this.score=0;
	this.gk=10;
	this.life=10;
	this.times=1;
	this.lifeobj = document.querySelector('.life>span');
	this.rbts = document.querySelector('.restart');
	this.scoreobj = document.querySelector('.score>span');
	this.guankaobj = document.querySelector('.guanka>span');
	this.timesobj = document.querySelector('.times>span');
	this.nbts = document.querySelector('.next');
	this.exit = document.querySelector('.exit');
	this.lifeobj.innerHTML = `${this.life}`
	this.scoreobj.innerHTML = `${this.score}`;
	this.guankaobj.innerHTML = `${this.gk}`;
	this.timesobj.innerHTML=`${this.times}`;
}//结束
	Game.prototype={
		start:function(){
			this.getChars();
			this.drop();
			this.key();
		},
		getChars:function(){                    //页面添加元素
			for(let i=0;i<this.num;i++){
				this.getChar();
			}
		},
		getChar:function(){   
			let  num = Math.floor(Math.random()*this.char.length);//添加一个的方法
			let divs = document.createElement('div');
			// let flag = true;
			//让页面元素不重复
			while(this.checkChar(this.char[num][0])){
				num = Math.floor(Math.random()*this.char.length);
			}
			divs.innerText = this.char[num][0];
			divs.classList.add('char');//添加数据
			//位置不重复
			let tops =Math.random()*300;
			let lefts = (innerWidth-400)*Math.random()+200;
			while(this.checkPosition(lefts)){
				lefts = (innerWidth-400)*Math.random()+200;
			}
			divs.style.cssText=`top:${Math.abs(tops)}px;
			left:${lefts}px;
			font-size:0;
			background:url(${this.char[num][1]}) no-repeat center/contain;`
			document.body.appendChild(divs);
			this.current.push(divs);
			this.position.push(lefts)
		},
		drop:function(){
			let that = this;
			this.t =setInterval(function(){
				for(i=0;i<that.current.length;i++){
					let tops = that.current[i].offsetTop+that.speed;
					that.current[i].style.top = `${tops}px`
					if(tops>=500){
						document.body.removeChild(that.current[i]);
						that.current.splice(i,1)
						that.position.splice(i,1)
						if(that.life == 0){
							clearInterval(that.t);
							that.rbts.style.display="block"
							that.exit.style.display="block"
                            that.rbts.onclick=function(){
                                that.score=0;
                                that.score.innerHTML = `${that.score}`
                                that.restart();
                                that.exit.style.display="none"
                                that.rbts.style.display="none"
                            }
							that.exit.onclick = function(){
								close();
							}
						}
						let flag= that.life--;
						that.lifeobj.innerText = flag;
						that.getChar();
					}
				}
			},600)
		},
		key:function(){
			let that = this;
			let rbts1 = document.querySelector('.restart1');
			let exit = document.querySelector('.exit');
			document.addEventListener('keydown',fn)
				function fn(e){
				for(i=0;i<that.current.length;i++){
					if(e.keyCode==that.current[i].innerText.charCodeAt()){
						that.score += 2;
						that.scoreobj.innerHTML = `${that.score}`
						document.body.removeChild(that.current[i]);
						that.current.splice(i,1)
						that.position.splice(i,1)
						that.getChar();
						if(that.score ==that.gk){
							document.removeEventListener('keydown',fn)
							that.score = that.gk
							that.nbts.style.display="block"
							that.rbts.style.display="block"
							clearInterval(that.t);
							that.rbts.onclick=function(){
								that.score=0;
								that.score.innerHTML = `${that.score}`
								that.restart();
								that.nbts.style.display="none"
								that.rbts.style.display="none"
							}
							that.nbts.onclick=function(){
								that.times++;
								that.timesobj.innerHTML=`${that.times}`;
								that.next();
								that.nbts.style.display="none"
								that.rbts.style.display="none"
							}
						}
					}
				}
			}
				
		},
		checkPosition:function(lefts){
			let flag = this.position.some(function(value){
				return Math.abs(value -lefts) <60;
			})
			return flag;
		},
		checkChar:function(char){
			return this.current.some(element=>{
				return element.innerText ==char
			})
			return flag;
		},
		restart:function(){
			clearInterval(this.t);
			for(let i=0;i<this.current.length;i++){
				document.body.removeChild(this.current[i])
			}
			this.scoreobj.innerHTML =0
			this.gk=10;
			this.times=1;
			this.life=0;
			this.current.length =0;
			this.position.length =0;
			this.start();
		},
		next:function(){
			clearInterval(this.t);
			for(let i=0;i<this.current.length;i++){
				document.body.removeChild(this.current[i])
			}
			this.life =10;
			this.current.length =0;
			this.position.length =0;
			this.num++;
			this.gk +=20;
			this.guankaobj.innerHTML = `${this.gk}`;
			if(this.num>=12){
				this.num=12;
				this.speed +=10;
			}
			this.start();
		},

	}//方法




