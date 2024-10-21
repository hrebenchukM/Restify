var idCounter = 0;
// хранилище данных 
var store = [{id:1,name:'Task1',description:'ok'},
             {id:2,name:'Task2',description:'no'},
             {id:3,name:'Task3',description:'ok'}
];

// функция для поиска элемента по ID 
function getItemById(id) {
    var found = false;

    for (var i = 0; i < store.length; i++) {
        if (store[i].id == id) {
            found = true;
            break;
        }
    }
    return found;
}

module.exports = {

    // выбрать все элементы 
    getItems: function (req, res,next) {

        console.log(store);
        res.send(store);
    },
    // добавить новый элемент 
    addItem: function (req, res,next) {

        var newItem = {
            id: idCounter++,
            name: 'Test',
            description: 'Test Item'
        }

        store.push(newItem);
        console.log(newItem)
        res.header('Allow', 'POST');
        res.send(store);
    },
    // обновить элемент по ID 
    updateItem: function (req, res,next) {

        var updatedItem = {
            id: req.params.id,
            name: 'New name',
            description: 'New description'
        };

        if (getItemById(req.params.id)) {

            store.splice(req.params.id, 1, updatedItem);
            console.log('item by id ' + req.params.id + ' changed!');
            res.send(updatedItem);

        } else {
            throw new restify.errors.InternalError('Wrong item id. Update failed')
        }

    },
    // удалить элемент по ID
    removeItem: function (req, res,next) {

        if (getItemById(req.params.id)) {

            store.splice(req.params.id, 1);
            console.log('item by id ' + req.params.id + ' removed!');
            res.send('item by id ' + req.params.id + ' removed!');

        } else {
            throw new restify.errors.InternalError('Wrong item id. Couldn\'t delete item')
        }
    }

}

