import axios from "axios";
import { BASE_URL } from './CommonService'

const AUTH_REST_API_BASE_URL = BASE_URL + "api/auth";

export const registerAPICall = (registerInputs) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerInputs);

export const loginAPICall = (loginInputs) => axios.post(AUTH_REST_API_BASE_URL + '/login', loginInputs);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username);

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    if(username == null) {
        return false;
    } else {
        return true;
    }   
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}