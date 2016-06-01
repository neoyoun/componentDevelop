/* 基本图文组件对象 */
var H5ComponentBase = function ( name, cfg) {
	var cfg = cfg || {};
	var id = ('h5_c_'+Math.random()).replace('.','_')
	var cls = ' h5_component_'+cfg.type;
	var component  = $('<div class="h5_component h5_component_name_'+name+cls+'" id="'+id+'">')
	cfg.text && component.text(cfg.text)
	cfg.width && component.width(cfg.width/2)
	cfg.height && component.height(cfg.height/2)
	cfg.css && component.css( cfg.css )
	cfg.center === true && component.css({
                    left : '50%',
                    marginLeft : '-'+cfg.width/4+'px'
                })
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')')
	component.on('onLoad',function () {
		/*已有的 name className 会被忽略 下同*/
		component.addClass(cls+'_load').removeClass(cls + '_leave')
		cfg.animateIn && component.animate( cfg.animateIn)
		return false
	})
	component.on('onLeave',function () {
		component.addClass(cls+'_leave').removeClass(cls +'_load')
		cfg.animateOut && component.animate( cfg.animateOut)
		return false
	})
	return component
}