var restify = require('restify'),fs = require('fs'); 

var port = 8080; 
const bodyParser = require('body-parser');
const mssql = require('mssql');
const path = require('path');
var catalog = 'data';

// модуль для обработки запросов 
var apiHandler = require('./api.js'); 

// создание сервера 
var server = restify.createServer({
    name: 'myApp'
});

server.use(function(req, res, next) {
    // req.headers.accept = 'application/json';
    console.log(req.method + ' ' + req.url); 
    next(); 
})
server.use(bodyParser.urlencoded({ extended: true }));//не наследуется

function sendFile(res, fileName) {
    fs.readFile(path.join(__dirname, catalog, fileName), 'utf8', function(err, file) {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.write(err + "\n");
            res.end();
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(file);
        res.end();
    });
}



server.get('/api', function (req, res, next) {
    sendFile(res, 'index.html');
});


server.get('/api/register', function (req, res, next) {
    sendFile(res, 'register.html'); 
});


server.get('/api/login', function (req, res, next) {
    sendFile(res, 'login.html');
});


server.post('/api/register', function (req, res, next) {
    apiHandler.createItem(req,res);
});



server.post('/api/login', function (req, res, next) {
    apiHandler.loadItem(req, res);
});







// обработчик ошибок 
server.on('InternalServer', function(err,res) {
    err.body = 'oops...error'; 
    res.send(err); 
})

server.listen(port, function () {
    console.log('server running on port ' + port);
});