import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios'

class Orders extends Component {
   componentDidMount() {
      this.props.onSetOrders(this.props.localToken, this.props.localUserId)
      console.log(this.props.localOrders)
   }

   componentDidUpdate() {
      console.log(this.props.localOrders)
   }

   render() {
      // let orders = this.props.localError ? (
      //    <div style={{ textAlign: 'center', margin: '15px', padding: '15px' }}>
      //       <p>Orders can't be loaded!</p>
      //       <p>You should authenticate!</p>
      //    </div>
      // ) : (
      //    <Spinner />
      // )

      let orders = null

      if (this.props.localLoading) {
         orders = <Spinner />
      }

      if (this.props.localError) {
         orders = (
            <p style={{ textAlign: 'center', margin: '15px', padding: '15px' }}>
               Authenticate!
            </p>
         )
      }

      if (this.props.localToken) {
         orders = this.props.localOrders.map(order => (
            <Order
               key={order.id}
               ingredients={order.ingredients}
               customer={order.orderData.name}
               price={Number.parseFloat(order.price).toFixed(2)}
            />
         ))
      }
      return orders
   }
}

const mapStateToProps = state => {
   return {
      localOrders: state.orders.orders,
      localLoading: state.orders.loading,
      localError: state.orders.error,
      localToken: state.auth.token,
      localUserId: state.auth.userId,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSetOrders: (token, userId) => dispatch(actions.setOrders(token, userId)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios)
