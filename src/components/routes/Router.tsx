import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RouteList from './RouteList';

export default function Router() {
    return (
        <Routes>
            {
                RouteList().map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.layout>
                                <route.component />
                            </route.layout>
                        }
                    />
                ))
            }
        </Routes>
    )
}
