/*
* 属性
*   线宽、端点、填充、描边、样式、边数
* 方法：
*   划线、虚线、矩形、多边形、多角形、圆、铅笔、文字
*   橡皮
*   撤销
*   裁切
*   新建
*   保存
*  当前位置加鼠标移动的距离
* */
class Pallette{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.cw = this.canvas.offsetWidth;
        this.ch = this.canvas.offsetHeight;
        this.history=[];
        this.style='stroke';
        this.lineWidth = '1';
        this.lineCap = 'butt'
        this.fillStyle = '#666666'
        this.strokeStyle = '#555555'
        this.temp = null;
    }
    init(){
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineCap=this.lineCap;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.strokeStyle=this.strokeStyle;
        this.ctx.setLineDash([0,0])
    }
    draw(type,num){
        this.canvas.onmousedown=function(e){
            let cx=e.offsetX,cy = e.offsetY;
            this.canvas.onmousemove=function (e) {
                let ox= e.offsetX, oy = e.offsetY;
                this.ctx.clearRect(0,0,this.cw,this.ch)
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }
                this[type](cx,cy,ox,oy,num);
            }.bind(this);
            this.canvas.onmouseup=function(){
                this.canvas.onmousemove=null;
                this.canvas.onmouseup=null;
                this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch))
            }.bind(this)
        }.bind(this)
    }
    line(cx,cy,ox,oy){
        this.init();
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy)
        this.ctx.lineTo(ox,oy)
        this.ctx.closePath();
        this.ctx.stroke();
    }
    dash(cx,cy,ox,oy){
         this.ctx.setLineDash([3,10])
         this.ctx.beginPath();
         this.ctx.moveTo(cx,cy)
         this.ctx.lineTo(ox,oy)
         this.ctx.closePath();
         this.ctx.stroke();
    }
    rect(cx,cy,ox,oy){
        this.init();
        this.ctx.beginPath();
        let w = ox-cx,h=oy-cy;
        this.ctx.moveTo(cx,cy);
        this.ctx.rect(cx,cy,w,h)
        this.ctx[this.style]();
    }
    ploy(cx,cy,ox,oy,num){
          let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
          let rad = Math.PI *2/num;
          this.init();
          this.ctx.beginPath();
          this.ctx.moveTo(cx+r, cy)
          for(let i=0;i<num;i++){
              let x = cx+ r*Math.cos(rad*i),
                  y = cy+ r*Math.sin(rad*i);
              this.ctx.lineTo(x, y);
          }
          this.ctx.closePath();
        this.ctx[this.style]();
    }
    ployJ(cx,cy,ox,oy,num){
        let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        let rad = Math.PI /num;
        this.init();
        this.ctx.beginPath();
        this.ctx.moveTo(cx+r, cy)
        for(let i=0;i<2*num;i++){
            let r1 = i%2==0?r:r/2
            let x = cx+r1*Math.cos(rad*i),
                y = cy+r1*Math.sin(rad*i);
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
    }
    circle(cx,cy,ox,oy){
        let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.init();
        this.ctx.beginPath();
        this.ctx.arc(cx,cy,r,0,Math.PI*2)
        this.ctx.closePath();
        this.ctx[this.style]();
    }
    pen(){
        this.canvas.onmousedown=function(e){
            let cx = e.offsetX,
                cy = e.offsetY;
            this.init();
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy);
            this.canvas.onmousemove=function(e){
                let ox = e.offsetX,oy = e.offsetY;
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }
                this.ctx.lineTo(ox, oy);
                this.ctx.stroke();
            }.bind(this)
            this.canvas.onmouseup=function(){
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                this.canvas.onmousemove=null;
                this.canvas.onmouseup=null;
            }.bind(this)
        }.bind(this)
    }
    eraser(xw,xh){
        let eraser = document.querySelector('.eraser');
        this.canvas.onmousedown=function(){
            eraser.style.display='block';
            this.canvas.onmousemove=function (e) {
                let ex = e.offsetX-xw/2,ey = e.offsetY-xh/2;
                let lefts = ex,tops=ey;
                if(lefts<0){
                    lefts =0
                }else if(lefts>this.cw-xw){
                    lefts = this.cw-xw;
                }
                if(tops<0){
                    tops =0
                }else if(tops>this.ch-xh){
                    tops = this.ch-xh;
                }
                eraser.style.top=tops+122+'px';
                eraser.style.left=lefts+'px';
                this.ctx.clearRect(ex,ey,xw,xh);
            }.bind(this)
            this.canvas.onmouseup=function(){
                this.canvas.onmousemove=null;
                eraser.style.display='none';
                this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch))
            }.bind(this)
        }.bind(this)
    }
    cancle(){
        this.history.pop();
        if(this.history.length==0){
            return;
        }
        this.ctx.putImageData(this.history[this.history.length-1],0,0)
    }
    text(){
        let lefts,tops;

        this.canvas.onmousedown = function(e){
            this.canvas.onmousedown=null;
            let cx = e.offsetX-50,
                cy = e.offsetY-30;
            let divs = document.createElement('div');
            divs.contentEditable='true';
            divs.id='text'
            divs.style.cssText=`
                width:100px;
                height:60px;
                border:1px dashed #666;
                position:absolute;
                top:${cy}px;
                left:${cx}px;
                 z-index: 9999;
                 cursor:move;
                `
            this.canvas.appendChild(divs);
              divs.onmousedown=function(e){
                  let cx =e.clientX,cy = e.clientY;
                  let left = divs.offsetLeft,top = divs.offsetTop;
                  this.canvas.onmousemove=function (e) {
                      let ox = e.clientX, oy = e.clientY;
                      tops = top+oy-cy,lefts = left+ox-cx;
                      if(lefts <= 0){
                          lefts =0
                      }else if(lefts>this.cw-100){
                          lefts = this.cw-100;
                      }
                      if(tops <= 0){
                          tops =0
                      }else if(tops >= this.ch-60){
                          tops = this.ch-60;
                      }
                      divs.style.top = `${tops}px`;
                      divs.style.left = `${lefts}px`;
                  }.bind(this)
                  this.canvas.onmouseup=function(){
                      this.canvas.onmousemove=null;
                      this.canvas.onmouseup=null;
                      this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch))
                  }.bind(this)
              }.bind(this)

            divs.onblur=function(){
                let value =divs.textContent;
                this.canvas.removeChild(divs)
                this.ctx.font='15px sans-serif'
                this.ctx.textAlign='center'
                this.ctx.textBaseline='middle'
                this.ctx.fillText(value,lefts,tops);
                this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch))
            }.bind(this)
        }.bind(this)
    }
    clip(obj){
        let minX,minY,w,h;
        this.canvas.onmousedown=function(e){
            let cx =e.offsetX,cy =e.offsetY;
            obj.style.display='block'
            obj.style.width = 0+'px';
            obj.style.height= 0+ 'px'
            this.canvas.onmousemove=function(e){
                let ox = e.offsetX,oy =e.offsetY;
                w = Math.abs(ox-cx);
                h=Math.abs(oy-cy);
                minX = ox>=cx ? cx : ox;
                minY = oy>=cy ? cy : oy;
                obj.style.top = minY+'px';
                obj.style.left = minX+'px';
                obj.style.width = w+'px';
                obj.style.height= h+ 'px'
            }
            this.canvas.onmouseup=function(){
                this.canvas.onmousemove =null;
                this.canvas.onmouseup =null;
                this.temp =  this.ctx.getImageData(minX, minY, w, h)
                this.ctx.clearRect(minX,minY,w,h)
                this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch))
                this.ctx.putImageData(this.temp,minX,minY)
                this.drug(minX,minY,obj)
            }.bind(this)
        }.bind(this)
    }
    drug(x,y,obj){
        this.canvas.onmousedown=function(e){
            let cx =e.offsetX,cy = e.offsetY;
            this.canvas.onmousemove=function(e){
                let ox = e.offsetX,oy = e.offsetY;
                let lefts = x + ox-cx,tops = y + oy-cy;
                obj.style.top = tops + 'px';
                obj.style.left = lefts + 'px';
                this.ctx.clearRect(0,0,this.cw,this.ch)
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }
                this.ctx.putImageData(this.temp,lefts,tops);
            }.bind(this)
            this.canvas.onmouseup=function(){
                this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch))
                this.temp = null;
                obj.style.display = 'none'
                this.canvas.onmousemove =null;
                this.canvas.onmouseup =null;
            }.bind(this)
        }.bind(this)
    }
    clear(){
        this.ctx.clearRect(0,0,this.cw,this.ch)
        this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch))
    }
    reverse(){
        let imageData =  this.ctx.getImageData(0, 0, this.cw, this.ch);
        for(let i =0;i<imageData.data.length;i+=4){
            imageData.data[i] = 255-imageData.data[i];
            imageData.data[i+1] = 255-imageData.data[i+1];
            imageData.data[i+2] = 255-imageData.data[i+2];
        }
        this.ctx.putImageData(imageData,0,0);
    }
    gray(){
        let imageData =  this.ctx.getImageData(0, 0, this.cw, this.ch);
        for(let i =0;i<imageData.data.length;i+=4){
            imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] =
                (imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3;
        }
        this.ctx.putImageData(imageData,0,0);
    }
}