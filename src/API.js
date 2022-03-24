export const BASE_URL = 'https://super-auto-cash-mobile-api.herokuapp.com';

export const endpoint = {
    userLogin: `${BASE_URL}/user/login`,
    userRegister: `${BASE_URL}/user/register`,
    merchantLogin: `${BASE_URL}/merchant/login`,
    menuCreate: `${BASE_URL}/menu/create`,
    menuAll: `${BASE_URL}/menu/`
}

export const md5 = require('md5');

export const ERROR_CODE = {
    1001: "Server error",
    2001: "Username or Password can't be blank",
    2002: "Unauthorized",
    2003: "Not allowed to access this feature",
    3002: "User Not Found",
    3003: "Password invalid",
    3004: "Username or Email already exists",
    4002: "Menu not found" 
};


