import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { EmailSignUpForm } from 'redux-auth/bootstrap-theme';
import { browserHistory } from 'react-router';

import * as Actions from '../actions/index';
import { bindActionCreators } from 'redux';

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Sign Up</PageHeader>
        <EmailSignUpForm next={() => this.props.dispatch({ type: 'USER_LOGOUT' }).then(browserHistory.push('/login')) } />
      </div>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(SignUp);