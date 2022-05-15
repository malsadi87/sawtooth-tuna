import React, {Component} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fab, faFacebook, faGoogle, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faKey, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import RequestInterceptor from "./services/core/interceptor/axiosHttpRequestInterceptor";
import ResponseInterceptor from "./services/core/interceptor/axiosHttpResponseInterceptor";

import {RouteUrl} from './constants/routeUrls';
import AuthShell from "./views/core/authShell";
import Trip from "./views/feature/trip/trip";
import NewTrip from "./views/feature/trip/newTrip/newTrip";
import Auth from "./views/feature/auth";
import Login from "./views/feature/auth/login/login";
import Signup from "./views/feature/auth/signup/signup";
import Home from "./views/feature/home/home";
import authService from "./services/core/auth/auth.service";
import {withParamsAndNavigation} from './utility/routerHelper';

// Add font-awesome icons to project library
library.add(fab, faFacebook, faTwitter, faGoogle, faLinkedin, faUser, faEnvelope, faLock, faKey);
RequestInterceptor.Intercept();
ResponseInterceptor.Intercept();

class App extends Component {
    constructor(props) {
        super(props);

        // Subscribe for login check
        authService.getAuthentication().subscribe(res => {
            // TODO:: implement any necessary things related to the application, login, Ex ...
            this.props.navigate(RouteUrl.home);
        });
    }

    render() {
        return (
            <Routes>
                <Route element={<AuthShell />}>
                    <Route exact path={RouteUrl.home} element={<Home />}>
                        <Route path={RouteUrl.trip} element={<Trip />} />
                        <Route path={RouteUrl.newTrip} element={<NewTrip />} />
                    </Route>
                </Route>
                <Route element={<Auth />}>
                    <Route path={RouteUrl.login} element={<Login />} />
                    <Route path={RouteUrl.signup} element={<Signup />} />
                </Route>
            </Routes>
        )
    }
}

export default withParamsAndNavigation(App);