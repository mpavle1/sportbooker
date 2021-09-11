import React, { Fragment } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import DashboardContainer from './container/DashbordContainer';
import routes from './routes';
import Header from './components/Header';

const App = () => (
    <Fragment>
        <Router>
            <Header />
            <DashboardContainer>
                <Switch>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
                    ))}
                </Switch>
            </DashboardContainer>
        </Router>
    </Fragment>
);

export default App;
