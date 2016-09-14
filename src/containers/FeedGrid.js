import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FeedActions from '../actions/feeds';
import * as IndexActions from '../actions/index';
import Post from '../components/Post'
import { push } from 'react-router-redux'

class FeedGrid extends React.Component {

  componentWillMount() {
    if(this.props.feeds.length==0){
      this.props.feedActions.fetchFeeds()
    }
  }

  commentClick(feed_id){
    this.props.history.push('/feeds/'+feed_id)
  }

  likeUnlikeFeed(feed_id){
    this.props.feedActions.likeUnlikeFeed(feed_id)
  }

  render() {
    return (
      <div>
        {this.props.feeds.map(function(feed, index){
          return <Post key={index} post={feed} onCommentClick={(feed_id) => this.commentClick(feed_id)} likeUnlikePost={(feed_id) => this.likeUnlikeFeed(feed_id) } isFeed={true}/>
        }, this)}
      </div>
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
    feedActions: bindActionCreators(FeedActions, dispatch),
    indexActions: bindActionCreators(IndexActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedGrid);
