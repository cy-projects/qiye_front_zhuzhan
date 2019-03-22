$(function(){
//more
	$(".orderForm .more").on("click", function(){
		$(".orderForm .trHide").show();
		$(".orderForm .more").hide();
	})
	$(".orderForm .less").on("click", function(){
		$(".orderForm .trHide").hide();
		$(".orderForm .more").show();
	})

//表格加载数据
	function cfFillFn(url, ele, mm, time, num){
		setTimeout(function(){
			bugAjax({
				type: 'get',
				url: url,
			},function(data){
				// console.log(data);
				if(data.success){
					var mode =   (mm ? mm : "dan");
					for (var i=0; i<data.root.length; i++){
						ele.find("ul").append('<li data-id="'+filterS(data.root[i].id)+'" data-mode="'+mode+'">'+filterS(data.root[i].title)+'</li>');
					}
					if(num >= 0) {
						ele.find("li").eq(num).addClass("checked");
					};
					orderDataRefresh(ele);
				}
			})
		},time)
	}
	instructionFillFn();

	setTimeout(function(){
		bugAjax({
			type: 'get',
			url: 'project/list',
		},function(res){
			console.log('project/list', res);
			if(res.success){
				for (var i=0; i<res.root.length; i++){
					var item = res.root[i];
					$(".cfProject").find("ul").append('<li data-id="'+filterS(item.id)+'" data-mode="duo" data-dayTravelPrice="'+(item.dayTravelPrice || 0)+'" data-travelPriceEnabled="'+(item.travelPriceEnabled || false)+'">'+filterS(item.title)+'</li>');
				}
				if (JSON.parse(bugStorage.getItem('projectPick'))){
					var projectPick = JSON.parse(bugStorage.getItem('projectPick')).toString();
					bugStorage.delItem("projectPick");
					var reg = new RegExp(projectPick, "g");
					for (var j=0; j<$(".cfProject li").length; j++){
						if (reg.test($(".cfProject li").eq(j).html())){
							$(".cfProject li").eq(j).addClass("checked");
							$(".cfProject").attr("data-ids", $(".cfProject li").eq(j).attr("data-id"));
						}
					}
				}
				orderDataRefresh($(".cfProject"));
				onlinePrice_timeInit();


				//城市选择
				bugAjax({
					type: 'get',
					url: 'cityOption/list'
				},function(data){
					// console.log('cityOption/list', data.root,data);

					if(data.success){
						$(".cfCity select").html('');
						var provinceObjGet = [];
						for (var i=0; i<data.root.length; i++){
							provinceObjGet.push(data.root[i].province);
						}
						var provinceObj = unique(provinceObjGet);
						for (var j=0; j<provinceObj.length; j++){
							$(".cfCity .prov").append('<option value="'+provinceObj[j]+'">'+provinceObj[j]+'</option>')
						}
						$(".cfCity .city").html('');
						for (var k=0; k<data.root.length; k++){
							if ($(".cfCity .prov :selected").val() == data.root[k].province){
								$(".cfCity .city").append('<option value="'+data.root[k].id+'" data-travelPriceEnabled="'+ data.root[k].travelPriceEnabled +'">'+data.root[k].city+'</option>');
							}
						}
						fake();

						$(".cfCity .prov").change(function(){
							var provIndex = this.selectedIndex;
							var provVal = $(this).val();
							$(".cfCity .city").html('');
							for (var k=0; k<data.root.length; k++){
								if (provVal == data.root[k].province){
									$(".cfCity .city").append('<option value="'+data.root[k].id+'" data-travelPriceEnabled="'+ data.root[k].travelPriceEnabled +'">'+data.root[k].city+'</option>');
								}
								
							}
							fake();
						})
						$(".cfCity .city").change(function(){
							fake();
						});

						function fake (){
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
						}
					}
				})

			}
		})
	},200)
	// cfFillFn('project/list', 		$(".cfProject"), 	"duo",10 );		//认证项目
	cfFillFn('personOption/list', 	$(".cfPerson"),		"dan",20 );		//企业认证人数
	cfFillFn('timeOption/list', 	$(".cfTime"),		"dan",30 );		//获证时间周期
	cfFillFn('designOption/list', 	$(".cfDesign"), 	"dan",40, 1);	//有无设计
	cfFillFn('licenseOption/list', 	$(".cfLicence"),	"dan",50, 1);	//有无许可证要求
	cfFillFn('legalOption/list', 	$(".cfLegal"), 		"duo",60, 0);	//法律法规文件
	cfFillFn('authOption/list', 	$(".cfAuth"),		"dan",70, 0);	//认证机构选择
	cfFillFn('invoiceOption/list', 	$(".cfInvoice"),	"dan",80, 0);	//发票需要
	cfFillFn('operateOption/list', 	$(".cfOperate "),	"dan",90, 2);	//配合度
	cfFillFn('visitOption/list', 	$(".cfVisit"),		"dan",100, 0);	//需上门洽谈


	orderDataClick($("#onlinePriceForm"));

	


//增加订单
	$(document).on("click","#onlinePriceBtn",function(ev){
		preDef(ev);
		if ( $.trim($(".cfDescription textarea").val()) == '' ){
			layer.msg('请填写认证范围描述');
			$(".cfDescription textarea").focus();
		} else {
			bugAjax({
				url: 'order/add',
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
					description: 	$(".cfDescription textarea").val(),
					notes: 			$(".cfNotes textarea").val(),
					travelPriceIncluded: 	$(".cfTravelPrice").attr("data-ids"),
				}
			},function(data){
				console.log(data.root,data);
				if (data.success){
					bugStorage.setItem("orderCreateId", data.root);	
					if (window.token == null){
						layer.msg('请登录你的账户...')
						setTimeout(function(){
							window.location.href = './login.html';
						},2000);
					} else {
						layer.msg('下单成功，即将跳转...')
						setTimeout(function(){
							window.location.href = './orders.html';
						},2000);
					}

				} else{
					errorType(data);
				}
			})
		}		
	})


function onlinePrice_timeInit(){
	var projectIdsArr = $(".cfProject").attr("data-ids");
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
					}
				})
			} else{
				errorType(data);
			}
		})	
	}
}







})
