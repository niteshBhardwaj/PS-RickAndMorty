import mongoose, {Schema} from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';

let userSchema = new Schema({
    name: {
      type: String,
      required: [true, 'name field is required'],
      minlength: 2,
      maxlength: 30,
      trim: true,
      text: true
    },
    photo: {
      type: String,
      validate: {
      validator: (v) => {
        if(!v) return true;
        return validator.isURL(v);
      },
       message: '{VALUE} is not a valid url!'
      }
    },
    email: {
      type: String,
      validate: {
        validator: (v) => {
          return validator.isEmail(v);
        },
        message: '{Value} is not a valid email!'
      }
    },
    password: {
      type: String,
      required: [true, 'Password required!'],
      minlength: 6,
      maxlength: 12,
      trim: true
    },
    activated: {
      type: Boolean,
      default: false
    },
    preference: {
      sort: {
        type: Number,
        enum: [0, 1, -1],
        default: 0
      }
    }
})


userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password') && user.password.length <= 12) {
       user.password = passwordHash.generate(user.password);
       next();
    } else {
      next();
    }
})


userSchema.statics.authenticate = async function({email, password}, cb) {
    let user = this;
    let userData = await user.findOne({email});
 
    if(!userData) {
      return Promise.reject(`No user registerd with ${email}`);
    }
    let verify = await passwordHash.verify(password, userData.password);
    if(!verify) {
      return Promise.reject(`Invalid user password`);
    }
    return user.getAuthToken(userData);
}

userSchema.statics.getAuthToken = async function({_id}) {
  let user = this;
  let token = jwt.sign({ _id }, process.env.JWT_SECRET);
  return {token}
}

userSchema.statics.tokenVerify = async function(token) {
  let user = this;
  if(!token || token === 'null') return null;
  let decoded = await jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return Promise.reject('Invalid token');
  try {
    let userData = await user.findOne({
      '_id': decoded._id,
    }, {_id:1});
    return Promise.resolve({_id: userData._id})
  } catch(e) {
    Promise.reject('Invalid token');
  }
}



export default mongoose.model('users', userSchema);


