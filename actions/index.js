import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER,
    UNAUTH_USER, 
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';




export function signinUser({ email, password }) {
    // direct access to dispatch method
    return function(dispatch) {
    // submit email/password to the server(API)
    axios.post(`${ROOT_URL}/signin`, { email, password })

        .then(response => {
        // if request is good update state to indicate user is autheticated
        dispatch({ type: AUTH_USER });
        // save JWT token
        localStorage.setItem('token', response.data.token);
        // redirect to route '/feature'
        browserHistory.push('/feature');
        })

        // if request is bad show error to user
        .catch(() => { 
            dispatch(authError('Bad Login Info'));
        });
    }
}




export function signupUser({ email, password }) {
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signup`, { email, password })

        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
        })

        .catch(response => dispatch(authError(response.data.error)));

    }
}



export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}



export function signoutuser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER };
}




export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    }
}