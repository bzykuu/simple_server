var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();

// supporting <form> in html
router.use(bodyParser.urlencoded({extended: true}))

router.get('/', function(req, res, next) {
	fs.readFile("foobar.json", "utf8", function(err, data){
	  if(err) throw err
		else {
		  var foobar = JSON.parse(data);
		  res.json(foobar);
		}
	});
});

router.put('/', (req, res, next) => {
	fs.readFile("foobar.json", "utf8", function(err, data){
	  if(err) throw err
		else {
		  var foobar = JSON.parse(data);
		  var newEntry = {
		  	"id": foobar.data.length + 1,
		  	"foo": req.body.foo,
		  	"bar": req.body.bar
		  };
		  foobar.data.push(newEntry);
		  fs.writeFile("foobar.json", JSON.stringify(foobar), (err) =>{
		  	if (err) throw err
		  	else res.end();
		  });
		}
	});
})

router.post('/', function(req, res, next) {
	fs.readFile("foobar.json", "utf8", function(err, data){
	  if(err) throw err
		else {
		  var foobar = JSON.parse(data);
		  var findId = foobar.data.findIndex(function(record) {
		  	return record.id == req.body.id;
		  });
		  foobar.data[findId].foo = req.body.foo;
		  foobar.data[findId].bar = req.body.bar;
		  fs.writeFile("foobar.json", JSON.stringify(foobar), (err) =>{
		  	if (err) throw err
		  	else res.end();
		  });
		}
	});
});

router.delete('/:id', function(req, res, next) {
	fs.readFile("foobar.json", "utf8", function(err, data){
	  if(err) throw err
		else {
		  var foobar = JSON.parse(data);
		  var findId = foobar.data.findIndex(function(record) {
		  	return record.id == req.params.id;
		  });
		  //remove entry
		  foobar.data.splice(findId, 1);
		  //update ids
		  for (var i=findId; i<foobar.data.length; i++){
		  	foobar.data[i].id--;
		  }

		  fs.writeFile("foobar.json", JSON.stringify(foobar), (err) =>{
		  	if (err) throw err
		  	else res.end();
		  });
		}
	});
	res.end();
});

module.exports = router;
