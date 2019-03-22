window.onload=function(){
	layer.closeAll();
}
$(function(){
	//1.点击某个DIV或其他元素。
	//2.发现没有处理该事件，继续往上冒泡。
	//3.直到冒泡到body下面的子节点为止，还是没有人处理该事件的话，就把该事件丢弃掉。不再往上冒泡。
	//4.只要在这一条冒泡链当中，有一个节点处理了该事件，它就不会丢弃该事件，会继续往上冒，冒到body 然后document 然后window .
	//问题发现了，就是必须要有一个人处理这个事件，才会继续往上冒。
	//那么解决办法就是在body的下级，写个空函数接收一下事件。就行了。
	$("body").children().click(function () {	//iPhone safari中Document事件不触发的解决方案
		//这里不要写任何代码
	});

	var script = document.createElement("script");
	script.id = 'qd28521655308dc47884eca4879cea274328f98a51c7';
	script.type = "text/javascript";
	script.async = true;
	script.defer = true;
	script.src = "https://wp.qiye.qq.com/qidian/2852165530/8dc47884eca4879cea274328f98a51c7";
	document.body.appendChild(script);

//加载头部和尾部
	$(".createBanner").loadPage({
		url: 'header.html',
		id: '#banner',
		async: false
	})
	$(".createFooter").loadPage({
		url: 'header.html',
		id: '.footer',
		async: false,
	}, function(){
		bugAjax({
			type : 'get',
			url : 'settings/get'
		},function(data){
			console.log(data.root,data);
			var res = data.root || {};
			if (data.success) {
				$(".footer-companyFullname").html(res.companyName || '精雀体系（深圳）科技有限公司');

			} else {
				errorType(data);
			}
		})
	})
//有无token 页面显隐情况
	if (window.token == null){
		$(".noToken").show();
		$(".hasToken").hide();
	} else if(window.token != null){
		$(".noToken").hide();
		$(".hasToken").show();
	//获取登陆信息
		bugAjax({
			type: 'get',
			url: 'user/get'
		},function(data){
			// console.log(data.root, data);
			if (data.success){
				$(".hr_getPhone").html(data.root.phone);
				var userObj = {
					id: data.root.id,
					name: filterS(data.root.name),
					phone: data.root.phone,
					email: filterS(data.root.email),
					company: filterS(data.root.company),
					registerIP: data.root.registerIP,
					registerTime: data.root.registerTime,
					lastLoginIP: data.root.lastLoginIP,
					lastLoginTime: data.root.lastLoginTime,
				};
				console.log(userObj);
				bugStorage.setItem( 'userObj',JSON.stringify(userObj) );
				if ($(".wrapper").attr("data-value") == "changeInfo"){
					$(".ciName").val(userObj.name);
					$(".ciCompany").val(userObj.company);
					$(".ciEmail").val(userObj.email);
				} else {
				}
			} else {
				errorType(data);
			}
		})
	}
//退出登录
	$(document).on('click', '.hr_userLogout, .side_loginLogout', function(){
		layer.confirm("确定退出登录?", layerConfirm, function(index){
			bugAjax({
				type : "get",
				url : 'user/logout'
			},function(data){
				// console.log(data.root,data);
				if (data.success)  {
					layer.msg('退出成功...');
					bugStorage.delItem('token');
					bugStorage.delItem("orderDId");
					window.location.href = '/login.html';
				} else {
					errorType(data);
				}
			});
		})
	})



//头部nav on背景色
	function navOnBg(){
		$(".nav .nav-list li").each(function(index){
			if ( $(".wrapper").attr("data-value") == $(this).attr("data-value") ){
				$(this).addClass("cur").siblings("li").removeClass("cur");
			}
		})
	}
	navOnBg();

})

// layer.open回调相似
	function layerCallback(layero){
		layero.find(".layui-layer-setwin a").removeClass("layui-layer-ico").addClass("fa fa-remove");
		layero.find(".layui-layer-setwin").attr("title","关闭");
		layero.find(".cancelBtn").click(function(){
			layero.remove();
			$(".layui-layer-shade").last().remove();
			$("html").css({"overflow": 'initial'});
		})
		// slimScrollFn();
	}
//封装layer-confirm确认框的相似参数
	var layerConfirm ={
		title : '提示',
		move : false,
		success: function(layero, index){
			$(layero).find(".layui-layer-setwin a").removeClass("layui-layer-ico").addClass("fa fa-remove");
			$(layero).find(".layui-layer-setwin").attr("title","关闭");
		}
	}

//增加弹出层
function popupAdd(title, ele, fn){
	  console.log(getBoundingRect(document.documentElement))
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

//过滤
	function filterS(text){
		if ( text === undefined || text === '' || text === [] ) {
			return '';
		} else {
			return text;
		}
	}
  function filterSS(text){
    if ( text === undefined || text === '' || text === [] ) {
      return '';
    } else {
      return strRegExp(text);
    }
  }
	// 字符转义
  function strRegExp(str){
    if(typeof str == 'undefined')
        str = '';
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    //str = str.replace(/\&/g,'&amp;');
    str = str.replace(/\"/g,'&quot;');
    str = str.replace(/\'/g,'&#39;');
    str = str.replace(/\ /g,'&nbsp;');
    str = str.replace(/\    /g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    return str;
  }
//跨浏览器获取视口大小
	function getInner(){
		if (typeof window.innerWidth != 'undefined'){
			return {
				width: window.innerWidth,
				height: window.innerHeight
			}
		} else {
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		}
	}
//跨浏览器获取滚动条位置
	function getScroll(){
		return {
			top: document.documentElement.scrollTop || document.body.scrollTop,
			left: document.documentElement.scrollLeft || document.body.scrollLeft
		}
	}
//获取某一个元素到最外层顶点的距离
	function getOffsetTop(element){
		var top = element.offsetTop;		//得到第一层距离
		var parent = element.offsetParent;	//得到第一个父元素
		while (parent != null){				//如果还有上一层父元素
			top += parent.offsetTop;		//把本层的距离累加
			parent = parent.offsetParent;	//得到本层的父元素
		} //然后继续循环
		return top;
	}
