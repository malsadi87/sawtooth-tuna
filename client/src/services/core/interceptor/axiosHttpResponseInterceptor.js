import axios from "axios";

const ResponseInterceptor = {
    Intercept: () => {
        axios.interceptors.response.use(function (response) {
            // TODO:: Disable the spinner

            // TODO:: If response 401 the signOut Locally, Redirect to login page
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }
}

export default ResponseInterceptor;
