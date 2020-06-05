import { InMemoryCache } from 'apollo-cache-inmemory';
import { window } from 'ssr-window';


export const cache = new InMemoryCache({
    //dataIdFromObject: object => object.key || null,
   // addTypename: false
})
.restore(window.__APOLLO_STATE__);