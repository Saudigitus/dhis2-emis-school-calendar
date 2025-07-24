import { Navigate } from "react-router-dom";
import React from "react";
import { SimpleLayout } from "../../layout";
import { GeneralDetails, NonSchoolDays, Terms } from "../../pages";
import HomePage from "../../pages/home/Home";
import MainPage from "../../pages/main/MainPage";

export default function RouteList() {
    return [
        {
            path: "/",
            layout: SimpleLayout,
            component: () => <Navigate to="/home" replace />
        },
        {
            path: "/generalDetails",
            layout: SimpleLayout,
            component: GeneralDetails
        },
        {
            path: "/home",
            layout: SimpleLayout,
            component: HomePage
        },
        {
            path: "/main/:id",
            layout: SimpleLayout,
            component: MainPage
        },
        {
            path: "/non-school-days",
            layout: SimpleLayout,
            component: NonSchoolDays
        },
        {
            path: "/term1",
            layout: SimpleLayout,
            component: Terms
        },
        {
            path: "/term2",
            layout: SimpleLayout,
            component: Terms
        },
        {
            path: "/term3",
            layout: SimpleLayout,
            component: Terms
        }
    ]
}
