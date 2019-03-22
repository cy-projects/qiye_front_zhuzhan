$(function(){
//筛选框按钮点击动画效果
	buttonDownFn('.main_dropdown button');
	buttonDownFn('.main_dropdown label');
//主页下拉(js自写，没有采用Bootstrap，详情页的下拉采用了Bootstrap)
	$(document).on('click','.mainNav >li',function(event){
		event.stopPropagation();
		$(this).siblings("ul").css({width:$(this).width()});
		if ( $(this).siblings("ul").is(":hidden") ) {
			$(this).siblings("ul").show().parent().siblings("ul").children("ul").hide();
		} else if ( $(this).siblings("ul").is(":visible") ) {
			$(this).siblings("ul").hide();
		}
	})
	$(document).click(function(){ $(".mainNav").children("ul").hide(); })
//下拉列表 赋值、事件
	//内容主区域下拉列表 赋值函数
		function pickInfoMain(th){
			$(th).parent().parent().parent().siblings("li").find("strong").html( $(th).find("a").html() );
			$(th).parent().parent().parent().siblings("li").find("strong").attr( 'data-value' , $(th).find("a").attr('data-value') );
			$(th).parent().parent().parent().hide();		
		}
		function pickInfoMain_dataName(th){
			$(th).parent().parent().parent().siblings("li").find("strong").attr( 'data-name' , $(th).find("a").attr('data-name') );
		}
	//弹出层下拉列表 赋值函数
		function pickInfoPopup(th){
			$(th).parents(".input-group-btn").siblings("input").val ( $(th).find("a").html() );
			$(th).parents(".input-group-btn").siblings("input").attr( 'data-value' , $(th).find("a").attr('data-value') );	
			$(th).parents(".dropdown-menu-right").hide();
			$(th).parents(".input-group-btn").children("button").attr("data-value",1);
		}
	//主页下拉 和弹出层下拉事件
		$(document).on("click",".dropdown-menu-right li",	function(event){ pickInfoPopup(this); })
		$(document).on("click",".mainFilter 			.main_drop_menu li",function(event){ pickInfoMain_dataName(this); pickInfoMain(this); $(".main_detail").attr("data-value",""); })
		$(document).on("click",".mainFilterMyOrder 		.main_drop_menu li",function(event){ myOrderCountFn(); })

//主页下拉 筛选输入框文本发生改变时
	$(document).on("change","#myOrderFilter_beginDate, #myOrderFilter_endDate",function(){ 
		$(".main_detail").attr("data-value","");
		myOrderCountFn();
	})

//主页下拉 筛选搜索
	$(document).on('mouseup','.mainFilter 				.main_dropdown button',function(){ $(".main_detail").attr("data-value",""); })
	$(document).on('mouseup','.mainFilterMyOrder 		.main_dropdown button',function(){ myOrderCountFn(); })
	$(document).keyup(function(event){
		if ( event.keyCode == 13 ){
			if ($(".mainFilter .main_dropdown input:focus").length != 0){ $(".main_detail").attr("data-value",""); }
			if ($(".mainFilterMyOrder input:focus").length != 0){ myOrderCountFn(); }
			
		};
	});	

//详情页下拉框按钮变色
	function layer_p_xiala(){
		$(".dropdown-menu-right li").each(function(){
			if ( $(this).children("a").html() == $(this).parents(".input-group-btn").siblings("input").val() ) {
				$(this).children("a").css({
					"background-color": "#ccc",
					color: '#000'
				}).parent().siblings("li").children("a").css({
					"background-color": "",
					color: ''
				});
			}
		})
	}
	$(document).on("click",".layer_p .input-group-btn button", function(ev){
		ev.stopPropagation();
		$(this).siblings("ul").css({ width: $(this).parents(".input-group").width() });
		layer_p_xiala();
		if ($(this).attr("data-value") == 1) {
			$(this).parent().siblings("input").focus();
			$(this).attr("data-value",2);
			$(this).siblings("ul").show();
		} else if ($(this).attr("data-value") == 2){
			$(this).attr("data-value",1);
			$(this).siblings("ul").hide();
		}
		
	})
	$(document).on("click",".layer_p .input-group input[type=text]",function(ev){
		var iptSibBtn = $(this).siblings(".input-group-btn").children("button");
		iptSibBtn.siblings("ul").css({ width: $(this).parents(".input-group").width() });
		layer_p_xiala();
		if (iptSibBtn.attr("data-value") == 1) {
			iptSibBtn.attr("data-value",2);			
			iptSibBtn.siblings("ul").show();
		} else if (iptSibBtn.attr("data-value") == 2){
			iptSibBtn.attr("data-value",1);
			iptSibBtn.siblings("ul").hide();
			$(this).blur();
		}
	})
	$(document).on("blur",".layer_p .input-group input[type=text]",function(event){
		setTimeout(function(){
			$(".layer_p .input-group-btn button").attr("data-value",1);
			$(".layer_p .input-group-btn button").siblings("ul").hide();
		},200);
	})



})


























