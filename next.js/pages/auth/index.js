import React from 'react';
import Router from 'next/router';

import User from '../../components/User';

const authIndexPage = () => (
  <div>
    <h1>The Auth Index Page</h1>
    <User name="Paulo" age={31} />
    <button onClick={() => Router.push('/')}>Go back to Home</button>
  </div>
);

export default authIndexPage;
