import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      input: e.target.value
    });
  } 

  handleSubmit(e) {
    e.preventDefault();
    this.addTask;
  }

  addTask() {
    this.props.addTask(this.state.input);
    this.setState({
      input: ''
    });
  }

  render() {
    let { input } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={input} onChange={this.handleInput}></input>
          <button onClick={this.addTask}>Add</button>
        </form>
      </div>
    );
  }
}

export default Form;