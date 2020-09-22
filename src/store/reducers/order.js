import * as actionTypes from '../actions/actionsTypes'

const initialState = {
   orders: [],
   loading: true,
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.FETCH_ORDERS:
         return {
            ...state,
            orders: action.orders,
            loading: false,
         }
      case actionTypes.FETCH_ORDERS_FAIL:
         return {
            ...state,
            loading: false,
         }
      default:
         return state
   }
}

export default reducer
