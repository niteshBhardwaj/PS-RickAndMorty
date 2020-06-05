import Auth from '../ClientServices/AuthStorage'
import { ApolloLink, Observable } from 'apollo-link';

const request = (operation, token) => {
  operation.setContext({
    headers: {
      authorization: Auth.token() || token || ""
    }
  });
};

export default (token) => new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper, token))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);