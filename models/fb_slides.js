var Q 				= require('q')
var Firebase 		= require('firebase');
var _				= require('lodash');

var dataRef			= new Firebase('https://liang-node-test.firebaseio.com/');
var content_ref 	= dataRef;


function set_slides(rid,slides){
	var deferred = Q.defer();
		// usersRef.child(userData.uid).set(userData);
		// call back function.
		// console.log(sid)
		content_ref.child(rid).child("slides_page").set(slides, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}


function set_slide (rid,iv_sid,iv_slides) {
	var deferred = Q.defer();
		var lo_sid = iv_sid;
		var rid = rid;
		var la_word = iv_slides.word;
		var la_img	= iv_slides.img;
		var ea_word = [];
		var ea_img  = [];
		var eo_error ;
		// console.log(la_img);
		// console.log(la_word);
		if (la_word.length != 0 && la_img.length !=0){
			for (var i = 0; i < la_word.length; i++) {
			var lo_word = la_word[i]
			if(lo_word.show_time && lo_word.colour){
				ea_word[i] = la_word[i]
			}else{
				eo_error = {};
				eo_error.message = "something wrong in word";
				eo_error.result = 1;
			}
			
		};
		console.log('ea_word',ea_word)
		console.log('set_slides',lo_word)
		// console.log('eo_error',eo_error)
		if(!eo_error){
			content_ref.child(rid).child("slides_page").child(lo_sid).child("word").set(ea_word, function(error) {
			  if (error) {
			   
			     deferred.reject("Data could not be saved." + error);
			  } else {
			    deferred.resolve("Data saved successfully.");
			  }
			});
		}else{
			deferred.reject(eo_error);
		}
		for (var i = 0; i < la_img.length; i++) {
			var lo_img = la_img[i]
			if(lo_img.show_time){
				ea_img[i] = la_img[i]
			}else{
				eo_error.message = "something wrong in img";
				eo_error.result = 1;
				deferred.reject(eo_error);
			}
			
		};
		if(!eo_error){
			content_ref.child(rid).child("slides_page").child(lo_sid).child("img").set(ea_img, function(error) {
			  if (error) {
			   
			     deferred.reject("2Data could not be saved." + error);
			  } else {
			    deferred.resolve("2Data saved successfully.");
			  }
			});
		}
		}else if(la_word.length == 0){
			for (var i = 0; i < la_img.length; i++) {
			var lo_img = la_img[i]
			if(lo_img.show_time){
				ea_img[i] = la_img[i]
			}else{
				eo_error.message = "something wrong in img";
				eo_error.result = 1;
				deferred.reject(eo_error);
			}
			
		};
		if(!eo_error){
			content_ref.child(rid).child("slides_page").child(lo_sid).child("img").set(ea_img, function(error) {
			  if (error) {
			   
			     deferred.reject("2Data could not be saved." + error);
			  } else {
			    deferred.resolve("2Data saved successfully.");
			  }
			});
		}
		}else if (la_img.length ==0){
			for (var i = 0; i < la_word.length; i++) {
			var lo_word = la_word[i]
			if(lo_word.show_time && lo_word.colour){
				ea_word[i] = la_word[i]
			}else{
				eo_error = {};
				eo_error.message = "something wrong in word";
				eo_error.result = 1;
			}
			
		};
		console.log('ea_word',ea_word)
		console.log('set_slides',lo_word)
		// console.log('eo_error',eo_error)
		if(!eo_error){
			content_ref.child(rid).child("slides_page").child(lo_sid).child("word").set(ea_word, function(error) {
			  if (error) {
			   
			     deferred.reject("Data could not be saved." + error);
			  } else {
			    deferred.resolve("Data saved successfully.");
			  }
			});
		}else{
			deferred.reject(eo_error);
		}
		}
		
		 
	return deferred.promise;
}

function get_word (rid,iv_sid) {
	// get all slides.
		var deferred = Q.defer();
		var io_sid 	 = iv_sid;
		content_ref.child(rid).child("slides_page").child(io_sid).child("word").on("value", function(snapshot) {
		 	var slides = snapshot.val();
		  	// console.log(slides)
		  	deferred.resolve(slides);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}
function get_img (rid,iv_sid) {
	// get all slides.
		var deferred = Q.defer();
		var io_sid 	 = iv_sid;
		content_ref.child(rid).child("slides_page").child(io_sid).child("img").on("value", function(snapshot) {
		 	var slides = snapshot.val();
		  	// console.log(slides)
		  	deferred.resolve(slides);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}



function get_slides (rid) {
		var deferred = Q.defer();
		// if (content_ref.title){

		// }
		// console.log(content_ref.child("slides_page").child('title').on("value"));
		content_ref.child(rid).on("value", function(snapshot) {
		 	var title = snapshot.val();
		  	// console.log(title)
		  	deferred.resolve(title);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}

function get_slide (rid,sid) {
		var deferred = Q.defer();

		content_ref.child(rid).child("slides_page").child(sid).on("value", function(snapshot) {
		 	var slide = snapshot.val();
		  	console.log(slide)
		  	deferred.resolve(slide);

		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		  deferred.reject(errorObject);

		});
	return deferred.promise;

}

function update_img (rid,iv_sid,img) {

	// add a new slide.
	var deferred = Q.defer();
		
		console.log(img)
		content_ref.child(rid).child("slides_page").child(iv_sid).child("img").set(img, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}

function update_word (rid,iv_sid,word) {

	// add a new slide.
	var deferred = Q.defer();
		
		console.log(word)
		content_ref.child(rid).child("slides_page").child(iv_sid).child("word").set(word, function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}
function remove_slide(rid,iv_sid){
	var deferred = Q.defer();
		console.log(iv_sid)
		content_ref.child(rid).child("slides_page").child(iv_sid).remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}
function remove_slides(rid){
	var deferred = Q.defer();
		// console.log(iv_sid)
		content_ref.child(rid).remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}
function remove_img(rid,iv_sid){
	var deferred = Q.defer();
		console.log(iv_sid)
		content_ref.child(rid).child("slides_page").child(iv_sid).child("img").remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}
function remove_word(rid,iv_sid){
	var deferred = Q.defer();
		console.log(iv_sid)
		content_ref.child(rid).child("slides_page").child(iv_sid).child("word").remove(function(error) {
		  if (error) {
		   
		     deferred.reject("Data could not be saved." + error);
		  } else {
		   
		    deferred.resolve("Data saved successfully.");
		  }
		});

	return deferred.promise;
}


module.exports	=	{
	set_slide 		: set_slide,
	set_slides 		: set_slides,
	get_slide		: get_slide,
	get_slides		: get_slides,
	get_word		: get_word,
	get_img			: get_img,
	remove_slide	: remove_slide,
	remove_slides	: remove_slides,
	update_img		: update_img,
	update_word 	: update_word,
	remove_img 		: remove_img,
	remove_word 	: remove_word
}