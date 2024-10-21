var express = require('express');
var app = express();
var router = express.Router();//настраиваются подмашруты
var port = 8080; 

// В данном приложении показана базовая логика построения RESTful API 
//Рестфул архитектура это гет пост пут делете
//фреймворк експресс позволяет реализовать с помощью роутера рест архитектуру
router.get('/', function (req, res) {
    res.status(200).send('get item!'); 
});


router.get('/:id', function (req, res) {
    res.status(200).send('get item by ID ' + req.params.id + '!'); 
});

router.post('/', function (req, res) {
    console.log("get");
    res.status(201).send('create item!');
});

router.put('/:id', function (req, res) {
    res.status(200).send('update item by ID ' + req.params.id + '!');
});

router.delete('/:id', function (req, res) {
    res.status(200).send('remove item by ID ' + req.params.id + '!');
});


// использовать роутер на пути /api
app.use('/api', router); 

app.listen(port, function () {
    console.log('app running on port ' + port);
}); 