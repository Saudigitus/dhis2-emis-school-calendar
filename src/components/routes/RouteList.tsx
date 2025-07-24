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
            component: () => <Navigate to="/semis/callendars" replace />
        },
        {
            path: "/semis/generalDetails",
            layout: SimpleLayout,
            component: GeneralDetails
        },
        {
            path: "/semis/callendars",
            layout: SimpleLayout,
            component: HomePage
        },
        {
            path: "/semis/main/:id",
            layout: SimpleLayout,
            component: MainPage
        },
        {
            path: "/semis/non-school-days",
            layout: SimpleLayout,
            component: NonSchoolDays
        },
        {
            path: "/semis/term1",
            layout: SimpleLayout,
            component: Terms
        },
        {
            path: "/semis/term2",
            layout: SimpleLayout,
            component: Terms
        },
        {
            path: "/semis/term3",
            layout: SimpleLayout,
            component: Terms
        }
    ]
}
