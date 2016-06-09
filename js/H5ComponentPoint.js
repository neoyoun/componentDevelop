/* 散点图表组件对象 */
var H5ComponentPoint = function  (name , cfg) {
	var component = new H5ComponentBase (name, cfg)
	var base = cfg.data[0][1]

	$.each(cfg.data , function  (idx , item) {
		var point = $('<div class="point point_'+idx +'">')
		var name = $('<div class="name">'+item[0]+'</div>')
		var rate = $('<div class="per">'+ (item[1]*100)+'%</div>')
		name.append(rate)
		point.append(name)
				var per = (item[1]/base * 100) + '%'
				point.width(per).height(per)

				if(item[2]){
					point.css('background-color' , item[2])
				}
				if( item[3] !== undefined && item[4] !== undefined){
					point.css('left' , item[3]).css('top' , item[4])

					
				}
				point.css('z-index' , 100-idx)

				point.css('left', (50 - ((item[1]/base)*50)) +'%').css('top',0)
				point.data('left' , item[3]).data('top' , item[4]).data('initLeft',(50 - ((item[1]/base)*50)) +'%')
				point.css('transition' , 'all 1s '+idx*.5+'s')

		point.appendTo(component)
	})

	component.on('onLoad' , function  () {
		component.find('.point').each(function  (idx , item) {
			$(item).css('left' , $(item).data('left')).css('top' , $(item).data('top')).css('opacity' , 1)
		})
	})
	component.on('onLeave' , function  () {
		component.find('.point').each(function  (idx , item) {
			$(item).css('left' , $(item).data('initLeft')).css('top' , 0).css('opacity' , 0.5)
		})
	})


	return component
}
