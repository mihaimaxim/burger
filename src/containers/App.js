import React from 'react';

import Layout from '../HOCs/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';

function App() {
   return (
      <div>
         <Layout>
            <BurgerBuilder />
         </Layout>
      </div>
   );
}

export default App;
