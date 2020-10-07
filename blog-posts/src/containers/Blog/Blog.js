import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './Blog.css';

import Posts from '../Posts/Posts';
import Post from '../../components/Post/Post';
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
        <Route path="/new-post" component={NewPost} />
        <Route path="/:id" component={Post} exact />
      </div>
    );
  }
}

export default Blog;
