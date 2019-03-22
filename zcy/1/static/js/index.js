// 想法信息
var ideaInfoInit = {
  id: 1,  //想法id
  // coverimg: 'http://lstatic.zuimeia.com/common/image/2018/7/21/3c724694-ada7-45de-948d-987765c57795_1280x720.jpeg',
  // title: ['现在我辗转|于世界 \n而我认为，我向往于你篱笆<br />上的几朵牵牛花，几把野葡萄。你是对的，你知道静守一片土地，一撮回忆，日子长了，那内心不可测量的世界逐渐铺展开来，路径、村落、季节、星辰，云外的高泉，在期待中慢慢推开你的柴门。现在我辗转于世界，我向往于你篱笆上的几朵牵牛花，几把野葡萄。你是对的，你知道静守一片土地，一撮回忆，日子长了，那内心不可测量的世界逐渐铺展开来，路径、村落、季节、星辰，云外的高泉，在期待中慢慢推开你的柴门。'],
  // title: '一天很短短得来<br />不及拥抱清晨就已经手<br />握黄昏拥抱清晨就已经手握黄昏拥抱清晨就已经手握黄昏',
  // title: ['一天很短短得来', '不及拥抱清晨就已经手', '握黄昏拥抱清晨就已经手握黄昏拥抱清晨就已经手握黄昏'],
  title: ['一天很短短得来', '不及拥抱清晨就已经手', '握黄昏拥抱清晨就已经手握黄昏拥抱清晨就已经手握黄昏','一天很短短得来', '不及拥抱清晨就已经手', '握黄昏拥抱清晨就已经手握黄昏拥抱清晨就已经手握黄昏','一天很短短得来', '不及拥抱清晨就已经手', '握黄昏拥抱清晨就已经手握黄昏拥抱清晨就已经手握黄昏','一天很短短得来', '不及拥抱清晨就已经手', '握黄昏拥抱清晨就已经手握黄昏拥抱清晨就已经手握黄昏'],
  createTime: 1532416367717,
  author: {
    name: '朱朝阳',
  },

  // 卡片数组(该想法 需要加载的模板)
  cards: [

    {
      id: 1,  //卡片id
      type: '1',
      vertical: true, //是否居中(偏上调了一些)
      hasPaid: true, //卡片购买状态
    },
    {
      id: 2,
      type: '2',
      vertical: true,
      bonus: 5, //卡片解锁积分
    },
    {
      id: 3,
      type: '3',
      vertical: true,
      bonus: 2,
    },

  ],
}









// 卡片-底部
var cardFooter = '<div class="footer media">\
  <div class="media-body">\
    <div class="logo">\
      <img src="static/img/logo.png" alt="">\
    </div>\
  </div>\
  <div class="media-right">\
    <img class="qrcode" src="static/img/smallPrograms.png" alt="">\
  </div>\
</div>';

// 卡片-右上角锁定
var cardTopRightLock = '\
  <div class="idea-card-top-right-lock">\
    <div class="bg"></div>\
    <div class="icon"><i class="iconfont icon-lock"></i></div>\
  </div>\
';

// 页面-底部-卡片已解锁
var layoutFooterBodyHasPaid = '<div><span class="longclick">长按</span><span class="">保存图片，发给好友或分享朋友圈</span></div>';

// 卡片-未解锁-加载默认模板
function getCardDefaultDom(index, type){
  $(".swiper-slide").eq(index).find('.idea-card-content').append('\
    <div class="main-no-paid">\
      <img src="static/img/type_'+ type +'/default_card_nopaid.jpg" alt="" />\
    </div>\
  ');
}




