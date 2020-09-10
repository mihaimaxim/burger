import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {
   state = {
      name: '',
      email: '',
      address: {
         street: '',
         postalCode: '',
      },
      loading: false,
      purchasing: false,
   };

   componentDidMount() {
      console.log(this.state);
   }

   orderHandler = (event) => {
      event.preventDefault();

      this.setState({ loading: true });

      const order = {
         type: 'double cheeseburger',
         ingredients: this.props.ingredients,
         price: this.props.price,
      };

      axios
         .post('orders.json', order)
         .then((response) => {
            this.setState({ loading: false });
            this.props.history.push('/');
         })
         .catch((error) => {
            this.setState({ loading: false });
         });

      console.log(order);
   };

   renderForm = () => {
      return (
         <form>
            <input
               className={classes.Input}
               type='text'
               name='name'
               placeholder='Your Name'
            />
            <input
               className={classes.Input}
               type='text'
               name='email'
               placeholder='Your Email'
            />
            <input
               className={classes.Input}
               type='text'
               name='address'
               placeholder='Address'
            />
            <input
               className={classes.Input}
               type='text'
               name='postalCode'
               placeholder='Postal Code'
            />
            <Button btnType='Success' clicked={this.orderHandler}>
               Order
            </Button>
         </form>
      );
   };

   render() {
      return (
         <div className={classes.ContactData}>
            <h3>Type in your credentials</h3>
            {this.state.loading ? <Spinner /> : this.renderForm()}
         </div>
      );
   }
}

export default ContactData;
