import React, { Component } from 'react';
import Link from 'next/link';

class IndexPage extends Component {
  static async getInitialProps(context) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ appName: 'Our Super App' });
      }, 1000);
    });
    return promise;
  }

  render() {
    return (
      <div>
        <h1>The Main Page of {this.props.appName}</h1>
        <p>
          Go to <Link href="/auth">Auth</Link>
        </p>
      </div>
    );
  }
}

export default IndexPage;
