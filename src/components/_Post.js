import React from 'react';

class _Post extends React.Component {
  render() {
    return (
      <div className='col-md-4 post-block'>
        <img src={this.props.post.display_src} height='300' width='300' />
      </div>
    );
  }
}

export default _Post;
