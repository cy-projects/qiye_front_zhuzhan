window.onload = function(){
	layer.closeAll();
}

$(function(){
	// $("#banner").find(".headerLogo img").attr("src", "./img/logo5.png");
	setTimeout(function(){
		if ($(".wrapper").attr("data-value") == "member"){
			bugAjax({
				type : 'get',
				url : 'order/count',
			},function(data){
				// console.log(data.root,data);
				if (data.success) {
					if (data.root == 0){
						layer.msg('你还没有订单，即将跳转下单页面...');
						setTimeout(function(){
							window.location.href = './onlinePrice.html';
						},2000)
					} else if (data.root > 0){				
						$(".bugMain").loadPage({
							url: 'memberContent.html',
							id: '.bugMain_myOrder',
							success: function(){
								myOrderHomeFn();
							}
						})
					}
				} else { errorType(data); }
			})
		} else if($(".wrapper").attr("data-value") == "memberDetail"){
			$(".bugMain").loadPage({
				url: 'memberContent.html',
				id: '.bugMain_orderD',
				success: function(){
					myOrderDFn();
				}
			})
		} else if ($(".wrapper").attr("data-value") == "memberEdit"){
			var editId = JSON.parse(bugStorage.getItem('orderDId'));
			$(".bugMain").loadPage({
				url: 'memberContent.html',
				id: '.bugMain_editOrder',
				success: function(){
					$(".editOrder_tableBox").loadPage({
						url: 'memberContent.html',
						id: '.orderForm',
						success: function(){
							$(".orderForm").attr("data-id", editId);
							$(".orderForm").attr("id", "editOrderForm");
							orderFill($("#editOrderForm"),function(){
								orderAssign();
								orderDataClick($("#editOrderForm"));

								
							});
						}
					})
				}
			})
		} else if($(".wrapper").attr("data-value") == "memberPay"){
			$(".bugMain").attr("data-id", JSON.parse(bugStorage.getItem('orderDId')));
			orderPayfuzhi();
		}
	},120)

	//用户登录信息
	bugAjax({
		type: 'get',
		url: 'user/get'
	},function(data){
		// console.log(data.root);
		if (data.success){
			// var bossUserObj = {
			// 	id: data.root.id,
			// 	username: data.root.username,
			// 	fullName: data.root.fullName,
			// 	disabled: data.root.disabled,
			// 	roles: data.root.roles,
			// 	expireTime: data.root.expireTime
			// };
			// bugStorage.setItem( 'bossUserObj',JSON.stringify(bossUserObj) );			
		} else {
			errorType(data);
		}
	})


	//订单edit
	$(document).on('submit','#editOrderForm',function(ev){
		preDef(ev);
		if ( $.trim($(".cfDescription textarea").val()) == '' ){
			layer.msg('请填写认证范围描述');
			$(".cfDescription textarea").focus();
		} else {
			$('#editOrderForm .orderSub').attr('disabled','disabled').css('opacity',.45).text('提交中...');  
			bugAjax({
				url : 'order/modify',
				dataJson: {
					id: 		$("#editOrderForm").attr("data-id"),
					projectIds: 	$(".cfProject").attr("data-ids"),
					personOptionId: $(".cfPerson").attr("data-ids"),
					timeOptionId: 	$(".cfTime").attr("data-ids"),
					description: 	$(".cfDescription textarea").val(),
					cityOptionId: 	$(".cfCity .city :selected").val(),
					designOptionId: $(".cfDesign").attr("data-ids"),
					licenseOptionId:$(".cfLicence").attr("data-ids"),
					legalOptionIds: $(".cfLegal").attr("data-ids"),
					invoiceOptionId:$(".cfInvoice").attr("data-ids"),
					authOptionId: 	$(".cfAuth").attr("data-ids"),
					operateOptionId:$(".cfOperate").attr("data-ids"),
					visitOptionId: 	$(".cfVisit").attr("data-ids"),
					notes: 			$(".cfNotes textarea").val(),
					travelPriceIncluded: $(".cfTravelPrice").attr("data-ids"),
				}
			},function(data){
				// console.log(data.root,data);
				if (data.success) {
					window.location.href = './orders.html';
				} else {
					errorType(data);
				}
				$("#editOrderForm .orderSub").removeAttr('disabled').removeAttr('style').text("提交");
			},function(){
				$("#editOrderForm .orderSub").removeAttr('disabled').removeAttr('style').text("提交");
			})
		}
 		
	})
	//订单详情-del
	$(document).on("click",".orderD_Box .orderDBtn_del",function(e){
		layer.confirm('确定删除吗 ?', layerConfirm, function(index){
			bugAjax({
				url : 'order/delete',
				dataJson : { 
					id : JSON.parse(bugStorage.getItem('orderDId'))
				}
			},function(data){
				// console.log(data.root,data);
				if ( data.success ){
 					window.location.href = './orders.html';
				} else {
					errorType(data);
				}
			})
		})
		
	})
	//订单展开与收缩
	$(document).on("click", ".orderForm .more", function(){
		$(".orderForm .trHide").show();
		$(".orderForm .more").hide();
	})
	$(document).on("click", ".orderForm .less", function(){
		$(".orderForm .trHide").hide();
		$(".orderForm .more").show();
	})
	//订单详情-打印合同
	$(document).on("click", ".orderD_Box .orderDBtn_export", function(){
		var userObj = JSON.parse(bugStorage.getItem('userObj'));
		var flag = true;
		if ( userObj.name  === "" ||  userObj.company === "" || userObj.email === ""){
			layer.msg("请完善您的个人信息再生成合同");
			setTimeout(function(){
				window.location.href = "./changeInfo.html";
			},2000)
			flag = false;
		}
		if (flag){
			var token = window.token || bugStorage.getItem('token');
			var contractId = JSON.parse(bugStorage.getItem('orderDId'));
			var contractLink = 'http://' + window.location.host + '/cgi/order/contract?token=' + token + '&id='+ contractId;
			window.open(contractLink);				
		}	
	})

	//服务评价 弹窗
	$(document).on('click', ".orderDBtn_evaluate", function(){
		loadPage2('popup.html', "#addOrderEvaluate_submit", function(element){
			popupAdd('服务评价', element.outerHTML, function(){
				var orderId = JSON.parse(bugStorage.getItem('orderDId'));
				$("#addOrderEvaluate_submit").attr("data-id", orderId);

				$("#addOrderEvaluate_score").val( $(".orderDBtn_evaluate").attr("data-score") );
				$("#addOrderEvaluate_comment").val( $(".orderDBtn_evaluate").attr("data-comment") );
				

				updatePraiseClick( $(".addOrderEvaluate_commScore"),  $(".orderDBtn_evaluate").attr("data-commScore"));
				updatePraiseClick( $(".addOrderEvaluate_expertScore"),  $(".orderDBtn_evaluate").attr("data-expertScore"));
				updatePraiseClick( $(".addOrderEvaluate_mannerScore"),  $(".orderDBtn_evaluate").attr("data-mannerScore"));
				updatePraiseClick( $(".addOrderEvaluate_progressScore"),  $(".orderDBtn_evaluate").attr("data-progressScore"));
				updatePraiseClick( $(".addOrderEvaluate_fileScore"),  $(".orderDBtn_evaluate").attr("data-fileScore"));

				// popupCheck_click( $(".addOrderEvaluate_satification"), 'radio' );
				// popupCheck_Init( $(".addOrderEvaluate_satification"), $(".orderDBtn_evaluate").attr("data-satification") );
			})
		})
	})

	// 服务评价星星评价点击
	bindPraiseStarClick(".addOrderEvaluate_commScore a");
	bindPraiseStarClick(".addOrderEvaluate_expertScore a");
	bindPraiseStarClick(".addOrderEvaluate_mannerScore a");
	bindPraiseStarClick(".addOrderEvaluate_progressScore a");
	bindPraiseStarClick(".addOrderEvaluate_fileScore a");


	// 服务评价 提交
	$(document).on('submit','#addOrderEvaluate_submit',function(ev){
		preDef(ev);
		var flag = true;

		//评分
		// if ($.trim($("#addOrderEvaluate_score").val()) === ""){
		// 	layer.msg('评分不能为空');
		// 	flag = false;
		// }

		if ($.trim($("#addOrderEvaluate_comment").val()) === ""){
			layer.msg('评价不能为空');
			flag = false;
		}

		// if ($.trim($(".addOrderEvaluate_satification").attr("data-value")) == ''){
		// 	layer.msg('请选择满意度！');
		// 	flag = false;
		// }

		if (flag){
			$('#addOrderEvaluateSubBtn').attr('disabled','disabled').css('opacity',.45).text('提交中...');
			bugAjax({
				url: 'order/evaluate',
				dataJson: {
					id: $("#addOrderEvaluate_submit").attr("data-id"),
					score: $("#addOrderEvaluate_score").val(),
					comment: $("#addOrderEvaluate_comment").val(),
					commScore: $(".addOrderEvaluate_commScore").attr('data-score'),
					expertScore: $(".addOrderEvaluate_expertScore").attr('data-score'),
					mannerScore: $(".addOrderEvaluate_mannerScore").attr('data-score'),
					progressScore: $(".addOrderEvaluate_progressScore").attr('data-score'),
					fileScore: $(".addOrderEvaluate_fileScore").attr('data-score'),
					// satisfication: $.trim($(".addOrderEvaluate_satification").attr("data-value")),
				}
			}, function(res){
				console.log(res);
				layer.closeAll();
				layer.msg('提交成功');

				if ( $(".wrapper").attr("data-value") == "member" ){
					myOrderHomeFn();
				} else {
					myOrderDFn();
				}
				$('#addOrderEvaluateSubBtn').removeAttr('disabled').removeAttr('style').text("提交");
			}, function(res){
				console.log(res);
				$('#addOrderEvaluateSubBtn').removeAttr('disabled').removeAttr('style').text("提交");
			})
		}

	})

})
//订单列表总数
	var myOrderCountFn = function(){
		bugAjax({
			type : 'get',
			url : 'order/count',
			dataJson: {
				state: 		$('.myOrderFilter_stateDropdown strong').attr('data-value'),
				orderNo: 	$('#myOrderFilter_orderNo').val(),
				tradeNo: 	$("#myOrderFilter_tradeNo").val()
			}
		},function(data){
			console.log(data.root,data);
			if (data.success) {
				$(".myOrder_table >thead strong.allCount").html('共'+ data.root +'条记录');
				if ( data.root <= 20 ) {
					$(".myOrderPagination").html('');
					$(".main_pagination").attr("data-value",0);
					myOrderHomeFn(0);
				} else {
					$(".myOrderPagination").pagination(data.root,{
						num_edge_entries: 1, 					//两侧显示的首尾分页的条目数
						num_display_entries: 4, 				//连续分页主体部分显示的分页条目数
						items_per_page:20, 						//每页显示的条目数
						current_page: 0,						//当前选中的页面
						prev_text: '上一页',
						next_text: '下一页',
						callback: myOrderPaginationCallback,		//回调函数
					}) 
					function myOrderPaginationCallback(index) {
						myOrderHomeFn(index);
						$(".main_pagination").attr("data-value",index);
						$(".pagination a").click(function(){ mdHid(); })
					}
				}
			} else { errorType(data); }
		})
	}
