// $(function(){
// 	console.log(nowDate)
// 	console.log(yesterdayDate(now));
// 	console.log(weekStartDayDate(now));
// 	console.log(weekEndDayDate(now));
// 	console.log(lastWeekStartDayDate(now));
// 	console.log(lastWeekEndDayDate(now));
// 	console.log(monthStartDayDate(now));
// 	console.log(lastMonthStartDayDate(now));
// 	console.log('s');
// 	console.log(monthEndDayDate(now));
// 	console.log(lastMonthEndDayDate(now));

// })


//常用限制日期
	var now = new Date();
	var nowYear = tDouble( now.getFullYear() );
	var nowDate = tDouble( now.getFullYear() ) + '-' + tDouble( now.getMonth()+1 ) + '-' + tDouble( now.getDate() ) ;
	var nowMonthFirstDay = tDouble( now.getFullYear() ) + '-' + tDouble( now.getMonth()+1 ) + '-01';





//传参毫秒数时间 获取 yy-mm-dd hh:mm 格式的时间(如： 2016-10-02 10:02)
	var getTime_fromMesc = function (time) {
		if ( time == undefined ) {
			var result = '';
		} else {
			var getTime = new Date (time);
			var result = tDouble( getTime.getFullYear() ) + '-' + tDouble( getTime.getMonth()+1 ) + '-' + tDouble( getTime.getDate() ) + ' ' + tDouble( getTime.getHours() ) + ':' + tDouble( getTime.getMinutes() );
		}
		return result;
	}
//传参毫秒数时间 获取 yy-mm-dd 格式的时间(如： 2016-10-02)
	var getDate_fromMesc = function (time) {
		if ( time == undefined ) {
			var result = '';
		} else {
			var getTime = new Date (time);
			var result = tDouble( getTime.getFullYear() ) + '-' + tDouble( getTime.getMonth()+1 ) + '-' + tDouble( getTime.getDate() );
		}
		return result;
	}
//传参时间返回毫秒数
	var getMesc_fromTime = function (time) {
		if ( time == undefined || time == '' ) {
			var result = '';
		} else {
			var result = +new Date(time);
		}
		return result;
	}


//传参时间获取 此时间的上一天
	var yesterdayDate = function(time){
		var result = null;
		result = getDate_fromMesc( +new Date(time) - 24*3600*1000 );
		return result;
	}

//传参时间获取 此时间周开始天数
	var weekStartDayDate = function(time){
		var chuTime = new Date(time);
		var chuDay = chuTime.getDay();
		var result = getDate_fromMesc( +new Date(time) - chuDay*24*3600*1000 );
		return result;
	}
//传参时间获取 此时间周结束天数
	var weekEndDayDate = function(time){
		var chuTime = new Date(time);
		var chuDay = chuTime.getDay();
		var result = getDate_fromMesc( +new Date(time) + (6-chuDay)*24*3600*1000 );
		return result;
	}

//传参时间获取 此时间上周开始天数
	var lastWeekStartDayDate = function(time){
		var chuTime = new Date(time);
		var chuDay = chuTime.getDay();
		var result = getDate_fromMesc( +new Date(time) - (chuDay + 7)*24*3600*1000 );
		return result;
	}
//传参时间获取 此时间上周结束天数
	var lastWeekEndDayDate = function(time){
		var chuTime = new Date(time);
		var chuDay = chuTime.getDay();
		var result = getDate_fromMesc( +new Date(time) - (1 + chuDay)*24*3600*1000 );
		return result;
	}

//传参时间获取 此时间月开始天数
	var monthStartDayDate = function(num){
		var chuDate = getDate_fromMesc(num);
		var month = parseInt( chuDate.substring(5,7) );
		var year = parseInt( chuDate.substring(0,4) );
		var result = year + '-' + tDouble( month ) + '-01';
		return result;
	}	
//传参时间获取 此时间月结束天数
	var monthEndDayDate = function(num){
		var days = ( +new Date( nextMonthStartDayDate(num) ) - +new Date( monthStartDayDate(num) ) )/(1000 * 60 * 60 * 24);
		var chuDate = getDate_fromMesc(num);
		var month = parseInt( chuDate.substring(5,7) );
		var year = parseInt( chuDate.substring(0,4) );
		var result = year + '-' + tDouble( month ) + '-' + days;
		return result;
	}

//传参时间获取 此时间上月开始天数
	var lastMonthStartDayDate = function(num){
		var chuDate = getDate_fromMesc(num);
		var month = parseInt( chuDate.substring(5,7) );
		var year = parseInt( chuDate.substring(0,4) );
		if ( month > 1 ) {
			var newMonth = month - 1;
			var newYear = year;
		} else {
			var newMonth = 12;
			var newYear = year - 1;
		}
		var result = newYear + '-' + tDouble( newMonth ) + '-01';
		return result;
	}
//传参时间获取 此时间上月结束天数
	var lastMonthEndDayDate = function(num){
		var days = ( +new Date( monthStartDayDate(num) ) - +new Date( lastMonthStartDayDate(num) ) )/(1000 * 60 * 60 * 24);
		var chuDate = getDate_fromMesc(num);
		var month = parseInt( chuDate.substring(5,7) );
		var year = parseInt( chuDate.substring(0,4) );
		if ( month > 1 ) {
			var newMonth = month - 1;
			var newYear = year;
		} else {
			var newMonth = 12;
			var newYear = year - 1;
		}
		var result = newYear + '-' + tDouble( newMonth ) + '-' + days;
		return result;
	}

