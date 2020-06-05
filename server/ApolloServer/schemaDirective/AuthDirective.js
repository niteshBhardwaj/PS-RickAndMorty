import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server-express';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
        let context = args[2];
        if(!context.authUserId) {
            throw new ApolloError("unauthorized", 401);
        }
        return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;