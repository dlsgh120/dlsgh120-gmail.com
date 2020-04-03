import {SEARCH_BOARDS} from './types';

export const actSearchBoard = (keyword) =>{
    return {
        type:SEARCH_BOARDS,
        payload:keyword
    };
};