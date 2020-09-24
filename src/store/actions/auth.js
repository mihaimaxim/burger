import axios from 'axios'
import key from '../../keys.js'

import * as actionTypes from './actionsTypes'

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START,
   }
}

export const authSuccess = authData => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData,
   }
}

export const authFail = error => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error,
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
<<<<<<< HEAD

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
=======
      let url =
         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' +
         'key=AIzaSyAKeGX0NAhdZJTE2u_PPuNZROMD7WNFQeA'
>>>>>>> parent of 0f9c870... auth implementation
      if (signInMode) {
         url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
      }
      axios
         .post(url, authData)
         .then(resp => {
            console.log(resp)
            dispatch(authSuccess(resp.data))
         })
         .catch(err => {
            console.log(err)
            dispatch(authFail(err))
         })
   }
}
