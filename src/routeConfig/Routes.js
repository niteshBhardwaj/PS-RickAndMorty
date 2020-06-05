import React from 'react';
import {Route, Redirect, useLocation} from 'react-router-dom'
import { UserSettingContext } from '../components/common/UserSettingProvider';

export const AuthRoute = (props) => {
  let {component, ...others} = props;
  let location = useLocation();
  let {loggedIn} = React.useContext(UserSettingContext)
  let Comp = component;
  return (<Route {...others} render={() => {

    if(!loggedIn) {
      return (<Redirect to={{pathname:"/login", search: `?back=${location.pathname}` }} />);
    }
    return (<Route {...others} component={(props) => <Comp {...props} />} />)
  }
  } />)
}

export const GuestRoute = (props) => {
  let {component, ...others} = props;
  let Comp = component;
  let {loggedIn} = React.useContext(UserSettingContext)
  return (<Route {...others} render={() => (
    loggedIn ? (
      <Redirect to="/"/>
    ) : (
      <Route {...others} component={props => <Comp {...props} />} />
    )
  )}/>)
}

export const PublicRoute = (props) => {
  let {component, ...others} = props;
  let Comp = component;
  return  <Route {...others} component={(props) => <Comp {...props} />} />
}

