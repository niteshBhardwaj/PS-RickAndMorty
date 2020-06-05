import Auth from '../ClientServices/AuthStorage'
import {updateMessage} from './cacheResolvers';

export default ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      let error = graphQLErrors[0];
      if(error.extensions.code === 401) {
        Auth.logout();
      }
      //console.log(cache);
      updateMessage({message: error.message})
    } else if(networkError) {
      //logoutUser();
    }
}