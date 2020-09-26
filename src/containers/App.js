import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from '../HOCs/asyncComponent/asyncComponent'

import Layout from '../HOCs/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Logout from './Auth/Logout/Logout'

import * as actions from '../store/actions/index'

const asyncCheckout = asyncComponent(() => {
   return import('../containers/Checkout/Checkout')
})

const asyncAuth = asyncComponent(() => {
   return import('../containers/Auth/Auth')
})

const asyncOrders = asyncComponent(() => {
   return import('../containers/Orders/Orders')
})

class App extends Component {
   // state = {
   //    show: false,
   // };

   componentDidMount() {
      this.props.onTryAutoSignUp()
   }

   render() {
      let routes = (
         <Switch>
            <Route path='/auth' component={asyncAuth} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
         </Switch>
      )

      if (this.props.isAuthenticated) {
         routes = (
            <Switch>
               <Route path='/checkout' component={asyncCheckout} />
               <Route path='/auth' component={asyncAuth} />
               <Route path='/orders' component={asyncOrders} />
               <Route path='/logout' component={Logout} />
               <Route path='/' exact component={BurgerBuilder} />
               <Redirect to='/' />
            </Switch>
         )
      }

      return (
         <div>
            <Layout>{routes}</Layout>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onTryAutoSignUp: () => dispatch(actions.authCheckState()),
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
