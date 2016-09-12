import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Post from '../components/Post'
import { Link } from 'react-router';
import { push } from 'react-router-redux'

class PostGrid extends React.Component {
  componentWillMount() {
      console.log("componentDidMount")
//      this.props.actions.fetchPosts()
  }

  commentClick(post_id){
    this.props.dispatch(push('/posts/'+post_id))
  }

  likeUnlikePost(post_id){
    this.props.actions.likeUnlikePost(post_id)
  }

  render() {
    return (
      <div>
        <div><Link className="nav-link btn btn-primary" to="/posts/new">New Post</Link></div>
        {this.props.posts.map(function(post, index){
          return <Post key={index} post={post} onCommentClick={(post_id) => this.commentClick(post_id)} likeUnlikePost={(post_id) => this.likeUnlikePost(post_id) }/>
        }, this)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGrid);
