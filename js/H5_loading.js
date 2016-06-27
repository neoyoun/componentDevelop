/*定义loading逻辑*/
var H5_loading = function (images , firstPage) {
var id = this.id
if( this._images === undefined) {
	this._images = (images || []).length
  this._loaded = 0
  window[id] = this
		  for (s in images) {
					var item = images[s]
					var img = new Image()
					img.onload = function () {
						window[id].loader()
					}
					img.src = item
		   }
		$('.loading .rate').text('0%')
		debugger
		return this
}else{
	this._loaded++ 
	$('.loading .rate').text( ((this._loaded/this._images)*100 >> 0) + '%' )
	debugger
	if(this._loaded < this._images){
		return this
	}
}

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