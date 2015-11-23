var http = require('http');

var factor = { // 影像因子
	directors: [],
	actors: [],
	types: [],
	language: [],
	address: []
};
module.exports.getIndividualMoives = function(data){
	for(var i in data){
		factor.directors.push(processString(data[i].douban_movie_director));
		factor.actors.push(processString(data[i].douban_movie_actor).replace('更多...',''));
		factor.types.push(processString(data[i].douban_movie_class));
		factor.language.push(processString(data[i].douban_movie_language));
		factor.address.push(processString(data[i].douban_movie_place));

	}
	factor.directors = factor.directors.toString().split(',');
	factor.actors = factor.actors.toString().replace(/,+/g,',').split(',');
	factor.types = factor.types.toString().split(',');
	factor.language = factor.language.toString().split(',');
	factor.address = factor.address.toString().split(',');
	// console.log(staticArray1(factor.address));
	var result = {};
	result.directors = (maxArray(staticArray(factor.directors)));
	result.actors = (maxArray(staticArray(factor.actors)));
	result.types = (maxArray(staticArray(factor.types)));
	result.language = (maxArray(staticArray(factor.language)));
	result.address = (maxArray(staticArray(factor.address)));
	return result;
};

module.exports.getSql = function(myObj, from, to){
	var summaryNum = Number.parseInt(to) - Number.parseInt(from) + 1;
	var sqlString = "select * from \"movie\" where douban_movie_lookedman > 5000  and (";
	for(var i in myObj.directors){
		sqlString += "douban_movie_director like \'%"+ myObj.directors[i] +"%\' or \n";
	}
	sqlString = sqlString.substr(0,sqlString.length-4) + " or "
	for(var i in myObj.actors){
		sqlString += "douban_movie_actor like \'%"+ myObj.actors[i] +"%\' or \n";
	}
	sqlString = sqlString.substr(0,sqlString.length-4) + ") and ("
	for(var i in myObj.types){
		sqlString += "douban_movie_class like \'%"+ myObj.types[i] +"%\' or \n";
	}
	sqlString = sqlString.substr(0,sqlString.length-4) + ") and ("
	for(var i in myObj.language){
		sqlString += "douban_movie_language like \'%"+ myObj.language[i] +"%\' or \n";
	}
	sqlString = sqlString.substr(0,sqlString.length-4) + ") and ("
	for(var i in myObj.address){
		sqlString += "douban_movie_place like \'%"+ myObj.address[i] +"%\' or \n";
	}
	sqlString = sqlString.substr(0,sqlString.length-4) + ") order by douban_movie_lookedman desc  limit " + summaryNum + " offset  " + from;
	return sqlString;
};

var processString = function(myString){
	return myString.toString().replace(/\r/g,'').replace('/ [1,]/g ','').split('/').toString().replace(/\s/g, "");
};

var staticArray = function(arrayObj){  // 统计数组中各个元素的数量，速度比方法1快三倍
	var tempArray = {};
	for( var i in arrayObj){
		if(tempArray.hasOwnProperty(arrayObj[i])){
			tempArray[arrayObj[i]]++;
		}else{
			tempArray[arrayObj[i]] = 1;
		}
	}
	return tempArray;
};

var maxArray = function(myArray){ // 取得最大值
	var intArray = [];
	var sum = 0;
	for(var i in myArray){
		intArray.push(Number.parseInt(myArray[i]));
		sum += Number.parseInt(myArray[i]);
	}
	intArray.sort(function(a,b){return a<b?1:-1});
	var result = [];
	for(var i in myArray){
		if(myArray[i] == intArray[0]){
			result.push(i);
		}
		else if (myArray[i] == intArray[1]){
			result.push(i);
		}
		else if (myArray[i] == intArray[2]){
			result.push(i);
		}
		else if (myArray[i] == intArray[3]){
			result.push(i);
		}
	}
	return result;
};

function unique(arr){  // 去重
	var result = [], hash = {};
	for (var i = 0, elem; (elem = arr[i]) != null; i++) {
		if (!hash[elem]) {
			result.push(elem);
			hash[elem] = true;
		}
	}
	return result;
}
//
//http.get('http://192.168.2.113:3000/random?num=100',function(res){
//	if (res.statusCode === 200) {
//		var size = 0;
//		var chunks = [];
//		res.on('data', function(chunk){
//			size += chunk.length;
//			chunks.push(chunk);
//		});
//		res.on('end', function(){
//			var data = Buffer.concat(chunks, size);
//			var result = getIndividualMoives(JSON.parse(data));
//			var sqlString = getSql(result,1,20);
//		}).on('error', function(e) {
//			console.log("Got error: " + e.message);
//		});
//	}
//});