/* 环图组件对象 */
var H5ComponentRing = function (name , cfg) {
	var component = new H5ComponentBase(name,cfg);
	var w = cfg.width;
	var h = cfg.height;

	var topContainer = $('<div class="top-container">');
			topContainer.height(h/4).css({'position':'relative','font-size':'20px'});
	var canvas = document.createElement('canvas');
	var canvasW = w;
	var canvasH = w;
			canvas.width = canvasW;
			canvas.height = canvasH;
	topContainer.append(canvas);

	var topDesc = $('<div class="top-desc">');
			topDesc.css({'position':'absolute','width':'100%','text-align':'center','bottom':'10px'});
	topContainer.append(topDesc);
	var ctx = canvas.getContext("2d");
	drawBigRing(0);
	function drawBigRing(per) {
		ctx.clearRect(0, 0, canvasW, canvasH);
		ctx.save();
		ctx.translate(canvasW/2, canvasH/2);
		var eAngle = Math.PI + Math.PI*cfg.overRatio*per;
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, canvasW/2, Math.PI, 2*Math.PI);
			ctx.arc(0, 0, canvasW/4, 2*Math.PI, Math.PI, true);
			ctx.fillStyle = "#c9e3f7";
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, canvasW/2, Math.PI, eAngle);
			ctx.arc(0, 0, canvasW/4, eAngle, Math.PI, true);
			ctx.clip();
			ctx.fillStyle = "#ff7676";
			ctx.fill();
			ctx.restore();
			ctx.beginPath();
			ctx.moveTo(-10, 0);
			ctx.lineTo(canvasW/4*Math.cos(eAngle) , canvasW/4*Math.sin(eAngle));
			ctx.lineTo(10, 0);
			ctx.arc(0, 0, 15, 0, 2*Math.PI);
			ctx.fillStyle = "#ff7676";
			ctx.fill();
			ctx.restore();
	topDesc.text((cfg.overRatio*per*100>>0)+'%的课程观看人数过万');
	}
	
	component.append(topContainer);
	var subContainer = $('<div class="sub-container">');
			component.append(subContainer);
/*
 *环组件中有上下两部分，动画效果由于需要遍历每个小环，想不到好的办法和上半部分联动
 *在组件载入时填充下半部分，切换组件时清空
 *由此会带来额外的DOM操作，并不是好办法；
 */
		function fillSubContainer () {
			$.each(cfg.data , function appendItem(idx , item) {
				var itemContainer = $('<div class="item-container">');
				var canvas = document.createElement('canvas');
				window.sCanvas = canvas;
				itemContainer.css({'width':w/6,float:'left'});
				itemContainer.append(canvas);
				drawItem(canvas , item[1],0);
					var per=0 , startTime = Date.now(),T= cfg.duration+cfg.delay || 1000;
					var timer = setInterval(function () {
						per = (Date.now() - startTime)/T;
						drawItem(canvas , item[1],per);
						if(per>=1){
							clearInterval(timer);
						}
					}, 20)
				itemContainer.append('<div class="item-desc">'+item[0]+'</div>');
				itemContainer.appendTo(subContainer);
			})
		}
  	
	function drawItem(canvas,ratio,per) {
		var startAngle = (1.5-ratio)*Math.PI;
		var endAngle = startAngle+ratio*per*2*Math.PI;
		var canvasW = w/3,canvasH = w/3;
		canvas.width = canvasW;
		canvas.height = canvasH;
		var ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, canvasW, canvasH);
				ctx.save();
				ctx.translate(canvasW/2, canvasH/2);
				ctx.save();
				//画蓝色环
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.arc(0, 0, canvasW/2, 0, 2*Math.PI);
				ctx.arc(0, 0, canvasW/3, 2*Math.PI, 0 , true);
				ctx.fillStyle = "#c9e3f7";
				ctx.fill();
				//画比例环
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.fillStyle = "#ff7676";
				ctx.arc(0, 0, canvasW/2, startAngle, endAngle);
				ctx.arc(0, 0, canvasW/3, endAngle, startAngle , true);
				ctx.clip();
				ctx.fill();
				ctx.restore();
				//画内圈和文字
				ctx.font="30px helvetical";
				ctx.fillStyle = "#000";
				ctx.fillText((ratio*100*per>>0)+'%', -20, 10);
				ctx.restore();
	}
window.drawItem = drawItem;
	component.on('onLoad',function () {
		var per=0,startTime = Date.now(),T = cfg.duration || 1000;
		requestAnimationFrame(function step() {
			per = Math.min( (Date.now()-startTime)/T ,1.0);
			drawBigRing(per);
			if( per < 1){requestAnimationFrame(step)}
		})
		fillSubContainer();
	})
	component.on('onLeave',function () {
		subContainer.empty();
	})
	return component;
}