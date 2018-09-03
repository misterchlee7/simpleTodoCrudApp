const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tbd2');

const mongodb = mongoose.connection;
mongodb.on('error', () => {
  console.log('error connecting to mongodb in db index');
});
mongodb.once('open', () => {
  console.log('successfully connected to mongodb');
});

let todoSchema = new mongoose.Schema({
  task: String
});

let Todo = mongoose.model('Todo', todoSchema);

let fetchAll = (cb) => {
  Todo.find({}).exec()
    .then(results => {
      cb(null, results);
    })
    .catch(err => {
      cb(err);
    });
}

let updateTask = (taskId, editTask, cb) => {
  Todo.update({ _id: taskId }, { $set: {
    task: editTask
  }}, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  })
}

let deleteTask = (taskId, cb) => {
  Todo.remove({
    _id: taskId
  }).exec()
  .then(taskId => { cb(null, taskId); })
  .catch(err => { cb(err); })
};

let save = (task, cb) => {
  let newTask = new Todo({
    task: task
  });
  newTask.save(err => {
    if (err) {
      cb(err);
    }
  })
  .then( () => { cb(null, newTask) });
};

module.exports = {
  save: save,
  fetchAll: fetchAll,
  deleteTask: deleteTask,
  updateTask: updateTask
}