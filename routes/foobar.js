var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();

// supporting <form> in html
router.use(bodyParser.urlencoded({extended: true}))

/* GET foobar listing. */
router.get('/', function(req, res, next) {
	fs.readFile("foobar.json", "utf8", function(err, data){
	  if(err) {
	  	res.json({"foo":0,"bar":0});
		}
		else {
		  var foobar = JSON.parse(data);
		  res.json(foobar);
		}
	});
});
router.put('/', (req, res, next) => {
	fs.readFile("foobar.json", "utf8", function(err, data){
	  if(err) {
	  	res.json({"foo":0,"bar":0});
		}
		else {
		  var foobar = JSON.parse(data);
		  foobar.foo += Number(req.body.foo);
		  foobar.bar += Number(req.body.bar);
		  fs.writeFile("foobar.json", JSON.stringify(foobar), function(err){
			  res.end();
		  })
		}
	});
})
router.post('/', function(req, res, next) {
	fs.writeFile("foobar.json", JSON.stringify(req.body), function(err){
	  if(err) throw err;
	  res.end();
	});
});
router.delete('/', function(req, res, next) {
	fs.unlink("foobar.json", function(err){
	  res.end();
	});
});

module.exports = router;
