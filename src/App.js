import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { TodoForm,TodoList,Footer } from './components/index';
import { addTodo, newId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/TodoHelpers';
import { pipe, partial } from './lib/utils';
import { loadTodos, createTodo } from './lib/todoService';

class App extends Component {
  state = {
    todos: [],
    currentTodo: '',
  };

  static contextTypes = {
    route: PropTypes.string,
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleChange = (event) => {
   this.setState({currentTodo: event.target.value});
  }

  handleRemove = (id, event) => {
    event.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos})
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({
      todos: updatedTodos,
    })
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
    createTodo(newTodo).then( () => this.showTempMessage('Todo Added'))
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2000)
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
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Sandbox Test</h2>
        </div>
        <div className="Todo-App">
          { this.state.errorMessage && <span className="error">{this.state.errorMessage}</span> }
          {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm
            handleSubmit={submitHandler}
            handleChange={this.handleChange}
            currentTodo={this.state.currentTodo}
          />
          <TodoList handleToggle={this.handleToggle} todos={displayTodos} 
          handleRemove={this.handleRemove}/>
          <Footer />
        </div>

      </div>
    );
  }
}

App.propTypes = {
 // handleChange: PropTypes.func.isRequired,
};

export default App;
