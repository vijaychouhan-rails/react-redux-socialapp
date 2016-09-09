import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'

import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reset} from 'redux-form';

class CommentForm extends Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  handleSubmitForm(data, dispatch) {
    const { submitComment } = this.props.actions
    console.log("tes test test============My test data==============", data)

    // Either use it
    // return new Promise((resolve, reject) => {
    //   // the ajax call would go here
    //   submitComment(data)
    //   resolve()
    // });

    // OR USE IT
    submitComment(data)

  }

  renderField(field) {
    console.log("===========Field============")
    console.log(field)
    if(field.inputType == 'textarea'){
      return(
        <div className={`input-row ${field.meta.touched && field.meta.error ? 'has-error' : 'test-errro'}`}>
          <textarea {...field.input} type="textarea" className={`form-control ${field.className}`}/>
          {field.meta.touched && field.meta.error && 
           <span className="control-label">{field.meta.error}</span>}
        </div>
      )
    }else{
      return(
        <div className={`input-row ${field.meta.touched && field.meta.error ? 'has-error' : 'test-errro'}`}>
          <input {...field.input} type="text" className={`form-control ${field.className}`}/>
          {field.meta.touched &&  field.meta.error && 
           <span className="control-label">{field.m}eta.error}</span>}
        </div>
      )  
    }
    
  }

  render() {
    const {handleSubmit, submitting, error} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <div>
          <label>Comment</label>
          <Field name="comment" className='comment-field' component={this.renderField} inputType='textarea'/>
        </div>
        
         {error && <strong>{error}</strong>}
        <button type="submit" className='btn btn-primary margin-top-10'>
          Submit
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


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

CommentForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'comment',
  asyncValidating: true
})(CommentForm);

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
