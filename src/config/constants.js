import { window } from 'ssr-window';

let mobileCheck = function() {
    if(typeof window.__MOBILE_DETECT__ === "boolean") {
        console.log('window.__MOBILE_DETECT__');
        return !window.__MOBILE_DETECT__;
    }
    return /Mobi/i.test(window.navigator.userAgent)
};

export default {
    FB_ID: '209011783661109',
    GOOGLE_ID: '829899521426-btha0obul3dc92jnc7rp8ksclb5vc0fn.apps.googleusercontent.com',
}

export const IS_DESKTOP = !mobileCheck(); //process.env.REACT_APP_IS_DESKTOP
export const VIEWS = {
    SIGNUP: "SIGNUP",
    LOGIN: "LOGIN",
    OTP: "OTP",
    FORGOT: "FORGOT",
    PHONE_VERIFY: "PHONE_VERIFY"
}