import React from 'react';
import { connect } from 'react-redux';

class PageLoader extends React.Component {

  loader() {
    if (this.props.pageLoader.isFetching) {
      return(
        <div className='loading'></div>
      )
    } else {
      return (null)
    }
  }

  render() {
    return (
      this.loader()
    );
  }
}

function mapStateToProps(state) {
  return {
    pageLoader: state.pageLoader
  }
}

export default connect(mapStateToProps)(PageLoader);