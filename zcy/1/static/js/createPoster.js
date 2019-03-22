

function createPoster(targetElement, posterimgBoxElement, onSuc){
  var target = document.getElementById(targetElement);
  var posterBox = document.getElementById(posterimgBoxElement);
  var rect = getBoundingRect(target);

  var width = rect.width;
  var height = rect.height;
  // console.log(target, width, height);

  var canvas = document.createElement("canvas");
  var scale = 2;
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.getContext("2d").scale(scale, scale);

  var config = {
    scale: scale, // 添加的scale 参数
    canvas: canvas, //自定义 canvas
    logging: true, //日志开关，便于查看html2canvas的内部执行流程
    width: width, //dom 原始宽度
    height: height,
    useCORS: true, // 【重要】开启跨域配置
    // allowTaint:true,  //允许跨域
    // taintTest: true,
  };

  html2canvas(target, config).then(function (canvas) {
    // var imgBase64 = canvas.toDataURL('image/jpeg');
    // console.log('imgBase64', imgBase64);
    // 将mime-type改为image/octet-stream,强制让浏览器下载
    // imgBase64 = imgBase64.replace('image/jpeg','image/octet-stream');

    var context = canvas.getContext('2d');
    // 【重要】关闭抗锯齿
    // context.mozImageSmoothingEnabled = false;
    // context.webkitImageSmoothingEnabled = false;
    // context.msImageSmoothingEnabled = false;
    // context.imageSmoothingEnabled = false;

    var posterImg = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
    // posterImg.setAttribute('crossOrigin', 'anonymous');

    addEvent(posterImg, 'load', function(){
      // posterBox.style.display = 'block';
      posterBox.appendChild(posterImg);
      target.parentNode.removeChild(target);

      onSuc && onSuc();
    })



  });
}
