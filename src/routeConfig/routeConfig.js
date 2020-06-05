import React from 'react'
import {Switch} from 'react-router-dom'
import { PublicRoute, GuestRoute, AuthRoute } from './Routes'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Logout from '../components/Logout/Logout'

// import NotFound from '../pages/404'

export default function RouteList() {
  return (<div style={{padding: 16}}>
    <Switch>
      <AuthRoute exact path="/" component={Home}/>  
      <GuestRoute exact path="/login" component={Login}/>
      <GuestRoute exact path="/signup" component={Signup}/>  
      <PublicRoute exact path="/logout" component={Logout}/>  
      <PublicRoute component={() => <div> Page not found. </div>}/>
    </Switch>
    </div>);
}

