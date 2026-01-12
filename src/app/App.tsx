import React from 'react'
import "./App.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/style/globalStyle.css"
import { Router } from '../components';
// import { HashRouter } from 'react-router-dom';
// import { AppWrapper } from 'dhis2-semis-components';
// import { useConfig } from '@dhis2/app-runtime';
import { D2I18n } from 'dhis2-semis-types';

export default function SchoolCalendar({ i18n }: { i18n: D2I18n }) {
    // const { baseUrl } = useConfig()

    return (
        // <AppWrapper
        //     schoolCalendarKey='dataStore/semis/schoolCalendar'
        //     baseUrl={baseUrl}
        //     dataStoreKey="dataStore/semis/values"
        // >
        //     <HashRouter>
                <Router i18n={i18n} />
        //     </HashRouter>
        // </AppWrapper>
    )
}
