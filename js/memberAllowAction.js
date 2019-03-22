//AllowActions 二级权限
	//订单列表详情操作权限
		var myOrderD_allowActions = function(data){
			$(".orderDBtn_return").show(0);
			$(".orderDBtn_export").show(0);
			$(".orderDBtn_pay").hide(0);
			// $(".orderDBtn_evaluate").show(0);
			$(".orderDBtn_del").hide(0);
			if ( data.root.allowActions.indexOf("Modify") > -1 ) { $(".orderDBtn_edit").show(0); } else { $(".orderDBtn_edit").hide(0); }
			if ( data.root.allowActions.indexOf("Evaluate") > -1 ) { $(".orderDBtn_evaluate").show(0); } else { $(".orderDBtn_evaluate").hide(0); }
			// if ( data.root.allowActions.indexOf("Delete") > -1 ) { $(".orderDBtn_del").show(0);  } else { $(".orderDBtn_del").hide(0); }
		}