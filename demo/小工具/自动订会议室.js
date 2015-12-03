//**** 是北邮人的用户名 -----是密码

//登录 北邮人论坛
var http=require("http");
var querystring=require("querystring");

var contents=querystring.stringify({
	CookieDate:0,
	id:"00009884",
	mode:0,
	passwd:"00009884"
});
var postData = [9,79,0.0,8,7,7,6,625,5,4,3,2,1,["cn.edu.whu.lmars.shared.Meeting/367774823","2015-12-01 19:00:00","2015-12-01","","2015-12-01 22:30:00","开会","8","四楼小会议室","呙维"],0,7];

var options={
	host:"www.lmars.whu.edu.cn",
	path:"/meeting/lmarsmeeting/greet",
	method:"post",
	headers:{
		"Content-Type":"text/x-gwt-rpc; charset=UTF-8",
		"Content-Length":contents.length,
		"Accept":"*/*",
		"Accept-Encoding":"gzip, deflate",
		"Accept-Language":"zh-CN,zh;q=0.8",

		"Cache-Control":"no-cache",
		"Connection":"Keep-Alive",
		"Host":"www.lmars.whu.edu.cn",
		"Referer":"http://www.lmars.whu.edu.cn/meeting/",
		"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
		"X-Requested-With":"XMLHttpRequest",
		"X-GWT-Module-Base":"http://www.lmars.whu.edu.cn/meeting/lmarsmeeting/",
		"X-GWT-Permutation":"16ECD3B9B3CC54D7CE648B28B24F91D8",
		"Cookie":"MyCookie=1; JSESSIONID=361709630DF3F0009B9DD6577C31D830"
}
};

var req=http.request(options,function(res){
	res.on("data",function(data){
		console.log('ok\n');
		console.log(data);
	});
});


req.write(contents);
req.end();