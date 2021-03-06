var mongoose = require('mongoose');
var Todo = require('server/db/db').Todo;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  Todo.find(function(err, results) {
    if (err) { console.log(err); }

    res.send({ todos: results });
  });
});

router.post('/', function(req, res) {
  var todo = new Todo(req.body);
  todo.save(function(err) {
    if (err) { console.log(err); }

    console.log('Saved New Task!');
    res.send('Successfully Saved New Task!');
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
    $set: { task: req.body.task, isCompleted: req.body.isCompleted }
  }, function(err) {
    if (err) { console.log(err); }

    res.send('ToDo Updated!');
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
    if (err) { console.log(err); }

    res.send('ToDo Successfully Deleted!');
  });
});

module.exports = router;
