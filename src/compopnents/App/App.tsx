import React from "react";
import { BrowserRouter } from 'react-router-dom';

import { MainProvider } from "../../stores/MainContext";
import Routes from "../Routes/Routes";

import "./App.scss";
import Header from "../Header/Header";

function App() {
    return (
        <MainProvider>
            <BrowserRouter>
                <Header />
                <Routes />
            </BrowserRouter>
        </MainProvider>
    );
}

export default App;