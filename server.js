var express = require('express');
var app = express();
var port = process.env.PORT || 1800;


app.get('/', function(req,res){
    res.send('Welcome this is project one')
});


app.listen(port);
console.log('Working on port ', port);
