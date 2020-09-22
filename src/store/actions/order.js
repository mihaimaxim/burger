import * as actionTypes from '../actions/actionsTypes'
import axios from '../../axios'

export const fetchOrders = orders => {
   return {
      type: actionTypes.FETCH_ORDERS,
      orders: orders,
   }
}

export const fetchOrdersFail = () => {
   return {
      type: actionTypes.FETCH_ORDERS_FAIL,
   }
}

export const setOrders = () => {
   return dispatch => {
      axios
         .get('orders.json')
         .then(response => {
            const fetchedOrders = []
            for (let key in response.data) {
               fetchedOrders.push({
                  ...response.data[key],
                  id: key
               })
            }
            dispatch(fetchOrders(fetchedOrders))
         })
         .catch(error => {
            dispatch(fetchOrdersFail())
         })
   }
}
