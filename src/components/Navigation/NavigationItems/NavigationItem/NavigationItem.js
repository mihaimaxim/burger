import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './NavigationItem.module.css'
import classes from './NavigationItem.module.css'

const NavItem = props => {
   return (
      <li className={styles.NavItem}>
         <NavLink to={props.link} activeClassName={classes.active} exact={props.exact}>
            {props.children}
         </NavLink>
      </li>
   )
}

export default NavItem
