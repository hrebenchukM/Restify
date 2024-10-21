// соединение с бд 
var connection = require('./db_handler');
var mssql = require('mssql');
var path = require('path'); 

module.exports = {
    // загрузка всех элементов
    loadItems: function (req, res) {

		// подключение к бд 
		var request = new mssql.Request(connection);  

		request.query("SELECT * FROM items", function(err, rows) {
			
			if (err) console.log(err); 
			console.log('GET ' + req.url);
			res.json(rows); 
		}); 

    },
    // загрузка элемента из бд по id 
    getItemById: function (req, res) {

		// подключение к бд 
		var ps = new mssql.PreparedStatement(connection);   
		
		var inserts = {
			id: parseInt(req.params.id)  
		} 
		
		ps.input('id', mssql.Int); 
		
		ps.prepare('SELECT * FROM items WHERE id=@id', function(err) {
			if (err) console.log(err); 
			
			ps.execute(inserts, function(err, rows) { 
			
					if (err) console.log(err); 
				
					console.log('GET ' + req.url);
					res.json(rows['recordset'][0]);  
					ps.unprepare();  
					
			}); 
		}); 
    },
    // создание элемента 
    createItem: function (req, res) {

        // подключение к бд  
		var ps = new mssql.PreparedStatement(connection);   
		
		var data = req.body;
		//var _id = Math.ceil(Math.random() * 100);


		var inserts = {
			//id : _id,
			name: data.name, //названия инпутов из индекс штмл
			description: data.description, //названия инпутов из индекс штмл
			completed: parseInt(data.completed), //названия инпутов из индекс штмл
		
		} 
		//maping сопоставление параметров с типами данных
		//ps.input('id', mssql.Int);
		ps.input('name', mssql.Text); 
		ps.input('description', mssql.Text); 
		ps.input('completed', mssql.Int);

		
		
		ps.prepare("INSERT INTO items (name, description, completed) VALUES ( @name, @description, @completed)", function(err) {
			if (err) console.log(err); 
			
			ps.execute(inserts, function(err, rows) {

                 console.log('item created');
                 res.status(201).send('item created'); 
				 
				 ps.unprepare(); 
			}); 
		});
    },
    // обновление элемента (редактирование) 
    updateItem: function (req, res) { 
	
		var ps = new mssql.PreparedStatement(connection);   
		
		var data = req.body;
		
		var inserts = {
			name: data.name, //названия инпутов из индекс штмл
			description: data.description, //названия инпутов из индекс штмл
			completed: parseInt(data.completed), //названия инпутов из индекс штмл
			id: parseInt(data.id) 
		} 
		//maping сопоставление параметров с типами данных
		ps.input('name', mssql.Text); 
		ps.input('description', mssql.Text); 
		ps.input('completed', mssql.Int);  
		ps.input('id', mssql.Int); 
		
		ps.prepare('UPDATE items SET name=@name, description=@description, completed=@completed WHERE id=@id', function(err) {
			if (err) console.log(err); 
			
			ps.execute(inserts, function(err, rows) {
				if (err) console.log(err); 
				
				console.log('PUT ' + req.url);
                res.status(200).send('item updated');
				ps.unprepare(); 
			}); 
		}); 
    },
    // удаление элемента 
    removeItem: function (req, res) {

		var ps = new mssql.PreparedStatement(connection);   
		
		var inserts = {
			id: parseInt(req.params.id)  //названия инпутов из индекс штмл
		} 
		
		//maping сопоставление параметров с типами данных
	
		ps.input('id', mssql.Int);  
		
		ps.prepare('DELETE FROM items WHERE id=@id', function(err) {
			if (err) console.log(err); 
			
			ps.execute(inserts, function(err, rows) {
				if (err) console.log(err); 
				
				console.log('DELETE ' + req.url);
                res.status(200).send('item deleted'); 
				
				ps.unprepare(); 
			}); 
		});
    }
}