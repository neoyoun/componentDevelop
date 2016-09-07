/* 饼图组件对象 */
var H5ComponentPie = function  (name,cfg) {
	var component = new H5ComponentBase (name , cfg);
	debugger;
	var w = cfg.width, h = cfg.height,step = cfg.data.length,r = w/2;
	var sAngle = 1.5 * Math.PI ,aAngle = 2 * Math.PI,eAngle = 0;

/*背景层绘制*/
	var canvas = document.createElement('canvas')
	    canvas.width = w;
	    canvas.height = h;
	var ctx = canvas.getContext("2d");
	    ctx.save();
	    ctx.translate(w/2, h/2);
	    ctx.beginPath();
	    ctx.moveTo(0, 0);
	    ctx.fillStyle = "#ccc";
	    ctx.arc(0, 0, r, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.restore();
      component.append(canvas)
/*画饼图内容 数据层*/
	var canvas = document.createElement('canvas')
	    canvas.width = w;
	    canvas.height = h;
	var ctx = canvas.getContext("2d");
	window.ctx = ctx
	var color = ['#ff7676' , '#5ddbd8' , '#ffad69' , '#99c0ff']
	    ctx.save();
	    ctx.translate(w/2, h/2);
	    for (var i = 0; i < step; i++) {
			    	var item = cfg.data[i]
			    	eAngle = sAngle + item[1]*aAngle;
			    	ctx.beginPath();
			    	ctx.fillStyle = item[2] || color.shift();
			    	ctx.moveTo(0, 0);
			      ctx.arc(0, 0, r, sAngle, eAngle);
			      ctx.fill();
			      var textAngle = (eAngle+sAngle)/2
			      sAngle = eAngle

        /*开始添加文本*/
        var textX = w/4 + r * Math.cos(textAngle)/2
	      var textY = h/4 + r * Math.sin(textAngle)/2
	    	var text = $('<div class="text" />')
	    	text.text(item[0])
	    	if(textX >= (w/4)){
	    		text.css('left' ,(textX+10))
	    	}else{
	    		text.css('right' , (w/2-textX+10))
	    	}
	    	text.css({'top' : textY})
	    	var per = $('<div class="per" />')
	    	per.text((item[1]*100>>0)+'%')
	    	text.append(per)
	    	component.append(text)
	    }
	    ctx.restore();
	    component.append(canvas)

	    /*遮罩层动画*/
	var canvas = document.createElement('canvas')
	    canvas.width = w;
	    canvas.height = h;
	var ctx = canvas.getContext("2d");
	component.append(canvas)

	    function drawMasking (per) {
	    	ctx.clearRect(0, 0, w, h);
	    	ctx.save();
	      ctx.translate(w/2, h/2);
	      ctx.beginPath();
	    	ctx.fillStyle = '#eee'
	    	ctx.moveTo(0, 0);
	      ctx.arc(0, 0, r, sAngle, sAngle + aAngle*per, true);
	      ctx.fill();
	      ctx.restore();
	    }

	component.on('onLoad' , function  () {
		setTimeout(function () {
			var per = 0,startTime = Date.now(),T = 1500;
			requestAnimationFrame(function step () {
			per = Math.min(1.0 , (Date.now() - startTime)/T)
				
			drawMasking(per)
			if(per < 1) {requestAnimationFrame(step)}
		})
		}, 1000)
		
	})
	component.on('onLeave' , function  () {
		var per = 1,startTime = Date.now(),T = 1500;
		requestAnimationFrame(function step () {
			per = Math.max(0, (1-(Date.now() - startTime)/T))
			
			drawMasking(per)
			if(per > 0 ) {requestAnimationFrame(step)}
		})
	})	
	return component
}