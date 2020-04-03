import  {FETCH_TODOS, NEW_TODO, DELETE_TODO} from './types';

//todo Get All
// export const fetchTodo= () => dispatch =>{
//         fetch('/api/todos')
//          .then(res => res.json())
//          .then(todo => todo.todos)
//          .then(todos => dispatch({
//              type: FETCH_TODOS,
//              payload: todos
//          }));
// }

//todo get select userId
export const fetchTodo = id => dispatch =>{
    fetch('/api/todos/userId/'+id)
    .then(res=> res.json())
    .then(todo => todo.todos)
    .then(todos => dispatch({
        type: FETCH_TODOS,
        payload: todos
    }));
}

// todo Post
export const createTodo= (todoData) => dispatch =>{
    fetch('/api/todos',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(todoData)
    })
        .then(res => res.json())
        .then(todos => todos.todos)
        .then(todo => dispatch({
            type: NEW_TODO,
            payload: todo
        }));
}

//todo Delete
export const deleteTodo= (id) => dispatch =>{
    fetch(`/api/todos/delete/${id}`)
     .then(res => res.json())
     .then(todos => dispatch({
         type: DELETE_TODO,
         payload: id
     }));
}