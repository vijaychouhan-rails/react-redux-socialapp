import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reset} from 'redux-form';

class CommentForm extends Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(data) {
    this.props.submitComment(data)
  }

  render() {
    const {fields: {comment}, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <label>Comment</label>
          <textarea
              {...comment}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={comment.value || ''} className='comment-field' />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? <i/> : <i/>} Submit
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    //authenticationError: state.auth.error
  }
}


CommentForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'comment',                           // a unique name for this form
  fields: ['comment', 'post_id']
}, mapStateToProps, Actions)(CommentForm);

export default CommentForm;
