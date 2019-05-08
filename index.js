const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

var todoList = [];

// IIFE
var incr = (function () {
    var i = 1;

    return function () {
        return i++;
    }
})();

app.get('/', (req, res) => res.send('Hello World!'))

// TEST.List TODO for any given day/date
app.get('/todo', (req, res) => {
    res.json(todoList)
})


// Add a TODO for any given day/date
app.post('/todo/add', (req, res) => {
    var todo = req.body.todo;
    var date = req.body.date;
    var counter = incr();
    
    todoList.push({
        "id":counter,
        "todo":todo,
        "date":date,
        "status":"active"
    })
 
    res.json(todoList)
})

// List TODO for any given day/date
app.get('/todo/:date', (req, res) => {
    var dateReq = parseInt(req.params.date)

    var result = [];
    for(var i = 0 ; i < todoList.length;i++){
        if(todoList[i].date == dateReq){
           result.push(todoList[i]);
        }
    }

    res.json(result)
})

// Mark a TODO as completed
app.post('/todo/setcomplete', (req, res) => {
    var todoId = parseInt(req.body.id);

    /*var result = todoList.filter(function(obj){
        obj.id == todoId
    })*/

    var result;
    for(var i = 0 ; i < todoList.length;i++){
        if(todoList[i].id == todoId){
           result = todoList[i]
           break; 
        }
    }

    result.status = "completed"

    res.json(result)
})

// List specific TODO(Active/Completed) for a given day/date
app.get('/todo/:day/:status', (req, res) => {
    var dayReq = parseInt(req.params.day);
    var statusReq = req.params.status;

    /*var result = todoList.filter(function(obj){
        obj.day == dayReq,
        obj.status = statusReq
    })*/

    var result = [];
    for(var i = 0 ; i < todoList.length;i++){
        if(todoList[i].day == dayReq && todoList[i].status == statusReq){
           result.push(todoList[i])
        }
    }

    res.json(result)
})

// Delete a TODO
app.delete('/todo/:id', (req, res) => {
    var todoId = parseInt(req.params.id);
    
    for(var i = 0 ; i < todoList.length ; i++){
        var todoItem = todoList[i]
        if(todoItem.id == todoId){
            todoList.splice(i,1)
            i--
        }
    }

    res.json(todoList)
})

// Edit a TODO
app.post('/todo/update', (req, res) => {
    var todoId = parseInt(req.body.id);
    var todoUpdated = req.body.todo;
    
    /*var result = todoList.filter(function(obj){
        obj.id = todoId
    })*/

    var result;
    for(var i = 0 ; i < todoList.length;i++){
        if(todoList[i].day == todoId){
           result = todoList[i]
           break; 
        }
    }

    result.todo = todoUpdated

    res.json(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
