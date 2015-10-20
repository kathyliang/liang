var Q 			= require('q')
var Firebase 	= require('firebase');
var dataRef		= new Firebase('https://liang-node-test.firebaseio.com/');
var content_ref 	= dataRef;

function set_title(rid,title){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		// console.log(sid)
		content_ref.child(rid).child("slides_page").child('title').set(title, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function get_title (rid,sid) {
		var deferred = Q.defer();

		content_ref.child(rid).child("slides_page").child('title').on("value", function(snapshot) {
		 	var title = snapshot.val();
		  	console.log(title)
		  	deferred.resolve(title);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}

module.exports	=	{
	set_title 		: set_title,
	get_title		: get_title
	
}
