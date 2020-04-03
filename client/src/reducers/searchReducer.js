import {SEARCH_BOARDS} from '../actions/types';

const initialState={
    search:""
}

export default function(state = initialState, action){
    switch (action.type) {
        case SEARCH_BOARDS:
            return{
                search:action.payload
            }
        default:
            return state;
    }
}