import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Post from '../components/Post'

class PostGrid extends React.Component {
  componentWillMount() {
    if(this.props.posts.length == 0){
      console.log("componentDidMount")
      //this.props.actions.fetchPosts()
    }
  }

  render() {
    return (
      <div>
        {this.props.posts.map(function(post, index){
          return <Post key={index} post={post}/>
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
