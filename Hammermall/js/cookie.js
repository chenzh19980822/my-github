function setCookie(key, value, days) {
	if (days) {
		var now = new Date();
		now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000)
		document.cookie = key + "=" + value + ";expires=" + now;
	} else {
		document.cookie = key + "=" + value;
	}
}
function getCookie(key) {
	if (document.cookie) {
		var cookieInfo = document.cookie;
		var arr = cookieInfo.replace(/;\s/g, ';').split(";");
		for (var i = 0; i < arr.length; i++) {
			item = arr[i].split("=");
			if (item[0] == key) {
				brr = item[1];
				return JSON.parse(brr);
			}
		}
		//如果cookie中 没有我们想获取的键值，直接返回一个空数组
		return [];
	}
	//如果cookie中没有数据，直接返回一个空数组
	return [];
}
function removeCookie(key) {
	setCookie(key, "", -1);
}