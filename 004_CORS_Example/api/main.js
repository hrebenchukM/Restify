var express = require('express');
var app = express();
var path = require('path'); 

var port = 8080; 

var bodyParser = require('body-parser'); 

// подключение модуля для обработки запросов 
var apiHandler = require('./api_handler');

// middleware для обработки данных запросов в формате JSON 
app.use(bodyParser.json()); 

// middleware для использования CORS 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 

    next();
});

var router = express.Router(); 
//делегирование функций
// загрузка всех элементов из бд 
router.get('/', apiHandler.loadItems) 

// выбор элемента
router.get('/:id', apiHandler.getItemById);

// создание элемента 
router.post('/new', apiHandler.createItem);

// обновление элемента (редактирование) 
router.put('/:id', apiHandler.updateItem);

// удаление элемента 
router.delete('/:id', apiHandler.removeItem); 

app.use('/api', router); 

app.listen(port, function () {
    console.log('app running on port ' + port); 
})