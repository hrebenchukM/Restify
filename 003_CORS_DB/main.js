var express = require('express');
var app = express(); 
var router = express.Router();

var port = 8080; 

var mssql = require('mssql');

var config = {
	user: 'admin',           // пользователь базы данных
	password: '12345',          // пароль пользователя 
	server: 'LENOVO\\SQLEXPRESS',       // хост
	database: 'testdb',          // имя бд
	port: 1433,             // порт, на котором запущен sql server
	  options: {
		  encrypt: true,  // Использование SSL/TLS
		  trustServerCertificate: true // Отключение проверки самоподписанного сертификата
	  },
  }


// ConnectionPool - создает объект который позволяет подключаться к БД
var connection = new mssql.ConnectionPool(config); 
var pool = connection.connect(function(err) {
	if (err) console.log(err)
}); 


// middleware для использования CORS  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function (req, res) {

    // подключение к бд 
	var request = new mssql.Request(connection);  

	request.query("SELECT * FROM items", function(err, rows) {
		
		if (err) console.log(err); 
        console.log('GET ' + req.url);
		res.status(200).send('selected items: ' + JSON.stringify(rows.recordset));
	}); 
});

router.get('/:id', function (req, res) {
//айдишник оформили как параметр нашего запроса и начинаем искать 
    // подключение к бд 
	var ps = new mssql.PreparedStatement(connection);//параметризованое соединение   
	
	var inserts = {//входящий параметр
		id: parseInt(req.params.id)  
	} 
	
	ps.input('id', mssql.Int); 

	ps.prepare('SELECT * FROM items WHERE id=@id', function(err) {
		if (err) console.log(err); 
		
		ps.execute(inserts, function(err, rows) { 
		
				if (err) console.log(err); 
			
				console.log('GET ' + req.url);
				res.status(200).send('selected item: ' + JSON.stringify(rows.recordset));
				ps.unprepare();  
				
		}); 
	}); 
});

router.post('/', function (req, res) {

    // подключение к бд 
	var request = new mssql.Request(connection);   
	
	request.query("INSERT INTO items (name, description, completed) VALUES ('Test', 'Some text', 1)", function(err, rows) {
		
		if (err) console.log(err); 
        console.log('POST ' + req.url);
        res.status(200).send('sample item added to database');
		
	}); 
});

router.put('/:id', function (req, res) {
    // подключение к бд 
	var ps = new mssql.PreparedStatement(connection);   
	
	var inserts = {
		id: parseInt(req.params.id)  
	} 
	
	ps.input('id', mssql.Int); 
	
	ps.prepare("UPDATE items SET name='new Name', description='Some other text', completed=0 WHERE id=@id", function(err) {
		if (err) console.log(err); 
		
		ps.execute(inserts, function(err, rows) {
			if (err) console.log(err); 
			
			console.log('PUT ' + req.url);
            res.status(200).send('item by id ' + req.params.id + ' changed');
			ps.unprepare(); 
		}); 
	}); 
});

router.delete('/:id', function (req, res) {
    // подключение к бд 
	var ps = new mssql.PreparedStatement(connection);   
	
	var inserts = {
		id: parseInt(req.params.id)  
	} 
	
	ps.input('id', mssql.Int);  
	
	ps.prepare('DELETE FROM items WHERE id=@id', function(err) {
		if (err) console.log(err); 
		
		ps.execute(inserts, function(err, rows) {
			if (err) console.log(err); 
			
            console.log('DELETE ' + req.url);
            res.status(200).send('item deleted from database');  
			
			ps.unprepare(); 
		}); 
	});
});

// использовать роутер на пути /api 
app.use('/api', router); 

app.listen(port, function () {
    console.log('app running on port ' + port);
});