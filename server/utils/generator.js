const keygen = require('keygen');
const otpGenerator = require('otp-generator')


const otpNo = (params) => {
  let otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false
  });
  if(String(otp).length < 6) {
    return otpNo(...params)
  }
  return otp;
}

const token = () => {
  return keygen.url(keygen.medium)
}


module.exports = { otpNo, token }
