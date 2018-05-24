import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';

import { getTodos, addTodo, removeTodo, getToken } from './api';
import { SIGNIN_URL } from './config';

import { checkAuthCode } from './util';
checkAuthCode();

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    getTodos().then(todos => this.setState({ todos }))
  }

  addTodo() {
    addTodo().then(() => this.getTodos());
  }

  checkToken() {
    getToken().then(res => console.log(res));
  }

  removeTodo(todoId) {
    removeTodo(todoId).then(() => this.getTodos());
  }

  render() {
    return (
      <div>
        <a href={SIGNIN_URL}>login</a>
        <button onClick={this.checkToken}>check token</button>
        <p>{this.state.msg}</p>
        <p>
          <button onClick={this.addTodo}>+</button>
        </p>
        <ul>
          {(this.state.todos.length > 0) && this.state.todos.map(todo => (
            <li key={todo.id}>
              {todo.id}
              <button onClick={() => this.removeTodo(todo.id)}>-</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
