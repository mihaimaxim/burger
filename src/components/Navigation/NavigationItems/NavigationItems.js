import React from 'react'

import NavItem from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'

const NavigationItems = props => {
   return (
      <ul className={styles.NavigationItems}>
         <NavItem link='/' exact>
            Burger Builder
         </NavItem>
         {props.isAuthenticated ? <NavItem link='/orders'>Orders</NavItem> : null}
         {!props.isAuthenticated ? (
            <NavItem link='/auth'>Authenticate</NavItem>
         ) : (
            <NavItem link='/logout'>Logout</NavItem>
         )}
      </ul>
   )
}

export default NavigationItems
