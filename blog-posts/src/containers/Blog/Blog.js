import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';

import Posts from '../Posts/Posts';

import NewPost from '../NewPost/NewPost';

class Blog extends Component {
  state = {
    auth: false
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}
          <Route path="/" exact component={Posts} />
          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
