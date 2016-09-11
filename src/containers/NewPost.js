import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'

import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reset} from 'redux-form';

import Dropzone from 'react-dropzone';

class NewPostForm extends Component {

  constructor(props) {
    super(props)
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onOpenClick = this.onOpenClick.bind(this)
  }

  handleSubmit(data) {
    console.log("handleSubmit=======================")
    console.log(data)
    this.props.submitPost(data)
  }

  onOpenClick() {
    this.refs.dropzone.open();
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
    }

    if(field.inputType=='fileUpload'){
      const files = field.input.value;
      return ( 
        <div>
          <Dropzone
            name={field.name}
            onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
          >
          <div>Try dropping some files here, or click to select files to upload.</div>
          
          </Dropzone>
          
          {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
          {files && Array.isArray(files) && (
            <ul>
              { files.map((file, i) => <img src={file.preview} height='200px' width='200px'/>) }
            </ul>
          )}

        </div>
      )
    }

    return(
      <div className={`input-row ${field.meta.touched && field.meta.error ? 'has-error' : 'test-errro'}`}>
        <input {...field.input} type="text" className={`form-control ${field.className}`}/>
        {field.meta.touched &&  field.meta.error && 
         <span className="control-label">{field.meta.error}</span>}
      </div>
    )  
  }

  render() {
    const { handleSubmit, handleFile, onOpenClick,  submitting, error} = this.props;
   
    return (
      <div className='col-md-12'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          {error && <strong>{error}</strong>}
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <h2> New Post </h2>
            <div className="form-group">
              <label>Title: </label>
              <Field name="title" component={this.renderField}/>
            </div>
            <div className="form-group">
              <label>Description</label>
              <Field name="description" className='' component={this.renderField} inputType='textarea'/>
            </div>

            <div className="col-md-4">
              <Field
                name='avatar'
                component={this.renderField} inputType='fileUpload'
              />
            </div>
            
            <div className='col-md-12'>
              <button type="submit" disabled={submitting} className="btn btn-primary">
                {submitting ? <i/> : <i/>} Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //authenticationError: state.auth.error
  }
}

NewPostForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'NewPostForm',
  asyncValidating: true
})(NewPostForm);

export default connect(mapStateToProps, Actions)(NewPostForm);