//订单列表主页
	function myOrderHomeFn(){ 
		bugAjax({
			type : 'get',
			url : 'order/query',
			dataJson: {
				firstResult: 	0,
				maxResults: 	99999
			}
		},function(data){
			console.log(data.root,data);
			if (data.success) {
			//重置
				$(".myOrder_table").children("tbody").html('');
				for (var i=0 ;i<data.root.length; i++ ) {
					var myOrderList = data.root[i];
				//主页赋值
					$(".myOrder_table").children("tbody").append(
						'<tr data-id="'+myOrderList.id+'">\
							<td>\
									<ul class="col-xs-12">\
										<li class="col-sm-3 col-md-2">\
											<h5 class="col-xs-4 col-sm-12">订单号</h5>\
											<div class="col-xs-8 col-sm-12">'+filterSS(myOrderList.orderNo)+'</div>\
										</li>\
										<li class="col-sm-3 col-md-4">\
											<h5 class="col-xs-4 col-sm-12">认证项目</h5>\
											<div class="col-xs-8 col-sm-12">'+filterSS(get_cfProjectTitleArr(myOrderList.projectIds))+'</div>\
										</li>\
										<li class="col-sm-2">\
											<h5 class="col-xs-4 col-sm-12">认证状态</h5>\
											<div class="col-xs-8 col-sm-12 state"></div>\
										</li>\
										<li class="col-sm-2">\
											<h5 class="col-xs-4 col-sm-12">订单时间</h5>\
											<div class="col-xs-8 col-sm-12">'+getTime_fromMesc(myOrderList.orderTime)+'</div>\
										</li>\
										<li class="col-sm-2">\
											<h5 class="col-xs-4 col-sm-12">操作</h5>\
											<div class="col-xs-8 col-sm-12">\
												<a href="./orderDetail.html" class="detail btn" data-id="'+myOrderList.id+'">详情</a>\
												<a\
													href="javascript:void(0);"\
													class="evaluate btn"\
													data-id="'+myOrderList.id+'"\
													data-page="orders"\
													data-commScore="'+(myOrderList.commScore || 0)+'"\
													data-expertScore="'+(myOrderList.expertScore || 0)+'"\
													data-mannerScore="'+(myOrderList.mannerScore || 0)+'"\
													data-progressScore="'+(myOrderList.progressScore || 0)+'"\
													data-fileScore="'+(myOrderList.fileScore || 0)+'"\
													data-comment="'+(myOrderList.evaluationComment || '')+'"\
													>评价</a>\
												<a href="javascript:void(0);" class="del btn"  data-id="'+myOrderList.id+'">删除</a>\
											</div>\
										</li>\
									</ul>\
							</td>\
						</tr>');
					var thisTr = $(".myOrder_table tbody >tr").eq(i);
					orderStateFn(thisTr.find('div.state'), filterSS(myOrderList.state));
					if ( filterS(myOrderList.state) == 'Ready' ){
						thisTr.find('.del').show();
					} else {
						thisTr.find('.del').hide();
					}


					if (filterS(myOrderList.allowActions).indexOf("Evaluate") > -1 ){
						thisTr.find('.evaluate').show();
					} else{
						thisTr.find('.evaluate').hide();
					}
				}
				myOrderDetailShowFn();
			} else { errorType(data); }
		})
	}
