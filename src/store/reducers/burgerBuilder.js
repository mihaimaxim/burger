import * as actionTypes from '../actions/actionsTypes'

const initialState = {
   ingredients: null,
   price: 2.5,
   error: false,
   building: false,
}

const INGREDIENT_PRICES = {
   salad: 0.5,
   meat: 2,
   bacon: 1,
   cheese: 1,
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
            },
            price: state.price + INGREDIENT_PRICES[action.ingredientName],
            building: true,
         }
      case actionTypes.REMOVE_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
            },
            price: state.price - INGREDIENT_PRICES[action.ingredientName],
            building: true,
         }
      case actionTypes.SET_INGREDIENTS:
         return {
            ...state,
            ingredients: {
               salad: action.ingredients.salad,
               bacon: action.ingredients.bacon,
               cheese: action.ingredients.cheese,
               meat: action.ingredients.meat,
            },
            price: 2.5,
            error: false,
            building: false,
         }
      case actionTypes.FETCH_INGREDIENTS_FAILED:
         return {
            ...state,
            error: true,
         }
      default:
         return state
   }
}

export default reducer
