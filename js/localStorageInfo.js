$(function(){
//登陆时进行缓存操作
	set_orderListLocal('project/list', 		'cfProjectList', 	10);
	set_orderListLocal('personOption/list', 'cfPersonList', 	20);
	set_orderListLocal('timeOption/list', 	'cfTimeList', 		30);
	set_orderListLocal('designOption/list', 'cfDesignList', 	40);
	set_orderListLocal('licenseOption/list','cfLicenceList', 	50);
	set_orderListLocal('legalOption/list', 	'cfLegalList', 		60);
	set_orderListLocal('authOption/list', 	'cfAuthList', 		70);
	set_orderListLocal('invoiceOption/list','cfInvoiceList', 	80);
	set_orderListLocal('operateOption/list','cfOperateList', 	90);
	set_orderListLocal('visitOption/list', 	'cfVisitList', 		100);
	set_orderListLocal_cfCity('cityOption/list', 'cfCityList', 	110);


})

//订单参数本地缓存
	function set_orderListLocal(url, text, time){
		setTimeout(function(){
			bugAjax({
				type : 'get',
				url : url
			},function(data){
				// console.log(data.root,data);
				if (data.success) {
					var obj = [];
					for (var i=0 ;i<data.root.length; i++ ) {
						var item = data.root[i];

						var objItem = {
							id: item.id,
							title: filterS( item.title )
						}
						if (text == 'cfProjectList'){
							objItem.dayTravelPrice = item.dayTravelPrice || 0;
							objItem.travelPriceEnabled = item.travelPriceEnabled || false;
						}

						obj.push(objItem);
					}
					bugStorage.setItem(text, JSON.stringify(obj));
				} else { errorType(data); }
			})
		}, time);
	}
//城市选择Page
	function set_orderListLocal_cfCity(url, text, time){
		setTimeout(function(){
			bugAjax({
				type : 'get',
				url : url
			},function(data){
				// console.log(data.root,data);
				if (data.success) {
					var obj = [];
					for (var i=0 ;i<data.root.length; i++ ) {
						var objItem = {
							id: data.root[i].id,
							province: filterS( data.root[i].province ),
							city: filterS( data.root[i].city ),
							travelPriceEnabled: data.root[i].travelPriceEnabled || false,
						}
						obj.push(objItem);
					}
					bugStorage.setItem(text, JSON.stringify(obj));
				} else { errorType(data); }
			})
		},time)
	}
//有缓存id取得 title
	function getTitleFromLocalId(numId, loca){
		var locaObj = JSON.parse(bugStorage.getItem(loca));
		for (var i=0; i<locaObj.length; i++){
			if ( numId == locaObj[i].id ){
				return locaObj[i].title;
			}
		}
	}
	function getDayTravelPriceFromLocalId(numId, loca){
		var locaObj = JSON.parse(bugStorage.getItem(loca));

		for (var i=0; i<locaObj.length; i++){
			if ( numId == locaObj[i].id ){
				return locaObj[i].dayTravelPrice;
			}
		}
	}
	function getTravelPriceEnabledFromLocalId(numId, loca){
		var locaObj = JSON.parse(bugStorage.getItem(loca));

		for (var i=0; i<locaObj.length; i++){
			if ( numId == locaObj[i].id ){
				return locaObj[i].travelPriceEnabled;
			}
		}
	}
	function get_cfProjectTitle(num){ 	return getTitleFromLocalId(num, 'cfProjectList'); }
	function get_cfProjectDayTravelPrice(num){ 	return getDayTravelPriceFromLocalId(num, 'cfProjectList'); }
	function get_cfProjectTravelPriceEnabled(num){ 	return getTravelPriceEnabledFromLocalId(num, 'cfProjectList'); }
	function get_cfProjectTitleArr(arr){
		var result = new Array();
		for (var i=0; i<arr.length; i++){
			result.push(get_cfProjectTitle(arr[i]));
		}
		return result.join("，");
	}


	function get_cfPersonTitle(num){ 	return getTitleFromLocalId(num, 'cfPersonList'); }
	function get_cfTimeTitle(num){ 		return getTitleFromLocalId(num, 'cfTimeList'); }
	function get_cfDesignTitle(num){ 	return getTitleFromLocalId(num, 'cfDesignList'); }
	function get_cfLicenceTitle(num){ 	return getTitleFromLocalId(num, 'cfLicenceList'); }
	function get_cfLegalTitle(num){ 	return getTitleFromLocalId(num, 'cfLegalList'); }
	function get_cfAuthTitle(num){ 		return getTitleFromLocalId(num, 'cfAuthList'); }
	function get_cfInvoiceTitle(num){ 	return getTitleFromLocalId(num, 'cfInvoiceList'); }
	function get_cfOperateTitle(num){ 	return getTitleFromLocalId(num, 'cfOperateList'); }
	function get_cfVisitTitle(num){ 	return getTitleFromLocalId(num, 'cfVisitList'); }

//城市选择id 获取province
	function get_cfCityProvince(num){
		var cfCityList = JSON.parse(bugStorage.getItem('cfCityList'));
		for (var i=0; i<cfCityList.length; i++){
			if ( num == cfCityList[i].id ){
				return cfCityList[i].province;
			}
		}
	}
//城市选择id 获取city
	function get_cfCityCity(num){
		var cfCityList = JSON.parse(bugStorage.getItem('cfCityList'));
		for (var i=0; i<cfCityList.length; i++){
			if ( num == cfCityList[i].id ){
				return cfCityList[i].city;
			}
		}
	}





















































