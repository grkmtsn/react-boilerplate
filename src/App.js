import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { history, Role } from '@/helpers';
import { LoginPage, DashboardPage, SampleListPage, NotFoundPage, ForbiddenPage } from '@/pages';
import { Head, PrivateRoute } from './components/common';

const App = () => {
  return (
    <React.Fragment>
      <Head />
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" roles={[Role.Admin]} component={DashboardPage} />
          <PrivateRoute exact path="/samplelist" roles={[Role.Admin]} component={SampleListPage} />
          <PrivateRoute path="/" component={() => <Redirect to="/dashboard" />} />
          <Route path="/404" component={NotFoundPage} />
          <Route path="/403" component={ForbiddenPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
