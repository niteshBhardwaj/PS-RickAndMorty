import UserModel from '../../models/UserModel';

class UserController {

 
  static async userSettingAndInfo(_, args, context) {
    let {authUserId, loginType} = context;
    let userSetting = await UserModel
          .aggregate()
          .match({_id: authUserId})
          .project({
            _id: 0,
            user: {
              name: "$name",
              photo: "$photo",
              email: "email"
            },
            preference: 1
          })
      return {...userSetting[0]};
  }

  static async savePreference(_, args, context) {
    let {sort} = args;
    let {authUserId} = context;
    try {
      await UserModel.findOneAndUpdate({_id: authUserId}, {
        $set: {"preference.sort": sort}
      }, {_id: 0})
      return;
    } catch(e) {
      console.log(e);
    }
    return;
  }
}
  

export default UserController;
