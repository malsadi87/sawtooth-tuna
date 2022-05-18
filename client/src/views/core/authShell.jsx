import React from 'react';
import { Outlet, useLocation, Navigate } from "react-router-dom";
import storageService from '../../services/feature/auth/auth.service';
import { RouteUrl } from '../../constants/routeUrls';

export default function AuthShell() {
    const location = useLocation();

    return storageService.isTokenExpire() ?
        <Navigate to={RouteUrl.login} replace state={{ from: location }} /> :
        <Outlet />;
}

