/* 柱图组件对象 */
var H5ComponentBar = function (name , cfg) {
		var component = new H5ComponentBase (name , cfg)

		$.each(cfg.data , function  (idx , item) {
			var line = $('<div class="line line_'+idx+'"></div>')
			var name = $('<div class="name">'+item[0]+'</div>')
			var rate = $('<div class="rate">')
			rate.width(cfg.width*item[1])
			var process = $('<div class="bg"></div>')
			process.css('background-color' , item[2] || '#99c0ff')
			process.appendTo(rate)
			var per = $('<div class="per">'+item[1]*100+'%</div>')
			per.css({'color':item[2] || '#99c0ff'})
			
			line.append(name).append(rate).append(per)
			component.append(line)
			
		})
		return component	
}
