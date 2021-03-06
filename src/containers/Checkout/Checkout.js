import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
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

export default connect(mapStateToProps)(Checkout)
