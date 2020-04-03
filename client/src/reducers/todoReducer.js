import { FETCH_TODOS, NEW_TODO, DELETE_TODO} from '../actions/types';

const initialState ={
    items:[]
};

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_TODOS:
            return {
                ...state,
                items:action.payload
            }

        case NEW_TODO:
            return{
                ...state,
                items: [action.payload, ...state.items]
            };
            case DELETE_TODO:
                return{
                    ...state,
                    items: state.items.filter(todo => todo._id !==action.payload)
                };
        default:
            return state;
    }
}