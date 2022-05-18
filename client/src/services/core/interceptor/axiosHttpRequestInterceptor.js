import axios from 'axios';
import storageService from './../storage/storage.service';
import { environment } from "../../../environments/environment";
import { APIBasePath } from '../../../constants/apiBasePaths';
import fakeAuthService from '../../feature/auth/fake-auth.service';
import authService from '../../feature/auth/auth.service';

const anonymousUrls = [
    APIBasePath.Identity.token
];

const fakeBackEndUrls = [ 
    APIBasePath.Identity.base 
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
            const isFakeBacked = environment.fakeBackEnd && fakeBackEndUrls.find(x => config.url.indexOf(x) > -1);
            // TODO:: Enable the spinner

            // Intercept the request
            if (!new RegExp(/\.(json|JSON)$/).test(config.url) && !isFakeBacked) {
                config.baseURL = environment.endPointUrl;
                const accessToken = storageService.getAccessToken();
                const isAnAnonymousURL = anonymousUrls.find(x => config.url.includes(x));
                config.headers = {
                    ...config.headers,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }

                // If auth is enable and the url is not annonymous url and no accessToken then reject
                // The request
                if (environment.enableAuth && !accessToken && !isAnAnonymousURL) {
                    authService.signOutLocally();
                    // TODO:: Disable the spinner
                    return Promise.reject('Invalid Request!');
                }

                // If sawtooth url && public and private key available then Add Public and private key with request data
                // For testing only
                // In future we could use only public key
                if (config.url.indexOf(APIBasePath.Sawtooth.base) > -1 && storageService.getLoggedInUserSawtoothPublicKey()) {
                    config.data = {
                        ...config.data,
                        keyPair: storageService.getLoggedInUserSawtoothKeyPairs()
                    }
                }


                if (accessToken && !isAnAnonymousURL) {
                    const typeToken = `${storageService.getAccessTokenType()} ${accessToken}`;
                    config.headers = {
                        ...config.headers,
                        'Authorization': typeToken
                    }
                }
            }

            if (isFakeBacked) {
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
