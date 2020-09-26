import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import burgerBuilderReducer from './store/reducers/burgerBuilder'
import ordersReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

import './index.css'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'

const rootReducer = combineReducers({
   burger: burgerBuilderReducer,
   orders: ordersReducer,
   auth: authReducer,
})
const composeEnhancers = process.env.NODE_ENV
   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
   : null || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
   <Provider store={store}>
      <BrowserRouter>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </BrowserRouter>
   </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
