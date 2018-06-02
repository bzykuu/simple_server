var update = document.getElementById('update');
update.addEventListener('click', function () {
	fetch('foobar', {
	  method: 'put',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({
	    'foo': document.getElementById('foo').value,
	    'bar': document.getElementById('bar').value
	  })
	})
})

var deleteFile = document.getElementById('delete');
deleteFile.addEventListener('click', function () {
	fetch('foobar', {
	  method: 'delete',
	  headers: {'Content-Type': 'application/json'},
	  body: ''
	})
})

var createFile = document.getElementById('create');
createFile.addEventListener('click', function () {
	var foobar = {"foo":0,"bar":0};
	fetch('foobar', {
	  method: 'post',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify(foobar)
	})
})

var show = document.getElementById('show');
show.addEventListener('click', function () {
	fetch('foobar')
	.then(res => {
		if (res.ok) return res.json()
	})
	.then(foobar => {
		console.log("foobar: " + foobar.foo);
		document.getElementById('showFoo').innerHTML = "foo: " + foobar.foo;
		document.getElementById('showBar').innerHTML = "bar: " + foobar.bar;
	})
})