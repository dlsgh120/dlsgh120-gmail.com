import {FETCH_BOARDS, READ_BOARDS, NEW_BOARDS, DELETE_BOARDS, UPDATE_BOARDS} from './types';
import {reviewInit} from './reviewAction';

//Boards Get
export const fetchBoard= () => dispatch =>{
    dispatch(reviewInit());
    fetch('/api/boards')
     .then(res => res.json())
     .then(board => board.boards)
     .then(boards => dispatch({
         type: FETCH_BOARDS,
         payload: boards,
         length:boards.length
     }));
}
//Board read
export const readBoard = id => dispatch =>{
    fetch('/api/boards/'+id)
        .then(res => res.json())
        .then(board => board.boards)
        .then(boards => dispatch({
            type: READ_BOARDS,
            payload: boards
        }));
}

//Board Create(POST)
export const createBoard = (BoardData) => dispatch =>{
    fetch('/api/boards',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(BoardData)
    })
    .then(res =>res.json())
    .then(boards => boards.boards)
    .then(board => dispatch({
        type: NEW_BOARDS,
        payload:board
    }))
}

//Board DELETE
export const deleteBoard = (id) => dispatch =>{
    fetch('/api/boards/'+id,{
        method:'DELETE'
    }).then(res=>res.json())
      .then(boards => dispatch({
         type: DELETE_BOARDS,
         payload: id
      }));
}
//Board Update

export const updateBoard = (id, boardData) => dispatch =>{
    fetch('/api/boards/update/'+id,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(boardData)
    })
    .then(res=>res.json())
    .then(boards => boards.boards)
    .then(board => dispatch({
        type: UPDATE_BOARDS,
        payload: board
    }));
}