/* 基本图文组件对象 */
var H5ComponentBase = function ( name, cfg) {
	var cfg = cfg || {};
	var id = ('h5_c_'+Math.random()).replace('.','_')
	var cls = ' h5_component_'+cfg.type;
	var component  = $('<div class="h5_component h5_component_name_'+name+cls+'" id="'+id+'">')
	cfg.text && component.text(cfg.text)
	cfg.code && component.html(cfg.code)
	cfg.width && component.width(cfg.width/2)
	cfg.height && component.height(cfg.height/2)
	cfg.css && component.css( cfg.css )
	cfg.center === true && component.css({
                    left : '50%',
                    marginLeft : '-' + cfg.width/4 + 'px'
                })
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')')
	/*
	*获取父节点的偏移量，必须已经添加进dom结构才可以获取
	*使用css3 的translate属性来进行偏移
	*/
/*	if(cfg.relativeTo){
		var parent = $('body').find('.h5_component_name_'+cfg.relativeTo)
		var position = {
			left : $(parent)[0].offsetLeft,
			top : $(parent)[0].offsetTop
		}
		if(cfg.center === true){
			position.left = 0
		}
		component.css('transform' , 'translate('+ position.left +'px,'+ position.top +'px')
	}*/
	

	component.on('onLoad',function () {
		/*方法二、修改dom结构实现 relativeTo
		*处理dom元素应该在添加进结构中后才进行操作
		*需要添加一个自动触发 onLoad 事件的代码段
		*/
		if (cfg.relativeTo) {
				var parent = component.parent().find('.h5_component_name_'+cfg.relativeTo)
				component.appendTo(parent)
			};

		/*已有的 name className 会被忽略 下同*/
		setTimeout(function () {
		  component.addClass(cls+'_load').removeClass(cls + '_leave')
		  cfg.animateIn && component.animate( cfg.animateIn)
		}, cfg.delay || 0)
		
		return false
	})
	component.on('onLeave',function () {
		setTimeout(function () {
			component.addClass(cls+'_leave').removeClass(cls +'_load')
		  cfg.animateOut && component.animate( cfg.animateOut )
		}, cfg.delay || 0)
		
		return false
	})
	return component
}