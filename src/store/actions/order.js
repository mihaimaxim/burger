import * as actionTypes from '../actions/actionsTypes'
import axios from '../../axios'

export const purchaseBurgerSucces = (id, orderData) => {
   return {
      type: actionTypes.PURCHASE_BURGER_SUCCES,
      orderId: id,
      orderData: orderData,
   }
}

export const purchaseBurgerFail = error => {
   return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error,
   }
}

export const purchaseBurgerStart = () => {
   return {
      type: actionTypes.PURCHASE_BURGER_START,
   }
}

export const purchaseBurger = orderData => {
   return dispatch => {
      dispatch(purchaseBurgerStart())
      axios
         .post('orders.json', orderData)
         .then(response => {
            console.log(response.data)
            dispatch(purchaseBurgerSucces(response.data.name, orderData))
         })
         .catch(error => {
            dispatch(purchaseBurgerFail(error))
         })
   }
}

export const purchaseInit = () => {
   return {
      type: actionTypes.PURCHASE_INIT,
   }
}

export const fetchOrdersStart = () => {
   return {
      type: actionTypes.FETCH_ORDERS_START,
   }
}

export const fetchOrders = orders => {
   return {
      type: actionTypes.FETCH_ORDERS,
      orders: orders,
   }
}

export const fetchOrdersFail = error => {
   return {
      type: actionTypes.FETCH_ORDERS_FAIL,
      error: error,
   }
}

export const setOrders = () => {
   return dispatch => {
      dispatch(fetchOrdersStart())
      axios
         .get('orders.json')
         .then(response => {
            const fetchedOrders = []
            for (let key in response.data) {
               fetchedOrders.push({
                  ...response.data[key],
                  id: key,
               })
            }
            dispatch(fetchOrders(fetchedOrders))
         })
         .catch(error => {
            dispatch(fetchOrdersFail(error))
         })
   }
}
