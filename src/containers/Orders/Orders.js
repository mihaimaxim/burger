import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as burgerBuilderActions from '../../store/actions/index'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios'

class Orders extends Component {
   componentDidMount() {
      this.props.onSetOrders()
      console.log(this.props.localOrders)
   }

   componentDidUpdate() {
      console.log(this.props.localOrders)
   }

   render() {
      return (
         <div>
            {this.props.localLoading ? <Spinner /> : null}
            {this.props.localOrders.map(order => (
               <Order
                  key={order.id}
                  ingredients={order.ingredients}
                  price={Number.parseFloat(order.price).toFixed(2)}
               />
            ))}
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      localOrders: state.orders.orders,
      localLoading: state.orders.loading,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSetOrders: () => dispatch(burgerBuilderActions.setOrders()),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders, axios))
