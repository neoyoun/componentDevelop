/* 柱图组件对象 */
var H5ComponentPolyline = function (name , cfg) {
	var component = new H5ComponentBase(name,cfg)
	var w = cfg.width;
	var h = cfg.height;
	var step = cfg.data.length+1

	var canvas = document.createElement('canvas')
	canvas.width = w;
	canvas.height = h;
	var ctx =  canvas.getContext("2d");
	ctx.beginPath();
		for(var i=0;i<=step;i++){
			ctx.moveTo(w*(i/step), 0);
			ctx.lineTo(w*(i/step), h);
		}
		for(var i=0;i<=step;i++){
			ctx.moveTo(0, (i/step)*h);
			ctx.lineTo(w, (i/step)*h);
		}
ctx.lineWidth = 1;
ctx.strokeStyle = "#565656";
ctx.stroke();
component.append(canvas)


var canvas = document.createElement('canvas')
	  
var ctx =  canvas.getContext("2d");
    canvas.width = ctx.width = w;
	  canvas.height = ctx.height = h;

function drawMain (per) {
		ctx.clearRect(0, 0, w, h);
		/*画线和阴影*/
	  ctx.beginPath();

	  ctx.font="20px Georgia";
	  ctx.fillStyle = "#333";
	  ctx.moveTo(w/step, h*(1-cfg.data[0][1]*per));
	  for(var i in cfg.data){
	  	var x = (i/step)*w+w/step;
	  	var y = h*(1-cfg.data[i][1]*per);
	  	ctx.lineTo(x, y);
	  	ctx.fillText((cfg.data[i][1]*100*per>>0)+'%', (x-20), (y-20));
	  }
	  ctx.lineWidth = 4;
	  ctx.strokeStyle = "#f2b9b0";
	  ctx.stroke();
	  ctx.lineTo(x, h);
	  ctx.lineTo(w/step, h);
	  ctx.fillStyle = "rgba(255, 178, 178, 0.5)";
	  ctx.fill();
	  /*画圆点*/
	  ctx.strokeStyle = "#ffb2b2";
	  ctx.fillStyle = "#ff";
	  ctx.lineWidth = 3;
	 for(var i in cfg.data){
	  	var x = (i/step)*w+w/step;
	  	var y = h*(1-cfg.data[i][1]*per);
	  	ctx.beginPath();
	  	ctx.arc(x, y, 10, 0, 2*Math.PI, true);
	  	ctx.fill();
	  	ctx.stroke();
	  }
component.append(canvas)
}
var itemlist = $('<div class="itemlist">')
		itemlist.css({'position':'relative','top':h/2,'left':0})
for (var i in cfg.data) {
	var item = $('<div class="item item_'+i+'">'+cfg.data[i][0]+'</div>')
	item.css({'position':'absolute', 'left': ((i/step)*w+w/step)/2})
	item.appendTo(itemlist)
}
component.append(itemlist)
component.on('onLoad' , function  () {
		var  per = 0,startTime = Date.now(),T = 1000;
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
return component
}
