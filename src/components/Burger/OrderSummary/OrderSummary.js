import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
   // This could also be a functional component, being wrapped by the Modal class
   componentDidUpdate() {
      console.log('[OrderSummary] didUpdate');
   }

   // renderIngredientSummary = () => {
   //    Object.keys(this.props.ingredients).map((ingKey) => {
   //       return (
   //          <li key={ingKey}>
   //             <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '} // passing JSX like this does not work
   //             {this.props.ingredients[ingKey]}
   //          </li>
   //       );
   //    });
   // };

   render() {
      const ingredientSummary = Object.keys(this.props.ingredients).map(
         (igKey) => {
            return (
               <li key={igKey}>
                  <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
                  {this.props.ingredients[igKey]}
               </li>
            );
         }
      );
      return (
         <div>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>
               <strong>Current price: {this.props.price.toFixed(2)}</strong>
            </p>
            <p>Contiune to checkout?</p>
            <Button btnType='Danger' clicked={this.props.cancellation}>
               CANCEL
            </Button>
            <Button btnType='Success' clicked={this.props.confirmation}>
               CONTINUE
            </Button>
         </div>
      );
   }
}

export default OrderSummary;
