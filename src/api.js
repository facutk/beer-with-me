const TODOS_URL = 'https://us-central1-lsi7571.cloudfunctions.net/hello-world/api/todos';

const TODO_URL = 'https://us-central1-lsi7571.cloudfunctions.net/hello-world/api/todo';

const TOKEN_URL = 'https://us-central1-lsi7571.cloudfunctions.net/hello-world/auth/token';

export const getTodos = () => fetch(TODOS_URL,
  {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({message: 'hi'})
  }).then(response => response.json());

export const getToken = authcode => fetch(`${TOKEN_URL}/?authcode=${authcode}`)
  .then(response => response.json());

export const addTodo = () => fetch(TODOS_URL,
  {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: 'hi'})
  }).then(response => response.json());

export const removeTodo = todoId => fetch(`${TODO_URL}/${todoId}`,
  {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
