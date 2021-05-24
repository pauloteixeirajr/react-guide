import React from 'react';
import Router from 'next/router';

import User from '../../components/User';

const authIndexPage = (props) => (
  <div>
    <h1>The Auth Index Page - {props.appName}</h1>
    <User name="Paulo" age={31} />
    <button onClick={() => Router.push('/')}>Go back to Home</button>
  </div>
);

authIndexPage.getInitialProps = async (context) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: 'Our Super App (Auth)' });
    }, 1000);
  });
  return promise;
};

export default authIndexPage;
