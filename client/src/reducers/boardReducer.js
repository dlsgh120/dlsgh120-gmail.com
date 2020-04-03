import { FETCH_BOARDS, READ_BOARDS, NEW_BOARDS, DELETE_BOARDS, UPDATE_BOARDS} from '../actions/types';

const initialState ={
    items:[],
    read:[],
    readCheck:false,
    length:0
};

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_BOARDS:
            return {
                ...state,
                items:action.payload,
                read:[],
                length:action.length,
                readCheck:false
            };
        case READ_BOARDS:
            return{
                ...state,
                read:action.payload,
                readCheck:true
            };
        case NEW_BOARDS:
            return{
                ...state,
                items: [action.payload, ...state.items]
            };     
        case DELETE_BOARDS:
            return{
                ...state,
                items: state.items.filter(board => board._id !==action.payload)
            };
        case UPDATE_BOARDS:
            return{
                ...state,
                items: state.items.filter(board => board._id !==action.payload)
            };
        default:
            return state; 
    }
}