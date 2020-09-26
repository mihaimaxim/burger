import React, { Component } from 'react'

import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {
   state = {
      sideDrawerIsVisible: false,
   }

   toggleSideDrawer = () => {
      this.setState({ sideDrawerIsVisible: false })
   }

   // openSideDrawer = () => {
   //    this.setState({ sideDrawerIsVisible: !this.state.sideDrawerIsVisible }); // due to its async behaviour
   // };                                                                             this method may cause issues

   openSideDrawer = () => {
      this.setState(prevStave => {
         return { sideDrawerIsVisible: !prevStave.sideDrawerIsVisible }
      })
   }

   render() {
      return (
         <div>
            <Toolbar
               isAuthenticated={this.props.isAuthenticated}
               clicked={this.openSideDrawer}
            />
            <SideDrawer
               isAuthenticated={this.props.isAuthenticated}
               open={this.state.sideDrawerIsVisible}
               closed={this.toggleSideDrawer}
            />
            <main className={styles.Content}>{this.props.children}</main>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.auth.token !== null,
   }
}

export default connect(mapStateToProps)(Layout)
