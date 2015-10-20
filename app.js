var express 	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var fb_title		= require('./models/fb_title');
var fb_slides	= require('./models/fb_slides');
var app 		= express();
var Firebase 		= require('firebase');
var dataRef			= new Firebase('https://liang-node-test.firebaseio.com/');
var content_ref 	= dataRef.child("slides_page");

app.use(cors());
app.use(bodyParser.json());

app.listen(3012,function() {
	console.log('node_test listening on 3012');
});

app.post('/set_title',function(req,res) {
	var client_data = req.body;
	var rid 		= client_data.rid;
	// var sid = client_data.sid;
	var title = client_data.title;
	console.log(req.body);

	fb_title.set_title(rid,title)
		.then(function(result) {
			console.log("result",result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log("error",error)
			res.status(401).send(error);
		});
	// res.status(200).send(req.body)

})

app.post('/get_title',function(req,res) {
	var client_data 	= req.body;
	var rid 		= client_data.rid;
	var sid 			= client_data.sid;
	console.log(sid);

	fb_title.get_title(rid,sid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/get_slide',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	var sid 			= client_data.sid;
	console.log(sid);

	fb_slides.get_slide(rid,sid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/get_slides',function(req,res) {
	var client_data 	= req.body;
	var rid 			= client_data.rid;
	// console.log(sid);

	fb_slides.get_slides(rid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/set_slides',function(req,res) {
	var client_data = req.body;
	var rid 		= client_data.rid;
	var sid = client_data.sid;
	var slides = client_data.slides;
	// var show_time = client_data.show_time;
	console.log("client_data",client_data);

	fb_slides.set_slides(rid,slides)
		.then(function(result) {
			console.log("set_slides1",result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/set_slide',function(req,res) {
	var client_data = req.body;
	var rid = client_data.rid;
	var sid = client_data.sid;
	var slides = client_data.slides;
	// var show_time = client_data.show_time;
	console.log("client_data",client_data);

	fb_slides.set_slide(rid,sid, slides)
		.then(function(result) {
			console.log("set_slides1",result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/update_img',function(req,res) {
	var client_data = req.body;
	var sid = client_data.sid;
	var rid = client_data.rid;
	// var slides_id = client_data.slides_id;
	// var slides_id = client_data.slides_id;
	var img = client_data.img;
	console.log(sid);

	fb_slides.update_img(rid,sid,img)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/update_word',function(req,res) {
	var client_data = req.body;
	var sid = client_data.sid;
	var rid = client_data.rid;
	// var slides_id = client_data.slides_id;
	// var slides_id = client_data.slides_id;
	var word = client_data.word;
	console.log(sid);

	fb_slides.update_word(rid,sid,word)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/get_word',function(req,res) {
	var client_data 	= req.body;
	var sid 			= client_data.sid;
	var rid 			= client_data.rid;
	// console.log("sid",sid);

	fb_slides.get_word(rid,sid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/get_img',function(req,res) {
	var client_data 	= req.body;
	var sid 			= client_data.sid;
	var rid 			= client_data.rid;
	// console.log("sid",sid);

	fb_slides.get_img(rid,sid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/remove_slides',function(req,res) {
	var client_data = req.body;
	
	var rid = client_data.rid;
	// var slides_id = client_data.slides_id;
	// console.log(sid);

	fb_slides.remove_slides(rid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/remove_slide',function(req,res) {
	var client_data = req.body;
	var sid = client_data.sid;
	var rid = client_data.rid;
	// var slides_id = client_data.slides_id;
	console.log(sid);

	fb_slides.remove_slide(rid,sid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})

app.post('/remove_img',function(req,res) {
	var client_data = req.body;
	var sid = client_data.sid;
	var rid = client_data.rid;
	// var slides_id = client_data.slides_id;
	console.log(sid);

	fb_slides.remove_img(rid,sid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})
app.post('/remove_word',function(req,res) {
	var client_data = req.body;
	var sid = client_data.sid;
	var rid = client_data.rid;
	// var slides_id = client_data.slides_id;
	console.log(sid);

	fb_slides.remove_word(rid,sid)
		.then(function(result) {
			console.log(result)
			res.status(200).send(result);
		})
		.catch(function(error) {
			console.log(error)
			res.status(401).send(error);
		});

})



