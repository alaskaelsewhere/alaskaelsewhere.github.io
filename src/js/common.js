global.jQuery = global.$ = window.jQuery = require('jquery');
require('jquery.easing');
require('jquery.color');
require('jquery.inview');
// require('swiper');
// require('images-compare');
// require('slick');




/*--------------------------------------------------------------------------*
 * ポップアップウィンドウ
 *
 * jquery.openwin.js
 * http://shanabrian.com/web/jquery/window01.php
 *
 * 下記の様にhtml側のrel要素で個別にオプション指定も可。
 * <a href="" class="openwin" rel="scrollbars=yes,target=_self,blur=true">hoge</a>
 *--------------------------------------------------------------------------*/

$(function () {
  $.fn.openwin = function (settings) {
    settings = $.extend({
      option: {
        width: false,
        height: false,
        top: false,
        left: false,
        menubar: 'no',
        toolbar: 'no',
        location: 'no',
        status: 'no',
        resizable: 'no',
        scrollbars: 'no',
        directories: 'no',
        titlebar: 'yes',
        fullscreen: 'no'
      },
      target: '_blank',
      blur: false,
      focus: false
    }, settings);

    $(this).on('click', function () {
      var options = [];
      var target = settings.target;
      var url = $(this).attr('href');

      if ($(this).attr('rel')) {
        var rel = $(this).attr('rel').split(',');
        var relOption = {};
        $.each(settings.option, function (i, rel) {
          var a = rel[i].split('=');
          relOption[a[0]] = a[1];
        });
      }

      $.each(settings.option, function (k) {
        var v = settings.option[k];
        if (relOption) {
          if (relOption[k]) {
            v = relOption[k];
          }
        }
        if (v) {
          options.push(k + '=' + v);
        }
      });
      if (relOption) {
        if (relOption['target']) {
          target = relOption['target'];
        }
      }
      var newWin = window.open(url, target, options.join(','));
      if (settings.blur === true) {
        newWin.blur();
      }
      if (settings.focus === true) {
        newWin.focus();
      }
      return false;
    });
    return this;
  };
});


$(function () {
  // ポップアップウィンドウの設定
  $('a.openwin').openwin({
    option: {
      width: 1000,
      height: 900,
      top: false,
      left: false,
      menubar: "no",
      toolbar: "no",
      location: "no",
      status: "no",
      resizable: "yes",
      scrollbars: "yes",
      directories: "no",
      titlebar: "yes",
      fullscreen: "no"
    }
  });
});

$(function () {

  /*--------------------------------------------------------------------------*
   * menu
   *--------------------------------------------------------------------------*/

  /*
     
  var px_change = $('.header__inner').innerHeight();

  window.addEventListener('scroll', function (e) {
  	if ($(window).scrollTop() > px_change) {
  		$('.nav-global').addClass('fixed');
  		$('.c-info').addClass('fixed');
  	} else if ($('.nav-global').hasClass('fixed')) {
  		$('.nav-global').removeClass('fixed');
  		$('.c-info').removeClass('fixed');
  	}
  });*/

  var flag = false,
    $navGlobal = $('.nav-global'),
    $humberger = $('.humberger'),
    windowWidth = $(window).width(),
    headerHeight = $('.header').innerHeight(),
    xsNavHeight = $('.xs_nav').innerHeight(),
    actHeight = $('.index-hero__act').innerHeight(),
    windowHeight = $(window).innerHeight();

  if (windowWidth < 992) {
    $('main').css('padding-top', headerHeight + 'px');
    $('.index-hero__inner').css('height', windowHeight - xsNavHeight - headerHeight + 'px');
    $('.index-hero__item').css('bottom', actHeight + 'px');
  } else {
    $('.index-hero__item').css('bottom', actHeight + 'px');
  }

  $humberger.on('click', function () {
    if (!flag) {
      $humberger.addClass('active');
      $navGlobal.fadeIn(function () {
        flag = true;
      });
    } else {
      $humberger.removeClass('active');
      $navGlobal.fadeOut(function () {
        flag = false;
      });
    }
  });

  /*--------------------------------------------------------------------------*
   * スムーズスクロール
   *--------------------------------------------------------------------------*/
  $('a[href^="#"]').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });


  $('body').on("mousewheel", function () {
    event.preventDefault();
    var wd = event.wheelDelta;
    var csp = window.pageYOffset;
    window.scrollTo(0, csp - wd);
  });

  /*--------------------------------------------------------------------------*
   * top slide
   *--------------------------------------------------------------------------*/

  // $('.index-hero__inner').slick({
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   fade: true,
  //   cssEase: 'linear',
  //   arrows: false,
  //   autoplay: true,
  //   autoplaySpeed: 2000
  // });
  /*--------------------------------------------------------------------------*
   * inveiw
   *--------------------------------------------------------------------------*/

  $('.inviewset').css('opacity', '0');

  $('.inviewset').on('inview', function () {
    $(this).delay(500).animate({
      opacity: '1'
    }, 1000);
  });

  $('.inviewchain01').css('opacity', '0');
  $('.inviewchain02').css('opacity', '0');
  $('.inviewchain03').css('opacity', '0');
  $('.inviewchain04').css('opacity', '0');
  $('.inviewchain05').css('opacity', '0');
  $('.inviewchain06').css('opacity', '0');

  $('.inviewchainwrap').on('inview', function () {
    $(this).find('.inviewchain01').delay(300).animate({
      opacity: '1'
    }, 600);
    $(this).find('.inviewchain02').delay(600).animate({
      opacity: '1'
    }, 600);
    $(this).find('.inviewchain03').delay(900).animate({
      opacity: '1'
    }, 600);
    $(this).find('.inviewchain04').delay(1200).animate({
      opacity: '1'
    }, 600);
    $(this).find('.inviewchain05').delay(1500).animate({
      opacity: '1'
    }, 600);
    $(this).find('.inviewchain06').delay(1800).animate({
      opacity: '1'
    }, 600);
  });

  /*--------------------------------------------------------------------------*
   * tab切り替え
   *--------------------------------------------------------------------------*/

  $('.nav-tab').on('click', function () {
    var index = $('.nav-tab').index(this);
    console.log('test');
    if (!$(this).hasClass('active')) {
      $('.nav-tab').removeClass('active');
      $(this).addClass('active');
      $('.tab-pane').removeClass('active');
      $('.tab-pane').eq(index).addClass('active');
    }
    if ($('#panel2').hasClass('active')) {
      $('.c-caption__inner').css('display', 'none');
    }
    if ($('#panel1').hasClass('active')) {
      $('.c-caption__inner').css('display', 'block');
    }

  });


  /*--------------------------------------------------------------------------*
   * images-compare
   *--------------------------------------------------------------------------*/

  // $('.result-section__left__content-compare-01').imagesCompare();

});




/*--------------------------------------------------------------------------*
 * スクローラー設定
 *--------------------------------------------------------------------------*/
// var isMobile = false;
// isMobile = $('html').is('.skrollr-mb');
// if (!isMobile) {
//   window.onload = function () {
//     var s = skrollr.init({
//       forceHeight: false,
//       mobileDeceleration: 0.01,
//       mobileCheck: function () {
//         return isMobile;
//       }
//     });
//   }
// }


