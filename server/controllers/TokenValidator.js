import UserModel from '../models/UserModel';
import { ApolloError } from 'apollo-server';

const tokenValidator = async ({req}) => {   
   let token = req.headers.authorization;  
   let response = { authToken: token,  userId: null };
   if(!!token) {
    try {
      let user = await UserModel.tokenVerify(token);     
      response.authUserId = user._id;
      response.loginType = user.loginType;
      // console.log(user);
    } catch (err) {
      throw new ApolloError("Invalid token", 401);
    }
   }
   return response;
}

export default tokenValidator;