//订单详情
	function myOrderDFn(){ 
		bugAjax({
			type : 'get',
			url : 'order/get',
			dataJson: {
				id: JSON.parse(bugStorage.getItem('orderDId'))
			}
		},function(data){
			console.log(data.root,data);
			if (data.success) {
				myOrderD_allowActions(data);
				$(".orderD_no").html(filterS(data.root.orderNo));
				orderStateFn($(".orderD_state"), filterSS(data.root.state));

				$(".orderD_project ul").html('');
				for (var i=0; i<data.root.projectIds.length; i++){
					$(".orderD_project ul").append('<li>'+get_cfProjectTitle(data.root.projectIds[i])+'</li>');
				}
				$(".orderD_person").html(get_cfPersonTitle(data.root.personOptionId));
				$(".orderD_time").html(get_cfTimeTitle(data.root.timeOptionId));
				$(".orderD_description").html(filterSS(data.root.description));
				$(".orderD_city").html(get_cfCityProvince(data.root.cityOptionId)+"-"+get_cfCityCity(data.root.cityOptionId));
				$(".orderD_design").html(get_cfDesignTitle(data.root.designOptionId));
				$(".orderD_license").html(get_cfLicenceTitle(data.root.licenseOptionId));

				$(".orderD_legal ul").html('');
				for (var i=0; i<data.root.legalOptionIds.length; i++){
					$(".orderD_legal ul").append('<li>'+get_cfLegalTitle(data.root.legalOptionIds[i])+'</li>');
				}
				$(".orderD_auth").html(get_cfAuthTitle(data.root.authOptionId));
				$(".orderD_invoice").html(get_cfInvoiceTitle(data.root.invoiceOptionId));
				$(".orderD_oprate").html(get_cfOperateTitle(data.root.operateOptionId));
				$(".orderD_visit").html(get_cfVisitTitle(data.root.visitOptionId));
				$(".orderD_notes").html(filterSS(data.root.notes));
				$(".orderD_totalPrice").html('<strong>'+filterS(data.root.fee)+'</strong>&nbsp;元');	

				$(".orderDBtn_evaluate").attr("data-score", filterS(data.root.evaluationScore));
				$(".orderDBtn_evaluate").attr("data-comment", filterS(data.root.evaluationComment) );
				$(".orderDBtn_evaluate").attr('data-commScore', data.root.commScore || 0);
				$(".orderDBtn_evaluate").attr('data-expertScore', data.root.expertScore || 0);
				$(".orderDBtn_evaluate").attr('data-mannerScore', data.root.mannerScore || 0);
				$(".orderDBtn_evaluate").attr('data-progressScore', data.root.progressScore || 0);
				$(".orderDBtn_evaluate").attr('data-fileScore', data.root.fileScore || 0);
				// $(".orderDBtn_evaluate").attr('data-satification', data.root.satification || '');

				trueToYes($(".orderD_travelPrice"), data.root.travelPriceIncluded);

				var cityOption = data.root.cityOption || {}
				if (cityOption.travelPriceEnabled){

					var projectDayTravelPriceAllMoreZero = true;
					var projectLiCheckCount = 0;

					for (var i=0; i<data.root.projectIds.length; i++){
						projectLiCheckCount ++;
						var item = data.root.projectIds[i];
						var price = get_cfProjectTravelPriceEnabled(item) || false;

						if (price == false || price == 'false'){
							projectDayTravelPriceAllMoreZero = false;
						}
					}
					if (projectLiCheckCount == 0){
						projectDayTravelPriceAllMoreZero = false;
					}

					if (projectDayTravelPriceAllMoreZero){
					} else {
						$(".orderD_travelPrice-col").hide(0);
					}
				} else {
					$(".orderD_travelPrice-col").hide(0);
				}
				
			} else { errorType(data); }
		})
	}

