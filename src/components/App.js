import React from 'react';
import Header from '../containers/Header'
import PageLoader from '../containers/PageLoader'
import { AuthGlobals } from "redux-auth/bootstrap-theme";
import { browserHistory } from 'react-router';

if (typeof window != 'undefined' && window.document) {
  require('../styles/custom.css')
}

export default class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    console.log("===========APP>JS===========================")
    // replaceRoute("/login");
    // browserHistory.push('/login')
  }

  render() {
    console.log("====================================================")
    console.log((typeof window != 'undefined' && window.document))
    console.log("END END END====================================================")
    return (
      <div>
        <PageLoader />
        <AuthGlobals />
        <Header />
        <div className='container'>
          {(typeof window != 'undefined' && window.document) ? this.props.children : 'Loading...' }
        </div>
      </div>
    );
  }
}
