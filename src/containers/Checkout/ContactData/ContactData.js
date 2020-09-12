import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import InputComp from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

class ContactData extends Component {
   state = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your name',
            },
            value: '',
            validation: {
               required: true,
               minimumLength: 6,
               maximumLength: 9,
            },
            valid: false,
            touched: false,
         },
         address: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your address',
            },
            value: '',
            validation: {
               required: true,
               minimumLength: 6,
               maximumLength: 9,
            },
            valid: false,
            touched: false,
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your e-mail',
            },
            value: '',
            validation: {
               required: true,
            },
            valid: false,
            touched: false,
         },
         comments: {
            elementType: 'textarea',
            elementConfig: {
               type: 'text',
               placeholder: 'Your mentions (not mandatory)',
            },
            value: '',
            validation: {},
            valid: true,
            touched: false,
         },
         delivery: {
            elementType: 'select',
            elementConfig: {
               options: [
                  { value: 'fastest', displayValue: 'Fastest' },
                  { value: 'cheapest', displayValue: 'Cheapest' },
               ],
            },
            value: 'fastest',
            // validation: {},   this being commented out, another check should be added in the checkValidity method
            valid: false,
         },
      },
      formIsValid: false,
      loading: false,
   };

   // componentDidMount() {
   //    console.log(this.state);
   // }

   componentDidUpdate() {
      console.log(this.state);
   }

   orderHandler = (event) => {
      event.preventDefault();

      this.setState({ loading: true });

      const formData = {};

      for (let formElementIdentifier in this.state.orderForm) {
         formData[formElementIdentifier] = this.state.orderForm[
            formElementIdentifier
         ].value;
      }

      const order = {
         ingredients: this.props.ingredients,
         price: this.props.price,
         orderData: formData,
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

   checkValidity = (value, rules) => {
      let isValid = true;

      if (!rules) {
         return true;
      }

      if (rules.required) {
         isValid = value.trim() !== '' && isValid;
      }

      if (rules.minimumLength) {
         isValid = value.length >= rules.minimumLength && isValid; // for this each orderFrom validation property should have
      } // a minimumLength property with the desired value

      if (rules.maximumLength) {
         isValid = value.length <= rules.maximumLength && isValid; // && isValid added so that all checks work togheter
      }

      return isValid;
   };

   inputChangedHandler = (event, inputIdentifier) => {
      // console.log(event.target.value);
      const updatedOrderForm = {
         ...this.state.orderForm,
      };

      const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(
         updatedFormElement.value,
         updatedFormElement.validation
      );
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      console.log(updatedFormElement);
      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
   };

   renderForm = () => {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
         formElementsArray.push({
            id: key,
            config: this.state.orderForm[key],
         });
      }
      return (
         <form onSubmit={this.orderHandler}>
            {formElementsArray.map((formElement) => (
               <InputComp
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  key={formElement.id}
                  changed={(event) =>
                     this.inputChangedHandler(event, formElement.id)
                  }
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
               />
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid}>
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
