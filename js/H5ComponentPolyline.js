/* 柱图组件对象 */
var H5ComponentPolyline = function (name , cfg) {
	var component = new H5ComponentBase(name,cfg)

	var canvas = document.createElement('canvas')
	var w = cfg.width;
	var h = cfg.height
	canvas.width = w;
	canvas.height = h;
	var ctx =  canvas.getContext("2d");
	drawGrid(ctx,canvas.width,canvas.height)


var offCanvas = document.createElement('canvas')
		offCanvas.setAttribute('class','offcanvas')
    offCanvas.width = w;
	  offCanvas.height = h;
	var offCtx =  offCanvas.getContext("2d");

drawMain(offCtx,offCanvas.width,offCanvas.height)
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


	function drawGrid(ctx,w,h) {
		for(var i=0.1;i<1;i=i+0.1){
			ctx.beginPath();
			ctx.moveTo(i*w, 0);
			ctx.lineTo(i*w, h);
			ctx.lineWidth = 1;
	    ctx.strokeStyle = "#333";
			ctx.stroke();
		}
		for(var j=0.1;j<1;j=j+0.1){
			ctx.beginPath();
			ctx.moveTo(0, j*h);
			ctx.lineTo(w, j*h);
			ctx.lineWidth = 1;
	    ctx.strokeStyle = "#333";
			ctx.stroke();
		}
	}

component.get(0).appendChild(canvas)
component.get(0).appendChild(offCanvas)
	return component
}
