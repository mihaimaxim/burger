import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../HOCs/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';

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
                  <Route path='/' exact component={BurgerBuilder} />
               </Switch>
            </Layout>
         </div>
      );
   }
}

export default App;