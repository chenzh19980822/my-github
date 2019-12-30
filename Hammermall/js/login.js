window.onload = function(){
    $('#tel').blur(function(){
        var myTel = $('#tel').val().trim();
        var reg = /[1][34578]\d{9}$/;
        if(myTel.length == 0){
            $('#tel').next().css({
                display :'inline',
                opacity : 1
            }).next().css({
                display: 'none',
                opacity: 0
            }).next().css({
                display: 'none',
                opacity: 0
            });
        }else if(!reg.test(myTel)){
            $('#tel').next().css({
                display :'none',
                opacity : 0
            }).next().css({
                display: 'inline',
                opacity: 1
            }).next().css({
                display: 'none',
                opacity: 0
            });
        }else{
            $('#tel').next().css({
                display :'none',
                opacity : 0
            }).next().css({
                display: 'none',
                opacity: 0
            }).next().css({
                display: 'none',
                opacity: 0
            });
        }
    });
    $('#log').click(function () {
		var tel = $('#tel').val().trim();
        var pwd = $('#password').val().trim();
        console.log(1);
		$.ajax({
			type: 'get',
			url: 'http://www.pzy.com/php/login_register.php',
			async: true, 
			data: {
				status: 'login',
				tel: tel,
				pwd: pwd
			},
			success: function (msg) {
                
				if (msg == 1) {
					alert('登录成功！');
					window.location.href = "http://www.pzy.com";
				} else if (msg == 2) {
					alert('密码错误');
				} else {
					alert('手机号码没有注册');
				}
			}
		});
	});
}