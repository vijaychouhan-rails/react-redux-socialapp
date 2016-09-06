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
          <button className='btn width-150'> 100 <span className="glyphicon glyphicon-thumbs-up"></span></button>
          <button className='btn width-150'> {this.props.post.comments.length} <span className='glyphicon glyphicon-comment'> </span></button>
        </p>
      </div>
    );
  }
}

export default Post;
