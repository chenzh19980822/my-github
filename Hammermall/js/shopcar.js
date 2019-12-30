(function (){
    $.extend({
		fnInit: function (startObj, endObj) { //确定三点坐标及抛物线方程的系数
			//起始点
			this.startPoint = {
				x: startObj.offset().left + startObj.width() / 2,
				y: startObj.offset().top
			}
			//结束点
			this.endPoint = {
				x: endObj.offset().left + endObj.width() / 2,
				y: endObj.offset().top
			}
			//最低(高)点
			this.topPoint = {
				x: this.endPoint.x - 100,
				y: this.endPoint.y + 80
			}
			//根据三点坐标  确定抛物线方程的系数
			this.a = ((this.startPoint.y - this.endPoint.y) * (this.startPoint.x - this.topPoint.x) - (this.startPoint.y - this.topPoint.y) * (this.startPoint.x - this.endPoint.x)) / ((this.startPoint.x * this.startPoint.x - this.endPoint.x * this.endPoint.x) * (this.startPoint.x - this.topPoint.x) - (this.startPoint.x * this.startPoint.x - this.topPoint.x * this.topPoint.x) * (this.startPoint.x - this.endPoint.x));

			this.b = ((this.endPoint.y - this.startPoint.y) - this.a * (this.endPoint.x * this.endPoint.x - this.startPoint.x * this.startPoint.x)) / (this.endPoint.x - this.startPoint.x);

			this.c = this.startPoint.y - this.a * this.startPoint.x * this.startPoint.x - this.b * this.startPoint.x;
			return this;
        },
        fnMove: function (src) { //抛物线的运动
			//创建图片
			var $img = $("<img>");
			//将图片添加到body中
			$("body").append($img);
			//设置img的src为 当前按钮对应的图片的src值
			$img.attr("src", src);
			var x = this.startPoint.x;
			var y = this.startPoint.y;
			$img.css({
				position: "absolute",
				left: x,
				top: y,
				width: 30,
				height: 30,
				borderRadius: "50%"
			})
			var timer = setInterval(function () {
				x = x + 10;
				y = this.a * x * x + this.b * x + this.c;
				if (x < this.endPoint.x) {
					$img.css({
						left: x,
						top: y
					})
				} else {
					clearInterval(timer);
					$img.remove();
					$("#shopNum").html(parseInt($("#shopNum").html()) + 1);
				}
			}.bind(this), 10)
		}
    });
    $('.shoping').click(function(e){
        e.stopPropagation();
        var startObj = $(this);
        var endObj = $('.sp');
        var $imgObj = $('.shoping').prev().prev().find('img');
        var src = $imgObj.attr('src').split('?')[0];
        $.fnInit(startObj,endObj).fnMove(src);
        setGoodsCookie($(this));
    });
    function setGoodsCookie(obj){
        var arr = [];
        var json = [];
        var spu = obj.parent().parent().attr('href').split('=')[1];
        var flag = true;
        $.ajax({
            type: 'get',
            url: 'json/detail.json',
            async: true,
            dataType:"json",
            success: function(msg){
                var pro = msg[spu];
                json = {
                    "id": spu,
                    "name": pro.name,
                    "src":pro.img.split('?')[0],
                    "price": pro.price,
                    "count": 1 //总数
                }
                var brr = getCookie('shoplist');
                if(brr.length != 0){
                    arr = brr;
                    //arr代表里面商品的数目
                    for(var i = 0; i < arr.length; i++){
                        if(json.id == arr[i].id){
                            arr[i].count++;
                            flag = false;
                            break;
                        }
                    }
                }
                if(flag){
                    arr.push(json);
                }
                setCookie("shoplist",JSON.stringify(arr));//stringify的作用是将JSON对象转换为字符串
            }
        });
    }
    var brr = getCookie("shoplist");
    console.log(brr);
    var myStr = "";
    for(var i = 0; i < brr.length; i++){
        var shopinfo = brr[i];
        var price = shopinfo.price.split(".")[0].replace(",", "");
        myStr += '<div class="shop-item clearfix">' +
			'<p class="fl"><input type="checkbox" class="ck"/></p>' +
			'<img class="fl" src="' + shopinfo.src + '" alt="" />' +
			'<p class="fl">' + shopinfo.name + '</p>' +
			'<span class="fl">' + shopinfo.price + '元</span>' +
			'<p class="fl count" ' +
			'data-id="' + shopinfo.id + '" ' +
			'data-price="' + shopinfo.price + '" data-count="' + shopinfo.count + '"' +
			'data-name="' + shopinfo.name + '" data-src="' + shopinfo.src + '"' +
			'>' +
			'<span class="updateCount" data-number="1">+</span>' +
			'<span class="shop-count"  contenteditable="true">' + shopinfo.count + '</span>' +
			'<span class="updateCount" data-number="-1">-</span>' +
			'</p>' +
			'<em class="fl sumPrice">' + (shopinfo.count * price) + '元</em>' +
			'<i class="fl delBtn">删除</i>' +
			'</div>';
    }
    $('.shoplist').html(myStr);
    getCount();
    function getCount(){
        var brr = getCookie('shoplist');
        var count = 0;
        if(brr.length != 0){
            for(var i = 0; i < brr.length; i++){
                count += brr[i].count;
            }
        }
        $('#shopNum').html(count);
    }
//全选框结算
    $('#selectAll').click(function(){
        $(".ck").prop("checked", $(this).prop("checked"));
        addPrice();
    });
    //单选框结算
    $('.ck').click(function(){
        addPrice();
    })
    $('.shoplist').keyup(function(){
        var count = parseInt($(this).html());
        var id = $(this).parent().data('id');
        if(count > 0){
            for(var i = 0; i < brr.length; i++){
                if(id == brr[i].id){
                    brr[i].count = count;
                    setCookie('shoplist',JSON.stringify(brr));
                    $(this).parent().next().html(brr[i].count * brr[i].price.split(".")[0].replace(',', '') + '元');//计算价格
                    addPrice();
                    break;
                }
            }
        }
    });
    //删除
    $('.delBtn').click(function(){
        var id = $(this).parent().find('.count').data('id');
        for(var i = 0; i < brr.length; i++){
            if(id == brr[i].id){
                brr.splice(i,1);
                setCookie('shoplist',JSON.stringify(brr));
                $(this).parent().remove();
                break;
            }
        }
    });
    //商品数目加减操作
    $('.updateCount').click(function(){
		var id = $(this).parent().data('id');
		var jz = $(this).data('number');
		var count = $(this).parent().find('.shop-count').html();
		if (jz == -1 && count == 1) {
			return;
		}
		for (var i = 0; i < brr.length; i++) {
			if (brr[i].id == id) {
				brr[i].count += jz;
				setCookie("shoplist", JSON.stringify(brr));
				$(this).parent().find('.shop-count').html(brr[i].count);
				$(this).parent().next().html(brr[i].count * brr[i].price.split(".")[0].replace(',', '') + '元');
				addPrice();
				break;
			}
		}
    })
    function addPrice(){
        var count = 0;
        var money = 0;
        $(".ck:checked").each(function () {
			count += parseInt($(this).parent().parent().find('.shop-count').html());
			money += parseInt($(this).parent().parent().find('.sumPrice').html());
		});
		$(".count2").html(count);
		$(".money2").html(money);
    }
}
)()