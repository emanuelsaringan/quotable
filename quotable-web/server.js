var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// var comments = [{author: 'Pete Hunt', text: 'Hey there!', liked: false}];
var sample = [
  {
      "name": "Booklet 1",
      "quotables": [
        {
          "title": "Quote 1",
          "url": "www.wikipedia.org",
          "text": "The quick brown",
          "time": "2014-07-26T07:09:48.463Z"
        }
      ]
    }
]

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/comments.json', function(req, res) {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify(comments));
// });

// app.get('/comments/:author', function(req, res) {
//   res.setHeader('Content-Type', 'application/json');
//   var author = req.params.author;
//   console.log("author: " + author);
//   var list = [];
//   for (var i in comments) {
//   	console.log(i);
//   	for (var prop in i) {
//   		console.log(prop);
// 	  	// if (prop.author === author) {
// 	  	// 	console.log("prop author: " + author);
// 	  	// 	list.push(i)
// 	  	// 	console.log(i);
// 	  	// }
//   	}
//   }
//   res.send(JSON.stringify(list));
// });

app.post('/sample.json', function(req, res) {
  comments.push(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(sample));
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');