var pageHeight = $(window).height();
//返回双数
	var tDouble = function(n) {
		if (n<10) {
			return "0" + n ;
		} else {
			return "" + n;  
		}
	}
// layer.open回调相似
	var layerCallback =function(layero){
		layero.find(".layui-layer-setwin a").removeClass("layui-layer-ico").addClass("fa fa-remove");
		layero.find(".layui-layer-setwin").attr("title","关闭");
		layero.find(".cancelBtn").click(function(){
			layero.remove();
			$(".layui-layer-shade").last().remove();
			$("html").css({"overflow": 'initial'});
		})
		slimScrollFn();
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
//滚动条
	function slimScrollFn() {
	//一定时间不动 允许隐藏滚动条
		function slimScrollFn_disable(th){
			if ( $(th).hasClass("slimScrollDiv") ){
			} else {
				console.log($(th))
				$(th).slimScroll({
					height : '100%',
					allowPageScroll : false,
					railOpacity: 0.6
				})
			}			
		}
		function slimScrollFn_allowPageScrollTrue(th){
			if ( $(th).hasClass("slimScrollDiv") ){
			} else {
				$(th).slimScroll({
					height : '100%',
					allowPageScroll : false,
					railOpacity: 0.6,
					allowPageScroll: true 	//滚动到头时，允许页面滚动
				})
			}			
		}
		function slimScrollLeftFn_disable(th){
			if ( $(th).hasClass("slimScrollDiv") ){
			} else {
				$(th).slimScroll({
					height: "100%",
					allowPageScroll: false,
					position: "left",		//滚动条位置
					disableFadeOut :false,	//鼠标在内容处一定时间不动是否隐藏滚动条
				})
			}
		}
		$(".sidebar				>div").each(function(){ slimScrollLeftFn_disable(this); })
		$(".bugContent 			>div").each(function(){ slimScrollFn_disable(this); })
		$('.main_detail_content >div').each(function(){ slimScrollFn_disable(this); })
		$(".main_drop_menu 		>div").each(function(){ slimScrollFn_disable(this); })
		$(".dropdown-menu-right >div").each(function(){ slimScrollFn_disable(this); })
	}

//ajax返回值 过滤+颜色处理+中英处理
	//过滤掉为空，未定义等情况
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
		// 满意度转换
		// function satisficationFormat(str){
		// 	var result = '';

		// 	if (str !== ''){
		// 		switch (str){
		// 			case 'VeryGood': 		result = '很满意';break
		// 			case 'Good': 		result = '满意';break
		// 			case 'Normal': 	result = '一般';break
		// 			case 'Bad': 		result = '差';break
		// 			default: result = '很满意';
		// 		}
		// 	}

		// 	return result;
		// }


	//我的订单-状态中英转换
		function orderStateFn(ele, str){
			if (str){
				switch (str){
					case 'Draft': 		ele.html('草稿'		).css({color: '#999'});break;		//灰色
					case 'Ready': 		ele.html('未确认'	).css({color: '#f0ad4e'});break;	//黄色
					case 'Confirmed': 	ele.html('已确认'	).css({color: '#00aeef'});break;	//蓝色

					case 'Signed': 		ele.html('已签合同'	).css({color: '#056839'});break;	//绿色
					case 'FirstPayed': 	ele.html('已付首款'	).css({color: '#056839'});break;	//绿色
					case 'Operating': 	ele.html('实施中'	).css({color: '#056839'});break;	//绿色
					case 'FinalPayed': 	ele.html('已付尾款'	).css({color: '#056839'});break;	//绿色

					case 'Finished': 	ele.html('已认证'	).css({color: '#056839'});break;	//绿色
					default 		: id.html('');
				}
			} else {
				return id.html('');
			}
		}
	//boolean 是否
	function trueToYes(id, text){
		if (text === undefined){
			id.html('');
		} else {
			switch ( text.toString() ) {
				case 'true'	: id.html('是'); id.css({ 'color': '#5cb853' });	break;
				case 'false': id.html('否'); id.css({ 'color': '#a2a2a2' });	break;
				default 	: id.html('');
			}			
		}
	}


//订单-说明tip的显隐
	function instructionHoverFn(){
		// var timer = null;
		$(".instructions span").hover(function(ev){
			ev.stopPropagation();
			$(this).siblings("div").show();
			// timer = setTimeout(function(){$(".instructions div").hide();},5000)
		},function(){
			$(".instructions div").hide();
		})
		$(".instructions span").click(function(ev){
			ev.stopPropagation();
			$(this).siblings("div").show();
			// timer = setTimeout(function(){$(".instructions div").hide();},5000)
		})
		$(document).on("click",function(){
			$(".instructions div").hide();
			// clearTimeout(timer);
		})
	}
//订单-参数说明
	function instructionFillFn(){
		bugAjax({
			type: 'get',
			url: 'optionDescription/list'
		},function(data){
			// console.log(data.root);
			if(data.success){
				$(".instructions").each(function(_index){
					var str = $(".instructions").eq(_index).children("div").attr("data-value");
					for (var j=0; j<data.root.length; j++){
						if (str == data.root[j].optionType){
							$(".instructions").eq(_index).children("div").html(filterS(data.root[j].notes));
						}
					}
				})
				instructionHoverFn();
			}
		})			
	}
//订单-刷新传参值
	function orderDataRefresh(hgk){	//hgk 指 .smfl
		var result = [];
		for (var j=0; j<hgk.children("ul").find("li").length; j++){
			var lis = hgk.children("ul").find("li");
			if (lis.eq(j).hasClass("checked")){
				result.push(lis.eq(j).attr("data-id"));
			}
		}
		var re = result.join(",");
		hgk.attr("data-ids", re);
	}
//订单-计价
	function getOrderPrice(gds){	//gds 指 .orderForm
		bugAjax({
			url: 'order/calculate',
			dataJson: {
				projectIds: 	$(".cfProject").attr("data-ids"),
				personOptionId: $(".cfPerson").attr("data-ids"),
				timeOptionId: 	$(".cfTime").attr("data-ids"),
				cityOptionId: 	$(".cfCity .city :selected").val(),
				designOptionId: $(".cfDesign").attr("data-ids"),
				licenseOptionId:$(".cfLicence").attr("data-ids"),
				legalOptionIds: $(".cfLegal").attr("data-ids"),
				invoiceOptionId:$(".cfInvoice").attr("data-ids"),
				authOptionId: 	$(".cfAuth").attr("data-ids"),
				operateOptionId:$(".cfOperate").attr("data-ids"),
				visitOptionId: 	$(".cfVisit").attr("data-ids"),
				travelPriceIncluded: 	$(".cfTravelPrice").attr("data-ids"),
			}
		},function(data){
			if (data.success){
				gds.find(".cfTotalPrice").html('<strong style="color:#c81623; font-size: 1.8rem;">'+filterS(data.root)+'</strong>'+"&nbsp;元");
			} else{
				errorType(data);
			}
		})		
	}
//订单-选项发生点击时
	function orderDataClick(element){		//element 指 .orderForm
		$(document).on("click", ".orderForm ul li", function(event){			
			var ev = event || window.event;
			preDef(ev);
			var target = $(ev.target);
			var result = [];
			if (target.attr("data-mode") == 'duo'){
				if (target.hasClass('checked')){
					target.removeClass('checked');
				} else{
					target.addClass('checked');
				}
			} else if(target.attr("data-mode") == 'dan'){
				if (target.hasClass('checked')){
				} else {
					target.addClass('checked').siblings("li").removeClass("checked");
				}
			}
			orderDataRefresh(target.parents(".smfl"));
			if (target.parents(".cfProject").length > 0 ){
				// 更新 启用差旅费
				if ($(".cfCity .city :selected").attr("data-travelPriceEnabled") == 'false'){
					$(".visitTrTravelPrice").addClass('visitTr-travelPrice');
				} else {
					var projectDayTravelPriceAllMoreZero = true;
					var projectLiCheckCount = 0;
					
					for (var j=0; j<$(".cfProject").children("ul").find("li").length; j++){
						var lis = $(".cfProject").children("ul").find("li");

						if (lis.eq(j).hasClass("checked")){
							projectLiCheckCount ++;
							
							if ( lis.eq(j).attr("data-travelPriceEnabled") == 'false' ){
								projectDayTravelPriceAllMoreZero = false;
							}
						}
					}
					if (projectLiCheckCount == 0){
						projectDayTravelPriceAllMoreZero = false;
					}
					
					if (projectDayTravelPriceAllMoreZero){
						$(".visitTrTravelPrice").removeClass('visitTr-travelPrice');
					} else{
						$(".visitTrTravelPrice").addClass('visitTr-travelPrice');
					}
				}


				var projectIdsArr = target.parents(".cfProject").attr("data-ids");
				var timeChecked = $(".cfTime").attr("data-ids");

				if (projectIdsArr.length > 0){
					bugAjax({
						url: 'project/getTimeOptions',
						dataJson: {
							ids: projectIdsArr
						}
					},function(data){
						// console.log(data.root,data);
						if (data.success){							
							var timeIdsArr = filterS(data.root);
							$(".cfTime ul").html('');
							$(".cfTime").attr("data-ids", '');
							bugAjax({
								type: 'get',
								url: 'timeOption/list',
							},function(data){
								if(data.success){
									for (var o =0; o<timeIdsArr.length; o++){
										for (var p=0; p<data.root.length; p++){
											if (timeIdsArr[o] == filterS(data.root[p].id)){
												$(".cfTime").find("ul").append('<li data-id="'+filterS(data.root[p].id)+'" data-mode="dan">'+filterS(data.root[p].title)+'</li>');
											}
										}
									}
									$(".cfTime").find("ul li").each(function(){
										if ($(this).attr("data-id") == timeChecked){
											$(this).addClass('checked').siblings("li").removeClass("checked");
											$(".cfTime").attr("data-ids", $(this).attr("data-id"));
										}
									})
									orderBtnEnable(element);
								}
							})
						} else{
							errorType(data);
						}
					})	
				} else {
					target.addClass('checked').siblings("li").removeClass("checked");
					orderDataRefresh(target.parents(".smfl"));
				}
			} else {
				orderBtnEnable(element);
			}
			
		})
	}
//订单-单选、复选框被选中格个数
	function checkLength(hgfh){		//hgfh 指 .smfl
		return hgfh.find("li.checked").length;
	}
//订单-点选时 判断按钮的禁用与恢复并计算价格
	function orderBtnEnable(fsg){ //fsg 指 .orderForm
		if (checkLength($(".cfProject")) 	>0 &&
			checkLength($(".cfPerson")) 	>0 &&
			checkLength($(".cfTime")) 		>0 &&
			checkLength($(".cfDesign")) 	>0 &&
			checkLength($(".cfLicence"))	>0 &&
			checkLength($(".cfAuth")) 		>0 &&
			checkLength($(".cfInvoice"))	>0 &&
			checkLength($(".cfOperate")) 	>0 &&
			checkLength($(".cfVisit")) 		>0 
		){
			fsg.find(".orderSub").removeAttr("disabled");
			getOrderPrice(fsg);
		} else {
			fsg.find(".orderSub").attr('disabled','disabled');
			fsg.find(".cfTotalPrice").html('');
		}
	}

//订单-修改页面赋值相关数据
	function orderAssignData(element, text, fn){	//element 指 .smfl
		if ( text === [] || text === undefined || text === ""  ) {
			element.find("li").removeClass("checked");
		} else {

			element.find("li").removeClass("checked");
			if ($.type(text) == "array"){
				element.attr("data-ids",text.join(","));
				element.find("li").each(function(){

					if ( text.indexOf(parseInt($(this).attr("data-id"))) >-1 || text.indexOf($(this).attr("data-id")) >-1  ) { 
						$(this).addClass("checked"); 
					}
				})
			} else{
				text = text.toString();	
				element.attr("data-ids",text);
				element.find("li").each(function(){
					$(this).attr("data-id") == text ? $(this).addClass("checked") : $(this).removeClass("checked");
				})
			}
		};
		if (fn){fn()};
	}

//订单详情编辑框初始赋值
	function popupCheck_Init(ele, text){
		if ( text === [] || text === undefined || text === ""  ) { 
			ele.find("input").prop("checked",false);
		} else {
			ele.find("input").prop("checked",false);
			if ($.type(text) == "array"){
				ele.attr("data-value",text.join(","));

				ele.find("input").each(function(){
					if 		( text.indexOf(parseInt($(this).val())) >-1  ) 	{ $(this).prop("checked",true); }
					else if ( text.indexOf(parseInt($(this).val())) == -1 ) { $(this).prop("checked",false);}
				})
			} else{
				text = text.toString();
				ele.attr("data-value",text);

				ele.find('i').removeClass('fa-circle-o');
				ele.find('i').removeClass('fa-dot-circle-o');

				ele.find("input").each(function(){
					if ($(this).val() == text){
						$(this).prop("checked",true);
						$(this).siblings('label').find('i').addClass('fa-dot-circle-o');
					} else {
						$(this).prop("checked",false);
						$(this).siblings('label').find('i').addClass('fa-circle-o');
					}
				})
							
			}
		};
	}
//订单详情编辑框点选赋值data-value
	function popupCheck_click(ele, type){
		ele.find("input").change(function(){
			var result = [];

			if (type === 'radio'){
				ele.find('i').removeClass('fa-circle-o');
				ele.find('i').removeClass('fa-dot-circle-o');
			}


			for ( var i=0; i<ele.find("li").size(); i++ ){
				if ( ele.find("li").eq(i).find("input").is(":checked") ){
					if (type === 'radio'){
						ele.find("li").eq(i).find('i').addClass('fa-dot-circle-o');
					}
					result.push( ele.find("li").eq(i).find("input").val() );	
				} else {
					if (type === 'radio'){
						ele.find("li").eq(i).find('i').addClass('fa-circle-o');
					}
				}


			}
			var re = result.join(",");
			ele.attr("data-value",re);
			
		})
	}

