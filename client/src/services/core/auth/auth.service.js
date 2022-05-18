import jwt_decode from "jwt-decode";
import storage from '../storage/storage.service';
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
    let accessToken = storage.getAccessToken();
    if (!accessToken) return true;

    let parsedToken = parseJWT(accessToken);
    return parsedToken.exp * 1000 < new Date().getTime();
}

const signIn = async (email, password) => {
    try {
        const { data: { token } } = await axios.post(APIBasePath.Identity.token, { email, password });
        Object.entries(parseJWT(token)).map(([key, value]) => ({key, value})).forEach(x => {
            storage.setItem(x.key, x.value);
        });
        setAuthentication(true);
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const signUp = async (fullName, email, password) => {
    try {
        const response = await axios.post(APIBasePath.Identity.signUp, { fullName, email, password });
        if (!response) return Promise.reject("Invalid form data!");
        return response;
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

const signOut = async () => {
    await axios.get(APIBasePath.Identity.signOut);
    signOutLocally();
}

const signOutLocally = () => {
    storage.reset();
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
    signOut,
    signOutLocally,
    getAuthentication
}

export default authService;
