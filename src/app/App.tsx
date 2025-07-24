import React from 'react'
import "./App.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/style/globalStyle.css"
import { Router } from '../components';
import { RecoilRoot } from 'recoil';
import AppWrapper from './AppWrapper';

export default function App() {
    return (
        <RecoilRoot>
            <AppWrapper>
                <Router />
            </AppWrapper>
        </RecoilRoot>
    )
}
