//返回双数
var formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
}

// 传入毫秒数
// hasTime为true得到yy-mm-dd HH:ii
// hasTime为false得到yy-mm-dd
// 不传默认为true
var nowDate = new Date(); //当前date
var nowTime = nowDate.getTime();  //当前毫秒数
var localUTCHourDiff = nowDate.getTimezoneOffset() / 60;  //时差
var onehourMs = 60 * 60 * 1000; //1小时毫秒数
var onedayMs = 24 * onehourMs;  //1天毫秒数

function getTimeString(t=nowTime, hasTime, sep){
  var date = new Date(t);
  sep = sep ? sep : '-';

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  // var second = date.getSeconds();

  if (arguments.length < 2 || hasTime){
    return [year, month, day].map(formatNumber).join(sep) + ' ' + [hour, minute].map(formatNumber).join(":");
  } else{
    return [year, month, day].map(formatNumber).join(sep);
  }
}


function getBoundingRect (element) {
  element = element ? element : document.documentElement;
  let rect = element.getBoundingClientRect();

  let top = document.documentElement.clientTop;
  let left= document.documentElement.clientLeft;

  return {
    top    :   Math.round(rect.top - top),  //元素上边距离页面上边的距离
    bottom :   Math.round(rect.bottom - top),  //元素下边距离页面上边的距离
    left   :   Math.round(rect.left - left),  //元素左边距离页面左边的距离
    right  :   Math.round(rect.right - left), //元素右边距离页面左边的距离
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  }
}

function loadImage(url, className, callback){
  var img = new Image();
  img.src = url;
  img.className = className;

  if (img.complete){
    callback.call(img);
    return;
  }
  img.onload = function () {
    callback.call(img);
  };
}

function addEvent(obj,type,fn){
  if(obj.addEventListener){
    obj.addEventListener(type, fn, false);
  } else if (obj.attachEvent){
    obj.attachEvent('on'+ type, fn);
  }
}

function removeEvent(obj, type, fn){
  if (obj.removeEventListener){
    obj.removeEventListener(type, fn, false);
  } else if (obj.detachEvent){
    obj.detachEvent('on'+ type, fn);
  }
}


function randomFrom(min, max){
	return Math.floor( Math.random()*(max-min+1) + min );
}

// 卡片title 限制字数
function sliceStr(str, limitMaxLength, isNoPick=false){

  // 如果没有想法文字，指定卡片 要随机挑选默认的文字
  var titleArrs = [
    ['改变自己不是为了取悦他人，而是为了自己。'],
    ['这个世界上没有什么事是放不下的，你放不下，只是说明你不够痛。'],
    ['生活中，我们渴望被人欣赏，却往往忽略了欣赏别人。更多时候，我们善于发现别人的缺点，乐于放大自己的优点，甚至在别人的不幸中找到自己的庆幸。然而，欣赏是相互的，要想被人欣赏，就得先去欣赏别人；只有欣赏别人，才会被人欣赏。人生路上需要用真诚的心灵去欣赏，而不是用好奇的眼光去打量。'],
    ['我总觉得时间不够用，却又不知道我的时间去了哪里，子一天天过，而我，一直是不好也不坏。'],
    ['像我那么懒的人，每天还会主动和你说话，可见我有多么的爱你~'],
    ['谢谢你在我脆弱的时候给我这冷漠的一刀'],
    ['如果你选择的是地狱尽头,那么我陪你一起堕落。'],
    ['爱你，我累了'],
    ['一个人就像一个程序，如果你总让我死机，我只好把你卸载。'],
  ];

  if (str === undefined){
    if (isNoPick){
    } else {
      var randomNum = randomFrom(0, titleArrs.length - 1);
      str = titleArrs[randomNum];
    }
  }

  let allStr = str.join('`');
  if (allStr.length > limitMaxLength){
    allStr = allStr.substr(0, (limitMaxLength));
    allStr += '...';
  } else {
    allStr = allStr.substr(0, (limitMaxLength));
  }


  allStr = allStr.split('`');


  let div = '';
  for (let i=0; i<allStr.length; i++){
    div += '<p>' + allStr[i] + '</p>';
  }

  return div;
}
// 获取卡片封面
function getCardCoverImg(img, index){
  if (img){
    return img + '?imageView2/2/w/640/format';
  } else {
    return 'static/img/type_'+ (index + 1) +'/default_coverimg.jpg';
  }
}


// 识别终端
function plat(){
  let u = navigator.userAgent.toLowerCase();
  let viewSize = getBoundingRect();

  let isMobile = /iphone|ipod|ipad|android.*mobile|windows.*phone|blackberry.*mobile/i.test(u);
  let isWx = /micromessenger/i.test(u);
  let isQQ = /mqq/i.test(u);
  let isAndroid = u.indexOf('android') > -1 || u.indexOf('linux') > -1;
  let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(u);
  let isIphoneX = /iphone/gi.test(u) && (viewSize.height === 812 && viewSize.width === 375);

  return {
    isMobile,
    isWx,
    isQQ,
    isAndroid,
    isIos,
    isIphoneX,
  }
}


function filterSS(text){
  if ( text === undefined || text === '' || text === [] ) {
    return '';
  } else {
    return strRegExp(text);
  }
}

function strRegExp(str){
  if(typeof str == 'undefined')
      str = '';
  str = str.replace(/\</g,'&lt;');
  str = str.replace(/\>/g,'&gt;');
  str = str.replace(/\n/g,'<br/>');
  //str = str.replace(/\&/g,'&amp;');
  str = str.replace(/\"/g,'&quot;');
  str = str.replace(/\'/g,'&#39;');
  str = str.replace(/\ /g,'&nbsp;');
  str = str.replace(/\	/g,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

  return str;
}
