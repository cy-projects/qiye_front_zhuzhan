$(function(){
//在线下单
	$(".onlineOrder").click(function(){
		$(".bugMain").loadPage({
			url: 'memberContent.html',
			id: '.bugMain_onlineOrder',
			success: function(){
				$(".onlineOrder_tableBox").loadPage({
					url: 'memberContent.html',
					id: '#onlinePriceForm',
					success: function(){
						onlinePriceInstru();
						onlinePriceData();
					}
				})
			}
		})
	})
//我的订单
	$(".myOrder").click(function(){
		$(".bugMain").loadPage({
			url: 'memberContent.html',
			id: '.bugMain_myOrder',
			success: function(){
				myOrderCountFn();
				yymmddDbl($("#myOrderFilter_beginDate"), $("#myOrderFilter_endDate"));
			}
		})
	})















})