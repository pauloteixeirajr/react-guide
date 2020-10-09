import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidMount() {
    this.loadData();
  }
  
  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const postId = +this.props.match.params.id;
    if (postId) {
      if (this.state.loadedPost && this.state.loadedPost.id === postId) {
        return;
      }
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
          this.setState({ loadedPost: response.data });
        })
        .catch(console.log);
    }
  }

  deletePostHandler = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response);
      })
      .catch(console.log);
  };

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: 'center' }}>Loading</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
