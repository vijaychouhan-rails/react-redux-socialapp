import React from 'react';
import { connect } from 'react-redux';
import PostDetailPartial from '../components/PostDetailPartial'
import * as Actions from '../actions/index';
import { bindActionCreators } from 'redux';

export class PostDetails extends React.Component {

  componentWillMount() {
    if(this.props.posts.length==0){
      this.props.Actions.fetchFeeds()
    }
  }

  render() {
    const {id} = this.props.params;
    const post = (this.props.posts.filter((post) => (post.id.toString() === id)))[0]

    return (
       <PostDetailPartial data={post} />
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
    Actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
