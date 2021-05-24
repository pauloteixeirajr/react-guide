import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom';

class Posts extends Component {
  state = {
    posts: [],
    selectedPost: null,
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: 'Paulo',
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(console.log);
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPost: id });
    this.props.history.push({ pathname: '/' + id });
  };

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path="/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
