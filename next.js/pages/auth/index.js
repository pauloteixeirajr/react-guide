import React from 'react';
import Router from 'next/router';

const authIndexPage = () => (
  <div>
    <h1>The Auth Index Page</h1>
    <button onClick={() => Router.push('/')}>Go back to Home</button>
  </div>
);

export default authIndexPage;