//传参时间获取 此时间下月开始天数
	var nextMonthStartDayDate = function(num){
		var chuDate = getDate_fromMesc(num);
		var month = parseInt( chuDate.substring(5,7) );
		var year = parseInt( chuDate.substring(0,4) );
		if ( month < 12 ) {
			var newMonth = month + 1;
			var newYear = year;
		} else {
			var newMonth = 1;
			var newYear = year + 1;
		}
		var result = newYear + '-' + tDouble( newMonth ) + '-01';
		return result;
	}


//Bootstrap dateTimePicker日期
	//yyyy
		var yyyy = function( a , b){
			a.datetimepicker({
				format: 'yyyy',				//日期格式
				autoclose: true,			//当选择一个日期之后是否立即关闭此日期时间选择器。
				keyboardNavigation: true,	//是否允许通过方向键该改变日期
				todayHighlight: 1,			//高亮当前日期
				startView: 4,				//日期时间选择器打开之后首先显示的视图。
				minView: 4,					//日期时间选择器所能够提供的最精确的时间选择视图。
				language:　'zh-CN',
				clearBtn: true				//清除按钮
			});
			a.datetimepicker('setStartDate', b );
		}
	//yyyy (月报专用)(清除时，写入placeholder = [No set])
		var yyyyMonthlyReports = function( a , b ){
			a.datetimepicker({
				format: 'yyyy',
				autoclose: true,
				keyboardNavigation: true,
				todayHighlight: 1,
				startView: 4,
				minView: 4,
				language:　'zh-CN',
				clearBtn: true
			});
			a.datetimepicker('setStartDate', b );
			a.datetimepicker().on('changeDate', function(ev){
				if ( a.val() == '' ) { a.attr('placeholder','[ No set ]'); }
			})
		}
	//yyyy-mm-dd
		var yymmdd = function( a , b){
			a.datetimepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				keyboardNavigation: true,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				language:　'zh-CN',
				clearBtn: true
			});
			a.datetimepicker('setStartDate', b );
		}
	//From yyyy-mm-dd to yyyy-mm-dd(可以传参限制日期)
		var yymmddDbl= function (a,b,c){
			a.datetimepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				keyboardNavigation: true,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				language:　'zh-CN',
				clearBtn: true,
			});
			a.datetimepicker('setStartDate', c );
			a.datetimepicker().on('changeDate', function(ev){
				if ( ev.date != null ) {
					if ( +new Date(a.val()) >= +new Date(b.val()) ) { 
						b.val( a.val() );
					};
				}
			})
			b.datetimepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				keyboardNavigation: true,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				language:　'zh-CN',
				clearBtn: true,
			});
			b.datetimepicker('setStartDate', c );
			b.datetimepicker().on('changeDate', function(ev){
				if ( ev.date != null ) {
					if ( +new Date(a.val()) >= +new Date(b.val()) ) { a.val( b.val() ) };
				}
			})
		}
	//From yyyy-mm-dd to yyyy-mm-dd(可以传参限制日期)(月报专用)(清除时，写入placeholder = [No set])
		var yymmddDblWeeklyReports= function (a,b,c){
			a.datetimepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				keyboardNavigation: true,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				language:　'zh-CN',
				clearBtn: true,
			});
			a.datetimepicker('setStartDate', c );
			a.datetimepicker().on('changeDate', function(ev){
				if ( ev.date != null ) {
					if ( +new Date(a.val()) >= +new Date(b.val()) ) { 
						b.val( a.val() );
					};
				}
				if ( a.val() == '' ) { a.attr('placeholder','[ No set ]'); }
			})
			b.datetimepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				keyboardNavigation: true,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				language:　'zh-CN',
				clearBtn: true,
			});
			b.datetimepicker('setStartDate', c );
			b.datetimepicker().on('changeDate', function(ev){
				if ( ev.date != null ) {
					if ( +new Date(a.val()) >= +new Date(b.val()) ) { a.val( b.val() ) };
				}
				if ( b.val() == '' ) { b.attr('placeholder','[ No set ]'); }
			})
		}
		//From yyyy-mm-dd(清除时，写入placeholder = [All])
		var yymmddClear_addPlaceholderAll= function (a,b){
			a.datetimepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				keyboardNavigation: true,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				language:　'zh-CN',
				clearBtn: true,
			});
			a.datetimepicker('setStartDate', b );
			a.datetimepicker().on('changeDate', function(ev){
				if ( a.val() == '' ) { a.attr('placeholder','[All]'); }
			})
		}
	//hh:ii
		var hhii = function( a ){
			a.datetimepicker({
				format: 'hh:ii',
				autoclose: true,
				keyboardNavigation: true,
				startView: 1,
				minView: 0,
				language:　'zh-CN',
				clearBtn: true,
				title: ''
			});
			$(".datetimepicker thead tr th").empty();
			$(".table-condensed thead>tr>th").css({"padding":"0","height":"0"});
		}
