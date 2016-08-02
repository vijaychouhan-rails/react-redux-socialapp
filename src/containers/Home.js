import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class Home extends React.Component {
  render() {
    return (
      <div>
        Post elements count:: {this.props.posts.length} <br/>
        <span onClick = {() => this.props.actions.fetchPosts()}>Click here to Load Posts </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
