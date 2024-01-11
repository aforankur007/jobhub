/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  DEVICE_SECRET:'myjwtdevicesecret',
  ADMIN_SECRET:'myjwtadminsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  Manager:1,
  Driver:2,
  User:3,
  Admin:4,
  Dataman:5,
};

const PLATFORM = {
  DEVICE:1,
  ADMIN:2,
};

let LOGIN_ACCESS = {
  [USER_TYPES.User]:[PLATFORM.DEVICE,PLATFORM.ADMIN],        
  [USER_TYPES.Admin]:[PLATFORM.ADMIN,PLATFORM.DEVICE],        
  [USER_TYPES.Driver]:[PLATFORM.DEVICE,PLATFORM.ADMIN],        
  [USER_TYPES.Manager]:[PLATFORM.ADMIN,PLATFORM.DEVICE],        
  [USER_TYPES.Dataman]:[PLATFORM.ADMIN,PLATFORM.DEVICE],        
};

const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 3600;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRE_TIME: 20
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
};