//订单-修改初始化
	function orderInitData(loca, ele, mm, time){
		setTimeout(function(){
			var locaObj = JSON.parse(bugStorage.getItem(loca));
			var mode =   (mm ? mm : "dan");

			if (loca == 'cfProjectList'){
				for (var i=0; i<locaObj.length; i++){
					ele.find("ul").append('<li data-id="'+filterS(locaObj[i].id)+'" data-mode="'+mode+'" data-dayTravelPrice="'+filterS(locaObj[i].dayTravelPrice)+'" data-travelPriceEnabled="'+(locaObj[i].travelPriceEnabled || false)+'">'+filterS(locaObj[i].title)+'</li>');
				}
			} else {
				for (var i=0; i<locaObj.length; i++){
					ele.find("ul").append('<li data-id="'+filterS(locaObj[i].id)+'" data-mode="'+mode+'">'+filterS(locaObj[i].title)+'</li>');
				}				
			}

			// orderDataRefreshFn(ele);
		},time)
	}
	function orderFill(ele, fn){
		instructionFillFn();
		orderInitData('cfProjectList', 	$(".cfProject"), 	"duo",10);
		orderInitData('cfPersonList', 	$(".cfPerson"), 	"dan",20);
		// orderInitData('cfTimeList', 	$(".cfTime"), 		"dan",30);
		orderInitData('cfDesignList', 	$(".cfDesign"), 	"dan",40);
		orderInitData('cfLicenceList', 	$(".cfLicence"), 	"dan",50);
		orderInitData('cfLegalList', 	$(".cfLegal"),		"duo",60);
		orderInitData('cfAuthList', 	$(".cfAuth"), 		"dan",70);
		orderInitData('cfInvoiceList', 	$(".cfInvoice"), 	"dan",80);
		orderInitData('cfOperateList', 	$(".cfOperate"), 	"dan",90);
		orderInitData('cfVisitList', 	$(".cfVisit"), 		"dan",100);

		//城市选择
			//默认json第一项，你到时候肯定要赋值进当前关联的父类和子类
				var cfCityList = JSON.parse(bugStorage.getItem('cfCityList'));	//取得json对象
				$(".myOrderE_city select").html('');						//清空省份选择框
				var provinceObjGet = [];				
				for (var i=0; i<cfCityList.length; i++){
					provinceObjGet.push(cfCityList[i].province);
				}
				var provinceObj = unique(provinceObjGet);				//得到省份数组
				for (var j=0; j<provinceObj.length; j++){
					ele.find(".cfCity .prov").append('<option value="'+provinceObj[j]+'">'+provinceObj[j]+'</option>')		//写入第一个选择框内容
				}
				ele.find(".cfCity .city").html('');						//清空城市选择框
				for (var k=0; k<cfCityList.length; k++){				
					if (ele.find(".cfCity .prov :selected").val() == cfCityList[k].province){		//只选择当前省份下的城市
						ele.find(".cfCity .city").append('<option value="'+cfCityList[k].id+'"  >'+cfCityList[k].city+'</option>');
					}
				}
			//改变
				$(".cfCity .prov").change(function(){
					var provIndex = this.selectedIndex;
					var provVal = $(this).val();

					ele.find(".cfCity .city").html('');
					for (var k=0; k<cfCityList.length; k++){
						if (provVal == cfCityList[k].province){
							ele.find(".cfCity .city").append('<option value="'+cfCityList[k].id+'" data-travelPriceEnabled="'+ cfCityList[k].travelPriceEnabled +'">'+cfCityList[k].city+'</option>');
						}
					}
					orderEditUpdateIsOpenTravelPrice();
				})
				$(".cfCity .city").change(function(){
					orderEditUpdateIsOpenTravelPrice();
				})

		if (fn){setTimeout(fn, 110)}
	}
