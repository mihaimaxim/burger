import axios from 'axios'
import key from '../../keys.js'

import * as actionTypes from './actionsTypes'

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START,
   }
}

export const authSuccess = (idToken, userId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: idToken,
      userId: userId,
   }
}

export const authFail = error => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error,
   }
}

export const logout = () => {
   return {
      type: actionTypes.LOGOUT,
   }
}

export const checkAuthTimeout = expirationTime => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout())
      }, expirationTime * 1000)
   }
}

export const auth = (email, password, signInMode) => {
   return dispatch => {
      dispatch(authStart())
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true,
      }

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
      if (signInMode) {
         url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
      }
      axios
         .post(url, authData)
         .then(resp => {
            console.log(resp.data.idToken, resp.data.localId)
            dispatch(authSuccess(resp.data.idToken, resp.data.localId))
            dispatch(checkAuthTimeout(resp.data.expiresIn))
         })
         .catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error))
         })
   }
}
