import * as actionTypes from './actions';

const initialState = {
   ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
   },
   price: 2.5,
};

const INGREDIENT_PRICES = {
   salad: 0.5,
   meat: 2,
   bacon: 1,
   cheese: 1,
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]:
                  state.ingredients[action.ingredientName] + 1,
            },
            price: state.price + INGREDIENT_PRICES[action.ingredientName],
         };
      case actionTypes.REMOVE_INGREDIENT:
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]:
                  state.ingredients[action.ingredientName] - 1,
            },
            price: state.price - INGREDIENT_PRICES[action.ingredientName],
         };
      default:
         return state;
   }
};

export default reducer;
