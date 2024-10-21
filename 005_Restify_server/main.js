var rest = require('restify');
var fs = require('fs'); 

var port = 8080; 

// создание сервера 
var server = rest.createServer({
    name: 'api'
});
server.listen(port, function () {
    console.log('server running on port ' + port); 
});

// middleware функции, используемые в restify, принимают те же параметры, что и в express 
server.use(function (req, res,next) {
    console.log('method: ' + req.method + '\n\r' + 'url: ' + req.url );  
    next(); 
})
// обработка get запроса 
//при обработке использует сервисы которые написаны с использованием требоавний рест архитектуры, в отличии от експресс
server.get('/', function (req, res, next) {
    res.send({ hello: 'world' });
    console.log('get'); 
    next();
});

// обработка post запроса 
server.post('/', function (req, res,next) {
    res.send('This is a server created with restify! POST');
});

server.get('*',function (req, res,next) {
    res.send({Error:'ERROR'}); 
    next();
})