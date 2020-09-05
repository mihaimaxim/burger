import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOCs/withErrorHandler/whitErrorHandler';

const INGREDIENT_PRICES = {
   salad: 0.5,
   meat: 2,
   bacon: 1,
   cheese: 1,
};

class BurgerBuilder extends Component {
   // constructor(props) {
   //    super(props);        // old school instancing
   //    this.state = {...}
   // }

   state = {
      // ingredients: {
      //    salad: 0,
      //    bacon: 0,
      //    cheese: 0,
      //    meat: 0,
      // },
      ingredients: null,
      totalPrice: 2.5,
      purchasable: false,
      purchasing: false,
      loading: false,
   };

   componentDidMount() {
      axios.get('ingredients.json').then((response) => {
         this.setState({ ingredients: response.data });
      });
   }

   // updatePurchaseState = () => {
   //    const ingredients = {
   //       ...this.state.ingredients,
   //    };

   //    const sum = Object.keys(ingredients)
   //       .map((ingredientKey) => {
   //          return ingredients[ingredientKey];  // given this.state's async behaviour, it's best to use
   //       })                                     // to use the second method
   //       .reduce((sum, element) => {
   //          return sum + element;
   //       }, 0);

   //    this.setState({ purchasable: sum > 0 });

   //    console.log(this.state.purchasable);
   // };

   updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
         .map((ingredientKey) => {
            return ingredients[ingredientKey];
         })
         .reduce((sum, element) => {
            return sum + element;
         }, 0);
      this.setState({ purchasable: sum > 0 });
   };

   togglePurchasing = () => {
      this.setState({ purchasing: true });
   };

   cancelPurchasingHandler = () => {
      this.setState({ purchasing: false });
   };

   confirmationPurchasingHandler = () => {
      this.setState({ loading: true });

      const order = {
         type: 'double cheeseburger',
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
      };

      axios
         .post('orders.json', order)
         .then((response) => {
            this.setState({ loading: false, purchasing: false });
         })
         .catch((error) => {
            this.setState({ loading: false, purchasing: false });
         });

      this.setState({ purchasing: false });
   };

   addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
   };

   removeIngredientHandler = (type) => {
      const prevCount = this.state.ingredients[type];
      if (prevCount <= 0) {
         return;
      }
      const nextCount = prevCount - 1;
      let nextIngredients = {
         ...this.state.ingredients,
      };
      nextIngredients[type] = nextCount;
      const priceSubtraction = INGREDIENT_PRICES[type];
      const prevPrice = this.state.totalPrice;
      const nextPrice = prevPrice - priceSubtraction;
      this.setState({ totalPrice: nextPrice, ingredients: nextIngredients });
      this.updatePurchaseState(nextIngredients);
   };

   componentDidUpdate() {
      console.log(
         '[BurgerBuilder.js] Purchasable is ' + this.state.purchasable
      );
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients,
      };

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      let orderSummary = null;

      let burger = <Spinner />;

      if (this.state.ingredients) {
         burger = (
            <div>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientSub={this.removeIngredientHandler}
                  disabled={disabledInfo}
                  price={this.state.totalPrice}
                  purchasable={this.state.purchasable}
                  purchasing={this.togglePurchasing}
               />
            </div>
         );

         orderSummary = (
            <OrderSummary
               ingredients={this.state.ingredients}
               price={this.state.totalPrice}
               confirmation={this.confirmationPurchasingHandler}
               cancellation={this.cancelPurchasingHandler}
            />
         );
      }

      if (this.state.loading) {
         orderSummary = <Spinner />;
      }

      return (
         <div>
            <Modal
               show={this.state.purchasing}
               clicked={this.cancelPurchasingHandler}
            >
               {orderSummary}
            </Modal>
            {burger}
         </div>
      );
   }
}

export default withErrorHandler(BurgerBuilder, axios);
