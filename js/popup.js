
//识别设备终端
function plat(){
  let u = navigator.userAgent.toLowerCase();
  // console.log(u);
  // console.log(u);
  // let agents = ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod', 'blackberry'];

  let isMobile = /iphone|ipod|ipad|android.*mobile|windows.*phone|blackberry.*mobile/i.test(u);
  let isWx = /micromessenger/i.test(u);
  let isQQ = /mqq/i.test(u);
  let isAndroid = u.indexOf('android') > -1 || u.indexOf('linux') > -1;
  let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(u);

  return {
    isMobile,
    isWx,
    isQQ,
    isAndroid,
    isIos
  }
}
function getBoundingRect (element) {
  var rect = element.getBoundingClientRect();
  var top = document.documentElement.clientTop;
  var left= document.documentElement.clientLeft;

  return {
    top    :   rect.top - top,  //元素上边距离页面上边的距离
    bottom :   rect.bottom - top,  //元素下边距离页面上边的距离
    left   :   rect.left - left,  //元素左边距离页面左边的距离
    right  :   rect.right - left, //元素右边距离页面左边的距离
    width: rect.width,
    height: rect.height,
  }
}


// layer回调相似
function layerCallback(layero){
	layero.find(".layui-layer-setwin a").removeClass("layui-layer-ico").addClass("fa fa-remove");
	layero.find(".layui-layer-setwin").attr("title","关闭");
	layero.find(".layui-layer-content").css({height: 'auto'});
	layero.find(".cancelBtn").click(function(){
		layero.remove();
		$(".layui-layer-shade").last().remove();
	})
	slimScrollFn();
}

//增加弹出层
function popupAdd(title, ele, fn){

  layer.open({
  	title: "<span class='layer_title'><i class='fa fa-plus-circle'></i><strong>" + title + "</strong></span>",
    type: 1,
    area:  plat().isMobile ? (getBoundingRect(document.documentElement).width -30) + 'px' : '600px',
    // shadeClose: true,
    content: ele,
    offset: getBoundingRect(document.documentElement).width < 340 ? '10px' : '60px',
    shade:  [0.5, '#000000'],
    shift: 0,
    success: function(layero, index){
			layerCallback(layero);
			if (fn) { fn();  }
		}
  });
}
//编辑弹出层
function popupEdit(title, ele, fn){
  layer.open({
  	title: "<span class='layer_title'><i class='fa fa-edit'></i><strong>" + title + "</strong></span>",
    type: 1,
    area: '600px',
    // shadeClose: true,
    content: ele,
    offset: '60px',
    shade:  [0.5, '#000000'],
    shift: 0,
    success: function(layero, index){
			layerCallback(layero);
			if (fn) { fn(); }
		}
  });
}