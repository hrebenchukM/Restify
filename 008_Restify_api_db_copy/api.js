// соединение с бд 
var connection = require('./db.js');
var mssql = require('mssql');
var path = require('path');

module.exports = {
    // загрузка всех элементов админов
    loadItem: function (req, res,next) {
		let Login = req.body.Login;
		let Password = req.body.Password;
		let Name = req.body.Name;

        // подключение к бд 

		var request = new mssql.Request(connection);
		
		
	   request.input('Password', mssql.NVarChar(50), Password);
		request.input('Name', mssql.NVarChar(50), Name);
		request.input('Login', mssql.NVarChar(50), Login);
	

		request.query(` SELECT * 
                FROM Admins 
                WHERE Login = @Login AND Password = @Password`, function(err, rows) {
			
			if (err) console.log(err); 
			console.log('GET ' + req.url);


			var allItems = rows.recordset;
			console.log(' result:', allItems);
			if (allItems.length === 0) {
				res.send('No such admin.');
				return;
			}
		res.send(allItems);

		}); 

    },
    // создание элемента юзера 
    createItem: function (req, res,next) {

		let Login = req.body.Login;
		let Password = req.body.Password;
		let Name = req.body.Name;

        // подключение к бд 
		var request = new mssql.Request(connection);
	
		request.input('Login', mssql.NVarChar(50), Login);
		
		request.query("SELECT Login FROM Users WHERE Login = @Login", function(err, result) {
			if (err) console.log(err); 
			if (result.recordset.length > 0) {
				res.send('login exists');
				return; 
			}

			var insRequest = new mssql.Request(connection);
			insRequest.input('Password', mssql.NVarChar(50), Password);
			insRequest.input('Name', mssql.NVarChar(50), Name);
			insRequest.input('Login', mssql.NVarChar(50), Login);


			insRequest.query(`INSERT INTO Users (Name, Login, Password) VALUES (@Name, @Login, @Password)`, function(err, rows) {
            if (err) console.log(err); 
			console.log('POST ' + req.url);
			res.send('sample item added to database');
		  });
		}); 
    },


 }