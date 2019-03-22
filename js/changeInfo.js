$(function(){
	//用户名验证
		$(".ciName").on("focus",function(){
			$(".ciNameTip").html('<i class="fa fa-hand-o-right"></i>格式：2-20 字符');
		}).on("blur", function(){
			if ( $.trim($(".ciName").val()) === "" ){
				$(".ciNameTip").html('');
			} else if ( !check_ciName() ){
				$(".ciNameTip").html('<i class="fa fa-times-circle"></i>用户名必须为2-20字符');
			} else {
				$(".ciNameTip").html('');
			}
		})
		function check_ciName(){
			var flag = true;
			if ( !usernameReg.test( $.trim($(".ciName").val()) ) ){
				$(".ciNameTip").html('<i class="fa fa-times-circle"></i>用户名必须为2-20字符');
				return false;
			} else {
			};
			return flag;
		}
	//公司验证
		$(".ciCompany").on("focus",function(){
			$(".ciCompanyTip").html('<i class="fa fa-hand-o-right"></i>格式：不小于6个字符');
		}).on("blur", function(){
			if ( $.trim($(".ciCompany").val()) === "" ){
				$(".ciCompanyTip").html('');
			} else if ( !check_ciCompany() ){
				$(".ciCompanyTip").html('<i class="fa fa-times-circle"></i>公司不能少于6个字符');
			} else {
				$(".ciCompanyTip").html('');
			}
		})
		function check_ciCompany(){
			var flag = true;
			if ( !/^.{6,}/.test( $.trim($(".ciCompany").val()) ) ){
				$(".ciCompanyTip").html('<i class="fa fa-times-circle"></i>公司不能少于6个字符');
				return false;
			} else {
			};
			return flag;
		}
	//邮件验证
		$(".ciEmail").on("focus",function(){
			$(".ciEmailTip").html('');
		}).on("blur", function(){
			if ( $.trim($(".ciEmail").val()) === "" ){
				$(".ciEmailTip").html('');
			} else if ( !check_ciEmail() ){
				$(".ciEmailTip").html('<i class="fa fa-times-circle"></i>邮箱格式不正确');
			} else {
				$(".ciEmailTip").html('');
			}
		})
		function check_ciEmail(){
			var flag = true;
			if ( !emailReg.test( $.trim($(".ciEmail").val()) ) ){
				$(".ciEmailTip").html('<i class="fa fa-times-circle"></i>邮箱格式不正确');
				return false;
			} else {
			};
			return flag;
		}

	$(document).on("submit",".changeInfoForm",function(ev){
		preDef(ev);
		var flag = true;
		//验证
			//用户名
				if (  $.trim($(".ciName").val()) === "" ){
					// $(".ciNameTip").html('<i class="fa fa-times-circle"></i>用户名不能为空');
					// flag = false;
				} else if (!check_ciName()){
					$(".ciNameTip").html('<i class="fa fa-times-circle"></i>用户名必须为2-20字符');
					flag = false;
				}
			//公司
				if (  $.trim($(".ciCompany").val()) === "" ){
					// $(".ciCompanyTip").html('<i class="fa fa-times-circle"></i>用户名不能为空');
					// flag = false;
				} else if (!check_ciCompany()){
					$(".ciCompanyTip").html('<i class="fa fa-times-circle"></i>公司不能少于6个字符');
					flag = false;
				}
			//邮箱
				if (  $.trim($(".ciEmail").val()) === "" ){
					// $(".ciEmailTip").html('<i class="fa fa-times-circle"></i>邮箱不能为空');
					// flag = false;
				} else if (!check_ciEmail()){
					$(".ciEmailTip").html('<i class="fa fa-times-circle"></i>邮箱格式不正确');
					flag = false;
				}

		if (flag){
			$('.changeInfoSubBtn').attr('disabled','disabled').css('opacity',.45).text('提交中...');
			var userObj = JSON.parse(bugStorage.getItem('userObj'));
			var changePwd = {
        		url : 'user/modify',
        		dataJson : {
        			id: userObj.id,
        			name : $(".ciName").val(),
        			company : $(".ciCompany").val(),
        			email : $(".ciEmail").val()
        		}
        	};
        	bugAjax(changePwd,function(data){
        		console.log(data.root,data);
        		if (data.success) {
                    // bugStorage.delItem("token");
                    // layer.closeAll();
        			layer.msg("修改成功，即将跳转...");
					setTimeout(function(){
						window.location.href = './orders.html';
					},2000);
        		} else {
        			errorType(data);
        		}
                $(".changeInfoSubBtn").removeAttr('disabled').removeAttr('style').text('提交');
        	},function(){
        		$(".changeInfoSubBtn").removeAttr('disabled').removeAttr('style').text('提交');
        	})
		}
	})

})

