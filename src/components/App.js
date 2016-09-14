import React from 'react';
import Header from '../containers/Header'
import PageLoader from '../containers/PageLoader'
import { AuthGlobals } from "redux-auth/bootstrap-theme";
import { browserHistory } from 'react-router';

if (typeof window != 'undefined' && window.document) {
  require('../styles/custom.css')
}

export default class App extends React.Component {

  // componentWillReceiveProps(nextProps) {
  //   replaceRoute("/login");
  //   browserHistory.push('/login')
  // }

  render() {
    return (
      <div>
        <PageLoader />
        <AuthGlobals />
        <Header />
        <div className='container'>
          {(typeof window != 'undefined' && window.document) ? React.cloneElement(this.props.children, this.props) : 'Loading...' }
        </div>
      </div>
    );
  }
}
