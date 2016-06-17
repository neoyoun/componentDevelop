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
	  ctx.strokeStyle = "#ffb2b2";
	  ctx.lineWidth = 3;
	  
	  for(var i in cfg.data){
	  	var x = (i/step)*w+w/step;
	  	var y = h*(1-cfg.data[i][1]);
	  	console.log(x,'==>',y)
	  	ctx.beginPath();
	  	ctx.arc(x, y, 10, 0, 2*Math.PI, true);
	  	ctx.stroke();
	  }
	  ctx.beginPath();
	  ctx.moveTo(w/step, h*(1-cfg.data[i][1]));
	  for(var i in cfg.data){
	  	var x = (i/step)*w+w/step;
	  	var y = h*(1-cfg.data[i][1]);
	  	ctx.lineTo(x, y);
	  }
	  ctx.stroke();
	  
	  
component.append(canvas)


//drawMain(offCtx,offCanvas.width,offCanvas.height)
  function drawMain(ctx,w,h) {
		ctx.strokeStyle = "#f0f";
		$.each(cfg.data,function  (idx,item) {
			ctx.beginPath();
			ctx.fillStyle = "#f0f";
			ctx.arc(idx*0.2*w, (100-item[1])/100*h, 10, 0, 2*Math.PI, false);
			ctx.fill();
		})

		ctx.beginPath();
		ctx.moveTo(0, h);
		$.each(cfg.data , function  (idx,item) {
			ctx.lineTo(idx*0.2*w, (100-item[1])/100*h);
		})
		ctx.lineTo(w, h);
		ctx.closePath();
		ctx.fillStyle = "rgba(114, 164, 241, 0.56)";

		ctx.stroke();
		ctx.fill();	
		
  }
window.ctx = ctx;

	return component
}
