import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import PostPartial from '../components/_Post'

class Posts extends React.Component {
  componentWillMount() {
    if(this.props.posts.length == 0){
      console.log("componentDidMount")
      this.props.actions.fetchPosts()
    }
  }

  render() {
    return (
      <div>
        {this.props.posts.map(function(post, index){
          return <PostPartial key={index} post={post}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
