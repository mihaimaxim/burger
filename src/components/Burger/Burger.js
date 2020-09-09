import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
   // console.log(props);

   let transformedIngredients = Object.keys(props.ingredients)
      .map((ingredientKey) => {
         return [...Array(props.ingredients[ingredientKey])].map(
            (undefinedValue, i) => {
               return (
                  <BurgerIngredient
                     key={ingredientKey + i}
                     type={ingredientKey}
                  />
               );
            }
         );
      })
      .reduce((arr, el) => {
         return arr.concat(el);
      }, []);

   if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>;
   }

   // console.log(transformedIngredients);

   return (
      <div className={styles.Burger}>
         <BurgerIngredient type='bread-top' />
         {transformedIngredients}
         <BurgerIngredient type='bread-bottom' />
      </div>
   );
};

export default withRouter(Burger);
