import reducer from './auth'
import * as actionTypes from '../actions/actionsTypes'

describe('auth reducer', () => {
   it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
         token: null,
         userId: null,
         error: null,
         loading: null,
         authRedirectPath: '/',
      })
   })

   it('should store a token upon login', () => {
      expect(
         reducer(
            {
               token: null,
               userId: null,
               error: null,
               loading: null,
               authRedirectPath: '/',
            },
            {
               type: actionTypes.AUTH_SUCCESS,
               idToken: 'random-token',
               userId: 'random-user-id',
               loading: false,
            }
         )
      ).toEqual({
         token: 'random-token',
         userId: 'random-user-id',
         error: null,
         loading: false,
         authRedirectPath: '/',
      })
   })
})
