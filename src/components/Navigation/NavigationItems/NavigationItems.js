import React from 'react';

import NavItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const NavigationItems = (props) => {
   return (
      <ul className={styles.NavigationItems}>
         <NavItem link='/' active>
            Burger Builder
         </NavItem>
         <NavItem link='/'>Checkout</NavItem>
      </ul>
   );
};

export default NavigationItems;
