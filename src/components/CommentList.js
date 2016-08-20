import React from 'react';

class CommentList extends React.Component {
  render() {
    return (
      <div className='col-md-12 comment-show'>
        {this.props.comment.comment}
      </div>
    );
  }
}

export default CommentList;