//订单-修改赋值
	function orderAssign(){
		bugAjax({
			type : 'get',
			url : 'order/get',
			dataJson : { 
				id : $("#editOrderForm").attr("data-id")
			}
		},function(data){
			console.log(data.root,data);
			if (data.success) {
			//权限
				orderAssignData($(".cfProject"), data.root.projectIds);
				orderAssignData($(".cfPerson"), data.root.personOptionId);
				// orderAssignData($(".cfTime"), data.root.timeOptionId, projectChangeTimeFn);
				var _timeOptionId = data.root.timeOptionId;
				projectChangeTimeFn(_timeOptionId);

				$(".cfDescription textarea").val(filterS(data.root.description));
				orderAssignData($(".cfDesign"), data.root.designOptionId);
				orderAssignData($(".cfLicence"), data.root.licenseOptionId);
				orderAssignData($(".cfLegal"), data.root.legalOptionIds);
				orderAssignData($(".cfAuth"), data.root.authOptionId);
				orderAssignData($(".cfInvoice"), data.root.invoiceOptionId);
				orderAssignData($(".cfOperate"), data.root.operateOptionId);
				orderAssignData($(".cfVisit"), data.root.visitOptionId);
				$(".cfNotes textarea").val(filterS(data.root.notes));

				orderAssignData($(".cfTravelPrice"), data.root.travelPriceIncluded);


				if (data.root.cityOptionId){//城市选择
					$(".cfCityLi .prov option").each(function(){
						if ($(this).val() == get_cfCityProvince(data.root.cityOptionId)){
							$(this).prop("selected",true);
							$(this).attr("selected","selected");

							var cfCityListObj = JSON.parse(bugStorage.getItem('cfCityList'));
							$(".cfCityLi .city").html('');
							for (var k=0; k<cfCityListObj.length; k++){
								if ($(".cfCity .prov :selected").val() == cfCityListObj[k].province){
									$(".cfCity .city").append('<option value="'+cfCityListObj[k].id+'" data-travelPriceEnabled="'+ cfCityListObj[k].travelPriceEnabled +'">'+cfCityListObj[k].city+'</option>');
								}
							}
							$(".cfCity .city option").each(function(){
								if ($(this).html() == get_cfCityCity(data.root.cityOptionId)){
									$(this).prop("selected",true);
									$(this).attr("selected","selected");

									orderEditUpdateIsOpenTravelPrice();
								}
							})

						}
					})
				}
				$(".cfTotalPrice").html('<strong style="color:#c81623; font-size: 1.8rem;">'+filterS(data.root.fee)+'</strong>'+"&nbsp;元");




			} else { errorType(data); }
		})
	}

