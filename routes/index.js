var express = require('express');
var router = express.Router();

todos = {};



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Todos'});
});

router.post('/todo', (req, res) => {
  let user = req.body.name;
  let task = req.body.task;
  if (todos[user] != null)
  {
    todos[user].push(task);
    res.send('Todo added');
  }
  else
  {
    todos[user] = [];
    todos[user].push(task);
    res.send('User added');
  }
})

router.delete('/user/:id', (req, res) => {
  let user = req.params.id;
  if (todos[user] != null)
  {
    delete todos[user];
    res.send('User deleted')
  }
  else
  {
    res.send('User not found');
  }
})

router.put('/user', (req, res) => {
  let user = req.body.user
  let todo = req.body.todo

  if (todos[user] != null)
  {
    let index = todos[user].indexOf(todo);
    if (index != -1)
    {
      todos[user].splice(index, 1);
      res.send('Task deleted');
    }
    else
    {
      res.send('User not found');
    }
  }
  else
  {
      res.send('User not found');
  }
})

router.get('/user/:id', (req, res) => {
  let user = req.params.id;
  if (todos[user] != null)
  {
    res.json({user: user, todos: todos[user]});
  }
  else
  {
    res.send('User not found');
  }
})



module.exports = router;
