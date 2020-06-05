import {cache} from './cacheInstance';

let defaultMsg = {
    key: 0, 
    message: "",  
    open: true, 
    variant: "success", 
    __typename: "ServerMessage"
  }

export const updateMessage = (messageObj) => {
    cache.writeData({data: {messageInfo: {...defaultMsg, ...messageObj}}})
}

export default {
    Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected }});
        }
    }
}
