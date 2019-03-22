$(function(){
//订单参数  修改
	$(document).on("click",".myOrderDBtn_edit",function(){
		loadPage2("memberPopup.html", "#myOrderE_form", function(element){
			popupEdit("编辑订单参数", element.outerHTML, function(){
				//认证项目
					$(".myOrderE_project >ul").html('');
					var cfProjectList = JSON.parse(bugStorage.getItem('cfProjectList'));
					for (var i=0; i<cfProjectList.length; i++){
						$(".myOrderE_project >ul").append('<li>\
																<input type="checkbox" name="projectIds" id="myOrderE_projectItem'+i+'" value='+filterS(cfProjectList[i].id)+'>\
																<label for="myOrderE_projectItem'+i+'">'+filterS(cfProjectList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_project"));
				//企业认证人数
					$(".myOrderE_person >ul").html('');
					var cfPersonList = JSON.parse(bugStorage.getItem('cfPersonList'));
					for (var i=0; i<cfPersonList.length; i++){
						$(".myOrderE_person >ul").append('<li>\
																<input type="radio" name="personOptionId" id="myOrderE_personItem'+i+'" value='+filterS(cfPersonList[i].id)+'>\
																<label for="myOrderE_personItem'+i+'">'+filterS(cfPersonList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_person"));
				//获证时间周期
					$(".myOrderE_time >ul").html('');
					var cfTimeList = JSON.parse(bugStorage.getItem('cfTimeList'));
					for (var i=0; i<cfTimeList.length; i++){
						$(".myOrderE_time >ul").append('<li>\
															<input type="radio" name="timeOptionId" id="myOrderE_timeItem'+i+'" value='+filterS(cfTimeList[i].id)+'>\
															<label for="myOrderE_timeItem'+i+'">'+filterS(cfTimeList[i].title)+'</label>\
														</li>');
					}
					checkDianxuan($(".myOrderE_time"));
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
							$(".myOrderE_city .prov").append('<option value="'+provinceObj[j]+'">'+provinceObj[j]+'</option>')		//写入第一个选择框内容
						}
						$(".myOrderE_city .city").html('');						//清空城市选择框
						for (var k=0; k<cfCityList.length; k++){				
							if ($(".myOrderE_city .prov :selected").val() == cfCityList[k].province){		//只选择当前省份下的城市
								$(".myOrderE_city .city").append('<option value="'+cfCityList[k].id+'">'+cfCityList[k].city+'</option>');
							}
						}
					//改变
						$(".myOrderE_city .prov").change(function(){
							var provIndex = this.selectedIndex;
							var provVal = $(this).val();
							$(".myOrderE_city .city").html('');
							for (var k=0; k<cfCityList.length; k++){
								if (provVal == cfCityList[k].province){
									$(".myOrderE_city .city").append('<option value="'+cfCityList[k].id+'">'+cfCityList[k].city+'</option>');
								}
							}
						})
				//有无设计
					$(".myOrderE_design >ul").html('');
					var cfDesignList = JSON.parse(bugStorage.getItem('cfDesignList'));
					for (var i=0; i<cfDesignList.length; i++){
						$(".myOrderE_design >ul").append('<li class="fl pd22">\
																<input type="radio" name="designOptionId" id="myOrderE_designItem'+i+'" value='+filterS(cfDesignList[i].id)+'>\
																<label for="myOrderE_designItem'+i+'">'+filterS(cfDesignList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_design"));
				//有无许可证要求
					$(".myOrderE_license >ul").html('');
					var cfLicenceList = JSON.parse(bugStorage.getItem('cfLicenceList'));
					for (var i=0; i<cfLicenceList.length; i++){
						$(".myOrderE_license >ul").append('<li class="fl pd22">\
																<input type="radio" name="licenseOptionId" id="myOrderE_licenseItem'+i+'" value='+filterS(cfLicenceList[i].id)+'>\
																<label for="myOrderE_licenseItem'+i+'">'+filterS(cfLicenceList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_license"));
				//法律法规文件
					$(".myOrderE_legal >ul").html('');
					var cfLegalList = JSON.parse(bugStorage.getItem('cfLegalList'));
					for (var i=0; i<cfLegalList.length; i++){
						$(".myOrderE_legal >ul").append('<li>\
																<input type="checkbox" name="legalOptionIds" id="myOrderE_legalItem'+i+'" value='+filterS(cfLegalList[i].id)+'>\
																<label for="myOrderE_legalItem'+i+'">'+filterS(cfLegalList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_legal"));
				//认证机构选择
					$(".myOrderE_auth >ul").html('');
					var cfAuthList = JSON.parse(bugStorage.getItem('cfAuthList'));
					for (var i=0; i<cfAuthList.length; i++){
						$(".myOrderE_auth >ul").append('<li class="fl pd22">\
																<input type="radio" name="authOptionId" id="myOrderE_authItem'+i+'" value='+filterS(cfAuthList[i].id)+'>\
																<label for="myOrderE_authItem'+i+'">'+filterS(cfAuthList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_auth"));
				//发票需要
					$(".myOrderE_invoice >ul").html('');
					var cfInvoiceList = JSON.parse(bugStorage.getItem('cfInvoiceList'));
					for (var i=0; i<cfInvoiceList.length; i++){
						$(".myOrderE_invoice >ul").append('<li class="fl pd22">\
																<input type="radio" name="invoiceOptionId" id="myOrderE_invoiceItem'+i+'" value='+filterS(cfInvoiceList[i].id)+'>\
																<label for="myOrderE_invoiceItem'+i+'">'+filterS(cfInvoiceList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_invoice"));
				//配合度
					$(".myOrderE_operate >ul").html('');
					var cfOperateList = JSON.parse(bugStorage.getItem('cfOperateList'));
					for (var i=0; i<cfOperateList.length; i++){
						$(".myOrderE_operate >ul").append('<li class="">\
																<input type="radio" name="operateOptionId" id="myOrderE_operateItem'+i+'" value='+filterS(cfOperateList[i].id)+'>\
																<label for="myOrderE_operateItem'+i+'">'+filterS(cfOperateList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_operate"));
				//上门拜访
					$(".myOrderE_visit >ul").html('');
					var cfVisitList = JSON.parse(bugStorage.getItem('cfVisitList'));
					for (var i=0; i<cfVisitList.length; i++){
						$(".myOrderE_visit >ul").append('<li class="fl pd22">\
																<input type="radio" name="visitOptionId" id="myOrderE_visitItem'+i+'" value='+filterS(cfVisitList[i].id)+'>\
																<label for="myOrderE_visitItem'+i+'">'+filterS(cfVisitList[i].title)+'</label>\
															</li>');
					}
					checkDianxuan($(".myOrderE_visit"));

				myOrderDetailFn();
			});
		})
	})



})
//封装layer-confirm确认框的相似参数
	var confirmObj ={
		title : '提示',
		move : false,
		success: function(layero, index){
			$(layero).find(".layui-layer-setwin a").removeClass("layui-layer-ico").addClass("fa fa-remove");
			$(layero).find(".layui-layer-setwin").attr("title","关闭");
		}
	}
// layer回调相似
	var layerCallback =function(layero){
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
	var popupAdd =function (title, ele, fn){			
	    layer.open({
	    	title: "<span class='layer_title'><i class='fa fa-plus-circle'></i><strong>" + title + "</strong></span>",
	        type: 1,
	        area:  '600px',
	        // shadeClose: true,
	        content: ele,
	        offset: '60px',
	        shade:  [0.5, '#000000'],
	        shift: 0,
	        success: function(layero, index){
				layerCallback(layero);				
				if (fn) { fn();  }
			}
	    });
	}
//编辑弹出层
	var popupEdit =function (title, ele, fn){	
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
//绑定弹出层
	var popupBind =function ( a , b){
		b.find("input[type=text]").val('');
		b.find("input[type=password]").val('');
	    layer.open({
	    	title: "<span class='layer_title'><i class='fa fa-legal'></i><strong>" + a + "</strong></span>",
	        type: 1,
	        area: '700px', 
	        shadeClose: true,
	        content: b,
	        offset: '60px',
	        shade:  [0.5, '#000000'],
	        shift: 0,
	        success: function(layero, index){
				layerCallback(layero);
			}
	    });
		inputTextBorderColor();
	}
//上传照片
	var popupUploadPhoto =function ( b ){
		$(".upload-fileImg").html('<div class="default tcenter"><span class="default-img"><i class="fa fa-picture-o fa-4x"></i><i class="fa fa-plus fa-2x plus"></i></span></div>');
	    layer.open({
	    	title: "<span class='layer_title'><i class='fa fa-plus-circle'></i><strong>Upload photo</span></span>",
	        type: 1,
	        area: '340px',
	        shadeClose: true,
	        content : b,
	        offset: '60px',
	        shade:  [0.5, '#000000'],
	        shift: 0,
	        success: function(layero, index){
				layerCallback(layero);
			}
	    });
	    inputTextBorderColor();
	}


