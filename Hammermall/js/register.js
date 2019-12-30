window.onload = function(){
    $('#yzm').focus(function(){
        $('#yzm').prev().html('');
    });
    function rand(min,max){
        return Math.round(Math.random() * (max - min) + min);
    }
    function verification(){
        var str = ""; //存放获取的验证码
        for(i = 0; i < 6; i++){
            var count = rand(48,122);
            if(count >= 58 && count <= 64 ||count >= 91 && count <= 96){
                i--;
            }else{            
                var mystr = String.fromCharCode(count);
                str += mystr;
            }
        }
       return str;
    }
    $('#code').click(function(){
        $(this).addClass('disabled');
        var time = 3;
        var timer = setInterval(function(){
            $('#code a').html(--time);
            if(time == 0){
                clearInterval(timer);
                $('#code a').html(verification());
            }
        },1000);
    });
    $('#yzm').blur(function(){
        var yWrite = $('#yzm').val().trim();//获取用户输入的信息 trim()是去除开始和末尾空格的方法
        var mWrite = $('#code a').html();
        if(yWrite.length == 0){
            $(this).next().css({
                display: "inline",
				opacity: 1
            });
        }else if(yWrite != mWrite){
            $(this).next().next().css({
                display: "inline",
				opacity: 1
            });
        }else{
            $(this).next().css({
                display: "none",
				opacity: 0
            }).next().css({
                display: "none",
				opacity: 0
            })
        }
    });
    $('#tel').blur(function(){
        yzTel();
    });
    $('#tel').focus(function(){
        $('#tel').next().css({
            display: "none",
            opacity: 0
        }).next().css({
            display: "none",
            opacity: 0
        }).next().css({
            display: "none",
            opacity: 0
        });
    })
    function yzTel(){
        $('#tel').attr('isYZ',false);
        var tel = $('#tel').val().trim();
        var reg = /[1][34578]\d{9}$/;
        if(tel.length == 0){
            $('#tel').next().css({
				display: "none",
				opacity: 0
			}).next().css({
				display: "none",
				opacity: 0
			}).next().css({
				display: "none",
				opacity: 0
			})
			$('#tel').next().css({
				display: "inline",
				opacity: 1
			})
        }else if(!reg.test(tel)){
            $('#tel').next().css({
				display: "none",
				opacity: 0
			}).next().css({
				display: "none",
				opacity: 0
			}).next().css({
				display: "none",
				opacity: 0
			})
			$('#tel').next().next().css({
				display: "inline",
				opacity: 1
			});
        }else{
            $.ajax({
				type: "get",
				url: "http://www.pzy.com/php/login_register.php",
				data: {
					status: "checkTel",
					tel: tel
				},
				async: true,
				timeout: 10000,
				success: function (msg) {
					$('#tel').next().css({
						display: "none",
						opacity: 0
					}).next().css({
						display: "none",
						opacity: 0
					}).next().css({
						display: "none",
						opacity: 0
					})
					if (msg == 1) {
						$('#tel').next().next().next().css({
							display: "inline",
							opacity: 1
						})
					} else {
						$('#tel').next().css({
							display: "none",
							opacity: 0
						}).next().css({
							display: "none",
							opacity: 0
						}).next().css({
							display: "none",
							opacity: 0
						})
						$('#tel').attr('isYZ', true);
					}
				}
			});
        }
    }
    $('#password').focus(function(){
        $('#password').prev().html("");
    });
    $('#repassword').focus(function(){
        $('#repassword').prev().html("");
    });
    $('#repassword').blur(function(){
        var wpwd = $('#password').val().trim();
        var repwd = $('#repassword').val().trim();
        if(wpwd == repwd){
            $(this).next().next().next().css({
				display: "none",
				opacity: 0
			});
        }else{
            $(this).next().next().next().css({
				display: "inline",
				opacity: 1
			});
        }
    });
    $('#reg').click(function(){
        yzTel();
        if($('#tel').attr('isYZ')){
            var tel = $("#tel").val().trim();
			var pwd = $("#password").val().trim();
            $.ajax({
                type: 'get',
                url : 'http://www.pzy.com/php/login_register.php',
                data: {
                    status : 'register',
                    tel: tel,
                    pwd : pwd
                },
                success : function(msg){
                    if(msg == 1){
                        alert('注册成功');
                        location.href = "http://www.pzy.com/login.html";
                    }
                }
            });
        }else{
            alert('账号密码验证码错误');
        }
      
    })
 
} 