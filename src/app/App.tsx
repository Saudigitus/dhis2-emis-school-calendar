import React from 'react'
import "./App.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/style/globalStyle.css"
import { Router } from '../components';
import { HashRouter } from 'react-router-dom';
import { AppWrapper } from 'dhis2-semis-components';
import { useConfig } from '@dhis2/app-runtime';

export default function SchoolCalendar() {
    const { baseUrl } = useConfig()

    return (
        //  <AppWrapper
        //      baseUrl={baseUrl}
        //      dataStoreKey="dataStore/semis/values"
        //  >
        //      <HashRouter>
        <Router />
        //      </HashRouter>
        //  </AppWrapper>
    )
}
