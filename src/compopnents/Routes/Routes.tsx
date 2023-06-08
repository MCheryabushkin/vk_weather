
import React from 'react';
import { Route, Routes as Router } from 'react-router-dom';

import Layout from '../Layout/Layout';

function Routes() {
    return (
        <Router>
            <Route path='/' element={<Layout />} />
        </Router>
    )
}

export default Routes;