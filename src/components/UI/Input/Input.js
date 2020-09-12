import React from 'react';

import classes from './Input.module.css';

const InputComp = (props) => {
   let inputElement = null;
   let validationError = null;
   const inputClasses = [classes.InputElement];

   if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes.Invalid);
      validationError = <p>Please add a valid {props.elementType}!</p>;
   }

   switch (props.elementType) {
      case 'input':
         inputElement = (
            <input
               {...props.elementConfig}
               className={inputClasses.join(' ')}
               value={props.value}
               onChange={props.changed}
            />
         );
         break;
      case 'textarea':
         inputElement = (
            <textarea
               {...props.elementConfig}
               className={inputClasses.join(' ')}
               value={props.value}
               onChange={props.changed}
            />
         );
         break;
      case 'select':
         inputElement = (
            <select
               {...props.elementConfig}
               className={inputClasses.join(' ')}
               value={props.value}
               onChange={props.changed}
            >
               {/* <option value={props.value}>Fastest</option>
               <option value={props.value}>Cheapest</option> */}
               {props.elementConfig.options.map((option) => (
                  <option key={option.value} value={option.value}>
                     {option.displayValue}
                  </option>
               ))}
            </select>
         );
         break;
      default:
         inputElement = (
            <input
               {...props.elementConfig}
               className={inputClasses.join(' ')}
               value={props.value}
               onChange={props.changed}
            />
         );
   }
   return (
      <div className={classes.Input}>
         <label className={classes.Label}>{props.label}</label>
         {inputElement}
         {validationError}
      </div>
   );
};

export default InputComp;
