import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import SchoolCalendarHomePage from '../../pages/home/Home';
import MainPage from '../../pages/main/MainPage';
import { D2I18n } from 'dhis2-semis-types';

export default function Router({ i18n }: { i18n: D2I18n }) {
    return (
        <Routes>
            <Route path='/' element={<Outlet />} >
                <Route key={'school-calendar'} path={'/'} element={<SchoolCalendarHomePage i18next={i18n} />} />
                <Route key={'school-calendar-main'} path={'main/:id'} element={<MainPage i18next={i18n} />} />
            </Route>
        </Routes>
    )
}