//订单-付款赋值
	function orderPayfuzhi(){
		bugAjax({
			type : 'get',
			url : 'order/get',
			dataJson : { 
				id : $(".bugMain").attr("data-id")
			}
		},function(data){
			console.log(data.root,data);
			if (data.success) {
				$(".payOrder_no >span").html(filterS(data.root.orderNo));
				$(".payOrder_project >span").html(get_cfProjectTitleArr(data.root.projectIds))
				$(".payHeaderRight").html('交易金额:&nbsp;&nbsp;<strong style="color:#c81623; font-size: 3rem;">'+filterS(data.root.fee)+'</strong>'+"&nbsp;元");
				$(".payInfoTitle").html('请向我们转账&nbsp;<strong style="color:#c81623; font-size: 3rem;">'+filterS(data.root.fee)+'</strong>'+"&nbsp;元");


			} else { errorType(data); }
		})
	}

//详情页出现
	function main_detail_show(event,th, fn){
		var ev = event || window.event;
		var target = $(event.target);
		if (target.closest(".export, .pay").length != 0){

		} else {
			window.location.href = "./orderDetail.html";
		}
		if (fn){fn()};
	}

	function myOrderDetailShowFn(){
		$(".myOrder_table >tbody >tr").mousedown(function(){
			bugStorage.setItem( 'orderDId',JSON.stringify($(this).attr("data-id")) );
		})
		$(".myOrder_table >tbody >tr").click(function(event){
			main_detail_show(event, this);
		})
		$(".myOrder_table .detail").mousedown(function(e){
			e.stopPropagation();
			bugStorage.setItem( 'orderDId',JSON.stringify($(this).attr("data-id")) );
		})

		$(".myOrder_table .del").click(function(e){
			var _this = this;
			e.stopPropagation();
			layer.confirm('确定删除吗 ?', layerConfirm, function(index){
				bugAjax({
					url : 'order/delete',
					dataJson : { 
						id : $(_this).attr("data-id")
					}
				},function(data){
					if ( data.success ){
	 					window.location.href = './orders.html';
					} else {
						errorType(data);
					}
				})
			})		
		})

		$(".myOrder_table .evaluate").click(function(ev){
			ev.stopPropagation();

			var $that = $(this);
			
			loadPage2('popup.html', "#addOrderEvaluate_submit", function(element){
				popupAdd('服务评价', element.outerHTML, function(){
					// var orderId = JSON.parse(bugStorage.getItem('orderDId'));
					$("#addOrderEvaluate_submit").attr("data-id", $that.attr("data-id"));
					$("#addOrderEvaluate_comment").val( $that.attr("data-comment") );
					

					updatePraiseClick( $(".addOrderEvaluate_commScore"),  $that.attr("data-commScore"));
					updatePraiseClick( $(".addOrderEvaluate_expertScore"),  $that.attr("data-expertScore"));
					updatePraiseClick( $(".addOrderEvaluate_mannerScore"),  $that.attr("data-mannerScore"));
					updatePraiseClick( $(".addOrderEvaluate_progressScore"),  $that.attr("data-progressScore"));
					updatePraiseClick( $(".addOrderEvaluate_fileScore"),  $that.attr("data-fileScore"));

					// popupCheck_click( $(".addOrderEvaluate_satification"), 'radio' );
					// popupCheck_Init( $(".addOrderEvaluate_satification"), $(".orderDBtn_evaluate").attr("data-satification") );
				})
			})
		})
	}

