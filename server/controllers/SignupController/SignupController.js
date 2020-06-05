import { UserInputError } from 'apollo-server';
import UserModel from '../../models/UserModel';



/* create temp user */
export default class SignUpCtrl {

  static async createUser(_, args) {
    let {name, email, password} = args;

    let user = new UserModel({
      name,
      password,
      email,
    });

    await checkEmailExist(email);
    await user.save();
    return;
  }

}

//check email exist!
const checkEmailExist = async (email) => {
  let data = await UserModel.findOne({email}, {_id:1});  
  if(data) {
    throw new UserInputError(`User already registered with ${email}`);
  }
}