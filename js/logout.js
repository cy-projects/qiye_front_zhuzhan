$(function(){
	$(document).on('click', '.hr_userLogout, .headerLoginInfoBox .headerLogout', function(){
		layer.confirm("确定退出登录?", layerConfirm, function(index){ 
			bugAjax({
				type : "get",
				url : 'user/logout'
			},function(data){
				console.log(data.root,data);
				if (data.success)  {
					layer.msg('退出成功...');
					bugStorage.delItem('token');
					window.location.href = '/login.html';
				} else {
					errorType(data);
				}
			});
		})
		$(".layui-layer-setwin a").removeClass("layui-layer-ico").addClass("fa fa-remove");
	})


})