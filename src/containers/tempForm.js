import React, {Component} from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'

import * as Actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reset} from 'redux-form';

class CommentForm extends Component {

  
  render() {
    const sleep1 = ms => new Promise(resolve => setTimeout(resolve, ms))
    const { fields: { comment }, error, handleSubmit, pristine, reset, submitting } = this.props
    console.log("=================Props first======================", this.props)
    function handleSubmit1(values) {
      console.log("**********8Handle sunmit 1", values)
      
      return sleep1(1000) // simulate server latency
        .then(() => {
          throw new SubmissionError({ comment: 'Wrong password', _error: 'Login failed!' })
        })
    }

    return(
      <form onSubmit={handleSubmit(handleSubmit1)}>
        <div>
          <label>Username</label>
          <Field name="username" component={username =>
            <div>
              <input type="text" {...username} placeholder="Username"/>
              {username.touched && username.error && <span>{username.error}</span>}
            </div>
          }/>
        </div>
        <div>
          <label>Password</label>
          <Field name="password" component={password =>
            <div>
              <input type="password" {...password} placeholder="Password"/>
              {password.touched && password.error && <span>{password.error}</span>}
            </div>
          }/>
        </div>
        
        <Field name="comment" className='comment-field' component={ comment =>
          <div>
            <input type='textarea' {...comment} placeholder='enter comment' />
            {comment.touched && comment.error && <span>{comment.error}</span>}
          </div>

        } />

        {error && <strong>{error}</strong>}
        <div>
          <button type="submit" disabled={submitting}>Log In</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }



  // constructor(props) {
  //   super(props)
  //   // Pro tip: The best place to bind your member functions is in the component constructor
  //   this.handleSubmit = this.handleSubmit.bind(this)
  // }

  // handleSubmit(data, dispatch) {
  //   console.log("********************handleSubmit=================")
  //   console.log(dispatch)
  //     this.props.actions.submitComment(data).then(function(data){
  //       console.log("111111111111111=============done=========================")
  //       new Promise(resolve => {throw new SubmissionError('error': 'this is test error')})
  //       // Promise.resolve('promised value').then(function() {
  //       //   throw new SubmissionError('error': 'this is test error')
  //       // }).catch(function(error) {
  //       //   console.error("Error manually " + error.stack);
  //       // });
        
  //     })
  //   //this.props.submitComment(data)
  //   // this.props.actions.submitComment(data).then((a) => {
  //   //   console.log('=========================Done!====================');
  //   //   new SubmissionError({error: "this is error"})
  //   // });
  // }

  // render() {
  //   const {handleSubmit, submitting, error} = this.props;
  //   console.log("===================Props data in CommentForm js=====================")
  //   console.log(this.props)
  //   return (
  //     <form onSubmit={handleSubmit(this.handleSubmit)}>
  //       <div>
  //         <label>Comment</label>
  //         <Field name="comment" component="textarea" className='comment-field'/>
  //       </div>
  //       {error && <p>{error}</p>}
         
  //       <button type="submit" disabled={submitting}>
  //         {submitting ? <i/> : <i/>} Submit
  //       </button>
  //     </form>
  //   );
  // }
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
  form: 'submitValidation',
  fields: ['comment']
})(CommentForm);

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);


// export default reduxForm({
//   form: 'submitValidation'  // a unique identifier for this form
// })(CommentForm)