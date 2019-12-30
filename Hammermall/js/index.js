$(function () {
	//获取顶部head的高度，因为鼠标滚多那个高度之后，就把下面的导航顶起来
	var topHeight = $('.head').height();
	$(window).scroll(function () {
		var sTop = $(document).scrollTop();
		if (sTop > topHeight && $('.banner').css('paddingTop') != "16px") {
			$('.banner').css({
				position: "fixed",
				top: -60,
				paddingTop: 16,
				paddingBottom: 16
			}).animate({
				top: 0
			}, 500);
			//把右边的搜索框隐藏
			$('.ban-right').hide(); //show显示
			//把登陆头像拿过来，复制一份，添加到刚才搜索框的位置。
			$('.head').find('.right').clone().appendTo('.ban');
			$('.user').hover(function () {
				$('.con_use').show();
			}, function () {
				$('.con_use').hide();
			});
			$('.con_use').hover(function () {
				$(this).show();
			}, function () {
				$(this).hide();
			});
		} else if (sTop <= topHeight) {
			$('.banner').css({
				position: "absolute",
				top: topHeight,
				paddingTop: 23,
				paddingBottom: 23
			});
			//复原搜索框
			$('.ban-right').show();
			$('.ban').find('.right').remove();
		}
	});
	var mySwiper = new Swiper('.swiper-container', {
		noSwiper: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false
		},
		preventInteractionOnTransition: false,
		effect: "fade",
		fadeEffact: {
			crossFade: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		}
	});
	var ul = $('.home-hot-shop').find('.con-ul').children('ul');
    if(ul.css('left') == '0px'){
		$('.for-left').addClass('a-disabled');
	}
	$('.home-page').on('click','a',function(){
		$(this).addClass('a-disabled').siblings().removeClass('a-disabled');
		var classname = $(this).attr('class');
		if(classname.indexOf('left') != -1){
			ul.animate({
				left: 0
			},500);
		}else {
			ul.animate({
				left : -1220
			},500)
		}
	})
	$('.li_hover_hot_shop').hover(function(){
	   $(this).find('h6').eq(0).hide();
	   $(this).find('h6').eq(1).show();
	   $(this).find('button').css({display : 'block'});
	   $(this).find('money').hide();
	},function(){
		$(this).find('h6').eq(0).show();
		$(this).find('h6').eq(1).hide();
		$(this).find('button').css({display : 'none'});
		$(this).find('money').show();
	})
	//点击小圆点出现圆圈及对应的图片
	$('.li_hover_hot_shop').on('click','.ck_li',function(e){
		//兼容老版本IE浏览器
		var e = e || event;
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
		$(this).addClass('li-active').siblings().removeClass('li-active');
		var myI = $(this).attr('datai');
		var myJ = $(this).attr('id');
		var myThis = $(this);
		$.ajax({
			type : 'get',
			url : 'json/hotgoods.json',
			async : true,
			dataType : 'json',
			timeout : 10000,
			success : function(data){
				var myArr = data[myI];
				// console.log(myArr);
				// console.log(myArr[myJ].img);
       			myThis.parent().parent().parent().find('.com-img').find('img').attr({
					'src' : myArr[myJ].img,
					'width' : 216,
					'height':281
				});
				myThis.parent().parent().parent().find('.money').find('.phone-money').html(myArr[myJ].price);
				myThis.parent().parent().parent().parent().attr('href',"http://www.pzy.com/detail.html?spu=" + myArr[myJ]["spu"]);
			}
		});
	});
	$('.li_hover_hot_shop').click(function () {
		window.open($(this).attr('href'));
	});
})