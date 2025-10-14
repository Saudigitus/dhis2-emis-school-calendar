import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import SchoolCalendarHomePage from '../../pages/home/Home';
import MainPage from '../../pages/main/MainPage';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Outlet />} >
                <Route key={'school-calendar'} path={'/'} element={<SchoolCalendarHomePage />} />
                <Route key={'school-calendar-main'} path={'main/:id'} element={<MainPage />} />
            </Route>
        </Routes>
    )
}
