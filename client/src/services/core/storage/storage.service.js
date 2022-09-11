const ROOT_KEY = 'NTNUPAASAQUACULTURE';
const ACCESS_TOKEN_KEY = 'access_token';
const ACCESS_TOKEN_TYPE = 'token_type';
const LOGGED_IN_USER_FULL_NAME_KEY = 'fullName';
const LOGGED_IN_USER_EMAIL = 'email';

const getByRoot = () =>  {
    const data = localStorage.getItem(ROOT_KEY);
    return data ? JSON.parse(data) : {};
}

const setItem = (key, value) => {
    const data = getByRoot();
    data[key] = value;
    localStorage.setItem(ROOT_KEY, JSON.stringify(data));
}

const getAccessTokenType = () => {
    return getItem(ACCESS_TOKEN_TYPE);
}

const getLoggedInUserFullName = () => {
    return getItem(LOGGED_IN_USER_FULL_NAME_KEY);
}

const getLoggedInUserEmail = () => {
    return getItem(LOGGED_IN_USER_EMAIL);
}

const getItem =  (key) => {
    const data = getByRoot();
    return data[key];
}

const isKeyAvailable = (key) => {
    const data = getByRoot();
    return data.hasOwnProperty(key);
}

const removeItem = (key) => {
    const data = getByRoot();
    if (data.hasOwnProperty(key)) {
        delete data[key];
        localStorage.setItem(ROOT_KEY, JSON.stringify(data));
    }
}

const reset = () => {
    localStorage.removeItem(ROOT_KEY);
}

const getAccessToken = () => {
    return getItem(ACCESS_TOKEN_KEY);
}

const storageService = {
    getByRoot,
    setItem,
    getAccessTokenType,
    getLoggedInUserFullName,
    getLoggedInUserEmail,
    isKeyAvailable,
    removeItem,
    reset,
    getAccessToken
}

export default storageService;
