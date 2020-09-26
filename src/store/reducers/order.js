import * as actionTypes from '../actions/actionsTypes'

const initialState = {
   orders: [],
   loading: false,
   purchased: false,
   error: false,
}

const purchaseInit = (state, action) => {
   return {
      ...state,
      purchased: false,
   }
}

const purchaseBurgerStart = (state, action) => {
   return {
      ...state,
      loading: true,
   }
}

const purchaseBurgerSuccess = (state, action) => {
   const newOrder = {
      ...action.orderData,
      id: action.orderId,
   }
   return {
      ...state,
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder),
   }
}

const purchaseBurgerFail = (state, action) => {
   return {
      ...state,
      loading: false,
   }
}

const fetchOrdersStart = (state, action) => {
   return {
      ...state,
      loading: true,
   }
}

const fetchOrders = (state, action) => {
   return {
      ...state,
      orders: action.orders,
      loading: false,
      error: null,
   }
}

const fetchOrdersFail = (state, action) => {
   return {
      ...state,
      loading: false,
      error: true,
   }
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.PURCHASE_INIT:
         return purchaseInit(state, action)

      case actionTypes.PURCHASE_BURGER_START:
         return purchaseBurgerStart(state, action)

      case actionTypes.PURCHASE_BURGER_SUCCES:
         return purchaseBurgerSuccess(state, action)

      case actionTypes.PURCHASE_BURGER_FAIL:
         return purchaseBurgerFail(state, action)

      case actionTypes.FETCH_ORDERS_START:
         return fetchOrdersStart(state, action)

      case actionTypes.FETCH_ORDERS:
         return fetchOrders(state, action)

      case actionTypes.FETCH_ORDERS_FAIL:
         return fetchOrdersFail(state, action)

      default:
         return state
   }
}

export default reducer
