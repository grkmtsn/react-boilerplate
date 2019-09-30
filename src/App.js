import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Role } from '@/helpers';
import { LoginPage, DashboardPage, DemoListPage, NotFoundPage, ForbiddenPage } from '@/pages';
import { Head, PrivateRoute } from './components/common';

const App = () => {
  return (
    <React.Fragment>
      <Head />
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={() => <Redirect to="/dashboard" />} />
          <PrivateRoute exact path="/dashboard" roles={[Role.Admin]} component={DashboardPage} />
          <PrivateRoute exact path="/demolist" roles={[Role.Admin]} component={DemoListPage} />
          <Route path="/404" component={NotFoundPage} />
          <Route path="/403" component={ForbiddenPage} />
          <Route component={() => <Redirect to="/404" />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
