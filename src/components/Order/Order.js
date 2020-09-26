import React from 'react'

import classes from './Order.module.css'

const Order = props => {
   const tranformedIngredients = []
   for (let ingredientName in props.ingredients) {
      tranformedIngredients.push({
         name: ingredientName,
         amount: props.ingredients[ingredientName],
      })
   }

   // console.log(tranformedIngredients);

   const ingredientOutput = tranformedIngredients.map(ing => {
      return (
         <span key={ing.name}>
            {ing.name} ({ing.amount})
         </span>
      )
   })

   return (
      <div className={classes.Order}>
         <p>
            Customer: <strong>{props.customer}</strong>
         </p>
         <p>Ingredients: {ingredientOutput}</p>
         <p>
            Price: <strong>USD {props.price}</strong>
         </p>
      </div>
   )
}

export default Order
