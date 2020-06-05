import UserModel from '../../models/UserModel';
const { AuthenticationError } = require('apollo-server-express');

class LoginController {

  static async login (_, args) {
    var {email, password} = args;
    try {
      return await UserModel.authenticate({email, password});
    } catch(err) {
      throw new AuthenticationError(err);
    } 
  }
  
}

export default LoginController;
