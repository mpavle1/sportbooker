import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import General from './General';
import Profile from './Profile';
import Events from './Events';
import PrivateRoute from '../../container/PrivateRoute';


const Dashboard = () => (
    <PrivateRoute>
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" exact component={General} />
                <Route path="/dashboard/profile" exact component={Profile} />
                <Route path="/dashboard/events" exact component={Events} />
            </Switch>
        </BrowserRouter>
    </PrivateRoute>
);

export default Dashboard;
