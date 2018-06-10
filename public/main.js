var add = document.getElementById('add');
add.addEventListener('click', function () {
	fetch('foobar', {
	  method: 'put',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({
	    'foo': document.getElementById('foo').value,
	    'bar': document.getElementById('bar').value
	  })
	})
	.then(()=> updateList())
})


var update = document.getElementById('update');
update.addEventListener('click', function () {
	var foobar = {
		"id": this.recordId,
		'foo': document.getElementById('foo').value,
		'bar': document.getElementById('bar').value
	}
	fetch('foobar', {
	  method: 'post',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify(foobar)
	})
	.then(()=> updateList())
})

var getData = function () {
	fetch('foobar')
	.then(res => {
		console.log("hmm " + res.json());
		if (res.ok) return res.json()
	})
}

var updateList = function() {
	fetch('foobar')
	.then(res => {
		if (res.ok) return res.json()
	})
	.then(foobar => {
		clearUpdate();

		var list = document.getElementById("fooList");
		clearChildren(list);
		for (var i=0; i<foobar.length; i++) {
			writeLine(foobar[i], list);
		}
	})
}
updateList();

var clearUpdate = function() {
	var foo = document.getElementById('foo');
	var bar = document.getElementById('bar');
	var update = document.getElementById('update');

	foo.value = "";
	bar.value = "";
	update.disabled = true;
	update.recordId = 0;
}

var clearChildren = function(element) {
	while (element.childNodes[0]) {
		element.removeChild(element.childNodes[0]);
	};
}

var writeLine = function(data, list) {
	var line = document.createElement("tr");
	var foo = document.createElement("td");
	var bar = document.createElement("td");
	var delButton = document.createElement("button");

	foo.addEventListener('click', function(){updateUpdate(data)});
	bar.addEventListener('click', function(){updateUpdate(data)});
	foo.innerHTML = data.foo;
	bar.innerHTML = data.bar;
	delButton.innerHTML = "delete";
	delButton.addEventListener('click', function () {
		fetch('foobar/' + data._id, {
			method: 'delete'
		})
		.then(() => updateList())
	});

	line.appendChild(foo);
	line.appendChild(bar);
	line.appendChild(delButton);
	list.appendChild(line);
}

var updateUpdate = function(data){
	document.getElementById('foo').value = data.foo;
	document.getElementById('bar').value = data.bar;
	document.getElementById('update').recordId = data._id;
	document.getElementById('update').disabled = false;
}