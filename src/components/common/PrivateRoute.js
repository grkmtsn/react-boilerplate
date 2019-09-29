import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { PageLayoutWithRouter } from '@/components/layout';
import { authenticationService } from '@/services';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }
      if (roles && roles.indexOf(currentUser.role) === -1) {
        return <Redirect to={{ pathname: '/403' }} />;
      }
      return (
        <PageLayoutWithRouter>
          <Component {...props} />
        </PageLayoutWithRouter>
      );
    }}
  />
);

export { PrivateRoute };
