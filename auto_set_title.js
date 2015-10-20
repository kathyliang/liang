var Q 				= require('q')
var fb_title		= require('./models/fb_title');

var _				= require('lodash');
var fs 				= require('fs');


function auto_set_title (title_data) {
	var deferred = Q.defer();
	_.forEach(title_data, function(title_data, key) {

		// console.log('slide_data',slide_data)
		
		var data 		= {};
		
		data.sid 		= title_data.sid;
		data.title      = title_data.title;
		fb_title.set_title(data.sid, data.title)
			.then(function(result) {
				console.log(result)
				if (title_data.length - 1 === key) {
					deferred.resolve('ok');
				};
			})
			.catch(function(error) {
				console.log(error)
				deferred.reject('error', error);
			});



	});

	return deferred.promise;
	
}


fs.readFile('./json/title.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var titles_data = JSON.parse(data)
  auto_set_title(titles_data)
  	.then(function(result) {
  		console.log('auto_set_title result',result)
  	})
  	.catch(function(error) {
  		console.log('auto_set_title error',error)
  	});
});