import React from "react";
import { BrowserRouter } from 'react-router-dom';

import { MainProvider } from "../../stores/MainContext";
import Routes from "../Routes/Routes";

import * as S from "./App.scss";
import Header from "../Header/Header";

function App() {
    return (
        <MainProvider>
            <BrowserRouter>
                <div className={S.root}>
                    <Header />
                    <Routes />
                </div>
            </BrowserRouter>
        </MainProvider>
    );
}

export default App;