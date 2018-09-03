import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Form from '../src/components/Form.jsx';
import List from '../src/components/List.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
    this.addTask = this.addTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    Axios.get('/todo')
      .then(results => {
        let resultsArr = results.data;
        this.setState({
          tasks: resultsArr
        });
      })
      .catch(err => {
        console.log('error in getting tasks', err)
      });
  }

  addTask(task) {
    Axios.post('/todo', {
      task: task
    })
    .then( (response) => {
      this.setState({
        tasks: [...this.state.tasks, response.data]
      })
    })
    .catch( (err) => {console.log('error returning back to index.jsx post', err)});
  }

  deleteTask(taskId) {
    Axios.delete(`/todo/${taskId}`)
    .then( () => {
      let tempArr = [...this.state.tasks];
      this.setState({
        tasks: tempArr.filter(task => 
          task._id !== taskId
        )
      });
    })
    .catch( () => {throw new Error('error deleting task')})
  }

  editTask(taskId) {
    new Promise( (resolve, reject) => {
      let newTask = prompt('Edit task below:');
      if (!newTask) {
        reject();
      } else {
        resolve(newTask);
      }
    })
    .then(newTask => {
      Axios.put(`/todo/${taskId}/${newTask}`)
      .then( () => { this.getTasks(); })
      .catch( () => { throw new Error('error updating task') });
    })
    .catch( () => {throw new Error('insert a new task value to update')});
  }

  render() {
    return (
      <div>
        <h1>To-do List App</h1>
        <Form addTask={this.addTask} />
        <List taskList={this.state.tasks} deleteTask={this.deleteTask} editTask={this.editTask} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
