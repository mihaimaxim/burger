import React from 'react';

import NavItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const NavigationItems = (props) => {
   return (
      <ul className={styles.NavigationItems}>
         <NavItem link='/' exact>
            Burger Builder
         </NavItem>
         <NavItem link='/orders'>Orders</NavItem>
         <NavItem link='/auth'>Authenticate</NavItem>
      </ul>
   );
};

export default NavigationItems;
