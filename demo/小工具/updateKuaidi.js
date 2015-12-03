var http = require('http');
var dataLength = 11;
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.minute = [0, 5, 10,15,20,25,30,35,40,45,50,55]; // 每隔15分钟执行一次
var j = schedule.scheduleJob(rule, function(){
	console.log('执行一次');
	update();
});

var update =function() { // 更新查询信息
	http.get('http://www.kuaidi100.com/query?type=shunfeng&postid=307562041369&id=1&valicode=&temp=0.01132259820587933', function (res) {
		if (res.statusCode === 200) {
			var data = '';
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function (chunk) {
				processKuaidi(JSON.parse(data));
			});
		}
		else {
			console.log("The Site is down!");
		}
	}).on("error", function (e) {
		console.log("error");
	});
}

var processKuaidi =function(kuaidiJson){ // 自动发邮件
	//console.log(kuaidiJson.data);
	if(kuaidiJson.data.length = dataLength){ //更新了给我发邮件
		dataLength++;
		console.log(kuaidiJson.data[0])
	}
};
