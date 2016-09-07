/* 垂直柱图组件对象 */

var H5ComponentBar_v =function ( name, cfg ) {
  //  任务二：(1) 完成 component 的初始化定义（补全 var component = ???）
  var component =  new H5ComponentBar( name ,cfg );
  component.find('.line').height(cfg.height/2)
  //高度和宽度对转
  var wStep = 100/cfg.data.length
  component.find('.line').width(wStep+'%')
	$.each(component.find('.rate') , function  () {
		var width = $(this).css('width')
		$(this).height(width).width('')
	})
//重置dom结构 由上至下变为 per -> rate -> name (原先为name->rate->per)
component.find('.per').each(function(){$(this).prev('.rate').append($(this))})

return component;
}