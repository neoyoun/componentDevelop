/* 柱图组件对象 */
var H5ComponentPolyline = function (name , cfg) {
	var component = new H5ComponentBase(name,cfg);
	debugger;
	var w = cfg.width;
	var h = cfg.height;
	var step = cfg.data.length-1;

//画底图,垂直方向格子比水平方向多一个
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	
	var ctx =  canvas.getContext("2d");
	for(var i=0;i<=(step+1);i++){
	ctx.fillStyle = '#d2e2ff';
	var startH = i/(step+1)*h;
	var endH = (i+1)/(step+1)*h;
	if(i%2 == 0){
		ctx.beginPath();
		ctx.moveTo(0, startH);
		ctx.lineTo(w, startH);
		ctx.lineTo(w, endH);
		ctx.lineTo(0, endH);
		ctx.closePath();
		ctx.fill();
	}
}
		ctx.beginPath();
		for(var i=0;i<=step;i++){
			ctx.moveTo(w*(i/step), 0);
			ctx.lineTo(w*(i/step), h);
		}
		for(var i=0;i<=(step+1);i++){
			ctx.moveTo(0, (i/(step+1))*h);
			ctx.lineTo(w, (i/(step+1))*h);
		}

ctx.lineWidth = 2;
ctx.strokeStyle = "#d7d7d7";
ctx.stroke();
component.append(canvas);

//填充项名
var itemlist = $('<div class="itemlist">');
		itemlist.css({'position':'relative','top':h/2+20,'left':0,width:(w/step*(step+1))/2+'px'})
for (var i in cfg.data) {
	var item = $('<div class="item item_'+i+'">'+cfg.data[i][0]+'</div>')
	item.css({'width':(100/(step+1))+'%','float':'left','transform':'translateX(-50%)'})
	item.appendTo(itemlist)
}
component.append(itemlist);

//数据层 canvas 画布
var canvas = document.createElement('canvas')
var ctx =  canvas.getContext("2d");
    canvas.width = ctx.width = w;
		canvas.height = ctx.height = h;


component.on('onLoad' , function  () {
	var per = 0,startTime = Date.now(),T = 1000;
	requestAnimationFrame(function step () {
		per = Math.min(1.0 , (Date.now() - startTime)/T)
		drawMain(per)
		if(per < 1) {requestAnimationFrame(step)}
	})
})
component.on('onLeave' , function  () {
	var  per = 1,startTime = Date.now(),T = 1000;
	requestAnimationFrame(function step () {
		per = Math.max(0, (1-(Date.now() - startTime)/T))
		drawMain(per)
		if(per > 0 ) {requestAnimationFrame(step)}
	})
})

//数据层绘图方法，在 onLoad 事件触发后反复执行 清除画布->绘制新数据
function drawMain (per) {
		ctx.clearRect(0, 0, w, h);
		/*画线和阴影*/
	  ctx.beginPath();
	  ctx.font="22px microsoft yahei";
	  ctx.fillStyle = "#333";

	  ctx.moveTo(0,h);
	  for(var i in cfg.data){
	  	var x = (i/step)*w;
	  	var y = h*(1-cfg.data[i][1]*per);
	  	ctx.lineTo(x, y);
	  	if(x==0){
	  		x = x;
	  	}else if(x==w){
	  		x = x - 40;
	  	}else{
	  		x = x - 20;
	  	}
	  	ctx.fillText((cfg.data[i][1]*100*per>>0)+'%', x, (y-20));
	  }
	  ctx.lineWidth = 4;
	  ctx.strokeStyle = "#f2b9b0";
	  ctx.stroke();
	  ctx.lineTo(w, h);
	  ctx.lineTo(w/step, h);
	  ctx.fillStyle = "rgba(255, 178, 178, 0.5)";
	  ctx.fill();
	  /*画圆点*/
	  ctx.strokeStyle = "#ffb2b2";
	  ctx.fillStyle = "#fff";
	  ctx.lineWidth = 3;
		for(var i in cfg.data){
		  	var x = (i/step)*w;
		  	var y = h*(1-cfg.data[i][1]*per);
		  	ctx.beginPath();
		  	ctx.arc(x, y, 10, 0, 2*Math.PI, true);
		  	ctx.fill();
		  	ctx.stroke();
		  }
component.append(canvas)
}
return component
}
