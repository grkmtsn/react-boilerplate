import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const ForbiddenPage = () => (
  <div className="wrapper">
    <div className="notfound">
      <div className="bg bg-403"></div>
      <h1>403</h1>
      <h2>Oops! Access Forbidden</h2>
      <p>Sorry you dont have permission to access this area</p>
      <Link to="/dashboard">
        <span className="btn-back">Go To Dashboard</span>
      </Link>
    </div>
  </div>
);

export { ForbiddenPage };
