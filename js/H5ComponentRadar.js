/* 雷达图组件对象 */
var H5ComponentRadar = function  (name , cfg) {
	var component = new H5ComponentBase(name , cfg)
	var w = cfg.width, h = cfg.height,step = cfg.data.length,angle = 2/step*Math.PI,R = w/2;
	var canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
  var ctx = canvas.getContext("2d");
  for (var i = 0; i < 5; i++) {
  	var per = 1 - i*0.2;
  	var fillstyle= (i%2)?'#f1f9ff':'#99c0ff';
  	drawbg(per,fillstyle)
  };
  component.append(canvas)
  var canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
  var ctx = canvas.getContext("2d");

  function drawMain (per,rot) {
  	ctx.clearRect(0, 0, w, h);
  	ctx.save();
	  ctx.translate(w/2, h/2);
	  ctx.scale(per, per);
	  ctx.rotate(rot);
	  ctx.fillStyle = "#ff7676";
	  ctx.strokeStyle = "#ff7676";
	  ctx.lineWidth = 4;
	  for (var i = 0; i < cfg.data.length; i++) {
	  	var x = R*cfg.data[i][1]*2 * Math.cos(angle * i);
			var y = R*cfg.data[i][1]*2 * Math.sin(angle * i);
			ctx.beginPath();
			ctx.arc(x, y, 8, 0, 2*Math.PI, true);
			ctx.fill();
	  };
  
  ctx.beginPath();
	ctx.fillStyle = "#333";
  ctx.moveTo(x, y);
  for (var i = 0; i < cfg.data.length; i++) {
  	var x = R*cfg.data[i][1]*2 * Math.cos(angle * i);
		var y = R*cfg.data[i][1]*2 * Math.sin(angle * i);
		ctx.lineTo(x, y);
		//ctx.fillText( (cfg.data[i][1]*100>>0)+'%' , x*1.2, y*1.2);
		var textX = (w/2+ R* Math.cos(angle * i))/2;
		var textY = (h/2+ R* Math.sin(angle * i))/2;
		if(per>=1){
			ctx.font="20px Georgia";
		  ctx.fillText( (cfg.data[i][1]*100>>0)+'%' ,x>0?(x+10):(x-30), y>0?y+20:y-10);
			var text = $('<div class="text text_'+i+'"/>')
			    text.text(cfg.data[i][0])
			textX = textX>(w/2)?textX:textX-(w/2 - textX)*.1;
			textY = textY>(h/2)?textY:textY-(h/2 - textY)*.1;
			text.css({left : textX,top: textY})
			component.append(text)
	  }
  };
  ctx.stroke();
  ctx.restore();
  component.append(canvas)
  }
 
 function drawbg (per,fillstyle) {
	 	ctx.save();
	  	ctx.translate(w/2, h/2);
	  	ctx.scale(per, per);
		  ctx.beginPath();
		  ctx.moveTo(0, 0);
		for (var i = 0; i < cfg.data.length; i++) {
			var x = R * Math.cos(angle * i);
			var y = R * Math.sin(angle * i);
			var nextX = R * Math.cos(angle * (i+1))
			var nextY = R * Math.sin(angle * (i+1));
			ctx.lineTo(x, y);
			ctx.lineTo(nextX, nextY);
			ctx.moveTo(0, 0);
		};
		ctx.fillStyle = fillstyle;
		ctx.fill();
		ctx.lineWidth = 4;
	  ctx.strokeStyle = "#eee";
	  ctx.stroke();
	  ctx.restore();
 }
 component.on('onLoad' , function () {
		var  per = 0,startTime = Date.now(),T = 1000,rot = -2*Math.PI;
		requestAnimationFrame(function step () {
			per = Math.min(1.0 , (Date.now() - startTime)/T)
			rot = 2*Math.PI*(1-per)
			drawMain(per,rot)
			if(per < 1) {requestAnimationFrame(step)}
		})
	})
	component.on('onLeave' , function  () {
		var  per = 1,startTime = Date.now(),T = 1000,rot = 0;
		requestAnimationFrame(function step () {
			per = Math.max(0, (1-(Date.now() - startTime)/T))
			rot = 2*Math.PI*(1-per)
			drawMain(per,rot)
			if(per > 0 ) {requestAnimationFrame(step)}
		})
	})	

  
	return component
}
