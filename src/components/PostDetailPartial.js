import React from 'react';
import CommentList from './CommentList'
import CommentForm from '../containers/CommentForm'

class PostDetailPartial extends React.Component {
  render() {
    const post = this.props.data
    return (
      <div className='col-md-12'>
        <div className='col-md-8 post-show-container'>
          <div className='col-md-12'>
            <div className='col-md-12'>
              <h2>{post.title}</h2>
            </div>

            <div className='col-md-12'>
              <div className='col-md-6'>
                <img src={`${API_URL}${post.avatar_url}`} height='300' width='300' />
              </div>
              <div className='col-md-6'>
                <span>{post.description}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <h4>Comments</h4>
          {post.comments.map(function(comment, index){
            return <CommentList key={index} comment={comment}/>
          }, this)}
         {/* initialValues for redux-form */}
          <CommentForm initialValues={{'post_id': post.id}} />
        </div>
      </div>
    );
  }
}

export default PostDetailPartial;
