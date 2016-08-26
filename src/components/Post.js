import React from 'react';
import { Link } from 'react-router';

class Post extends React.Component {
  render() {
    return (
      <div className='col-md-4 post-block'>
        <Link className="nav-link" to={`/posts/${this.props.post.id}`}>
          <img src={`${API_URL}${this.props.post.avatar_url}`} height='300' width='300' />
        </Link>
        <p>
          <span> 1 Likes </span> 
          <span> 10 Comments </span>
        </p>
      </div>
    );
  }
}

export default Post;
