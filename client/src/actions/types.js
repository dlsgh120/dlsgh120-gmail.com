export const FETCH_TODOS = 'FETCH_TODOS';
export const NEW_TODO = 'NEW_TODO';
export const DELETE_TODO = 'DELETE_TODO';
//////////////////////////////////
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const USER_PROFILE_UPDATE ='USER_PROFILE_UPDATE';
///////////////////////////////////////////

export const FETCH_BOARDS ='FETCH_BOARDS';
export const READ_BOARDS = 'READ_BOARDS';
export const NEW_BOARDS = 'NEW_BOARDS';
export const DELETE_BOARDS ='DELETE_BOARDS';
export const UPDATE_BOARDS = 'UPDATE_BOARDS';
export const RELOAD_PROFILE = 'RELOAD_PROFILE';

///////////////////////////////////////////

export const SEARCH_BOARDS = 'SEARCH_BOARDS';

/////////////////////////////////////////////

export const NEW_REVIEW = 'NEW_REIVEW';
export const FETCH_REVIEW = 'FETCH_REVIEW';
export const REVIEW_INIT ='REVIEW_INIT'; // 리뷰가 FETCH 되지 않은 장소에서는 리뷰를 초기화 시키는 작업 // 초기화를 시키지 않는다면 state에 전의 리뷰 정보가 들어가 있어서 다른 리뷰를 출력시킬때 지저분함
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const ALL_DELETE_REVIEWS = 'ALL_DELETE_REVIEWS'; // board를 삭제할때 boardId에 대한 모든 review를 삭제하는 작업

