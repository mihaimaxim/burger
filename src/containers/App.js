import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from '../HOCs/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Checkout from './Checkout/Checkout'
import Orders from './Orders/Orders'
import Auth from './Auth/Auth'

class App extends Component {
   // state = {
   //    show: false,
   // };

   // componentDidMount() {
   //    setTimeout(() => {
   //       this.setState({ show: true });
   //    }, 9000);
   // }

   render() {
      return (
         <div>
            <Layout>
               {/* {!this.state.show ? <BurgerBuilder /> : null} */}
               <Switch>
                  {' '}
                  {/*Swtich is not needed if exact prop is used, still it's been added for reference */}
                  <Route path='/checkout' component={Checkout} />
                  <Route path='/orders' component={Orders} />
                  <Route path='/auth' component={Auth} />
                  <Route path='/' exact component={BurgerBuilder} />
               </Switch>
            </Layout>
         </div>
      )
   }
}

export default App
