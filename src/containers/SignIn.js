import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { EmailSignInForm } from 'redux-auth/bootstrap-theme';
import { browserHistory } from 'react-router';

class SignIn extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Sign In</PageHeader>
        <EmailSignInForm next={() => browserHistory.push('/')} />
      </div>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(SignIn);