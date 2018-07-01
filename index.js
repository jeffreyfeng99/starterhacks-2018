var app = require('express')();
var http = require('http').Server(app);
var hbs = require('hbs'); 
var fs = require('fs');             

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get('/', function(req, res) {
    var messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
    messages.push(req.query);
    fs.writeFileSync('message.json', 'utf8');
    
	res.render(__dirname + '/index.html', {
        'welcomeMessage': 'Hello Starterhacks'
    , 'messages':messages});   
});


//~ app.get('/', function(req, res) {                /// 1st version
	//~ res.send('<h1>Hello World </h1>');
//~ });

//~ app.get('/', function(req, res) {
	//~ res.sendFile(__dirname + '/index.html');    // second
//~ });

//~ app.get('/', function(req, res) {
	//~ res.render(__dirname + '/index.html', {
        //~ 'welcomeMessage': 'Hello Starterhacks'
    //~ });    // third
//~ });

app.get('/message', function(req, res) {
	console.log(req.query);   
    var messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
    messages.push(req.query);
    fs.writeFileSync('message.json', JSON.stringify(messages));
});

http.listen(3000, function() {
	console.log("Listening on port 3000");
})
