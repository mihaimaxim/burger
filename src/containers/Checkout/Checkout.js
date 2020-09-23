import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions/index'

class Checkout extends Component {
   // state = {
   //    ingredients: null,
   //    totalPrice: 0,
   // };

   // componentWillMount() {
   //    // console.log(this.props);
   //    const query = new URLSearchParams(this.props.location.search);
   //    const ingredients = {};
   //    let price = 0;
   //    for (let param of query.entries()) {
   //       // ['salad', '1']
   //       if (param[0] === 'price') {                                    componentWillMount no longer needed thanks
   //          price = param[1];                                           to Redux
   //       } else {
   //          ingredients[param[0]] = +param[1];
   //       }
   //    }
   //    this.setState({ ingredients: ingredients, totalPrice: price });
   // }

   componentWillMount() {
      console.log(this.props.localIngredients)
      this.props.onInitPurchase()
   }

   componentDidUpdate() {
      console.log(this.props.localIngredients)
   }

   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data')
   }

   render() {
      let summary = <Redirect to='/' />
      if (this.props.localIngredients) {
         const purchasedRedirect = this.props.localPurchased ? <Redirect to='/' /> : null
         summary = (
            <div>
               {purchasedRedirect}
               <CheckoutSummary
                  ingredients={this.props.localIngredients}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
               />
               {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
               <Route
                  path={this.props.match.path + '/contact-data'}
                  component={ContactData}
               />
            </div>
         )
      }
      return summary
   }
}

const mapStateToProps = state => {
   return {
      localIngredients: state.burger.ingredients,
      localPurchased: state.orders.purchased,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onInitPurchase: () => dispatch(actions.purchaseInit()),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
