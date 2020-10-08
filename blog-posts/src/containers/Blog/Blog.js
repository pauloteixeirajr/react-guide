import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';

import Posts from '../Posts/Posts';
import FullPost from '../FullPost/FullPost';
import NewPost from '../NewPost/NewPost';

class Blog extends Component {
  state = {
    posts: [],
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Route path="/" component={Posts} exact />
        <Switch>
          <Route path="/new-post" component={NewPost} />
          {
            // :id should be last (order is important)
          }
          <Route path="/:id" component={FullPost} exact />
        </Switch>
      </div>
    );
  }
}

export default Blog;
