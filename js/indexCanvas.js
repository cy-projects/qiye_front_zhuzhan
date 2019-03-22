

$(function(){

//开始绘图
	var oC = document.getElementById('c');

	var firstStepCanvas = $(".repStep .first canvas").get(0);
	var first = firstStepCanvas.getContext('2d');
	// var firstImg = new Image();

	// var data = 	'<svg xmlns="http://www.w3.org/2000/svg" width="200" height="400">' +
	// 							'<foreignObject width="100%" height="100%">' +
	// 								'<div xmlns="http://www.w3.org/1999/xhtml" style="height: 200px;position: relative; padding: 100px 0;">' +
	// 									'<div style="">'+
	// 										'<h5>选择(多选)</h5>' +
	// 										'<div>' +
	// 											'<p>认证项目</p>' +
	// 											'<p>认证人数</p>' +
	// 											'<p>或证周期</p>' +
	// 										'</div>' +
	// 									'</div>'
	// 								'</div>' +
	// 							'</foreignObject>' +
	// 						'</svg>';

	// var DOMURL = window.URL || window.webkitURL || window;
	// var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
	// var url = DOMURL.createObjectURL(svg);

	// firstImg.onload = function(){
	// 	draw(this);
	// }



	// firstImg.src = url;
	// function draw(obj){
	// 	first.drawImage(firstImg,0,0);
	// 	DOMURL.revokeObjectURL(url);
	// }

	first.lineWidth = '3';
	first.strokeStyle = '#f2aa2a';
	first.beginPath();
	first.moveTo(3,100);
	first.lineTo(100,100);
	first.lineTo(100,20);
	first.lineTo(180,200);
	first.lineTo(100,380);
	first.lineTo(100,300);
	first.lineTo(3,300);
	first.closePath();
	first.stroke();


	


	
})

