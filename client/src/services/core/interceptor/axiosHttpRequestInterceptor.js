import axios from 'axios';
import storageService from './../storage/storage.service';
import authService from './../auth/auth.service';
import { environment } from "../../../environments/environment";
import { APIBasePath } from '../../../constants/apiBasePaths';
import fakeAuthService from '../auth/fake-auth.service';

const anonymousUrls = [
    APIBasePath.Identity.token
];

const getFakeServiceMapping = (controllerName) => {
    switch (controllerName) {
        case APIBasePath.Identity.base:
            return fakeAuthService;
        default:
            return null;
    }
}

const RequestInterceptor = {
    Intercept: () => {
        axios.interceptors.request.use(async function (config) {
            // TODO:: Enable the spinner

            // Intercept the request
            if (!new RegExp(/\.(json|JSON)$/).test(config.url) && !environment.fakeBackEnd) {
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

            if (environment.fakeBackEnd) {
                try {
                    const urlDetails = config.url.split('/').filter(x => x != '');
                    const method = getFakeServiceMapping("/"+urlDetails[0])[urlDetails[1]];
                    var data = await method(...Object.values(config.data));
                    if (data == null)
                        return Promise.reject('Invalid Request!');
    
                    console.info('Fake service Info - ', urlDetails);
                    console.info('Data from fake service - ', data);
                    config.adapter = (config) => {
                        return new Promise((resolve, _) => {
                            const res = {
                              data: data,
                              status: 200,
                              statusText: "OK",
                              headers: { "content-type": "application/json" },
                              config,
                              request: {}
                            };
                            return resolve(res);
                        });
                    };
                } catch(e) {
                    return Promise.reject(e.message);
                }
            }

            return config;
        }, function (error) {
            console.log(error);
            // Do something with request error
            return Promise.reject(error);
        });
    }
};

export default RequestInterceptor;
