import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import {USER_SETTING_QUERY} from '../../../apolloClient/query/userQuery'


export const UserSettingContext = React.createContext({});

export default function UserSettingProvider({authCheck, children}) {
    const [loadSetting, { client, data }] = useLazyQuery(USER_SETTING_QUERY, {
        fetchPolicy: 'network-only'
    });
    let [loggedIn, setLoggedIn] = React.useState(authCheck()); 
    React.useEffect(() => {
        if(authCheck()) {
            loadSetting()
        } else if(!!data) {
            console.log('reseting store')
            client.onResetStore();
        }
    }, [loggedIn])
    

    return (
        <UserSettingContext.Provider value={{
            userSetting: data?.userSetting, 
            loggedIn: loggedIn, 
            setLoggedIn
        }}> 
            {children} 
        </UserSettingContext.Provider>
    )
}

export const withUserSetting = (Comp) => (props) => {
    const data = React.useContext(UserSettingContext);
    return <Comp {...props} {...data}  />
}