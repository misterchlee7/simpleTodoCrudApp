const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const PORT = 7000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/todo', (req, res) => {
  db.fetchAll( (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  })  
});

app.post('/todo', (req, res) => {
  let task = req.body.task;
  db.save(task, (err, newTask) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(newTask);
    }
  });
});

app.put('/todo/:taskId/:editTask', (req, res) => {
  let taskId = req.params.taskId;
  let editTask = req.params.editTask;
  db.updateTask(taskId, editTask, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(result);
    }
  })
});

app.delete('/todo/:taskId', (req, res) => {
  let taskId = req.params.taskId;
  db.deleteTask(taskId, (err, taskId) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
});

app.listen(PORT, () => {
  console.log('app listening in PORT: ', PORT);
});

