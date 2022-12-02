import jwt_decode from "jwt-decode";
import storageService from "../../core/storage/storage.service";
import axios from 'axios';
import { APIBasePath } from '../../../constants/apiBasePaths';
import { BehaviorSubject } from 'rxjs';

const isAuthenticate = new BehaviorSubject(false);
const parseJWT = (token) => {
    return {
        access_token: token,
        ...jwt_decode(token)
    }
}

const setAuthentication = (isAuth) => {
    isAuthenticate.next(isAuth);
}

const isTokenExpire = () => {
    let accessToken = storageService.getAccessToken();
    if (!accessToken) return true;

    let parsedToken = parseJWT(accessToken);
    return parsedToken.exp * 1000 < new Date().getTime();
}

const signIn = async (email, password) => {
    const { token } = await axios.post(APIBasePath.Identity.token, { email, password });
    Object.entries(parseJWT(token)).map(([key, value]) => ({key, value})).forEach(x => {
        storageService.setItem(x.key, x.value);
    });
    setAuthentication(true);
}

const signUp = async (fullName, email, password) => {
    console.log("SIGNUP", fullName, email, password)
    return await axios.post(APIBasePath.Identity.signUp, { fullName, email, password });
}

const resetPassword = async (email) => {
    return await axios.post(APIBasePath.Identity.resetPassword, { email });
}

const resetPasswordConfirmation = async (token, newPassword) => {
    return await axios.post(APIBasePath.Identity.resetPasswordConfirmation, { token, newPassword });
}

const signOut = async () => {
    await axios.get(APIBasePath.Identity.signOut);
    signOutLocally();
}

const signOutLocally = () => {
    storageService.reset();
    setAuthentication(false);
}

const getAuthentication = () => {
    setAuthentication(!isTokenExpire());
    return isAuthenticate;
}

const authService = {
    isTokenExpire,
    signIn,
    signUp,
    resetPassword,
    resetPasswordConfirmation,
    signOut,
    signOutLocally,
    getAuthentication
}

export default authService;
