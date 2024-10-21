var restify = require('restify');
var server = restify.createServer();

server.listen(8080, function () {
  console.log('ready on %s', server.url);
});

server.get('/', function (req, res, next) {
    res.send({ hello: 'world' });
    next();
 });
