import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="wrapper">
    <div className="notfound">
      <div className="bg bg-404"></div>
      <h1>404</h1>
      <h2>Oops! Page Not Be Found</h2>
      <p>
        Sorry but the page you are looking for does not exist, have been removed. name changed or is
        temporarily unavailable
      </p>
      <Link to="/dashboard">
        <span className="btn-back">Go To Dashboard</span>
      </Link>
    </div>
  </div>
);

export { NotFoundPage };
