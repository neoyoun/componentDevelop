var H5_Loading = function (images , firstPage) {
	var id = this.id;
	if( this._images == undefined ){
		this._images = (images || []).length;
		this._loaded = 0;
		this._movePage = firstPage;
		window[id] = this;
		for( s in images){
			var item = images[s];
			var img = new Image;
				//给所有 img 注册 onload 方法，onload 方法实现更新进度的功能
				img.onload = function () {
					window[id].loader()
				}
				img.src = item;
		}
		$('#rate').text('0%');
		return this;
	}else{
		this._loaded ++;
		$('#rate').text((this._loaded/this._images*100>>0)+'%');
		if(this._loaded < this._images){
			return this;
		}
	}
	window[id] = null;
	this.el.fullpage({
      'css3':true,
	    onLeave: function (index,nextIndex,direction) {
	        $(this).find('.h5_component').trigger('onLeave')
			        },
	    afterLoad: function (anchorLink,index) {
	        $(this).find('.h5_component').trigger('onLoad');
	        $(this).find('.h5_component_name_footer').height($(document).width()*20/320 + 'px')
				      }
      })
		this.page[0].find('.h5_component').trigger('onLoad')
		this.el.show()
		if( this._movePage ){
			$.fn.fullpage.moveTo( this._movePage )
		}
		return this;
}