var express=require("express");
var app=express();
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database/dogs.sqlite3");
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended:false});
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection',function(socket){
	console.log('one user connected.');
	socket.on('disconnect',function(){
		console.log('one user disconnected.')
	});	
	
  	socket.on('sendlike', function(senddata){
    	console.log('New like added, plz check :)');
  		io.emit('sendlike',senddata);
  	});
 });

app.use(express.static('public'));
/*
app.param('breed', function(req, res, next){
	var name = req.params.dogname;
	var newName = name[0].toUpperCase() + name.slice(1).toLowerCase();
	req.newDogName = newName;
	next();
});

app.get('/:dogname',function(req,res){
	dogName = req.newDogName.split("-").join(" ");
	var result;
	var query = "SELECT exists (SElECT name FROM Dogs WHERE name = ?) as exist;"
	db.each(query,dogName,function(err,row){
		result = row;
	},function(){
		if(result.exist === 0) res.status(404).json(dogName+" NOT FOUND.");
		else res.sendFile(__dirname + '/public/dog.html'); 
	});
});
*/

//get all dog breeds' information
app.get('/data/alldogs',function(req,res){
	var results = [];
	var query = "SELECT name, description, likes, source FROM Dogs JOIN ImgFiles WHERE Dogs.name = ImgFiles.parentDog AND imgId=1"
	db.each(query,function(err,row){
		results.push(row);
	},function(err,rows){
		res.json(results);
	}); 
});

//get individual dog breed information
app.get('/data/:breed',function(req, res){
	var dogName = req.params.breed;
	console.log(dogName);
	var result = "place-holder";
	var query = "SELECT name, fullDescription, size, coat, availability, talents, friendliness, noise FROM Dogs where name = ?";
	db.each(query,dogName,function(err,row){
		result = row;
	},function(err,rows){
		res.json(result);
	}); 
});
// get individual dog breed comments
app.get('/data/comments/:breed',function(req, res){
	var dogName = req.params.breed;
	var result = [];
	var query = "SELECT author, body FROM Comments WHERE parentDog = ?";
	db.each(query,dogName,function(err,row){
		result.push(row);
	},function(err,rows){
		res.json(result);
	}); 
});
//get individual dog breed images
app.get('/data/images/:breed',function(req, res){
	var dogName = req.params.breed;
	console.log(dogName);
	var result = [];
	var query = "SELECT source FROM ImgFiles WHERE parentDog = ?";
	db.each(query,dogName,function(err,row){
		result.push(row);
	},function(err,rows){
		res.json(result);
	}); 
});

app.post('/data/likes',parseUrlencoded,function(req,res){
	var query = "Update Dogs Set likes=? WHERE name = ?";
	var stmt = db.prepare(query);
	stmt.run([req.body.likes,req.body.name],function(err,data){
		if(err) res.status(500).json("fail");
		else res.status(200).json("success");
	});
	stmt.finalize();
});

app.post('/data/add-comment',parseUrlencoded,function(req,res){
	var query = "INSERT INTO Comments(author,body,parentDog) VALUES (?,?,?)";
	var stmt = db.prepare(query);
	stmt.run([req.body.author,req.body.body,req.body.parentDog],function(err,data){
		if(err) res.status(500).json("fail");
		else res.status(200).json("success");
	});
	stmt.finalize();
});

server.listen(3000,function(){
	console.log('Listening on port 3000.');
});
