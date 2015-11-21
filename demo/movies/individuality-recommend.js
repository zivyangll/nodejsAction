var http = require('http');

http.get('http://192.168.2.113:3000/random?num=10',function(res){
	if (res.statusCode === 200) {
		var size = 0;
		var chunks = [];
		res.on('data', function(chunk){
			size += chunk.length;
			chunks.push(chunk);
		});
		res.on('end', function(){
			var data = Buffer.concat(chunks, size);
			getIndividualMoives(JSON.parse(data));
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	}
});

var factor = { // 影像因子
	directors: [],
	actors: [],
	types: [],
	name: [],
	language: [],
	describes: [],
	address: []
};
var getIndividualMoives = function(data){
	for(var i in data){
		factor.directors.push(processString(data[i].douban_movie_director));
		factor.actors.push(processString(data[i].douban_movie_actor).replace('更多...',''));
		factor.types.push(processString(data[i].douban_movie_class));
		factor.name.push(processString(data[i].douban_movie_name) + "," + processString(data[i].douban_movie_othername));
		factor.language.push(processString(data[i].douban_movie_language));
		factor.describes.push(processString(data[i].douban_movie_abstract));
		factor.address.push(processString(data[i].douban_movie_place));

	}
	factor.directors = factor.directors.toString().split(',');
	factor.actors = factor.actors.toString().replace(/,+/g,',').split(',');
	factor.types = factor.types.toString().split(',');
	factor.name = factor.name.toString().split(',');
	factor.language = factor.language.toString().split(',');
	factor.describes = factor.describes.toString().split(',');
	factor.address = factor.address.toString().split(',');
	console.log(staticArray(factor.address))
	console.log(factor.address.toString())

};

var processString = function(myString){
	return myString.toString().replace(/\r/g,'').replace('/ [1,]/g ','').split('/').toString().replace(/\s/g, "");
};


var staticArray = function(arrayObj){ // 统计
	var uniqueArray = unique(arrayObj);
	console.log(uniqueArray)
	var tempArray = {};
	for(var i = 0; i < uniqueArray.length; i++){
		tempArray[uniqueArray[i]] = 0;
		for(var j = i + 1; j <arrayObj.length; j++)
			if(arrayObj[j].indexOf(uniqueArray[i]) || uniqueArray[i].indexOf(arrayObj[j])){
				tempArray[uniqueArray[i]]++;
			}
	}
	return tempArray;
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