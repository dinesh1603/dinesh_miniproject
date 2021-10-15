import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantItemDetails from './components/RestaurantItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import PaymentSuccessfull from './components/PaymentSuccessfull'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={RestaurantItemDetails}
        />

        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute
          exact
          path="/payment-successfull"
          component={PaymentSuccessfull}
        />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App

/*
<ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />

          <ProtectedRoute
            exact
            path="/payment-successfull"
            component={PaymentSuccessfull}
          />

          */
