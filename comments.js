// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up port
app.set('port', (process.env.PORT || 3000));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/api/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// Add comments
app.post('/api/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text
          };
          comments.push(newComment);
          fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
            if (err) {
              console.error(err);
              process.exit(1);
            }
            res.json(comments);
          });
        });
      });