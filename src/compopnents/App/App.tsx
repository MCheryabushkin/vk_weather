import React from "react";
import { BrowserRouter } from 'react-router-dom';

import { MainProvider } from "../../stores/MainContext";
import Routes from "../Routes/Routes";

import "./App.scss";

function App() {
    return (
        <MainProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </MainProvider>
    );
}

export default App;