$(function(){
	//新密码验证
		$(".cpNew").on("focus",function(){
			$(".regPwdTip").html('<i class="fa fa-hand-o-right"></i>格式：6-20 字符');
		}).on("blur", function(){
			if ( $.trim($(".cpNew").val()) === "" ){
				$(".cpNewTip").html('<i class="fa fa-times-circle"></i>密码不能为空');
			} else if ( !check_cpNew() ){
				$(".cpNewTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
			} else {
				$(".cpNewTip").html('');
			}
		})
		function check_cpNew(){
			var flag = true;
			if ( !pwdReg.test( $.trim($(".cpNew").val()) ) ){
				$(".cpNewTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
				return false;
			} else {
			};
			return flag;
		}
	//新密码确认
		$(".cpNewConfirm").on("focus",function(){
			$(".cpNewConfirmTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".cpNewConfirm").val()) === "" ){
				$(".cpNewConfirmTip").html('<i class="fa fa-times-circle"></i>确认密码不能为空');
			} else if ( !check_cpNewConfirm() ){
				$(".cpNewConfirmTip").html('<i class="fa fa-times-circle"></i>两次密码不一致');
			} else {
				$(".cpNewConfirmTip").html('');
			}
		})
		function check_cpNewConfirm(){
			var flag = true;
			if ( $.trim($(".cpNewConfirm").val()) != $.trim($(".cpNew").val()) ){
				$(".cpNewConfirmTip").html('<i class="fa fa-times-circle"></i>两次密码不一致');
				return false;
			} else {
			};
			return flag;
		}


	$(document).on("submit",".changePwdForm",function(ev){
		preDef(ev);
		var flag = true;
		//验证
			//密码
				if (  $.trim($(".cpNew").val()) === "" ){
					$(".cpNewTip").html('<i class="fa fa-times-circle"></i>密码不能为空');
					flag = false;
				} else if (!check_cpNew()){
					$(".cpNewTip").html('<i class="fa fa-times-circle"></i>密码必须为6-20字符');
					flag = false;
				}
			//确认密码
				if (  $.trim($(".cpNewConfirm").val()) === "" ){
					$(".cpNewConfirmTip").html('<i class="fa fa-times-circle"></i>确认密码不能为空');
					flag = false;
				} else if (!check_cpNewConfirm()){
					$(".cpNewConfirmTip").html('<i class="fa fa-times-circle"></i>两次密码不一致');
					flag = false;
				}

		if (flag){
			$('.changePwdSubBtn').attr('disabled','disabled').css('opacity',.45).text('提交中...');
			var userObj = JSON.parse(bugStorage.getItem('userObj'));
			var changePwd = {
        		url : 'user/changePassword',
        		dataJson : {
        			id: userObj.id,
        			oldPassword : $(".cpOld").val(),
        			newPassword : $(".cpNew").val()
        		}
        	};
        	bugAjax(changePwd,function(data){
        		console.log(data.root,data);
        		if (data.success) {
                    bugStorage.delItem("token");
                    // layer.closeAll();
        			layer.msg("修改成功，即将跳转...");
					setTimeout(function(){
						window.location.href = './login.html';
					},2000);
        		} else {
        			errorType(data);
        		}
                $(".changePwdSubBtn").removeAttr('disabled').removeAttr('style').text('提交');
        	},function(){
        		$(".changePwdSubBtn").removeAttr('disabled').removeAttr('style').text('提交');
        	})
		}
	})

})

