import React from 'react';
import { connect } from 'react-redux';
import PostDetailPartial from '../components/PostDetailPartial'
import * as Actions from '../actions/feeds';
import { bindActionCreators } from 'redux';

export class FeedDetails extends React.Component {

  componentWillMount() {
    if(this.props.feeds.length==0){
      this.props.feedActions.fetchFeeds()
    }
  }

  render() {
    const {id} = this.props.params;
    const feed = (this.props.feeds.filter((feed) => (feed.id.toString() === id)))[0]
    console.log("=============Feed is", feed)
    return (
      <PostDetailPartial data={feed} />
    );
  }
}


function mapStateToProps(state) {
  return {
    feeds: state.feeds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(Actions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedDetails);
