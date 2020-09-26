import React, { Component } from 'react'
// import axios from 'axios';
import axios from '../../axios'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../HOCs/withErrorHandler/whitErrorHandler'

class BurgerBuilder extends Component {
   // constructor(props) {
   //    super(props);        // old school instancing
   //    this.state = {...}
   // }

   state = {
      purchasing: false,
   }

   componentDidMount() {
      this.props.onInitIngredients()
      console.log(this.props)
   }

   componentWillUnmount() {
      console.log(this.props)
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

   updatePurchaseState = ingredients => {
      const sum = Object.keys(ingredients)
         .map(ingredientKey => {
            return ingredients[ingredientKey]
         })
         .reduce((sum, element) => {
            return sum + element
         }, 0)
      return sum > 0
   }

   togglePurchasing = () => {
      if (this.props.isAuthenticated) {
         this.setState({ purchasing: true })
      } else {
         this.props.onSetAuthRedirectPath('/checkout')
         this.props.history.push('/auth')
      }
   }

   cancelPurchasingHandler = () => {
      this.setState({ purchasing: false })
   }

   confirmationPurchasingHandler = () => {
      // const queryParams = [];
      // for (let i in this.props.localIngredients) {
      //    queryParams.push(
      //       encodeURIComponent(i) +
      //          '=' +
      //          encodeURIComponent(this.props.localIngredients[i])
      //    );                                                          // query params no longer needed thanks to redux
      // }
      // queryParams.push('price=' + this.props.localPrice);
      // console.log(queryParams);
      // const queryString = queryParams.join('&');
      this.props.onInitPurchase()
      this.props.history.push('/checkout')
   }

   // addIngredientHandler is now onIngredientAdded in mapDispatchToProps

   // addIngredientHandler = (type) => {
   //    const oldCount = this.state.ingredients[type];
   //    const updatedCount = oldCount + 1;
   //    const updatedIngredients = {
   //       ...this.state.ingredients,
   //    };
   //    updatedIngredients[type] = updatedCount;
   //    const priceAddition = INGREDIENT_PRICES[type];
   //    const oldPrice = this.state.totalPrice;
   //    const newPrice = oldPrice + priceAddition;
   //    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
   //    this.updatePurchaseState(updatedIngredients);
   // };

   // removeIngredientHandler is now onIngredientRemoved in mapDispatchToProps

   // removeIngredientHandler = (type) => {
   //    const prevCount = this.state.ingredients[type];
   //    if (prevCount <= 0) {
   //       return;
   //    }
   //    const nextCount = prevCount - 1;
   //    let nextIngredients = {
   //       ...this.state.ingredients,
   //    };
   //    nextIngredients[type] = nextCount;
   //    const priceSubtraction = INGREDIENT_PRICES[type];
   //    const prevPrice = this.state.totalPrice;
   //    const nextPrice = prevPrice - priceSubtraction;
   //    this.setState({ totalPrice: nextPrice, ingredients: nextIngredients });
   //    this.updatePurchaseState(nextIngredients);
   // };

   componentDidUpdate() {
      console.log(this.props.localIngredients)
   }

   render() {
      const disabledInfo = {
         ...this.props.localIngredients,
      }

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0
      }

      let orderSummary = null

      let burger = this.props.localError ? (
         <p style={{ textAlign: 'center', margin: '15px', padding: '15px' }}>
            Ingredients can't be loaded!
         </p>
      ) : (
         <Spinner />
      )

      if (this.props.localIngredients) {
         burger = (
            <div>
               <Burger ingredients={this.props.localIngredients} />
               <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientSub={this.props.onIngredientRemoved}
                  disabled={disabledInfo}
                  price={this.props.localPrice}
                  purchasable={this.updatePurchaseState(this.props.localIngredients)}
                  purchasing={this.togglePurchasing}
                  isAuthenticated={this.props.isAuthenticated}
               />
            </div>
         )

         orderSummary = (
            <OrderSummary
               ingredients={this.props.localIngredients}
               price={this.props.localPrice}
               confirmation={this.confirmationPurchasingHandler}
               cancellation={this.cancelPurchasingHandler}
            />
         )
      }

      if (this.props.localError) {
         orderSummary = <Spinner />
      }

      return (
         <div>
            <Modal show={this.state.purchasing} clicked={this.cancelPurchasingHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      localIngredients: state.burger.ingredients,
      localPrice: state.burger.price,
      localError: state.burger.error,
      isAuthenticated: state.auth.token != null,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: ingredientName =>
         dispatch(actions.addIngredient(ingredientName)),
      onIngredientRemoved: ingredientName => {
         dispatch(actions.removeIngredient(ingredientName))
      },
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