//刚进页面时 项目关联 或证时间周期
	function projectChangeTimeFn(timeChecked){
		var projectIdsArr = $(".cfProject").attr("data-ids");
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
				var cfTimeList = JSON.parse(bugStorage.getItem('cfTimeList'));
				for (var o =0; o<timeIdsArr.length; o++){
					for (var p=0; p<cfTimeList.length; p++){
						if (timeIdsArr[o] == filterS(cfTimeList[p].id)){
							$(".cfTime").find("ul").append('<li data-id="'+filterS(cfTimeList[p].id)+'" data-mode="dan">'+filterS(cfTimeList[p].title)+'</li>');
						}
					}
				}
				$(".cfTime").find("ul li").each(function(){
					if ($(this).attr("data-id") == timeChecked){
						$(this).addClass('checked').siblings("li").removeClass("checked");
						$(".cfTime").attr("data-ids", $(this).attr("data-id"));
					}
				})
			} else{
				errorType(data);
			}
		})
	}


	// 星星点击
	function bindPraiseStarClick(ele){
		$(document).on('click', ele, function(){

			var that = $(this);
			var aValue = parseInt(that.attr("data-value"), 10);
			var starUl = that.parent().parent();

			starUl.attr('data-score', aValue * 2);

			starUl.find('li').removeClass('fa-star').removeClass('fa-star-half-o').removeClass('fa-star-o');
			//判断是全星点还是半星点
			if (aValue%2 == 1){
				that.parent().addClass('fa-star-half-o');
			} else {
				that.parent().addClass('fa-star');
			}

	    that.parent().prevAll("li").addClass('fa-star');
    	that.parent().nextAll("li").addClass('fa-star-o');
		})
	}

	// 星星赋值
	function updatePraiseClick(ele, score){
		var aValue = parseInt(score / 2);
		var aIndex = Math.ceil(score / 4) - 1;
		ele.attr("data-score", score);
		// console.log(aValue, aIndex)

		if (aIndex >= 0){
			ele.find('li').removeClass('fa-star').removeClass('fa-star-half-o').removeClass('fa-star-o');

			if (aValue % 2 == 1){
				ele.find('li').eq(aIndex).addClass('fa-star-half-o');
			} else {
				ele.find('li').eq(aIndex).addClass('fa-star');
			}

			ele.find('li').eq(aIndex).prevAll().addClass('fa-star');
			ele.find('li').eq(aIndex).nextAll().addClass('fa-star-o');
		}
		
	}


	function orderEditUpdateIsOpenTravelPrice(){
		if ($(".cfCity .city :selected").attr("data-travelPriceEnabled") == 'false'){
			$(".visitTrTravelPrice").addClass('visitTr-travelPrice');
		} else {
			var projectDayTravelPriceAllMoreZero = true;
			var projectLiCheckCount = 0;
								
			for (var j=0; j<$(".cfProject").children("ul").find("li").length; j++){
				var lis = $(".cfProject").children("ul").find("li");

				if (lis.eq(j).hasClass("checked")){
					projectLiCheckCount ++;

					console.log(j, lis.eq(j).attr("data-travelPriceEnabled")	);
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
	}








































