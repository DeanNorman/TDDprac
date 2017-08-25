import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { TodoForm,TodoList } from './components/index';
import { addTodo, newId } from './lib/TodoHelpers';

class App extends Component {
  state = {
    todos: [
      {id: 1, name: 'Item 1', isComplete: true},
      {id: 2, name: 'Item 2', isComplete: false},
      {id: 3, name: 'Item 3', isComplete: false},
    ],
    currentTodo: '',
  };

  handleChange = (event) => {
   this.setState({currentTodo: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const id = newId()
    const newTodo = {
      id: id,
      name: this.state.currentTodo,
      isComplete: false,
    }
    const updatedTodos = addTodo(this.state.todos, newTodo);

    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: '',
    })
  }

  handleEmptySubmit = (event) => {
    event.preventDefault()
    if (!this.state.currentTodo) {
      this.setState({
        errorMessage: 'Please enter a task name!',
      })
    };
  }

  render() {
    const submitHandler =  this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Sandbox Test</h2>
        </div>
        <div className="Todo-App">
          { this.state.errorMessage && <span className="error">{this.state.errorMessage}</span> }
          <TodoForm
            handleSubmit={submitHandler}
            handleChange={this.handleChange}
            currentTodo={this.state.currentTodo}
          />
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
 // handleChange: PropTypes.func.isRequired,
};

export default App;
