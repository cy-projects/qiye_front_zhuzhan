$(function(){
	var randomStr = null;
//手机验证码弹窗
	$(document).on('click','.regGetVerifyCode',function(){
		loadPage2("registerVerifyCode.html", "#registerVerifyCodeFrom", function(element){
			var layerPopup = layer.open({
		    	title: "<span class='layer_title'><i class='fa fa-mobile fs20'></i><strong>获取手机验证码</strong></span>",
		        type: 1,
		        area:  '600px',
		        // shadeClose: true,
		        scrollbar: false,
		        content: element.outerHTML,
		        offset: '60px',
		        shade:  [0.5, '#000000'],
		        shift: 0,
		        success: function(layero, index){
		        	if ($(window).width() < 600){
						$(layero).css({
							width: parseInt($(window).width() - 30) + 'px',
							left: '15px'
						})
					}
		        	layerCallback(layero);
		        	$("#rvc_phone").val($.trim($(".regPhone").val()));
		        	getCaptchaImage();
					$(".rvc_captchaImageChange,.rvc_captchaImageBox").click(function(){
						getCaptchaImage();
					})
					
				}
		    });
		})
		return false;
	})
	function getCaptchaImage(){
		randomStr = getRanNum(16);
		$("#rvc_captchaImageIpt").attr("data-value",randomStr);
		var randomNowStr = $("#rvc_captchaImageIpt").attr("data-value");
		var randomNowHref = 'http://' + window.location.host + '/cgi/user/captchaImage?random='+randomNowStr;
		$(".rvc_captchaImage").attr("src",randomNowHref);
	}
//手机验证码提交
	$(document).on("submit", "#registerVerifyCodeFrom", function(){
		if ($("#rvc_phone").val() === ''){
			layer.msg("手机号不能为空!");
		} else if( !phoneReg.test($.trim($("#rvc_phone").val())) ){
			layer.msg("手机号格式错误!");
		} else if($("#rvc_captchaImageIpt").val() === ''){
			layer.msg("验证码不能为空!");	
		} else{
			$('#rvcSub').attr('disabled','disabled').css('opacity',.45).text('正在提交...');
			bugAjax({
				url: 'user/sendVerifySms',
				dataJson: {
					phone: $("#rvc_phone").val(),
					random: $("#rvc_captchaImageIpt").attr("data-value"),
					captcha: $("#rvc_captchaImageIpt").val(),
				}
			},function(data){
				console.log(data.root,data);
				if (data.success){
					$(".regPhone").val($.trim($("#rvc_phone").val()));
					layer.closeAll();
					layer.msg("验证码已经发送至你的手机，请查看！");
				} else {
					if (data.root){
						if (data.root.captcha){
							layer.msg(data.root.captcha);
						}
					} else {
						errorType(data);
					}
					$("#rvc_captchaImageIpt").val('');
					getCaptchaImage();
				}
				$("#rvcSub").removeAttr('disabled').removeAttr('style').text("提交");
			})
		}
		return false;
	})
//注册验证
	//手机号验证
		$(".regPhone").on("focus",function(){
			$(".regPhoneTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".regPhone").val()) === "" ){
				$(".regPhoneTip").html('<i class="fa fa-times-circle"></i>手机号不能为空');
			} else if ( !check_regPhone() ){
				$(".regPhoneTip").html('<i class="fa fa-times-circle"></i>手机号格式错误');
			} else {
				$(".regPhoneTip").html('');
			}
		})
		function check_regPhone(){
			var flag = true;
			if ( !phoneReg.test( $.trim($(".regPhone").val()) ) ){
				$(".regPhoneTip").html('<i class="fa fa-times-circle"></i>手机号格式错误');
				return false;
			} else {
			};
			return flag;
		}
	//手机验证码验证
		$(".regYz").on("focus",function(){
			$(".regYzTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".regYz").val()) === "" ){
				$(".regYzTip").html('<i class="fa fa-times-circle"></i>手机验证码不能为空');
			} else {
				$(".regYzTip").html('');
			}
		})
	//密码验证
		$(".regPwd").on("focus",function(){
			$(".regPwdTip").html('<i class="fa fa-hand-o-right"></i>格式：6-20 字符');
		}).on("blur", function(){
			if ( $.trim($(".regPwd").val()) === "" ){
				$(".regPwdTip").html('<i class="fa fa-times-circle"></i>密码不能为空');
			} else if ( !check_regPwd() ){
				$(".regPwdTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
			} else {
				$(".regPwdTip").html('');
			}
		})
		function check_regPwd(){
			var flag = true;
			if ( !pwdReg.test( $.trim($(".regPwd").val()) ) ){
				$(".regPwdTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
				return false;
			} else {
			};
			return flag;
		}
	//密码确认
		$(".regPwdArgin").on("focus",function(){
			$(".regPwdArginTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".regPwdArgin").val()) === "" ){
				$(".regPwdArginTip").html('<i class="fa fa-times-circle"></i>确认密码不能为空');
			} else if ( !check_regPwdArgin() ){
				$(".regPwdArginTip").html('<i class="fa fa-times-circle"></i>两次密码不一致');
			} else {
				$(".regPwdArginTip").html('');
			}
		})
		function check_regPwdArgin(){
			var flag = true;
			if ( $.trim($(".regPwdArgin").val()) != $.trim($(".regPwd").val()) ){
				$(".regPwdArginTip").html('<i class="fa fa-times-circle"></i>两次密码不一致');
				return false;
			} else {
			};
			return flag;
		}
	//用户名验证
		// $(".regUsername").on("focus",function(){
		// 	$(".regUsernameTip").html('<i class="fa fa-hand-o-right"></i>格式：2-20 字符');
		// }).on("blur", function(){
		// 	if ( $.trim($(".regUsername").val()) === "" ){
		// 		$(".regUsernameTip").html('<i class="fa fa-times-circle"></i>用户名不能为空');
		// 	} else if ( !check_regUsername() ){
		// 		$(".regUsernameTip").html('<i class="fa fa-times-circle"></i>用户名必须为2-20字符');
		// 	} else {
		// 		$(".regUsernameTip").html('');
		// 	}
		// })
		// function check_regUsername(){
		// 	var flag = true;
		// 	if ( !usernameReg.test( $.trim($(".regUsername").val()) ) ){
		// 		$(".regUsernameTip").html('<i class="fa fa-times-circle"></i>用户名必须为2-20字符');
		// 		return false;
		// 	} else {
		// 	};
		// 	return flag;
		// }

//注册提交
	$(document).on("submit",".registerForm",function(ev){
		preDef(ev);
		var flag = true;
		//验证
			//手机号
				if (  $.trim($(".regPhone").val()) === "" ){
					$(".regPhoneTip").html('<i class="fa fa-times-circle"></i>手机号不能为空');
					flag = false;
				} else if (!check_regPhone()){
					$(".regPhoneTip").html('<i class="fa fa-times-circle"></i>手机号格式错误');
					flag = false;
				}
			//手机验证码
				if (  $.trim($(".regYz").val()) === "" ){
					$(".regYzTip").html('<i class="fa fa-times-circle"></i>手机验证码不能为空');
					flag = false;
				}
			//密码
				if (  $.trim($(".regPwd").val()) === "" ){
					$(".regPwdTip").html('<i class="fa fa-times-circle"></i>密码不能为空');
					flag = false;
				} else if (!check_regPwd()){
					$(".regPwdTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
					flag = false;
				}
			//确认密码
				if (  $.trim($(".regPwdArgin").val()) === "" ){
					$(".regPwdArginTip").html('<i class="fa fa-times-circle"></i>确认密码不能为空');
					flag = false;
				} else if (!check_regPwdArgin()){
					$(".regPwdArginTip").html('<i class="fa fa-times-circle"></i>两次密码不一致');
					flag = false;
				}
			//用户名
				// if (  $.trim($(".regUsername").val()) === "" ){
				// 	$(".regUsernameTip").html('<i class="fa fa-times-circle"></i>用户名不能为空');
				// 	flag = false;
				// } else if (!check_regUsername()){
				// 	$(".regUsernameTip").html('<i class="fa fa-times-circle"></i>用户名必须为2-20字符');
				// 	flag = false;
				// }
		if (flag){

			$('#registerSubBtn').attr('disabled','disabled').css('opacity',.45).text('正在提交...');
			bugAjax({
				url: 'user/register',
				dataJson: {
					phone: 		$.trim($(".regPhone").val()),
					verifyCode: $.trim($(".regYz").val()),
					password: 	$.trim($(".regPwd").val()),
					// name: 		$.trim($(".regUsername").val()),
					// company: 	$.trim($(".regCompany").val()),
					orderId: 	bugStorage.getItem('orderCreateId')
				}
			},function(data){
				console.log(data.root,data);
				if (data.success){
					// bugStorage.delItem("orderCreateId");
					// layer.msg("注册成功，即将跳转至登录页...");					
					// setTimeout(function(){
					// 	window.location.href = 'http://' + window.location.host + '/login.html';

					// },2000);
					bugStorage.setItem("token", data.root);	

					if (bugStorage.getItem('orderCreateId')){
						bugStorage.delItem("orderCreateId");
						layer.msg("注册成功，即将跳转...");
						setTimeout(function(){
							window.location.href = './orders.html';
						},2000);
					} else {
						layer.msg("注册成功，即将跳转...");
						setTimeout(function(){
							window.location.href = './index.html';
						},2000);
					}
					
					

				} else{
					errorType(data);
				}
				$("#registerSubBtn").removeAttr('disabled').removeAttr('style').text("提交");
			})










		}


	})
















})