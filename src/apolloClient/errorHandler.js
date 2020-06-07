import Auth from '../ClientServices/AuthStorage'
import {updateMessage} from './cacheResolvers';
import {cache} from './cacheInstance';

export default ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      let error = graphQLErrors[0];
      if(error.extensions.code === 401) {
        Auth.logout();
      }
      updateMessage(cache, {message: error.message})
    }
}