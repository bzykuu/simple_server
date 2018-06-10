var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();

// supporting <form> in html
router.use(bodyParser.urlencoded({extended: true}))

router.get('/', function(req, res, next) {
	var collection = req.db.get('foobarcollection');
	collection.find({}, {}, function(err, results){
		res.json(results);
	});
});

router.put('/', (req, res, next) => {
	var collection = req.db.get('foobarcollection');
	collection.insert({
		"foo": req.body.foo,
		"bar": req.body.bar
	}, function(err, doc) {
		if(err) throw err
		else {
			res.end();
		}
	});
})

router.post('/', function(req, res, next) {
	var collection = req.db.get('foobarcollection');
	collection.update(
		{_id: req.body.id},
		{"foo": req.body.foo, "bar": req.body.bar},{},
		(err, result) => {res.end()}
		);
});

router.delete('/:id', function(req, res, next) {
	var collection = req.db.get('foobarcollection');
	collection.remove({"_id": req.params.id}, function(err){
		res.end();
	});
});

module.exports = router;
