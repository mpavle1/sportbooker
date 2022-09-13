import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import General from './General';
import Profile from './Profile';
import Events from './Events';
import Tickets from './Tickets';
import Users from './Users';
import Sports from './Sports';
import Locations from './Locations';
import PrivateRoute from '../../container/PrivateRoute';

const Dashboard = () => (
    <PrivateRoute>
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" exact component={General} />
                <Route path="/dashboard/profile" exact component={Profile} />
                <Route path="/dashboard/events/:eventId?" exact component={Events} />
                <Route path="/dashboard/sports" exact component={Sports} />
                <Route path="/dashboard/locations" exact component={Locations} />
                <Route path="/dashboard/tickets/:ticketId?/(change|cancel)?" exact component={Tickets} />
                <Route path="/dashboard/users" exact component={Users} />
            </Switch>
        </BrowserRouter>
    </PrivateRoute>
);

export default Dashboard;
