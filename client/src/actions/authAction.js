import axios from 'axios';
import {returnErrors} from './errorAction';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    USER_PROFILE_UPDATE,
    RELOAD_PROFILE
    } from '../actions/types';

// CEHCK token & load user

export const loadUser = () => (dispatch, getState) =>{
    //User loading
    dispatch({type:USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:AUTH_ERROR
            });
        });
};

//Register User
export const register = (formdata) => dispatch =>{

    //Request body
    // const body = JSON.stringify({userName, userEmail, userPassword, file, fileName});
   
    axios.post('/api/users', formdata,{
        headers:{'content-type':'multipart/form-data'}
    })
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data 
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type:REGISTER_FAIL
            })
        });
}
// user profile update
export const profileUpdate = (id,formdata) => dispatch =>{
    axios.post('api/users/profile/'+id, formdata,{
        headers:{'content-type':'multipart/form-data'}
    })
         .then(res=>dispatch({
            type:USER_PROFILE_UPDATE,
            payload: res.data
        }));
}

//user reload
export const reloadProfile = (id) => dispatch =>{
    axios.get('/api/users/reload/'+id)
        .then(res=>dispatch({
            type: RELOAD_PROFILE,
            payload: res.data
        }))
}

// Login User
export const login = ({userEmail, userPassword}) => dispatch =>{

    //Request body
    const body = JSON.stringify({userEmail, userPassword});

    axios.post('/api/auth', body,{headers:{'content-type':'application/json'}})
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type:LOGIN_FAIL
            })
        });
}


// Logout User
export const logout = () =>{
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/header and token
export const tokenConfig = getState =>{
    //Get token from localstoage
    const token = getState().auth.token;

    //Headers
    const config = {
        Headers:{
            "Content-type": "application/json"
        }
    }
    // if token, add to header
    if(token){
        config.Headers['x-auth-token'] = token;
    }

    return config;
}