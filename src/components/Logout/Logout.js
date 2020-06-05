import React from 'react'
import Auth from '../../ClientServices/AuthStorage'
import {UserSettingContext} from '../common/UserSettingProvider' 
import {Redirect} from 'react-router-dom'


export default () => {
    let {setLoggedIn} = React.useContext(UserSettingContext)
    let [redirect, handleRedirect] = React.useState(false);

    React.useEffect(() => {
        Auth.logout();
        setLoggedIn(false);
        setTimeout(() => {
            handleRedirect(true);
        }, 500)
    }, [])
    
    if(!redirect) return <div> Logging out...</div>;
    return (<>
        <Redirect to="/" />
    </>
    )
}
  