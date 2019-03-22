;(function(designWidth, maxWidth) {
  var win = window;
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var head = document.getElementsByTagName("head")[0];

  var dpr = 0;
  var scale = 0;
  var tid;

  var lib = window['lib'] || (window['lib'] = {});
  var flexible = lib.flexible || (lib.flexible = {});


  if (metaEl) {
    // console.warn('将根据已有的meta标签来设置缩放比例');
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/); //initial-scale=1.0

    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale, 10);
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute('content');
    if (content) {
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  if (!dpr && !scale) {
      var appVersion = win.navigator.appVersion;
      var isAndroid = appVersion.match(/android/gi);
      var isIPhone = appVersion.match(/iphone/gi);
      var devicePixelRatio = win.devicePixelRatio;
      console.log(isAndroid, isIPhone, devicePixelRatio);

      if (isIPhone) {
          // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
          if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
              dpr = 3;
          } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
              dpr = 2;
          } else {
              dpr = 1;
          }
      } else {
          // 其他设备下，仍旧使用1倍的方案
          dpr = 1;
      }
      scale = 1 / dpr;
  }

  // 设置dpr
  docEl.setAttribute('data-dpr', dpr);

  // 设置meta-name-viewport
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  // 更新html 根字体大小
  function refreshRem(){
    var width = getBoundingRect(docEl).width;

    if (!maxWidth){
      maxWidth = 540;
    }
    if (width / dpr > maxWidth) {
      width = maxWidth * dpr;
    }

    // var rem = width / 10; //淘宝做法，10等分
    // var rem = width * 1 / 750;  //小程序做法，750等分。但受限于 浏览器最低支持font-size: 12px; 不可用
    var rem = width * 100 / designWidth; //知群做法，designWidth等分，然后放大100倍

    // 兼容UC
    var rootStyle = 'html{font-size:' + rem + 'px !important}';
    var rootItem = document.getElementById('rootsize') || document.createElement('style');

    if (!document.getElementById('rootsize')){
      head.appendChild(rootItem);
      rootItem.id='rootsize';
    }
    if (rootItem.styleSheet){
      rootItem.styleSheet.disabled||(rootItem.styleSheet.cssText=rootStyle);
    } else {
      try {
        rootItem.innerHTML= rootStyle;
      } catch(f){
        rootItem.innerText = rootStyle;
      }
    }
    // 兼容UC结束

    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  // onpageshow 事件在用户浏览网页时触发。类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发
  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {  // 浏览器后退的时候重新计算
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  // 更新body字体大小
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    // DOMContentLoaded： 类似于jq  $(document).ready(function() { // ...代码... });
    // load: 类似于 (function() { // ...代码... });
    //DOMContentLoaded 的触发不需要等待图片等其他资源加载完成
    //load，页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件
    doc.addEventListener('DOMContentLoaded', function(e) {
      doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }


  refreshRem();

  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function(d) {
    var val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  }
  flexible.px2rem = function(d) {
    var val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  }



  // 注意：IE、Firefox3+、Opera9.5、Chrome、Safari支持，在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素，我们需要做个兼容。
  // document.documentElement.clientTop;  // 非IE为0，IE为2
  // document.documentElement.clientLeft; // 非IE为0，IE为2
  function getBoundingRect (element) {
    var rect = element.getBoundingClientRect();
    var top = document.documentElement.clientTop;
    var left= document.documentElement.clientLeft;

    return {
      top    :   rect.top - top,  //元素上边距离页面上边的距离
      bottom :   rect.bottom - top,  //元素下边距离页面上边的距离
      left   :   rect.left - left,  //元素左边距离页面左边的距离
      right  :   rect.right - left, //元素右边距离页面左边的距离
      width: rect.width,
      height: rect.height,
    }
  }

})(375, 540);
