import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

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

  // handleFile(fieldName, event) {
  //   event.preventDefault();
  //   const { fields } = this.props;
  //   // convert files to an array
  //   const files = [...event.target.files]
  //   fields[fieldName].onChange(files)
  // }
  onOpenClick() {
      this.refs.dropzone.open();
    }

  render() {
    const {fields: {title, description, avatar}, handleSubmit, handleFile, onOpenClick,  submitting} = this.props;

    
    return (
      
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h2> New Post </h2>
        <div className="form-group">
          <label>Title: </label>
          <input type="text" className="form-control" placeholder="First Name" {...title}/>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
              {...description}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={description.value || ''} className="form-control" />
        </div>
        
        <div className="col-md-4">
          <Dropzone ref="dropzone"
            onDrop={ ( filesToUpload, e ) => avatar.onChange(filesToUpload)} multiple={false}
          >
          </Dropzone>
        </div>
        
        <div className='col-md-5' onClick={this.onOpenClick.bind(this)}>Try dropping some files here, or click to select files to upload.
          { avatar && Array.isArray(avatar.value) && (
            <div>
              { avatar.value.map((file, i) => <img src={file.preview} height='200px'/>) }
            </div>
          ) }
        </div>
        <div className='row'>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    //authenticationError: state.auth.error
  }
}


NewPostForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'NewPostForm',                           // a unique name for this form
  fields: ['title', 'description', 'avatar']
}, mapStateToProps, Actions)(NewPostForm);

export default NewPostForm;
