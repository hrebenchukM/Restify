var express = require('express');
var app = express(); 
var router = express.Router(); 

var port = 8080; 

var router = require('./route')
//Корс- кросдоменные запросы (для заопросов на другие сервера которые хранят например изображения чтоб сохранить качество, изоляция между серверами которые отправляют данные)
//если не использовать корс возникает ошибка. Допустим мы подтягиваем изображение, которое сохраняется на сервере хорошее качество, если мы его получим как бинарный файл-очень сильно теряется качество

// middleware для использования CORS , мидлвер через себя пропускают запрос и формируют ответ и передает дальше некст
app.use(function (req, res, next) {
    console.log("CORS");
    res.header("Access-Control-Allow-Origin", "*");//стандартный заголовок
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");//получаем данные в таком виде в котором они хостятся на сервере, получаю унифицциированный заголовок для файлов всех типов
    next();
});


// использовать роутер на пути /api
app.use('/api', router.rout); 

app.listen(port, function () {
    console.log('app running on port ' + port);
});