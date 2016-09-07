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
	var ctx = canvas.getContext("2d");
	var eAngle = Math.PI + Math.PI*cfg.overRatio;
			ctx.translate(canvasW/2, canvasH/2);
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

	topContainer.append(canvas);
	var topDesc = $('<div class="top-desc">');
			topDesc.css({'position':'absolute','width':'100%','text-align':'center','bottom':'10px'}).text((cfg.overRatio*100>>0)+'%的课程观看人数过万');
	topContainer.append(topDesc);
	
	component.append(topContainer);
	var subContainer = $('<div class="sub-container">');

	$.each(cfg.data , function appendItem(idx , item) {
		var itemContainer = $('<div class="item-container">');
		itemContainer.css({'width':w/6,float:'left'});
		itemContainer.append(drawItem(item[1]));
		itemContainer.append('<div class="item-desc">'+item[0]+'</div>');
		itemContainer.appendTo(subContainer);
	})
	component.append(subContainer);

	function drawItem(ratio) {
		var canvas = document.createElement('canvas');
		var startAngle = (1.5-ratio)*Math.PI;
		var endAngle = (1.5+ratio)*Math.PI;
		var canvasW = w/3,canvasH = w/3;
		canvas.width = canvasW;
		canvas.height = canvasH;
		var ctx = canvas.getContext('2d');
			ctx.save();
			ctx.translate(canvasW/2, canvasH/2);
			//画蓝色圈
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.fillStyle = "#c9e3f7";
			ctx.arc(0, 0, canvasW/2, 0, 2*Math.PI);
			ctx.fill();
			//画比例圈
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.fillStyle = "#ff7676";
			ctx.arc(0, 0, canvasW/2, startAngle, endAngle);
			ctx.fill();
			//画内圈和文字
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.fillStyle = "#fff";
			ctx.arc(0, 0, canvasW/3, 0, 2*Math.PI);
			ctx.fill();
			ctx.font="30px helvetical";
			ctx.fillStyle = "#000";
			ctx.fillText((ratio*100>>0)+'%', -20, 10);

		return canvas;
	}

	component.on('onLoad',function () {
		
	})
	component.on('onLeave',function () {
		
	})
	return component;
}