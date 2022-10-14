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
import Haul from "./views/feature/haul/haul";
import Pallet from "./views/feature/pallet/pallet";
import Product from "./views/feature/product/product";
import PalletEvent from "./views/feature/palletEvent/palletEvent";
import Auth from "./views/feature/auth";
import Login from "./views/feature/auth/login/login";
import Signup from "./views/feature/auth/signup/signup";
import Home from "./views/feature/home/home";
import CatchPackage from "./views/feature/catchPackage/catchPackage";
import Species from "./views/feature/species/species";
import Company from "./views/feature/company/company";
import CustomPackage from "./views/feature/customPackage/customPackage";
import ViewCustomPackage from "./views/feature/viewCustomPackage/viewCustomPackage";

import authService from "./services/feature/auth/auth.service";
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
                        <Route path={RouteUrl.product} element={<Product />} />
                        <Route path={RouteUrl.trip} element={<Trip />} />
                        <Route path={RouteUrl.haul} element={<Haul />} />
                        <Route path={RouteUrl.pallet} element={<Pallet />} />
                        <Route path={RouteUrl.palletEvent} element={<PalletEvent />} />
                        <Route path={RouteUrl.catchPackage} element={<CatchPackage />} />
                        <Route path={RouteUrl.species} element={<Species />} />
                        <Route path={RouteUrl.company} element={<Company />} />
                        <Route path={RouteUrl.customPackage} element={<CustomPackage />} />
                        <Route path={RouteUrl.viewCustomPackage} element={<ViewCustomPackage />} />
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
