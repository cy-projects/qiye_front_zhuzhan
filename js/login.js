$(function(){
	var randomStrFindPwd = null;
//找回密码弹窗
	$(document).on('click','.forgetPwdBtn',function(){
		loadPage2("registerVerifyCode.html", "#findPwdVerifyFrom", function(element){
			var layerPopup = layer.open({
		    	title: "<span class='layer_title'><i class='fa fa-mobile fs20'></i><strong>重置密码</strong></span>",
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
		        	$("#findPwd_phone").val($.trim($(".loginPhone").val()));
		        	getFindPwdCaptchaImage();
					$(".findPwd_captchaImageChange, .findPwd_captchaImageBox").click(function(){
						getFindPwdCaptchaImage();
					})
					
				}
		    });
		})
		return false;
	})
	function getFindPwdCaptchaImage(){
		randomStrFindPwd = getRanNum(16);
		$("#findPwd_captchaImageIpt").attr("data-value",randomStrFindPwd);
		var randomNowStr = $("#findPwd_captchaImageIpt").attr("data-value");
		var randomNowHref = 'http://' + window.location.host + '/cgi/user/captchaImage?random='+randomNowStr;
		$(".findPwd_captchaImage").attr("src",randomNowHref);
	}
//找回密码提交
	$(document).on("submit", "#findPwdVerifyFrom", function(){
		if ($("#findPwd_phone").val() === ''){
			layer.msg("手机号不能为空!");
		} else if( !phoneReg.test($.trim($("#findPwd_phone").val())) ){
			layer.msg("手机号格式错误!");
		} else if($("#findPwd_captchaImageIpt").val() === ''){
			layer.msg("验证码不能为空!");	
		} else{
			$('#findPwdVerifySub').attr('disabled','disabled').css('opacity',.45).text('正在提交...');
			bugAjax({
				url: 'user/sendPasswordSms',
				dataJson: {
					phone: $("#findPwd_phone").val(),
					random: $("#findPwd_captchaImageIpt").attr("data-value"),
					captcha: $("#findPwd_captchaImageIpt").val(),
				}
			},function(data){
				// console.log(data.root,data);
				if (data.success){
					$(".loginPhone").val($.trim($("#findPwd_phone").val()));
					layer.closeAll();
					layer.msg("新密码已经发送至你的手机，请查看！");
				} else {
					if (data.root){
						if (data.root.captcha){
							layer.msg(data.root.captcha);
						}
					} else {
						errorType(data);
					}
					$("#findPwd_captchaImageIpt").val('');
					getFindPwdCaptchaImage();
				}
				$("#findPwdVerifySub").removeAttr('disabled').removeAttr('style').text("提交");
			})
		}
		return false;
	})

//自动登录
	// $(document).on("change","#remeber",function(){

	// })

//图形验证码
	var randomStr = null;
	getLoginCaptchaImage();
	$(".login_captchaImageChange,.login_captchaImageBox").click(function(){
		getLoginCaptchaImage();
	})
	function getLoginCaptchaImage(){
		randomStr = getRanNum(16);
		$(".login_captchaImageIpt").attr("data-value",randomStr);
		var randomNowStr = $(".login_captchaImageIpt").attr("data-value");
		var randomNowHref = 'http://' + window.location.host + '/cgi/user/captchaImage?random='+randomNowStr;
		$(".login_captchaImage").attr("src",randomNowHref);
	}
//登陆表单验证
	//手机号验证
		$(".loginPhone").on("focus",function(){
			$(".loginPhoneTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".loginPhone").val()) === "" ){
				$(".loginPhoneTip").html('<i class="fa fa-times-circle"></i>手机号不能为空');
			} else if ( !check_loginPhone() ){
				$(".loginPhoneTip").html('<i class="fa fa-times-circle"></i>手机号格式错误');
			} else {
				$(".loginPhoneTip").html('');
			}
		})
		function check_loginPhone(){
			var flag = true;
			if ( !phoneReg.test( $.trim($(".loginPhone").val()) ) ){
				$(".loginPhoneTip").html('<i class="fa fa-times-circle"></i>手机号格式错误');
				return false;
			} else {
			};
			return flag;
		}
	//密码验证
		$(".loginPwd").on("focus",function(){
			$(".loginPwdTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".loginPwd").val()) === "" ){
				$(".loginPwdTip").html('<i class="fa fa-times-circle"></i>密码不能为空');
			} else if ( !check_loginPwd() ){
				$(".loginPwdTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
			} else {
				$(".loginPwdTip").html('');
			}
		})
		function check_loginPwd(){
			var flag = true;
			if ( !pwdReg.test( $.trim($(".loginPwd").val()) ) ){
				$(".loginPwdTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
				return false;
			} else {
			};
			return flag;
		}
	//图形验证码
		$(".login_captchaImageIpt").on("focus",function(){
			$(".login_captchaImageTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".login_captchaImageIpt").val()) === "" ){
				$(".login_captchaImageTip").html('<i class="fa fa-times-circle"></i>图形验证码不能为空');
			} else {
				$(".login_captchaImageTip").html('');
			}
		})
//登陆提交
	$(document).on("submit", ".loginForm", function(ev){
		preDef(ev);
		var flag = true;
		//验证
			//手机号
				if (  $.trim($(".loginPhone").val()) === "" ){
					$(".loginPhoneTip").html('<i class="fa fa-times-circle"></i>手机号不能为空');
					flag = false;
				} else if (!check_loginPhone()){
					$(".loginPhoneTip").html('<i class="fa fa-times-circle"></i>手机号格式错误');
					flag = false;
				}
			//密码
				if (  $.trim($(".loginPwd").val()) === "" ){
					$(".loginPwdTip").html('<i class="fa fa-times-circle"></i>密码不能为空');
					flag = false;
				} else if (!check_loginPwd()){
					$(".loginPwdTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
					flag = false;
				}
			//验证码
				if (  $.trim($(".login_captchaImageIpt").val()) === "" ){
					$(".login_captchaImageTip").html('<i class="fa fa-times-circle"></i>验证码不能为空');
					flag = false;
				}
		if (flag){
			$('#loginSubBtn').attr('disabled','disabled').css('opacity',.45).text('正在提交...');
			console.log(bugStorage.getItem('orderCreateId'));
			bugAjax({
				url: 'user/login',
				dataJson: {
					phone: 		$.trim($(".loginPhone").val()),					
					password: 	$.trim($(".loginPwd").val()),
					captcha: 	$.trim($(".login_captchaImageIpt").val()),
					random: 	$.trim($(".login_captchaImageIpt").attr("data-value")),
					orderId: 	bugStorage.getItem('orderCreateId')
				}
			},function(data){
				console.log(data.root,data);
				if (data.success){
					bugStorage.setItem("token", data.root);
					bugStorage.delItem("orderCreateId");
					// if ( bugStorage.getItem('bugInfoUrl') != null ){
					// 	var newUrl = bugStorage.getItem("bugInfoUrl");
					// 	bugStorage.delItem("bugInfoUrl");
					// 	layer.msg("即将跳转...");
					// 	setTimeout(function(){
					// 		window.location.href = newUrl;
					// 	},2000);
					// } else {
						// if ($("#remeber").is(":checked")){
						// 	alert("是")
						// } else {
						// 	alert("否")
						// }
						layer.msg("登录成功，即将跳转...");
						setTimeout(function(){
							window.location.href = './orders.html';
						},2000);
					// }
				} else{
					if (data.root){
						if (data.root.captcha){
							layer.msg(data.root.captcha);
						}

					} else {
						errorType(data);
					}
					$(".login_captchaImageIpt").val('');
					getLoginCaptchaImage();
				}
				$("#loginSubBtn").removeAttr('disabled').removeAttr('style').text("提交");
			})
		}
			
	})












})