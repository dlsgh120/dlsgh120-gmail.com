import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_PROFILE_UPDATE,
    RELOAD_PROFILE
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    registerCheck:false,
    loginCheck:false,
    update_profile:false,
    user: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
          registerCheck:false,
          loginCheck:false,
          update_profile:false
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          loginCheck:true,
          update_profile:false
        };

      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          registerCheck:true,
          update_profile:false
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          registerCheck:false,
          loginCheck:false,
          update_profile:false
        };
      case USER_PROFILE_UPDATE:
        return{
          ...state,
          user:action.payload.user,
          isAuthenticated: true,
          isLoading: false,
          loginCheck:true,
          update_profile:true
        };
        case RELOAD_PROFILE:
        return{
          ...state,
          user:action.payload.user,
          isAuthenticated: true,
          isLoading: false,
          loginCheck:true,
          update_profile:false

        }
      default:
        return state;
    }
  }