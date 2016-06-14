/* 柱图组件对象 */
var H5ComponentPolyline = function (name , cfg) {
	var component = new H5ComponentBase(name,cfg)
	var canvas = $('<canvas id="canvas"/>')
	canvas.get(0).width = cfg.width/2;
	canvas.get(0).height = cfg.height/2;
	var cWidth = canvas.get(0).width;
	var cHeight = canvas.get(0).height;
	var ctx =  canvas.get(0).getContext("2d");
	initCanvas(ctx,cWidth,cHeight)

	function setPath() {
		
	}
	function initCanvas(ctx,w,h) {
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(0,h);
		ctx.lineTo(w,h);
		ctx.lineWidth = 3;
		ctx.fillStyle = "#ccc";
		ctx.stroke()
	}
component.append(canvas)
	return component
}
