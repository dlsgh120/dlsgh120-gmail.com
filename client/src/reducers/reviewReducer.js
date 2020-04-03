import {NEW_REVIEW, FETCH_REVIEW, REVIEW_INIT, DELETE_REVIEW, ALL_DELETE_REVIEWS} from '../actions/types';

const initialState ={
    items:[],
    length:0
}
export default function(state=initialState, action){
    switch(action.type){
        case NEW_REVIEW:
            return{
                ...state,
                items: [action.payload, ...state.items]
            };
        case FETCH_REVIEW:
            return{
                ...state,
                items: action.payload,
                length:action.payload.length
            };
        case REVIEW_INIT:
            return{
                items:[],
                length:0
            };
        case DELETE_REVIEW:
            return{
                ...state,
                items: state.items.filter(review => review._id !== action.payload)
            };
        case ALL_DELETE_REVIEWS:
            return{
                ...state,
                items: state.items.filter(review => review._id !== action.payload)
            };
        default:
            return state;
    }
}