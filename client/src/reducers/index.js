import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import boardReducer from './boardReducer';
import searchReducer from './searchReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
    todos: todoReducer,
    error: errorReducer,
    auth: authReducer,
    boards: boardReducer,
    search: searchReducer,
    review: reviewReducer
});