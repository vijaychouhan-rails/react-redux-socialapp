import React from 'react';
import { connect } from 'react-redux';
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'

export default class PostDetails extends React.Component {
  render() {
    const {id} = this.props.params;
    const post = (this.props.posts.filter((post) => (post.id.toString() === id)))[0]

    console.log("post data load")
    console.log(post)
    console.log("End post data load")
    return (
      <div className='col-md-12'>
        <div className='col-md-8 post-show-container'>
          <div className='col-md-12'>
            <div className='col-md-12'>
              <h2>{post.title}</h2>
            </div>

            <div className='col-md-12'>
              <div className='col-md-6'>
                <img src={post.display_src} height='300' width='300' />
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


function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(PostDetails);
