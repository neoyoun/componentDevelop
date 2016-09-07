/* 内容管理对象 */
var H5 = function () {
	this.id = ('h5_'+Math.random()).replace('.','_')
	this.el = $('<div class="h5" id="'+this.id+'">').hide()
	this.page = []
	$('body').append(this.el)
	/*新增一个页
	*@param {string} name 组件的名称,会加入到 className 中
	*@param {string} text 页内的默认文本
	*@return {H5} H5对象, 可以重复使用H5对象支持的方法
	*/
	this.addPage = function (name , text) {
		var page = $('<div class="h5_page section">')
		if(name != undefined){
			page.addClass('h5_page_'+name)
		}
		if(text != undefined){
			page.text(text)
		}
		page.appendTo(this.el)
		this.page.push( page )
		return this
	},
	this.addComponent = function (name,cfg) {
		var cfg  = cfg || {}
		cfg = $.extend({
			type : 'base'
		},cfg)
		var component;
		switch(cfg.type){
			case 'base':
				component = new H5ComponentBase(name,cfg);
			break;
			case 'point' :
			  component = new H5ComponentPoint(name,cfg);
			break;
			case 'polyline' :
				component = new H5ComponentPolyline(name,cfg);
				console.log(component[0]);
			break;
			case 'pie' :
				component = new H5ComponentPie(name,cfg);
			break;
			case 'bar' :
				component = new H5ComponentBar(name,cfg);
			break;
			case 'bar_v' :
				component = new H5ComponentBar_v(name,cfg);
			break;
			case 'radar' :
				component = new H5ComponentRadar(name,cfg);
			break;
			case 'ring' :
				component = new H5ComponentRing(name,cfg);
			break;
			default:
		}
		var page = this.page.slice(-1)[0];
		page.append(component)
		return this
	},
	/*h5对象初始化呈现*/
	this.loader = function (firstPage) {

		this.el.fullpage({
      'css3':true,
      onLeave: function (index,nextIndex,direction) {
		            $(this).find('.h5_component').trigger('onLeave')
		        },
      afterLoad: function (anchorLink,index) {
			          $(this).find('.h5_component').trigger('onLoad')
			          $(this).find('.h5_component_name_footer').height($(document).width()*20/320 + 'px')
			      }
            })
		this.page[0].find('.h5_component').trigger('onLoad')
		this.el.show()
		if( firstPage ){
			$.fn.fullpage.moveTo( firstPage )
		}
	}

	return this
}