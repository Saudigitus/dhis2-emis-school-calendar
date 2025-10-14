import { Navigate } from "react-router-dom";
import React from "react";
import { SimpleLayout } from "../../layout";
import HomePage from "../../pages/home/Home";
import MainPage from "../../pages/main/MainPage";

export default function RouteList() {
    return [
        {
            path: "/",
            layout: SimpleLayout,
            component: () => <Navigate to="/semis/school-calendar" replace />
        },
        {
            path: "/semis/school-calendar",
            layout: SimpleLayout,
            component: HomePage
        },
        {
            path: "/semis/main/:id",
            layout: SimpleLayout,
            component: MainPage
        }
    ]
}
