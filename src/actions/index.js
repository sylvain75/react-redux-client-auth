import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(res => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', res.data.token)
      browserHistory.push('/feature');
    })
    .catch(error => {
      dispatch(authError('Bad Login'))
    });
  }
}
export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(res => {
      localStorage.setItem('token', res.data.token)
      browserHistory.push('/feature');
      dispatch({ type: AUTH_USER });
    })
    .catch(error => {
      dispatch(authError(error.response.data.error))
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(res => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: res.data.message
      })
    })
  }
}
