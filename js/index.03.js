

$(function(){
	$(document).on("mousedown", ".serverC .media-left .btn", function(){
		var projectPick = $(this).attr("data-value");
		bugStorage.setItem( 'projectPick',JSON.stringify(projectPick) );	
		
	})

	if ($(".wrapper").attr("data-value") == 'index'){

		$(document).on("mousedown", ".price .buy a", function(){
			var projectPick = $(this).attr("data-value");
			bugStorage.setItem( 'projectPick',JSON.stringify(projectPick) );			
		})

		$(".priceItem >div").click(function(){
			var that = this;
			var projectPick = $(that).attr("data-projectId");
			bugStorage.setItem( 'projectPick',JSON.stringify(projectPick) );	

			// var link = 'http://' + window.location.host + $(that).attr("data-link");
			var link = 'http://' + window.location.host + '/onlinePrice.html';

			window.location.href = link;
		})


		getSettingInfo(function(data){
			console.log(data.root);
			var res = data.root || {};
			if (res){

				$(".indexContact-companyContactPhone").html(res.contactPhone || '133 1291 5497');
				var contactPhoneTel = 'tel:' + trimAll(res.contactPhone || '133 1291 5497');
				$(".indexContact-companyContactPhone").attr("href", contactPhoneTel);

				$(".indexContact-companyContactEmail").html(res.email || 'support@jqiso.com');
				var emailMailTo = 'mailto:' + trimAll(res.email || 'support@jqiso.com');
				$(".indexContact-companyContactEmail").attr("href", emailMailTo);


				$(".indexContact-companyWeixinCodeUrl").attr("src", res.weixinCodeUrl || './img/qy_weixin.sdfaf3.jpg');

				var resIntroduction = res.introduction || '';
				var companyIntroduction = filterSS( resIntroduction.slice(0, 280) ) + '...<a href="./about.html" class="more">更多>></a>';
				$(".indexContact-companyIntro").html( companyIntroduction );

			}

		})


		bugAjax({
			type: 'get',
			url: 'order/recentCount',
		}, function(res){
			// console.log(res);
			var num  = res.root || 10000;
			$(".orderRecode .intro").html('十余年服务客户' + num + '家；感谢有你！坚持就好！');
		})

		bugAjax({
			type: 'get',
			url: 'order/recentScore',
		}, function(res){
			console.log('order/recentScore', res);
			var num  = parseFloat(res.root) || 98;
			num = num.toFixed(2);
			$(".feedback .intro").html('客户满意率' + num + '%，好的差的都能促进我们；真实就好！');
		})
		
	} else if ($(".wrapper").attr("data-value") == 'about'){
		contactUsPicAni();
		$(window).on("scroll", contactUsPicAni);

		
		getSettingInfo(function(data){
			console.log(data.root);
			var res = data.root || {};
			if (res){
				$(".contactUs-companyAddress").html(res.companyAddress || '深圳市前海深港合作区前海一路1号A栋201');

				$(".contactUs-companyContactPhone").html(res.contactPhone || '133 1291 5497');
				var contactPhoneTel = 'tel:' + trimAll(res.contactPhone || '133 1291 5497');
				$(".contactUs-companyContactPhone").attr("href", contactPhoneTel);

				$(".contactUs-companyContactEmail").html(res.email || 'support@jqiso.com');
				var emailMailTo = 'mailto:' + trimAll(res.email || 'support@jqiso.com');
				$(".contactUs-companyContactEmail").attr("href", emailMailTo);


				$(".contactUs-companyBusinessPhone").html(res.businessPhone || '133 1291 5497');
				var businessPhoneTel = 'tel:' + trimAll(res.businessPhone || '133 1291 5497');
				$(".contactUs-companyBusinessPhone").attr("href", businessPhoneTel);

				$(".contactUs-companyWeixinCodeUrl").attr("src", res.weixinCodeUrl || './img/qy_weixin.sdfaf3.jpg');

				$(".contactUs-companyIntro").html( filterSS(res.introduction) );

				$(".contactUs-companyBrief").html( res.briefName || '精雀体系' );

				// $(".contactUs-companyQQ").html('<script charset="utf-8" type="text/javascript" src="http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDgyMjI5NV80NzAwMzBfODAwODIyMjk1Xw"></script>')
			}

		})


		function contactUsPicAni(){
			if ($(window).height() + $(window).scrollTop() > $(".contactUs .pic img").offset().top){
				$(".contactUs .pic img").addClass('rotateZ360');
			} else {
				$(".contactUs .pic img").removeClass('rotateZ360');
			}
		}	





	} else if ($(".wrapper").attr("data-value") == 'payType'){
		getSettingInfo(function(data){
			console.log(data.root);
			var res = data.root || {};
			if (res){
				$(".payment-companyName").html(res.companyName || '精雀体系（深圳）科技有限公司');
				$(".payment-bankAccount").html(res.bankAccount || '4000092509100494416');
				$(".payment-bankName").html(res.bankName || '工商银行深圳市分行宝民支行');
				$(".payment-bankPhone").html(res.bankPhone || '133 1291 5497');
			}

		})
	}



	// $(".priceItem .buy a").mouseenter(function(){
	// 	var that = this;
	// 	var top = $(that).position().top;

	// 	$(that).siblings('div').show();
	// 	$(that).siblings('div').css({
	// 		bottom: -top + 'px'
	// 	})

	// })
	// $(".priceItem .buy a").mouseleave(function(){
	// 	var that = this;
	// 	$(that).siblings('div').hide();
	// })


	// 新增功能在此
	$('.advantage .media').mouseover(function(){
		$(this).css("border-color","#f1b002");
		$(this).find('.media-left div').css("background-position","80px")
	})

	$('.advantage .media').mouseleave(function(){
		$(this).css("border-color","#d5d5d5");
		$(this).find('.media-left div').css("background-position","0px")
	})
	function filterS(text){
		if ( text === undefined || text === '' || text === [] ) {
			return '';
		} else {
			return text;
		}
	}

	// 首页订单

	bugAjax({
		type: 'get',
		url: 'order/recent',
	},function(data){
		// console.log(data);
		if (data.success){
			layer.closeAll();
			var recodeText = document.createElement("div");
			$(recodeText).addClass("recodeText");

			for (var i=0; i<data.root.length; i++){
				$(recodeText).append('\
					<div>\
						<div>'+(filterS(data.root[i].client)).substr(0,5)+'***</div>\
						<div>'+filterS(data.root[i].area)+'</div>\
						<div>'+filterS(data.root[i].service)+'</div>\
						<div>'+filterS(data.root[i].money)+'</div>\
						<div>'+filterS(data.root[i].state)+'</div>\
					</div>\
				')
			}
			var timer = null, timer2 = null, iSpeed = -1;
			var recodeTextClone = $(recodeText).clone(true);
			$(".recodeBox").append(recodeText);
			$(".recodeBox").append(recodeTextClone);
			var recodeBoxH = $(".recodeBox").height();

			function recodeRun(){
				$(".recodeBox").css("top", "+="+iSpeed+"px");
				if (parseInt($(".recodeBox").css("top")) == -recodeBoxH/2){
					$(".recodeBox").css("top", 0);
					clearInterval(timer);
					timer2=setTimeout(function(){timer=setInterval(recodeRun,1);},2000)
				}
				// else if($(".recodeBox").position().top > 0){
				// 	clearInterval(timer);
				// 	$(".recodeBox").css("top", -recodeBoxH/2+"px");
				// 	timer2=setTimeout(function(){timer=setInterval(recodeRun,1);},2000)
				// }
				else if (parseInt($(".recodeBox").css("top"))%50==0) {
					clearInterval(timer);
					timer2=setTimeout(function(){timer=setInterval(recodeRun,1);},2000)
				}
			}

			timer = setInterval(recodeRun, 1);
			$(".recodeTbody").mouseenter(function(){
				clearInterval(timer);
				clearInterval(timer2);
			})
			$(".recodeTbody").mouseleave(function(){
				timer = setInterval(recodeRun, 1);
			})
		}
	})


	function getSettingInfo(succ){
			bugAjax({
				type : 'get',
				url : 'settings/get'
			},function(data){
				// console.log(data.root,data);
				if (data.success) {
					succ(data);

				} else { 
					errorType(data); 
				}
			})
	}
	function trimAll(str){
		var reg = /\s+/g;
		var newStr = '';
		if (str){
			newStr = str.replace(reg, '');
		}

		return newStr;
	}
	
	// 首页 用户反馈

	bugAjax({
		type: 'get',
		url: 'order/recent',
		dataJson: {
			evaluation: true,
		}
	}, function(res){
		console.log('用户反馈', res);
		var data = res.root;

		var feedbackContent = $(".feedback-box");
		feedbackContent.html('');

		var feedbackText = document.createElement('div');
		$(feedbackText).addClass('feedback-text');


		for (var i=0; i<data.length; i++){
			var item = data[i];

				// <div class="satisfication">'+ satisficationFormat(item.satisfication) +'</div>\

			$(feedbackText).append('\
				<div>\
					<div class="client">'+ (filterS(item.client)).substr(0,5) +'***</div>\
					<div class="evaluationComment hidden-xs">'+filterSS(item.evaluationComment)+'</div>\
					<div class="evaluationScore">'+filterS(item.evaluationScore)+'</div>\
				</div>\
			')
		}

		// function satisficationFormat(str){
		// 	var result = '';

		// 	if (str !== ''){
		// 		switch (str){
		// 			case 'VeryGood': 		result = '很满意';break
		// 			case 'Good': 		result = '满意';break
		// 			case 'Normal': 	result = '一般';break
		// 			case 'Bad': 		result = '差';break
		// 			default: result = '很满意';
		// 		}
		// 	}

		// 	return result;
		// }

		// for (var i=0; i<data.length; i++){
		// 	var item = data[i];

		// 	$(feedbackText).append('\
		// 		<div class="col-xs-12 pd14">\
		// 			<div class="media">\
		// 				<div class="media-left va-m">\
		// 					<div>\
		// 						<span>'+  filterS(item.client).slice(0, 4)  +'***</span>\
		// 					</div>\
		// 				</div>\
		// 				<div class="media-body color666">\
		// 					<div class="left-quote fl md22"><span><img src="./img/doubleQuotesLeft.png" alt=""></span></div>\
		// 					<div class="text fl">'+ filterSS(item.evaluationComment) +'</div>\
		// 					<div class="right-quote fr"><span><img src="./img/doubleQuotesRight.png" alt=""></span></div>\
		// 				</div>\
		// 			</div>\
		// 		</div>')
		// }

		var feedbackTimer = null, feedbackTimer2 = null, feedbackISpeed = -1; 
		var feedbackTextClone = $(feedbackText).clone(true);
		feedbackContent.append(feedbackText);
		feedbackContent.append(feedbackTextClone);
		var feedbackContentH = feedbackContent.height();

		function feedbackRun(){
			feedbackContent.css("top", "+=" + feedbackISpeed + "px");

			if (parseInt(feedbackContent.css("top")) == -feedbackContentH/2){
				feedbackContent.css("top", 0);

				clearInterval(feedbackTimer);
				feedbackTimer2 = setTimeout(function(){
					feedbackTimer = setInterval(feedbackRun, 1);
				}, 2000)
			} else if ( parseInt(feedbackContent.css("top"))%50 == 0 ){
				clearInterval(feedbackTimer);
				feedbackTimer2 = setTimeout(function(){
					feedbackTimer = setInterval(feedbackRun, 1);
				}, 2000)
			}
		}

		feedbackTimer = setInterval(feedbackRun, 1);

		$(".feedback-tbody").mouseenter(function(){
				clearInterval(feedbackTimer);
			clearInterval(feedbackTimer2);
		})
		$(".feedback-tbody").mouseleave(function(){
			feedbackTimer = setInterval(feedbackRun, 1);
		})



	}, function(res){
		console.log(res);
	})
	


	
})

