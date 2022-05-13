import axios from 'axios';
import storageService from './../storage/storage.service';
import authService from './../auth/auth.service';
import { environment } from "../../../environments/environment";
import { APIBasePath } from '../../../constants/apiBasePaths';

const anonymousUrls = [
    APIBasePath.Identity.token
];

const RequestInterceptor = {
    Intercept: () => {
        axios.interceptors.request.use(function (config) {
            // TODO:: Enable the spinner

            // Intercept the request
            if (!new RegExp(/\.(json|JSON)$/).test(config.url)) {
                config.baseURL = environment.endPointUrl;
                const accessToken = storageService.getAccessToken();
                const isAnAnonymousURL = anonymousUrls.find(x => config.url.includes(x));
                config.headers = {
                    ...config.headers,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }

                if (!accessToken && !isAnAnonymousURL) {
                    authService.signOutLocally();
                    // TODO:: Disable the spinner
                    return Promise.reject('Invalid Request!');
                }

                if (accessToken && !isAnAnonymousURL) {
                    const typeToken = `${storageService.getAccessTokenType()} ${accessToken}`;
                    config.headers = {
                        ...config.headers,
                        'Authorization': typeToken
                    }
                }
            }
            console.log(config.headers);
            return config;
        }, function (error) {
            console.log(error);
            // Do something with request error
            return Promise.reject(error);
        });
    }
};

export default RequestInterceptor;
