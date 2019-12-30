window.onload = function () {
	//获取详情页的路径，因为里面有商品的id
	var str = location.href;
	var spu = str.split('=')[1];
	$.ajax({
		type: 'get',
		url: 'http://www.pzy.com/json/detail.json?id=' + Math.random, 
		async: true,
		dataType: 'json',
		timeout: 10000,
		success: function (msg) {
			var item = msg[spu];
			$("#pro_img").attr("src", item.img);
			$("#pro_name").html(item.name);
			$("#pro_highlights").html(item.highlights);
			$("#pro_maizeng").html(item.maizeng);
			$("#pro_jiagou").html(item.jiagou);
			$("#pro_lingjuan").html(item.lingjuan);
			$("#pro_price").html(item.price);
			$("#pro_price1").html(item.price);
			$("#pro_baoxiu").html(item.baoxiu[0]);
			for (var i = 0; i < item.yansen.length; i++) {
				$('.pro_baoxian1').eq(i).html(item.baoxian1[i]);
				$('.pro_baoxian2').eq(i).html(item.baoxian2[i]);
				$('.pro_yansen').eq(i).html(item.yansen[i]);
				if (i < item.yansen.length - 1) {
					$(".pro_rongliang").eq(i).html(item.rongliang[i]);
				}
			}
			$('#mask').css({
				width : 312,
				height : 312
			});
			$('#big-img').attr({
				src: item.img,
				width: 800,
				height: 800
			});
			$('#big-img').css({
				position: "absolute",
				top: 0,
				left: 0
			});
			$('#small').hover(function(){
				$('#mask').show();
				$('#big').show();
			},function(){
				$('#mask').hide();
				$('#big').hide();
			});
			$('#small').mousemove(function(e){
				var e = e || event;
				var x = e.pageX - $('#small').offset().left - $('#mask').width() / 2;
				var y = e.pageY - $('#small').offset().top - $('#mask').height() / 2;
				// console.log(x,y);
				var maxL = $('#small').width() - $('#mask').width();
				var maxT = $('#small').height() - $('#mask').height();
				x = x < 0 ? 0 : (x > maxL ? maxL : x);
				y = y < 0 ? 0 : (y > maxT ? maxT : y);
				$('#mask').css({
					left: x,
					top: y
				});
				var myLeft = x * 800 / 500;
				var myTop = y * 800 / 500;
				$('#big-img').css({
					left: -myLeft,
					top: -myTop
				})
			});
		}
	});
}