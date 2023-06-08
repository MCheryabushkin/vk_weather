
import React from 'react';
import { Route, Routes as Router } from 'react-router-dom';

import Layout from '../Layout/Layout';
import Search from '../Search/Search';

function Routes() {
    return (
        <Router>
            <Route path='/' element={<Layout />} />
            <Route path='/:location' element={<Layout />} />
            <Route path='/search' element={<Search />} />
        </Router>
    )
}

export default Routes;