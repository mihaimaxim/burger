import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';

class ContactData extends Component {
   state = {
      name: '',
      email: '',
      address: {
         street: '',
         postalCode: '',
      },
   };

   render() {
      return (
         <div className={classes.ContactData}>
            <h3>Type in your credentials</h3>
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
            </form>
            <Button btnType='Success'>Order</Button>
         </div>
      );
   }
}

export default ContactData;