$(function(){

  loadDatas(ideaInfoInit, 0, false);

  function loadDatas(ideaInfo, initialSlide=0, isOnlyCreateThisCard=false){
    // 清空swiper容器
    if (!isOnlyCreateThisCard){
      $(".swiper-wrapper").html('');
    }

    // 重置-页面底部信息
    var initialCard = ideaInfo.cards[initialSlide];
    if (initialCard.hasPaid){
      $(".layout-footer .footer-body").html(layoutFooterBodyHasPaid);
    } else {
      $(".layout-footer .footer-body").html('<div class="lock-wrap" data-cardid="'+initialCard.id+'" data-cardindex="'+initialSlide+'"><span>'+initialCard.bonus+' 知识币解锁</span></div>');
    }

    for (var i=0; i<ideaInfo.cards.length; i++){
      var cardItem = ideaInfo.cards[i];

      (function(i){
        if (!isOnlyCreateThisCard){
          // 加载卡片容器
          $(".swiper-wrapper").append('\
            <div class="swiper-slide'+( cardItem.vertical ? ' swiper-slide-vertical' : '' )+'">\
              <div class="swiper-slide-wrap">\
                <div class="idea-card-wrap" id="idea-card-wrap'+ i +'"></div>\
                <div class="idea-card-content ideaCardType'+ cardItem.type +'" id="idea-card-origin'+ i +'">\
                </div>\
              </div>\
            </div>\
          ');
        } else {
          if (i === initialSlide){
            $(".swiper-slide").eq(i).find('.idea-card-top-right-lock').remove();
            $(".swiper-slide").eq(i).find('.idea-card-wrap').html('');
            $(".swiper-slide").eq(i).find('.idea-card-content').html('');
          }
        }


        // 加载卡片内容
        // 默认模板(模板1)
        var $currentSwiperSlide = $(".swiper-slide").eq(i);
        var isRefreshCurrentCard = !isOnlyCreateThisCard || (isOnlyCreateThisCard && i === initialSlide);

        if (isRefreshCurrentCard){
          if (cardItem.type === '1'){
            $currentSwiperSlide.find('.idea-card-content').html('\
              <div class="coverimg">\
                <div class="coverimg-wrap">\
                  <div class="title">\
                    <div class="text">'+ sliceStr(ideaInfo.title, 60, true) +'</div>\
                  </div>\
                </div>\
              </div>\
            ');
            // <div class="author">\
            //   <div class="name">'+ ideaInfo.author.name +'</div>\
            //   <div class="time">'+ getTimeString(ideaInfo.createTime, false, '.') +'</div>\
            // </div>\

            if (ideaInfo.title === undefined || ideaInfo.title === ''){
              $currentSwiperSlide.find('.coverimg-wrap').remove();
            }

            $currentSwiperSlide.find('.coverimg').css({
              background: 'url('+ (getCardCoverImg(ideaInfo.coverimg, i)) +') no-repeat',
              'background-size': 'cover',
              'background-position': 'center',
            })

          // 模板2
          } else if (cardItem.type === '2'){
            if (cardItem.hasPaid){
              $currentSwiperSlide.find('.idea-card-content').html('\
                <div class="main">\
                  <div class="main-wrap">\
                    <a class="title" href="javascript:void(0);">\
                      <span>'+ sliceStr(ideaInfo.title, 84) +'</span>\
                    </a>\
                    <div class="icon-suji-seal"><img src="static/img/suji-seal.png" alt="" /></div>\
                    <div class="author">\
                      <div class="name">一个想法</div>\
                      <div class="brief">'+getTimeString(cardItem.createTime, false, '.')+'</div>\
                    </div>\
                  </div>\
                </div>\
              ');

              $currentSwiperSlide.find('.main-wrap').css({
                background: 'url("static/img/type_2/'+randomFrom(1, 7)+'.jpg") no-repeat',
                'background-size': '100% 100%',
              })
            } else{
              getCardDefaultDom(i, cardItem.type);
            }

          // 模板3
          } else if (cardItem.type === '3'){
            if (cardItem.hasPaid){
              $currentSwiperSlide.find('.idea-card-content').html('\
                <div class="coverimg">\
                  <div class="coverimg-wrap">\
                    <div class="title">\
                      <div class="border-wrap border-top-wrap">\
                        <div class="center-skew-line"></div>\
                        <div class="left-horizontal-line"></div>\
                        <div class="right-horizontal-line"></div>\
                      </div>\
                      <div class="text">'+ sliceStr(ideaInfo.title, 120) +'</div>\
                      <div class="border-wrap border-top-wrap">\
                        <div class="center-skew-line"></div>\
                        <div class="left-horizontal-line"></div>\
                        <div class="right-horizontal-line"></div>\
                      </div>\
                    </div>\
                  </div>\
                </div>\
              ');

              // <div class="author">\
              //   <div class="name">· '+ ideaInfo.author.name +  getTimeString(ideaInfo.createTime, false, '.') +'的一个想法 ·</div>\
              // </div>\

              if (plat().isIos){
                $currentSwiperSlide.find('.text').css('font-weight', 'normal');
              }

              $currentSwiperSlide.find('.coverimg').css({
                background: 'url('+ getCardCoverImg(ideaInfo.coverimg, i) +') no-repeat',
                'background-size': 'cover',
                'background-position': 'center',
              })
            } else {
              getCardDefaultDom(i, cardItem.type);
            }
          }


          // 卡片生成图片
          if (cardItem.hasPaid){
            $currentSwiperSlide.find('.idea-card-content').append(cardFooter);

            var ideaCardWrapId = 'idea-card-wrap' + i;
            var ideaCardOriginId = 'idea-card-origin' + i;

            if (i === (ideaInfo.cards.length - 1)){
              createPoster(ideaCardOriginId, ideaCardWrapId, function(){
                if (!isOnlyCreateThisCard){
                  initSwiper();
                }

                $(".modalCreatPosterLoad").hide();
              });
            } else {
              setTimeout(function(){
                createPoster(ideaCardOriginId, ideaCardWrapId);
              }, 2000);
            }
          } else {
            $currentSwiperSlide.find(".swiper-slide-wrap").prepend(cardTopRightLock);

            if (i === (ideaInfo.cards.length - 1)){
              initSwiper();
              $(".modalCreatPosterLoad").hide();
            }
          }
        }


      })(i);

    }

    function initSwiper(){
      var swiper = new Swiper('.swiper-container', {
        // init: false,
        initialSlide: initialSlide,
        slidesPerView: 'auto',
        spaceBetween: 40,
        centeredSlides: true,
        // loop: true,
        grabCursor: true,
        // setWrapperSize: true,
        roundLengths: true,
        autoHeight: true,
        preloadImages: true,
        updateOnImagesReady: true,


        // 触发条件
        longSwipesRatio: 0.3,

        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });

      swiper.on('slideChange', function(){
        var index = this.activeIndex;
        var cardInfo = ideaInfo.cards[index];

        if (cardInfo.hasPaid){
          $(".layout-footer .footer-body").html(layoutFooterBodyHasPaid);
        } else {
          $(".layout-footer .footer-body").html('<div class="lock-wrap" data-cardid="'+cardInfo.id+'" data-cardindex="'+index+'"><span>'+cardInfo.bonus+' 知识币解锁</span></div>');
        }

      })
    }

  }





  // 解锁卡片
  $(document).on('click', '.layout-footer .lock-wrap', function(e){
    var currentDataset = e.currentTarget.dataset;
    var cardid = currentDataset.cardid;
    var cardindex = parseInt(currentDataset.cardindex, 10);

    console.log(cardid, cardindex);

    // 此处调用解锁卡片 接口

    var flag = 2;

    if (true){  //调用接口成功
      if (flag === 1){  //如果积分不足
        var allBonus = 7;

        var content = '<div>\
          <div class="title">知识币不足</div>\
          <div class="content">你目前仅有 <span>'+allBonus+'</span> 个知识币，邀请好友来使用「想法速记」轻松赚取知识币</div>\
        </div>';

        layer.open({
          skin: 'modalBonusNoEnough',
          area: '2.8rem',
          shadeClose: false,
          content: content,
          btn: ['去赚知识币'],
          yes: function(index, layero){
            // console.log(wx);
            // wx.miniProgram.navigateTo
            // wx.miniProgram.switchTab

            // 这里写跳转小程序 赚积分页面
          },
          success: function(layero, index){
            $(layero).find(".layui-layer-setwin a").removeClass("layui-layer-ico").addClass("iconfont icon-close1");
          },
        })

      } else if (flag ===2){  //兑换成功
        layer.msg('兑换成功！', {
          time: 3000,
        });

        ideaInfoInit.cards[cardindex].hasPaid = true;
        loadDatas(ideaInfoInit, cardindex, true);
        $(".layout-footer .footer-body").html(layoutFooterBodyHasPaid);




      } else {
        layer.msg('兑换失败！');
      }
    } else {
      //调用接口失败
      layer.msg('网络错误！');
    }
  })

})
