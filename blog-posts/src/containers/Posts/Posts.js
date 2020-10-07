import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post';
import './Posts.css';

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
  };

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Link key={post.id} to={'/' + post.id}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        </Link>
      );
    });
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;