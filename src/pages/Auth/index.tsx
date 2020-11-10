// temporary
/* eslint-disable */
// @ts-nocheck

import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import { getToken } from "api";
// import Loading from 'components/Loading';

function mobileRedirect(os, code) {
    const to = `hackillinois://org.hackillinois.${os}/auth?code=${code}`;
    window.location.replace(to);
}

const Auth: React.FC = () => {
    const location: Location<unknown> = useLocation();
    const {
        code,
        isAndroid,
        isiOS,
        to,
    }: queryString.ParsedQuery<string> = queryString.parse(location.search);

    if (!code) {
        window.location.replace("/");
    }

    if (isAndroid || isiOS) {
        const os = isAndroid ? "android" : "ios";
        mobileRedirect(os, code);
    } else {
        getToken(code).then((token) => {
            sessionStorage.setItem("token", token);
            window.location.replace(to);
        });
    }

    return <div>Loading...</div>; // <Loading />;
};

export default Auth;
