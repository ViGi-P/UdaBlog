import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-varela-round'
import App from './App'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import './App.css'

let store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}>
  <Router>
    <Route path='/' component={App}/>
  </Router>
</Provider>, document.getElementById('root'))
registerServiceWorker()
