import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Order from '../../components/Order/Order';
import axios from '../../axios';

class Orders extends Component {
   state = {
      orders: [],
      loading: false,
   };

   componentDidMount() {
      axios
         .get('orders.json')
         .then((response) => {
            const fetchedOrders = [];
            for (let key in response.data) {
               fetchedOrders.push({
                  ...response.data[key],
                  id: key,
               });
            }
            // console.log(fetchedOrders);
            this.setState({ loading: false, orders: fetchedOrders });
         })
         .catch((error) => {
            this.setState({ loading: false });
         });
   }

   // renderOrders = () => {
   //    for (let key in this.state.orders) {
   //       return <Order ingredients={this.state.orders[key].ingredients} />;
   //    }
   // };

   render() {
      // let orders = <Spinner />;

      // if (this.state.orders) {
      //    orders = this.renderOrders();
      // }

      return (
         <div>
            {this.state.orders.map((order) => (
               <Order
                  key={order.id}
                  ingredients={order.ingredients}
                  price={Number.parseFloat(order.price).toFixed(2)}
               />
            ))}
         </div>
      );
   }
}

export default withRouter(Orders, axios);
